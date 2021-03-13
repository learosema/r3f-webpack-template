const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.cjs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfiguration, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
