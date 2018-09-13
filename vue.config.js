const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

/**
 * 拼接相对于当前目录的下 文件的相对路径
 * @param dir 目录
 * @return {string}
 */
function resolove(dir) {
  return path.join(__dirname, dir)
}

/**
 * 雪碧图配置
 * @param data
 * @return {string}
 */
const templateFn = function(data) {
  return data.sprites.map(sprite => {
    return '.w-icon-N {\n  width: Wpx;\n  height: Hpx;\n  background-image: url(I);\n  background-position: Xpx Ypx;\n}'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y)
      .replace('I', sprite.image);
  }).join('\n');
};

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
  },
  configureWebpack: {
    plugins: [
      /**
       * 雪碧图插件配置
       * see https://github.com/mixtur/webpack-spritesmith#readme
       */
      new SpritesmithPlugin({
        // 目标图片
        src: {
          // 目标图片路径
          cwd: path.resolve(__dirname, './src/assets/icons'),
          // 图片匹配规则
          glob: "*.png"
        },
        // 输出雪碧图文件及样式文件
        target: {
          // 生成的图片保存位置
          image: path.resolve(__dirname, './src/assets/sprites/sprite.png'),
          // 生成的css保存位置
          // css: path.resolve(__dirname, './src/assets/sprites/sprite.css')
          css: [
            [path.resolve(__dirname, './src/assets/sprites/sprite.css'), {
              format: 'function_based_template'
            }]
          ]
        },
        /**
         * 样式文件中调用雪碧图地址写法 默认是绝对路径会出现引用错误 这里使用相对路径
         */
        apiOptions: {
          cssImageRef: './sprite.png'
        },
        /**
         *  雪碧图图片排列算法
         *  see  https://github.com/twolfson/spritesmith#algorithms
         */
        spritesmithOptions: {
          algorithm: 'binary-tree'
        },
        customTemplates: {
          function_based_template: templateFn
        }
      })
    ]
  }
};
