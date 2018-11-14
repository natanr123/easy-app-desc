FROM node:8

RUN node -v

# For cjpeg
RUN apt-get update && apt-get install
RUN apt-get install nasm
RUN apt-get install autoconf libtool
RUN apt-get install nasm

#for image-webpack-loader
RUN apt-get install libpng-dev
RUN apt-get update && apt-get install

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]

