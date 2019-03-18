#!/bin/bash

if [[ $(git rev-parse --abbrev-ref HEAD) != "release-1.x" ]]; then
  echo "Switch to release-1.x branch before publishing.";
  exit 1;
fi

export NODE_ENV=production;

yarn lint && yarn transpile;
