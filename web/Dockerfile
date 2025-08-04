FROM node:20-alpine
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --production=false
RUN ls -l node_modules/.bin
COPY . .
ENV PATH="./node_modules/.bin:$PATH"
EXPOSE 5173
RUN yarn install
CMD ["yarn", "dev"]