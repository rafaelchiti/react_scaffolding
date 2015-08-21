var webpack               = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");
var HtmlWebpackPlugin     = require('html-webpack-plugin');
var ExtractTextPlugin     = require('extract-text-webpack-plugin');
var path                  = require("path");

var API_PORT = 8000;

var webpackConfig = {
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:9898", // WebpackDevServer host and port
      "webpack/hot/only-dev-server",
      "./app/index.jsx"
    ],
    vendor: "./app/vendors/index.js"
  },
  devServer: {

    // If you have an API that you need to proxy then uncomment here.
    // proxy: {
    //   "/api/*": "http://teach.classdojo.dev:8080"
    // },

    contentBase: "./build/dev_build"
  },
  output: {
    path: "./build/dev_build",
    filename: "app.bundle-[hash].js"
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    loaders: [

      // IMPORTANT: we don"t want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot-loader", "babel-loader?optional=runtime&stage=0"]},

      {test: /\.json$/, loader: "json-loader"},
      {test: /\.css$/,  loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
      {test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")},
      {test: /\.png/, loader: "file-loader?mimetype=image/png"},
      {test: /\.jpg/, loader: "file"},
      {test: /\.gif/, loader: "file"},
      {test: /\.mp3/, loader: "file"},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ]
  },
  resolve: {

    // Needed so you can require("a") instead of require("a.jsx")
    extensions: ["", ".js", ".jsx", ".json", ".styl"],

    // Let us do things like require("app/stores/Channel")
    root: __dirname,

    // Whenever someone does import "react", resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, "node_modules/react")
    }
  },
  plugins: [
    new ExtractTextPlugin("app.bundle-[hash].css", {allChunks: true}),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle-[hash].js", minChunks: Infinity}),
    new HtmlWebpackPlugin({
      template: "./app/assets/index.template.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};


module.exports = webpackConfig;
