FROM node:11.14.0-alpine
ENV node_env production
ENV PORT 8080
ENV LOG_LEVEL debug
ENV API_HOST http://swapi
ENV REQUEST_LIMIT 100kb
WORKDIR /usr/src/app
COPY ./dist/ ./
RUN rm package-lock.json
RUN yarn
ENTRYPOINT [ "yarn", "start" ]