/* config-overrides.js */

const path = require('path')

module.exports = function override(config, env) {   
    //do stuff with the webpack config...
    config.resolve = {
        alias: {
            react: path.resolve('./node_modules/react')
          }
    }
    return config;
  }