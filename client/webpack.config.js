const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = path.resolve(__dirname, './dist');
const webpackConfig = {
	entry: {
		app: [
			'react-hot-loader/patch',
			path.resolve(__dirname, './src/index.js'),
		],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				enforce: 'pre',
				use: 'eslint-loader',
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, './src/assets/media/'),
				use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'components': path.resolve(__dirname, './src/view/components'),
			'core': path.resolve(__dirname, './src/view/core'),
			'modules': path.resolve(__dirname, './src/modules'),
			'style': path.resolve(__dirname, './src/view/style'),
			'add': path.resolve(__dirname, './src/view/modules/add'),
			'svg': path.resolve(__dirname, './src/assets/media/svg'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/assets/index.html'),
			filename: 'index.html',
			path: outputPath,
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: path.resolve(__dirname, './dist'),
		port: 8081,
		historyApiFallback: true,
		inline: true,
		hot: true,
		host: '0.0.0.0',
	},
};

module.exports = webpackConfig;