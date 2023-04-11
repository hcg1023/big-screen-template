const { defineConfig } = require('@vue/cli-service')
const px2vw = require('postcss-px-to-viewport-8-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const isProduction = process.env.NODE_ENV !== 'development'

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: 'warning',
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            px2vw({
              unitToConvert: 'px', //需要转换的单位，默认为"px"；
              viewportWidth: 1920, //设计稿的视口宽度
              unitPrecision: 5, //单位转换后保留的小数位数
              propList: ['*'], //要进行转换的属性列表,*表示匹配所有,!表示不转换
              viewportUnit: 'vw', //转换后的视口单位
              fontViewportUnit: 'vw', //转换后字体使用的视口单位
              selectorBlackList: [], //不进行转换的css选择器，继续使用原有单位
              minPixelValue: 1, //设置最小的转换数值
              mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
              replace: true, //是否直接更换属性值，而不添加备用属性
              // exclude: [/node_modules/], //忽略某些文件夹下的文件
            }),
          ],
        },
      },
    },
  },
  //配置打包后自动生成zip压缩包
  configureWebpack: (config) => {
    if (isProduction) {
      config.plugins.push(
        new FileManagerPlugin({
          events: {
            onEnd: {
              delete: ['./dist.zip'],
              archive: [
                {
                  source: path.join(__dirname, './dist'),
                  destination: path.join(__dirname, './dist.zip'),
                },
              ],
            },
          },
        }),
      )
    }
  },
  chainWebpack: (config) => {
    if (isProduction) {
      config.optimization.splitChunks({
        chunks: 'all',
        minSize: 20000, // 20k
        cacheGroups: {
          arcgis: {
            name: 'chunk-arcgis',
            test: /[\\/]node_modules[\\/]@arcgis[\\/]/,
            priority: 10,
            minChunks: 2,
          },
          elementUI: {
            // 把 elementUI 单独分包
            name: 'chunk-elementUI',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 10,
          },
          echarts: {
            // 把 echarts相关的内容和vue-echarts 组合分包
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](echarts|zrender|vue-echarts)[\\/]/,
            priority: 10,
          },
          commons: {
            name: 'chunk-commons',
            minChunks: 2, // 拆分前，这个模块至少被不同 chunk 引用的次数
            priority: 0,
            reuseExistingChunk: true,
          },
        },
      })
    }
  },
})
