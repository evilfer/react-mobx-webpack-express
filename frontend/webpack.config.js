const {resolve} = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    index: './src/index.jsx'
  },
  output: {
    path: resolve(`./dist/${isProd ? 'prod' : 'dev'}`),
    filename: isProd ? "[name].[hash:6].js" : "[name].js",
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  watch: !isProd,
  devtool: !isProd && 'eval-source-map',
  plugins: [
    new CopyWebpackPlugin([
      {from: './src/assets', to: 'assets'}
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};

if (isProd) {
  config.optimization = {
    minimizer: [
      new TerserWebpackPlugin(),
    ]
  };
} else {
  // config.resolve.alias = {'react-dom': '@hot-loader/react-dom'};
  config.devServer = {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    historyApiFallback: {
      index: '/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3001',
      '/auth': 'http://localhost:3001'
    }
  };
}

module.exports = config;
