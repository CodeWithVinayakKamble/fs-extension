# Bloglist

## step 1 : merging resources into single source of truth
1. pulling fronend(client) and backend(server) togather from diffrent folder to one single folder okay

### Process :
* windows powerhose tool **robocopy** (robustfilecopy)

    * robocopy <SOURCE_FOLDER> <DESTINATION_FOLDER> /E /XD node_modules .git (use "" powershell understand better pathing)

    #### copying client while at Desktop
    * ".\fso-part0-to-part5-foundation\part5\bloglist-frontend" ".\fso-part7-extension\bloglist\client" /E /XD node_modules .git

    * /E → Copy all subdirectories, including Empty ones.
    * /XD node_modules .git → eXclude Directories named node_modules and .git (so you don't copy 500 MB of junk!).

    #### copying server
    * robocopy ".\fso-part0-to-part5-foundation\part4\blog-list" ".\fso-part7-extension\bloglist\server" /E /XD node_modules .git1

## step 2 : clean installation than just install - npm ci
* npm --prefix client ci
* npm --prefix server ci

* Do NOT run npm audit fix --force

## step 3 : lets set remote controll of the project 
* install concurrently --save-dev ## install at bloglist root

### The Clever Trick for npm run build 💡
* Normally, when Vite builds, it puts the output into client/dist. But the server expects server/dist. Instead of writing messy copy commands that might fail on Windows, we can tell Vite in client/vite.config.js to build directly into the server folder:
* In client/vite.config.js, add the build property:
```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../server/dist',
    emptyOutDir: true
  }
})
```

### bloglist root package.json
```json
{
  "name": "bloglist",
  "private": true,
  "scripts": {
    "dev:client": "npm --prefix client run dev",
    "dev:server": "npm --prefix server run dev",
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "build": "npm --prefix client run build",
    "start": "npm --prefix server start"
  },
  "devDependencies": {
    "concurrently": "^10.0.7"
  }
}
```
 
## step 4 : Added ErrorBoundary for BlogList App (fallback ui)

## step 5 : Added A "Splat Route" (Wildcard Route) using path="*". In React Router, * means: "If no other route above matched this URL, catch it and render this fallback 404 page!"