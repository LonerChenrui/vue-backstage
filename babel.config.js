// 生产环境上使用的插件
const prodPlugins = []
if(process.env.NODE_ENV === 'production'){
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    // 仅在生产环境下使用 (推荐)
    ...prodPlugins 
    // 生产和开发都使用
    // "transform-remove-console"·
  ]
}