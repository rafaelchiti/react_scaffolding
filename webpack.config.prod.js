/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var rootPath = path.join(__dirname, './');
var env = process.env.NODE_ENV || 'development';


module.exports = {
  devtool: 'source-map',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true,
    // Configuration in case you need to proxy calls to an api
    proxy: {
      "/api/*": "http://localhost:5000"
    },
    contentBase: "./build/dev_build"
  },
  stats: {
    colors: true
  },
  entry: {
    app: [
      'app/index.jsx'
    ].filter(Boolean)
  },
  output: {
    path: "build/prod_build",
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [path.join(rootPath, 'app')],
        exclude: /node_modules/,
        loader: 'babel',
        query: undefined
      },
      { test: /\.css$/, loader: "style!css?modules" },
      { test: /\.styl$/, loader: "style!css?modules!stylus" },
      { test: /\.png/, loader: "file-loader?mimetype=image/png" },
      { test: /\.jpg/, loader: "file" },
      { test: /\.gif/, loader: "file" },
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  resolve: {
    root: rootPath,
    extensions: ['', '.js', '.jsx', '.json', '.css', '.styl']
  },
  plugins: [
    // Prevent showing lint errors
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template: "app/assets/index.template.html"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify(env)
      }
    }),
  ].filter(Boolean)
};
/* eslint-enable */
