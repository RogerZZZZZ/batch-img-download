const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const host = 'localhost';
const port = 3000;
const customPath = path.join(__dirname, './customPublicPath');
const baseConfig = require('./base.config')

const baseDevConfig = webpackMerge(baseConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ],
})
const appConfig = baseDevConfig

module.exports = [
  appConfig
];
