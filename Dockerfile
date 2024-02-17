FROM ruby:3.0

# setup build environment
ARG USR_ID=1001
RUN useradd -m -u ${USR_ID} jenkins -s /bin/bash
RUN gem install jekyll bundler