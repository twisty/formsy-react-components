/* eslint-env node */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

const config = {
  devtool: 'source-map',

  entry: {
    main: './src',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist-umd'),
    library: 'formsy-react-components',
    libraryTarget: 'umd',
    globalObject: 'this',
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

  externals: {
    'formsy-react': {
      root: 'formsy-react',
      commonjs2: 'formsy-react',
      commonjs: 'formsy-react',
      amd: 'formsy-react',
    },
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.output.filename = '[name].min.js';
  }
  return config;
};
