/*eslint-env node */

var path = require('path');

module.exports = {

    devtool: 'source-map',

    entry: path.resolve(__dirname, 'playground/src', 'app.js'),

    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, './playground'),
        publicPath: '/playground'
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
    },

    resolve: {
        alias: {
            'formsy-react-components': path.resolve(__dirname, '../src/main')
        }
    }

};
