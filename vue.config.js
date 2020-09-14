

// 区分生产环境和开发环境
// process.env.NODE_ENV === 'development'   生产环境
// process.env.NODE_ENV === 'production'  开发环境

module.exports = {
  // 1. 可以设置部署应用包的基本url
  // publicPath: '',

  // 2. 去除dist文件夹中被打包出来的.map文件，减少包体积大小.
  // .map文件的作用是，在项目运行报错时，可以准确的输出哪一行哪一列有错
  productionSourceMap: false,

  // 3. assetsDir 放置生成的静态资源 (js、css、img、fonts) 的目录，默认是''。
  // assetsDir: '',

  // 4. 指定生成的 index.html 的输出路径，默认是index.html。个人理解为是将打包出来的默认index.html文件名修改成自己定义的文件名。
  // indexPath: '自定义名称 如： loner.html'    

  // 5. lintOnSave： "boolean | 'warning' | 'default' | 'error'"，每次保存的时候是否使用ESLint检查代码
  // lintOnSave：false, 关闭ESLint

  // 6. 本地开发服务器配置
  // devServer: {
  //   //配置开发服务器
  //   host: "0.0.0.0",
  //   //是否启用热加载，就是每次更新代码，是否需要重新刷新浏览器才能看到新代码效果
  //   hot: true,
  //   //服务启动端口
  //   port: "8080",
  //   //是否自动打开浏览器默认为false
  //   open: false,
  //   //配置http代理
  //   proxy: {
  //     "/api": {
  //       //如果ajax请求的地址是http://192.168.0.118:9999/api1那么你就可以在jajx中使用/api/api1路径,其请求路径会解析
  //       // http://192.168.0.118:9999/api1，当然你在浏览器上开到的还是http://localhost:8080/api/api1;
  //       //代理地址，这里设置的地址会代替axios中设置的baseURL

  //       target: "http://192.168.1.30:8085",
  //       //是否允许跨域，这里是在开发环境会起作用，但在生产环境下，还是由后台去处理，所以不必太在意
  //       changeOrigin: true,
  //       // 开启 websockets
  //       // ws: true, 
  //       //pathRewrite方法重写url
  //       // pathRewrite: {
  //       //   //把多余的路径置为''
  //       //   "api": ""
  //       // }
  //     },
  //     "/api2": {//可以配置多个代理，匹配上那个就使用哪种解析方式
  //       target: "http://api2",
  //       // ...
  //     }
  //   }
  // },


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
  },




}

