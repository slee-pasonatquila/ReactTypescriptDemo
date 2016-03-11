var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        index: './src/tsx/CommentBox.tsx'
    },
    output: {
        path: './public/scripts',
        filename: '[name].min.js'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "jquery": "$",
        "jquery": "jquery",
        "lodash": "_"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js', '.tsx']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            { from: 'src/css/base.css', to: '../css' },
            { from: 'src/html/index.html', to: '../' },
            { from: 'public/components/jquery/dist/jquery.min.js', to: 'thirdparty' },
            { from: 'public/components/marked/marked.min.js', to: 'thirdparty' },
            { from: 'public/components/react/react.min.js', to: 'thirdparty' },
            { from: 'public/components/react/react-dom.min.js', to: 'thirdparty' },
            { from: 'public/components/bootstrap/dist/js/bootstrap.min.js', to: 'thirdparty' },
            { from: 'public/components/lodash/dist/lodash.min.js', to: 'thirdparty' },
            { from: 'public/components/bootstrap/dist/css/bootstrap.min.css', to: '../css' },
            { from: 'public/components/font-awesome/css/font-awesome.min.css', to: '../css' },
            { from: 'public/components/font-awesome/fonts', to: '../fonts' }
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts-loader'
            }
        ]
    }
}
