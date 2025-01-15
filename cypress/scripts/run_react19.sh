#!/bin/bash

# Run React 19 vite app on port 3002

SCRIPT_DIR=$(dirname "$0")


cd "${SCRIPT_DIR}/../apps/react19"
npm install
npm run dev -- --port 3002
