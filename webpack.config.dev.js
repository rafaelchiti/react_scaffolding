const webpack               = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
//const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const path                  = require('path');

const webpackConfig = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:9898', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      './app/index.jsx'
    ],
    vendor: './app/vendors/index.js'
  },
  devServer: {

    // Configuration in case you need to proxy calls to an api
    proxy: {
      '/api/*': 'http://localhost:5000'
    },

    contentBase: './build/dev_build'
  },
  output: {
    path: './build/dev_build',
    filename: 'app.bundle-[hash].js'
  },
  devtool: '#cheap-module-eval-source-map',
  module: {
    loaders: [

      // IMPORTANT: we don"t want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/,  loader: 'style-loader!css-loader?modules' },
      { test: /\.styl$/, loader: 'style-loader!css-loader?modules!stylus-loader' },
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
    extensions: ['', '.js', '.jsx', '.json', '.css', '.styl'],

    // Let us do things like require("app/reducers/application")
    root: __dirname,

    // Whenever someone does import "react", resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, 'node_modules/react')
    }
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle-[hash].js',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: './app/assets/index.template.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};


module.exports = webpackConfig;
