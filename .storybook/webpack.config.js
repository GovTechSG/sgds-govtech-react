module.exports = {
  module: {
    rules: [
      {
        // Will take .babelrc from project root
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // for loading sgds package's scss
        test: /sgds-govtech\/fonts\/sgds-icons*\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "url-loader",
          },
        ],
      },
    ],
  },
};
