'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    fix: true,
    cache: true,
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: path.resolve(__dirname, '../src/main.ts')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: ['.js', '.ts', '.tsx', '.vue'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.tsx?$/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 2 // 进程2个
          //   }
          // },
          {
            loader: 'babel-loader', // 为了兼容 tsx
            options: {
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader', // 处理 ts
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        use: [
          /* 
            开启多进程打包。 
            进程启动大概为600ms，进程通信也有开销。
            只有工作消耗时间比较长，才需要多进程打包
          */
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: 2 // 进程2个
          //   }
          // },
          {
            loader: 'babel-loader',
            options: {
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
          }
        ],
        include: [resolve('src'), resolve('test'), resolve('node_modules/bootstrap-vue/lib')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          esModule: false
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(htm|html)$/,
        loader: 'html-loader'
      }
    ]
  }
}
