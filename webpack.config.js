const webpack = require('webpack');
const path = require('path');
const values = require('postcss-modules-values');
const postcssNormalize = require('postcss-normalize');
const postcssCssnext = require('postcss-cssnext');
const colorFunction = require('postcss-color-function');
const lost = require('lost');
const rupture = require('rupture');
const nib = require('nib');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index',
    'webpack-hot-middleware/client',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.jsx', 'css', 'styl', 'scss'],
  },
  module: {
    loaders: [
      {
        test: /.(js|jsx)?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
        ]
      },
      {
        test: /\.styl$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'stylus?sourceMap',
        ],
        exclude: /node_modules/,
      },
    ]
  },
  postcss: [
    postcssNormalize,
    postcssCssnext,
    values,
    lost,
    colorFunction,
  ],
  stylus: {
    use: [rupture(), nib()],
    import: ['~rupture/rupture/index.styl', '~nib/lib/nib/index.styl'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
