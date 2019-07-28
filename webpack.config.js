const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname,'dist')
	},
	devtool:'cheap-module-eval-source-map',
	module:{
		rules: [
			{

				test:/\.js$|\.jsx$/,
				exclude:/node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test:/\.css$/,
				use:[
					'css-loader',
					'style-loader'
				]
			},
			{
				test:/\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			}
		]
	},
	resolve:{
		extensions: ['.js','.jsx','.json'],
		alias: {
			'@':path.resolve(__dirname,'./src')
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:'react-local-player',
			filename:'./index.html',
			template:path.resolve(__dirname,'./index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name][hash].css'
		})
	],
	devServer:{
		hot: true,
		contentBase: path.join(__dirname, "./dist"),
		host: "0.0.0.0", // 可以使用手机访问
		port: 3002,
		historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
		
	}
}