#!/bin/bash
docker exec -it whoobe npm run dev
docker exec -it whoobe nodemon
docker exec -it whoobe ./pages/npx tailwindcss -i ./input.css -o ./dist/assets/css/output.css --watch
docker exec -it whoobe ./pages/dist http-server -p 8080 -g 