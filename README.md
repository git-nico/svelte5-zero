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
Github uses **Jekyll** as the http server. It is therefor adviced to install **Jekyll** also locally to test the site.

```sh
pnpm add -D Jekyll
```

> **_package.json_**
>
> ```json
> {
> 	"scripts": {
> 		"jekyll": "jekyll serve"
> 	}
> }
> ```
