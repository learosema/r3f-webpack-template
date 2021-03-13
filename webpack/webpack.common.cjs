const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const d = (folder) => path.resolve(__dirname, folder);

const config = {
  entry: './src/index.tsx',
  output: {
    path: d('../dist'),
    filename: 'bundle.[contenthash].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: d('../public') }],
    }),
    new HtmlWebpackPlugin({
      template: d('../src/index.html'),
      minify: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
