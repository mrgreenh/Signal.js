var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: './src/signal.js',
    output: {
        filename: './dist/bundle.js'
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /(node_modules)/,
                query: {
                    presets: ["es2015", "stage-1"]
                }
            }]
    },
    plugins: [
        new ForceCaseSensitivityPlugin()
    ]
};

module.exports = config;