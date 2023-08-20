FROM node:16 as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm i

COPY client /app/client/

RUN npm run build



FROM node:16 as server

WORKDIR /app

COPY client/package.json /app

RUN npm i

COPY server /app

COPY --from=client /app/client/build /app/build

EXPOSE 8080

CMD ["npm", "start"]