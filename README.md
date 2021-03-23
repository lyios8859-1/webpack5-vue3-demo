# my-project

> A Vue.js project

```bash
vue init webpack project-name
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Webpack 4 的打包性能足够好的，抛弃 DLL，选择hard-source-webpack-plugin

- 解决 webpack5 热更新报错:
Uncaught TypeError: __webpack_require__.hmrM is not a function

注释掉 chunkLoading: false,
注释掉 wasmLoading: false,

- 解决单元测试报错：
Test suite failed to run
    Cannot find module 'babel-core'
安装 npm i -D babel-core@bridge  
    "babel-core": "^7.0.0-bridge.0",

- 解决集成测试测试报错；
  Error: An error occurred while trying to start the Nightwatch Runner: Requires Babel "^7.0.0-0", but was loaded with "6.26.3". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.

  npm i -D @babel/register
  require('babel-register') 使用 require('@babel/register') 替换

- 解决集成测试中 ChromeDriver 与谷歌浏览器的版本不一致问题
  Error: An error occurred while retrieving a new session: "session not created: This version of ChromeDriver only supports Chrome version 89"

更新谷歌浏览器89版本