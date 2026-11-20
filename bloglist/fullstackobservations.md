# Bloglist

## step 1 : merging resources into single source of truth

1. pulling fronend(client) and backend(server) togather from diffrent folder to one single folder okay

### Process :

- windows powershell tool **robocopy** (robustfilecopy)

  - robocopy <SOURCE_FOLDER> <DESTINATION_FOLDER> /E /XD node_modules .git (use "" powershell understand better pathing)

  #### copying client while at Desktop
  - ".\fso-part0-to-part5-foundation\part5\bloglist-frontend" ".\fso-part7-extension\bloglist\client" /E /XD node_modules .git

  - /E → Copy all subdirectories, including Empty ones.
  - /XD node_modules .git → eXclude Directories named node_modules and .git (so you don't copy 500 MB of junk!).

  #### copying server
  - robocopy ".\fso-part0-to-part5-foundation\part4\blog-list" ".\fso-part7-extension\bloglist\server" /E /XD node_modules .git

---

## step 2 : clean installation than just install - npm ci

- npm --prefix client ci
- npm --prefix server ci

- Do NOT run npm audit fix --force

---

## step 3 : lets set remote controll of the project

- install concurrently --save-dev ## install at bloglist root

### The Clever Trick for npm run build 💡

- Normally, when Vite builds, it puts the output into client/dist. But the server expects server/dist. Instead of writing messy copy commands that might fail on Windows, we can tell Vite in client/vite.config.js to build directly into the server folder:
- In client/vite.config.js, add the build property:

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../server/dist',
    emptyOutDir: true,
  },
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
---

## step 4 : Added ErrorBoundary for BlogList App (fallback ui)

---

## step 5 : Added A "Splat Route" (Wildcard Route) using path="*". In React Router, * means: "If no other route above matched this URL, catch it and render this fallback 404 page!"

---

## step 6 : ESLint vs. Prettier (The Bug Police vs. The Stylist)

### process :

- npm install --save-dev prettier
- create .prettierrc at bloglist root and configure :

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

- create .prettierignore at bloglist root and configure :

```text
node_modules
dist
package-lock.json
```

- add script to bloglist package.json - {"format": "prettier --write \"**/*.{js,jsx,json,css,md}\""}

---

## step 7 : setting global Notification system using React api context - Notification context using useReducer insted of useState

- why ?
### The Big Difference: "Scattered Logic" vs. "Centralized Logic"
1. With useState (Logic is Scattered Everywhere)

- Imagine 5 different components need to show notifications:

- LoginForm.jsx writes: setNotification({ text: 'Wrong password', type: 'error' })
- BlogForm.jsx writes: setNotification({ text: 'Blog created', type: 'success' })
- Blog.jsx writes: setNotification({ text: 'Liked blog', type: 'info' })
- Timeout writes: setNotification(null)

- **The Nightmare**: What if tomorrow you decide to change the notification object from { text, type } to { message, variant, id }? You have to open 5 different files and rewrite every single setNotification line!

2. With useReducer (Logic is Centralized in ONE Room) 🏢

- With useReducer, components never touch the state directly. They only shout what happened:

- LoginForm.jsx: dispatch({ type: 'SHOW_ERROR', payload: 'Wrong password' })
- BlogForm.jsx: dispatch({ type: 'SHOW_SUCCESS', payload: 'Blog created' })

---

## step 8 : server-site state management using tanStack Query

#### Naming Conventions
- For queries/mutations as custom hooks:
  - src/hooks/useBlogs.js (preferred in modern React) or src/queries/blogQueries.js.
  - If a file exports custom hooks, name it with camelCase starting with use (e.g., useBlogs.js).

- Hook & Function Naming
  - Custom hook returning query results: useBlogs or useBlogsQuery.
  - Custom hook returning mutations: useCreateBlog, useLikeBlog, useDeleteBlog.

---

### setup for tanstack 

- installation from root(bloglist)
  - npm --prefix client install @tanstack/react-query
  - npm --prefix server install express

- Install @tanstack/react-query inside client/

- creating nested folder from root(bloglist) commmand line
  - New-Item -ItemType Directory -Force client/src/hooks; New-Item client/src/hooks/useBlog.js

    - (-ItemType Directory) - itemtype directory,file

    - (-Force) - Prevents errors: If the hooks folder already exists, PowerShell won't crash with an "Item already exists" error. Creates parents: If src didn't exist for some reason, -Force would create both src and hooks together in one go.

    - ; (The Semicolon) - What it means: Command separator. ; First: Create the directory. ; Then: Create the file.