const merge = require('webpack-merge');
const appCommonConfig = require('./webpackCommon.js');
const path = require('path');

module.exports = merge( appCommonConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.bundle.js'
  }
});