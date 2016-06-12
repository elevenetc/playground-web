/**
 * Created by eleven on 12/06/2016.
 */
module.exports = {
	entry: './app-launcher.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	devtool: 'source-map'
};