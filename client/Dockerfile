FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN printf "ls\nyarn mock& \nyarn dev\n" > entrypoint.sh

EXPOSE 3000
EXPOSE 3001

CMD ["/bin/sh", "entrypoint.sh"]