FROM node:12.16.1
WORKDIR /opt/app
COPY package.json .
COPY .yarnrc .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
ENV NODE_ENV=production
ENTRYPOINT ["node"]
CMD ["--require", "dotenv/config", "dist/src/index.js", "dotenv_config_path=./config/.env"]
