const path = require('path');
const autoprefixer = require('autoprefixer');

const customPath = path.join(__dirname, './customPublicPath');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    popup: [customPath, path.join(__dirname, '../chrome/extension/popup/popup')],
    background: [customPath, path.join(__dirname, '../chrome/extension/background')],
    domListener: [customPath, path.join(__dirname, '../chrome/extension/contentScripts/domListener')],
    tab: [customPath, path.join(__dirname, '../chrome/extension/tab/tab')],
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['*', '.js'],
    alias: {
      APP: path.resolve(__dirname, '../app'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['react-hmre']
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer]
          }
        }
      ]
    }, { 
      test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
      loader: 'file-loader?name=[path][name].[ext]',
    }
  ]
  },
}
