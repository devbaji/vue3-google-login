<template><h1 id="vue3-google-login" tabindex="-1"><a class="header-anchor" href="#vue3-google-login" aria-hidden="true">#</a> vue3-google-login</h1>
<p>Add Sign In With Google feature to your Vue 3 application</p>
<p>
  <a href="https://npm-stat.com/charts.html?package=vue3-google-login"><img src="https://img.shields.io/npm/dm/vue3-google-login.svg" alt="npm"/></a>&nbsp;
  <a href="https://www.npmjs.com/package/vue3-google-login"><img src="https://img.shields.io/npm/v/vue3-google-login.svg" alt="npm"/></a>
</p>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h2>
<p>This is a lightweigh plugin for implementing sign-in and sign-up flows using <a href="https://developers.google.com/identity/oauth2/web" target="_blank"> Google Identity Services.</a> This allows us to implement the following features</p>
<ul>
<li>Custom sign-in button</li>
<li>One tap sign in</li>
<li>One tap and Automatic sign in</li>
</ul>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2>
<ul>
<li>This plugin needs vue version 3.0.3 or above to work properly</li>
<li>To enable Sign In With Google on your website, you first need to set up your Google API client ID. To do so, <a href="https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid">follow these steps</a></li>
</ul>
<h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting started</h2>
<h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3>
<p>First step is to install it using <code v-pre>npm</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> vue3-google-login
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="initialization-in-main-js" tabindex="-1"><a class="header-anchor" href="#initialization-in-main-js" aria-hidden="true">#</a> Initialization in main.js</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>
<span class="token keyword">import</span> vue3GoogleLogin <span class="token keyword">from</span> <span class="token string">'vue3-google-login'</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>vue3GoogleLogin<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">clientId</span><span class="token operator">:</span> <span class="token string">'YOUR_GOOGLE_CLIENT_ID'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="using-googlelogin-component" tabindex="-1"><a class="header-anchor" href="#using-googlelogin-component" aria-hidden="true">#</a> Using GoogleLogin component</h3>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">const</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Server call to handle the response"</span><span class="token punctuation">,</span> response<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>GoogleLoginVue</span> <span class="token attr-name">client-id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YOUR_GOOGLE_CLIENT_ID<span class="token punctuation">"</span></span> <span class="token attr-name">:callback</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>callback<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>You can omit <code v-pre>client-id</code> if it is initialized in <a href="#initialization-in-main-js">main.js</a></p>
</template>
