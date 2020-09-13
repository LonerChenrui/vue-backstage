module.exports = {
  // 1. 可以设置部署应用包的基本url
  // publicPath: '',

  // 2. 去除dist文件夹中被打包出来的.map文件，减少包体积大小.
  // .map文件的作用是，在项目运行报错时，可以准确的输出哪一行哪一列有错
  productionSourceMap: false,

  // 3. assetsDir 放置生成的静态资源 (js、css、img、fonts) 的目录，默认是''。
  // assetsDir: '',

  // 指定生成的 index.html 的输出路径，默认是index.html。个人理解为是将打包出来的默认index.html文件名修改成自己定义的文件名。
  // indexPath: '自定义名称 如： loner.html', 

  configureWebpack: {
    resolve: {
      // 配置路径别名
      alias: {
        // "@": "src" 脚手架3.x默认已经配置过了
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  },
  // 修改webpack打包的入口文件。需要在根目录建两个对应入口js文件
  chainWebpack: config => {
    //生产环境   
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      // 通过externals加载外部CDN资源
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor'
      })
      
      // 通过htmlWebpackPlugin 进行html页面设置
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    //开发环境
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}

