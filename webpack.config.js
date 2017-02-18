var webpack = require('webpack');
var path = require('path');

var DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin');

module.exports = {
  entry: {
    'bytes-validator': './src/index.ts',
    'bytes-validator.min': './src/index.ts'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'bytes-validator',
    umdNamedDefine: true
  },

  devtool: 'source-map',

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts']
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    }),
    new DeclarationBundlerPlugin({
      moduleName: '"bytes-validator"',
      out: 'bytes-validator.d.ts'
    })
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          noEmit: true
        }
      }
    ]
  },

  externals: {
    'angular': {
      root: 'angular',
      amd: 'angular',
      commonjs2: 'angular',
      commonjs: 'angular'
    }
  }
};
