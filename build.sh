#!/bin/bash

npx babel src --out-dir dist --ignore node_modules && cp -R src/views dist && node ./dist/server.js
npx babel src --out-dir dist --preset @babel/preset-env --no-babelrc && node ./dist/server.js