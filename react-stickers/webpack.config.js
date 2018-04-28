const path = require('path'),
      src = './src/',
      entry = 'index.js',
      dist = 'dist';

module.exports = {
    entry: src + entry,
    output: {
        path: path.resolve(__dirname, dist),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [ path.resolve(__dirname, "node_modules") ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                }
            }
        ]
    }
}