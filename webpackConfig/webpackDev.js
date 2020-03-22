const path = require('path');
const merge = require('webpack-merge');
const appCommonConfig = require('./webpackCommon.js');

module.exports = merge( appCommonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    port: 9001
  }
});