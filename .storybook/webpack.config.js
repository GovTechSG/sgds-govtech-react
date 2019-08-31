const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                  path.resolve(__dirname, "../src"),
                  path.resolve(__dirname, "../stories/pages"),
                  path.resolve(__dirname, "../stories/components"),
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
