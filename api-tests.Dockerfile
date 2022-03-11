FROM node:16.14.0

WORKDIR  /api-tests

ENV PATH /api-tets/node_modules/.bin:$PATH

COPY /api-tests/package.json .
COPY /api-tests/package-lock.json . 

USER root
RUN npm install
