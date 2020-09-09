module.exports = {
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
    })

    //开发环境
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')     
    })
  }
}

