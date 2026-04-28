---
title: Overview
order: 0
---

# Overview

**vue3-google-login** is a lightweight, production-ready Vue 3 plugin for implementing Google Sign In, Google authentication, and OAuth2 login flows in your Vue 3 applications. This package provides seamless integration with [Google Identity Services](https://developers.google.com/identity) and the [Google 3P Authorization JavaScript Library](https://developers.google.com/identity/oauth2/web/guides/load-3p-authorization-library), making it easy to add Google login functionality to your Vue 3 projects.

> **Using Nuxt?** The recommended way to integrate this plugin in a Nuxt app is via the dedicated wrapper module → [nuxt-vue3-google-login](https://www.npmjs.com/package/nuxt-vue3-google-login)

## Key Features

- **Login with Google button** - Pre-styled Google sign-in button component
- **One Tap prompt** - Quick Google account selection for faster login experience
- **Automatic Login** - Seamless authentication without any user interaction
- **Custom Login Button** - Use your own button design with Google OAuth2 authentication
- **TypeScript Support** - Complete TypeScript definitions and type safety
- **Lightweight & Fast** - Minimal bundle size, optimized performance

## Prerequisites

Before using vue3-google-login in your Vue 3 project, ensure you have:

- **Vue 3.0.3 or above** - This plugin requires Vue 3.0.3 or higher
- **Google API Client ID** - To enable Google Sign In on your website, you need to set up your Google API client ID. [Follow these steps](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) to get your client ID
- **Local Development Setup** - For testing in your local environment, add `http://localhost` and `http://localhost:<port_number>` to the Authorized JavaScript origins in your Google Cloud Console
