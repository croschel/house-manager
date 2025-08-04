FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 4000
CMD ["yarn", "prod"]