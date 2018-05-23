const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: "./src/index.tsx", // Point to main file
	output: {
        path: __dirname + '/public',
		filename: 'bundle.js',
		publicPath: './'
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/, 						  // All ts and tsx files will be process by
				loaders: [ 'babel-loader', 'ts-loader' ], // first babel-loader, then ts-loader
				exclude: /node_modules/                   // ignore node_modules
			}, {
				test: /\.jsx?$/,                          // all js and jsx files will be processed by
				loader: 'babel-loader',                   // babel-loader
				exclude: /node_modules/                  // ignore node_modules
			}, {
				test: /\.css$/,
				loaders: [ 'style-loader', 'css-loader' ],
				exclude: /node_modules/
			}
		]
	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: false,
		hot: true,
		inline: true,
		proxy: {
			'/': {
				bypass: function (req, res, proxyOptions) {
					return '/public/index.html';
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: "./src/index.html",
				inject: "body"
			}
		),
		new CleanWebpackPlugin(
			["public"], {
				verbose: true
			}
		),
		new webpack.HotModuleReplacementPlugin()
	]
};