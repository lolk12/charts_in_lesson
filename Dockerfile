FROM node:16.14-alpine
# Adding build tools to make yarn install work on Apple silicon / arm64 machines
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3001
CMD npm start
