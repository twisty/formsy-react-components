/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    contentBase: './examples',
    port: 3000,
  },

  entry: {
    playground: './examples/playground/src/index.tsx',
    refs: './examples/refs/src/index.tsx',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './examples/build'),
    publicPath: '/examples',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
};
