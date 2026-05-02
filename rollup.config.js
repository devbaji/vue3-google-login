import path from "path";
import alias from "@rollup/plugin-alias";
import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const srcRoot = path.resolve(process.cwd(), "src");
const distRoot = path.resolve(process.cwd(), "dist");

/** `compress.passes: 2` trims raw size vs default Terser; dropping forced `ecma` avoids extra gzip loss. */
const terserMinify = () => [terser({ compress: { passes: 2 } })];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        format: "esm",
        file: "dist/index.esm.js",
        plugins: terserMinify(),
      },
      {
        format: "cjs",
        file: "dist/index.cjs.js",
        plugins: terserMinify(),
      },
      {
        format: "umd",
        file: "dist/index.umd.js",
        name: "Vue3GoogleLogin",
        globals: {
          vue: 'Vue'
        },
        plugins: terserMinify(),
      },
    ],
    external: ['vue'],
    plugins: [
      alias({
        entries: [
          { find: /^@\/(.*)/, replacement: `${srcRoot}${path.sep}$1` },
        ],
      }),
      vue(),
      peerDepsExternal(),
      typescript({
        check: false,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: "dist",
            rootDir: "src",
            sourceMap: true,
            declarationMap: true,
          },
        },
      }),
      postcss(),
      resolve(),
      commonjs(),
      del({ targets: "dist/*" }),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      alias({
        entries: [
          {
            find: /^@\/(.*)/,
            replacement: `${distRoot}${path.sep}$1`,
          },
        ],
      }),
      dts(),
      del({
        hook: "buildEnd",
        targets: ["./dist/**/*.d.ts", "./dist/**/*.d.ts.map"],
        ignore: ["./dist/index.d.ts", "./dist/index.d.ts.map"],
      }),
    ],
  },
];