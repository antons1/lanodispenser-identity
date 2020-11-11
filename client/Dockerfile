FROM node:12
COPY dist ./
EXPOSE 4455
RUN ["npm", "install", "-g", "http-serve"]
ENTRYPOINT ["http-serve", "-p", "4455"]