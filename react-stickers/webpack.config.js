const path = require('path'),
    src = './src/js/',
    entry = 'index.js',
    dist = 'publish',
    output = 'index.js';

module.exports = {
    entry: src + entry,
    output: {
        path: path.resolve(__dirname, dist),
        filename: output
    },
    devServer: {
        contentBase: './publish'
    }, 
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    }  
}