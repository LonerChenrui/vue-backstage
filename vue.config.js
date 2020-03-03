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
  }
}

