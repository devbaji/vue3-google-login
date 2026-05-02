import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const repoRoot = join(__dirname, '..')
const docsRoot = join(repoRoot, 'documentation')
const docsPublic = join(docsRoot, 'public')
const sitemapPath = join(docsPublic, 'sitemap.xml')
const robotsPath = join(docsPublic, 'robots.txt')
const vitepressConfigPath = join(docsRoot, '.vitepress', 'config.mts')
/** Trailing slash. Override with DOCS_SITE_ORIGIN in CI (same as VitePress config). */
const siteBase = `${(process.env.DOCS_SITE_ORIGIN ?? 'https://vue3-google-login.pages.dev').replace(/\/$/, '')}/`

function collectMarkdownFiles(dir, acc = []) {
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === '.vitepress' || entry.name === 'public' || entry.name === 'node_modules') {
      continue
    }

    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      collectMarkdownFiles(fullPath, acc)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      acc.push(fullPath)
    }
  }

  return acc
}

function toRoutePath(filePath) {
  const rel = relative(docsRoot, filePath).replace(/\\/g, '/')

  if (rel === 'index.md') return '/'

  const withoutExt = rel.replace(/\.md$/, '')
  const withoutIndex = withoutExt.replace(/\/index$/, '')

  return `/${withoutIndex}`
}

/** Matches VitePress static output and GitHub Pages URLs (e.g. guide/overview.html). */
function toSitemapLoc(filePath) {
  const rel = relative(docsRoot, filePath).replace(/\\/g, '/')

  if (rel === 'index.md') {
    return siteBase
  }

  const withoutMd = rel.replace(/\.md$/, '')
  if (withoutMd.endsWith('/index')) {
    const prefix = withoutMd.slice(0, -'/index'.length)
    return `${siteBase}${prefix}/index.html`
  }

  return `${siteBase}${withoutMd}.html`
}

function getGitLastModified(filePath) {
  try {
    const value = execFileSync('git', ['log', '-1', '--format=%cs', '--', filePath], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()

    if (value) return value
  } catch {
    // Fall through to filesystem mtime.
  }

  const stats = statSync(filePath)
  return stats.mtime.toISOString().slice(0, 10)
}

function getSidebarRouteOrder() {
  const order = ['/']

  try {
    const configText = readFileSync(vitepressConfigPath, 'utf8')
    const linkPattern = /link:\s*['"]([^'"]+)['"]/g
    const seen = new Set(order)
    let match

    while ((match = linkPattern.exec(configText)) !== null) {
      const route = match[1].startsWith('/') ? match[1] : `/${match[1]}`
      if (!seen.has(route)) {
        seen.add(route)
        order.push(route)
      }
    }
  } catch {
    // If config cannot be read, retain fallback ordering behavior.
  }

  return order
}

const markdownFiles = collectMarkdownFiles(docsRoot)
  .map((filePath) => ({
    filePath,
    routePath: toRoutePath(filePath),
    lastmod: getGitLastModified(filePath),
  }))

const sidebarOrder = getSidebarRouteOrder()
const routeRank = new Map(sidebarOrder.map((route, index) => [route, index]))

markdownFiles.sort((a, b) => {
  const aRank = routeRank.get(a.routePath)
  const bRank = routeRank.get(b.routePath)

  if (aRank !== undefined && bRank !== undefined) return aRank - bRank
  if (aRank !== undefined) return -1
  if (bRank !== undefined) return 1
  return a.routePath.localeCompare(b.routePath)
})

const urlsXml = markdownFiles
  .map(
    ({ filePath, lastmod }) => `<url>
  <loc>${toSitemapLoc(filePath)}</loc>
  <lastmod>${lastmod}</lastmod>
</url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`

writeFileSync(sitemapPath, xml, 'utf8')
console.log(`Generated sitemap with ${markdownFiles.length} URLs: ${sitemapPath}`)

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteBase}sitemap.xml
`
writeFileSync(robotsPath, robotsTxt, 'utf8')
console.log(`Wrote robots.txt: ${robotsPath}`)
