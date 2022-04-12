# whoobe-ssg

A new version of whoobe-one-studio based on ViteJS and WindiCSS/TailwindCSS, to generate static html pages


**Since the app has access to the local filesystem to run the app safely use a container**

## DOCKER

You can also run in a docker without installing node or any other application (**requires docker**)

## Run development in a docker container

First you need to create an .env file at the root of the project

```
VITE_APP_LOCAL_API=http://localhost:9000
VITE_APP_PAGES=/app/pages/dist
VITE_APP_PAGES_URL=http://localhost:8080
```

To run in a docker container simply run from the project folder console

```
docker-compose run --name whoobe -p 3000:3000 -p 9000:9000 -p 8080:8080 -p 24678:24678 --rm app bash
```

At the first run it will build the container and install all dependencies.

## Run the app (from the container)

Open the project folder and run the following commands

```
docker exec -it whoobe npm run dev
docker exec -it whoobe nodemon
```

## Run the http server for website preview and CSS auto purge (from the container)

From your console

1. Start http server

```
docker exec -it whoobe /bin/bash
http-server -g -p 8080 -d
```

2. Hot reload and purge of CSS files
```
docker exec -it whoobe /bin/bash
npx tailwindcss -i ./input.css -o ./dist/assets/css/output.css --watch
```

At first time you will be asked to

```
Need to install the following packages:
  tailwindcss
Ok to proceed? (y)

Rebuilding...
```

#### Add new packages 
If you want to add any other package from the container console then

`npm i __package__`


#### Access docker console from another terminal

`docker exec -it whoobe /bin/bash`



