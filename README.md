[Basics](https://youtu.be/Ti3IBf6UNSI)

# SSR

Sveltekit uses SSR (Server Side Rendering) by default.

-   Renders the page on the server side, then hydrates it on the browser
-   This is mainly for SEO (Search Engine Optimization)
    -   these "bots" don't render the pages, they just use something like _curl_

## Possible Issues

> **_routes/about/+page.svelte_**
>
> ```html
> <h1>About</h1>
>
> Unique id: {window.crypto.randomUUID()}
> ```

When you now navigate to the about page and do a refresh of that page, you will get an error.  
This is because the server does not know _window.crypto_ and therefor can not render the page.

## A Solution

One of multiple solutions is to disable SSR for this particular page

> **_routes/about/+page.server.ts_**
>
> ```typescript
> export const ssr = false;
> ```

It is also possible to add this piece of code to **_+layout.server.ts_**

# Static Site

To generate a static site you need to install **adapter-static**

```sh
pnpm add -D @sveltejs/adapter-static
```

Edit **\*svelte.config.js** and change **'@sveltejs/adapter-auto'** into **'@sveltejs/adapter-static'**

## Prerender everything during build

> **_routes/+layout.server.ts_**
>
> ```typescript
> export const prerender = true;
> ```

# Build

```sh
pnpm build
```

This will create a **build** folder in the project root including an **_index.html_**

You can run this site by changing directory to this build folder and starting an http server

```sh
cd build
pnpm dlx http-server
```

# Hosting on Github

There is a way to host a static site on **Github**

> **_svelte.config.js_**
>
> ```javascript
> import adapter from '@sveltejs/adapter-static';
> import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
> import { mdsvex } from 'mdsvex';
>
> /** @type {import('@sveltejs/kit').Config} */
> const config = {
> 	// Consult https://svelte.dev/docs/kit/integrations
> 	// for more information about preprocessors
> 	preprocess: [vitePreprocess(), mdsvex()],
>
> 	kit: {
> 		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
> 		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
> 		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
> 		adapter: adapter({
> 			pages: 'docs',
> 			assets: 'docs',
> 			fallback: '404.html',
> 		}),
> 		appDir: 'app',
> 	},
> 	paths: {
> 		base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
> 	},
>
> 	extensions: ['.svelte', '.svx'],
> };
>
> export default config;
> ```

## Deployment

To deploy

> **_.github/workflows/deploy.yml_**
>
> ```yaml
> name: Deploy to GitHub Pages
>
> on:
>  push:
>    branches: ["main"]
>
> jobs:
>  build_site:
>    runs-on: ubuntu-latest
>    steps:
>      - name: Checkout
>        uses: actions/checkout@v4
>
>      # If you're using pnpm, add this step then change the commands and cache key below to use `pnpm`
>      - name: Install pnpm
>        uses: pnpm/action-setup@v3
>        with:
>          version: 9
>
>      - name: Install Node.js
>        uses: actions/setup-node@v4
>        with:
>          node-version: 20
>          cache: pnpm
>
>      - name: Install dependencies
>        run: pnpm install
>
>      - name: build
>        env:
>          BASE_PATH: "/${{ github.event.repository.name }}"
>        run: pnpm run build
>      - name: Upload Artifacts
>        uses: actions/upload-pages-artifact@v3
>        with:
>          # this should match the `pages` option in your adapter-static options
>          path: "docs/"
>
>  deploy:
>    needs: build_site
>    runs-on: ubuntu-latest
>
>    permissions:
>      pages: write
>      id-token: write
>
>    environment:
>      name: github-pages
>      url: ${{ steps.deployment.outputs.page_url }}
>
>    steps:
>      - name: Deploy
>        id: deployment
>        uses: actions/deploy-pages@v4
> ```
