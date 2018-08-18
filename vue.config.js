const path = require('path');

function resolove(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,  // 将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败
  runtimeCompiler: false,  // 设置为 true 后就可以在 Vue 组件中使用 template 选项
  productionSourceMap: false,   // 不需要生产环境的 source map
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // https://cli.vuejs.org/zh/guide/css.html#css-modules
      sass: {
        data: `@import "@/style/index.scss";`
      }
    }
  },
  devServer: {},
  chainWebpack: config => {
    // webpack 解析 配置文件夹别名 Map
    // https://github.com/mozilla-neutrino/webpack-chain
    config.resolve.alias
      .set('IMG', resolove('src/assets/images'))
      .set('VIEWS', resolove('src/views'))
      .set('COMPONENTS', resolove('src/components'));
  }
};