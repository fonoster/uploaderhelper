FROM alpine:3.10
LABEL maintainer="Pedro Sanders <fonosterteam@fonoster.com>"

COPY . /uploaderhelper
WORKDIR /uploaderhelper

RUN apk add --update nodejs=10.19.0-r0 npm=10.19.0-r0 \
  python=2.7.18-r0 make=4.2.1-r2 g++=8.3.0-r0 ; \
  npm -g install . ; \
  npm rebuild ; \
  rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

CMD ["/bin/sh", "-c", "run-uploaderhelper"]

VOLUME '/data'