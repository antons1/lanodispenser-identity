FROM node:lts as build

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY . /app
RUN npm run build

FROM node:lts-alpine
COPY --from=build /app/dist .
EXPOSE 4455
RUN ["npm", "install", "-g", "http-serve"]
ENTRYPOINT ["http-serve", "-p", "4455"]