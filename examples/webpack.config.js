/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    contentBase: __dirname,
    port: 3000,
  },

  entry: {
    playground: path.resolve(__dirname, './playground/src/index.js'),
    refs: path.resolve(__dirname, './refs/src/index.js'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    alias: {
      'formsy-react-components': path.resolve(__dirname, '../src/main'),
    },
  },
};
