const path = require('path');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      { test: /.ts$/, loader: 'ts-loader', exclude: '/node_modules/' }
    ]
  },
  performance: { hints: false },
  mode: 'development',
  devtool: 'source-map',
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
  ],
};
