FROM cookiescrumbs/cypress-m1:9.4.1

WORKDIR  /ui-tests

ENV PATH /ui-tests/node_modules/.bin:$PATH

COPY /ui-tests/package.json .
COPY /ui-tests/package-lock.json . 

USER root
RUN npm install
