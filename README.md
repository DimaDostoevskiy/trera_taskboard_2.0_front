# trera

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable Vetur)
+ [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## api documentation


#### Auth
```sh
* POST http://localhost:3001/auth/login
* POST http://localhost:3001/auth/singUp
```

#### Project
```sh
* GET http://localhost:3001/projects/
* POST http://localhost:3001/projects/
* DELETE http://localhost:3001/projects/
```

#### Column
```sh
* GET http://localhost:3001/columns/:projectId
* POST http://localhost:3001/columns/
```

#### Card
```sh
* GET http://localhost:3001/card/:columnId
```

```sh
* POST http://localhost:3001/card/

--fields--
name
summery
description
column_id
```