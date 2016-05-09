const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const path                  = require('path');

const webpackConfig = {
  entry: {
    app: [
      'babel-polyfill', // Set up an ES6-ish environment
      './app/index.jsx'
    ],
    vendor: './app/vendors/index.js'
  },
  output: {
    path: './build/prod_build',
    filename: 'app.bundle-[chunkhash].js',
    publicPath: '/'
  },
  devServer: process.env.WEBPACK_DEV_SERVER ? {
    contentBase: './build/prod_build',
    historyApiFallback: true
  } : {},
  module: {
    loaders: [
      // IMPORTANT: we don"t want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules') },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules!stylus-loader') },
      { test: /\.png/, loader: 'file-loader?mimetype=image/png' },
      { test: /\.jpg/, loader: 'file' },
      { test: /\.gif/, loader: 'file' },
      { test: /\.mp3/, loader: 'file' },
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    // Needed so you can require("a") instead of require("a.jsx")
    extensions: ['', '.js', '.jsx', '.json', '.styl'],
    // Let us do things like require("app/reducers/application")
    root: __dirname,
    alias: {
      react: path.join(__dirname, 'node_modules/react')
    }
  },
  plugins: [
    new ExtractTextPlugin('app.bundle-[chunkhash].css', { allChunks: true }),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle-[chunkhash].js',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: './app/assets/index.template.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};


module.exports = webpackConfig;
