# whoobe-vitesome

A new version of whoobe-one-studio based on ViteJS and Vitesome



## Pre-📦

This repo brings few things pre-packed, so you don't need to install them manually everytime.

### Styling

- [Windi CSS](https://github.com/windicss/windicss) with [`vite-plugin-windicss`](https://github.com/windicss/vite-plugin-windicss)
- Default [Google Fonts](https://github.com/stafyniaksacha/vite-plugin-fonts#readme) with `vite-plugin-fonts`

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
  - [PurgeIcons](https://github.com/antfu/purge-icons) with [`vite-plugin-purge-icons](vite-plugin-purge-icons) Think about TailwindCSS + PurgeCSS, but for Icons.
  - Custom icons below `./assets/icons` with

### Plugins

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
- Component auto-import with [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components)

### Dev tools

- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
- [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - IDE support for Windi CSS
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete

### Project setup

```
yarn
```

### Use it

```
yarn dev
```

This will serve the app at [http://localhost:3000](http://localhost:3000)

### Build it

```
yarn build
```

Builds the app for production to the `dist` folder.<br>
It correctly bundles Vue in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## DOCKER

You can also run in a docker without installing node or any other application (**requires docker**)

## Run development in a docker container

To run in a docker container simply run from the project folder console
```
docker-compose run --name myapp -p 3000:3000 -p 24678:24678 --rm app bash
//then
npm run dev
```
At the first run it will build the container and install all dependencies.

#### Add new packages 
If you want to add any other package from the container console then

`npm i __package__`


#### Access docker console from another terminal

`docker exec -it _container_name /bin/bash`



