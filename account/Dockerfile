FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 8010
RUN npm run build
CMD ["node", "dist/src/main.js"]