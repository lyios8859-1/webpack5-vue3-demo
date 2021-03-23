'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin')
const TerserJsPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env');
const isMode = process.env.NODE_ENV === 'testing' || !process.env.NODE_ENV ? 'production' : 'none'
const webpackConfig = merge(baseWebpackConfig, {
  mode: isMode,
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJsPlugin({
        // test: /\.js(\?.*)?$/i,    //匹配参与压缩的文件
        parallel: true,
        terserOptions: {
          sourceMap: config.build.productionSourceMap,
          ecma: undefined,
          parse: {},
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log'] // 移除console.log
          }
        }
      }),
      new CssMinimizerPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap
      }),
      new HtmlMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vue: {
          name: 'chunk-vue',
          test: /[\\/]node_modules[\\/]_?vue(.*)/,
          priority: -1,
          chunks: 'all'
        },
        elementUI: {
          name: 'chunk-elementUI', // split elementUI into a single package
          priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'all'
        },
        styles: {
          name: 'styles', // 如果不要tree-shaking, 在 package.json 中配置 "sideEffects":["*.css", "*.less", "*.scss", "*.styl"]
          test: /\.css$/,
          chunks: 'all',
          enforce: true // true时，webpack会忽略splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests、splitChunks.maxInitialRequests这几个配置项，并且只要某个缓存组设置了enforce为true，匹配的模块就会忽略前面提到的那几个属性，即使有其他的缓存组匹配同样的模块，也没有设置enforce，同时优先级比设置了enforce的高，enforce: true仍然有效。
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css'),
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8,
    }
    )
  )
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
