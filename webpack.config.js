var webpack = require('webpack');

module.exports = {
	entry: './js/index',
	output: {
		path: __dirname + '/build',
		publicPath: 'new/build/',
		filename: 'index.js'
	},
	resolve: {
		modulesDirectories: [
			'node_modules',
			'bower_components',
			'js'
		],
		alias: {
			react: 'react/react-with-addons'
			//jquery: './bower_components/jquery/dist/jquery.min'
		}
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
 		new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        )
	],
	devtool: 'source-map'
};