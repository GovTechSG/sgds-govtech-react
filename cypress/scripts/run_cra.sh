#!/bin/bash

# Run create-react-app (React v18.1.0) on port 3000

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/cra"
npm install
npm start -- --port 3000
