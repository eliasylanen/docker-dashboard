const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/',
  output: {
    path: path.resolve(__dirname, 'dist', 'client'),
    filename: 'index.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },

  module: {
    loaders: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }],
  },

  plugins: [new webpack.HotModuleReplacementPlugin({ quiet: true })],
};
