#!/bin/bash

# Run Next.js (latest version) app on port 3000

SCRIPT_DIR=$(dirname "$0")


cd "${SCRIPT_DIR}/../apps/next-app"
npm install
npm run build
npm start -- --port 3001
