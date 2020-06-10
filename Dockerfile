FROM nodered/node-red
USER root

RUN apk add --no-cache ca-certificates curl openssl git openssh-client docker

RUN mkdir ./october
COPY . ./october/

RUN npm install ./october --silent --production
