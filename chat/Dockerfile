FROM node:20-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY --from=build /app/dist ./dist
COPY ./src/ssl/server.key ./ssl/
COPY ./src/ssl/server.crt ./ssl/
EXPOSE 8040
CMD ["node", "dist/main.js"]

