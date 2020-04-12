const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { 
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
			{
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs/'
          }
        }]
      },			
      { test: /\.(obj|glb)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'obj/'
          }
        }]
      },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './templates/index.html'}),
		new webpack.ProvidePlugin({
			THREE: 'three'
		})
	]
};