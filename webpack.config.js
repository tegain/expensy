const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@src': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'bin')
  },
  plugins: [
    new NodemonPlugin()
  ],
};
