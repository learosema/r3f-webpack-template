const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const d = (folder) => path.resolve(__dirname, folder);

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  entry: [d('src/index.tsx')],
  output: {
    path: d('dist'),
    filename: 'bundle.[contenthash].js',
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: d('public') }],
    }),
    new HtmlWebpackPlugin({
      template: d('src/index.html'),
      minify: true,
    }),
    new MiniCssExtractPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        include: d('src'),
        use: [
          isDevelopment && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ].filter(Boolean),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

if (isDevelopment) {
  config.mode = 'development';
  config.devServer = {
    host: '0.0.0.0',
    port: 8080,
    contentBase: d('../dist'),
    watchContentBase: true,
    open: true,
    https: false,
    useLocalIp: true,
    disableHostCheck: true,
    overlay: true,
    noInfo: true,
    hot: true,
    after: function () {
      console.log(`Project running at http://localhost:8080/`);
    },
  };
} else {
  config.mode = 'production';
  config.plugins = [...(config.plugins || []), new CleanWebpackPlugin()];
}

module.exports = config;
