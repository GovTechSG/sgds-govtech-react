const webpack = require('webpack');
module.exports = {
  webpackFinal: async (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __IS_DEV__: process.env.NODE_ENV === 'development',
      })
    );
    return config;
  },
  stories: [
    '../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)',
    '../stories/**/**/*.stories.@(ts|tsx|js|jsx|mdx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-postcss',
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: false, // type-check stories during Storybook build
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        return prop.parent
          ? prop.parent.name !== 'DOMAttributes' &&
              !prop.parent.name.includes('HTMLAttributes') &&
              prop.parent.name !== 'AriaAttributes'
          : true;
      },
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  rules: [
    // ...
    {
      test: /\.mdx?$/,
      use: ['babel-loader', '@mdx-js/loader'],
    },
  ],
};
