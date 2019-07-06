#!/bin/bash

if [[ $(git rev-parse --abbrev-ref HEAD) != "master" ]]; then
  echo "Switch to master branch before publishing.";
  exit 1;
fi

export NODE_ENV=production;

yarn install --production=false && yarn lint && yarn build;
