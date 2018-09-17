FROM ruby:2.1-alpine

RUN apk add --update build-base libffi-dev

RUN gem install travis --no-rdoc --no-ri

ENTRYPOINT ["/usr/local/bundle/bin/travis"]

CMD ["version"]
