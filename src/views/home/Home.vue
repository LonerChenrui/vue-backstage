<template>
  <div id="home">
    <el-container class="elContainer">
      <!-- 头部区域 -->
      <el-header>
        <HomeHeader/> 
      </el-header>
      <el-container>
        <!-- 侧边栏区间 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 主要内容区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from '@/views/home/children/HomeHeader'
export default {
  name: "home",
  data() {
    return {
    }
  },
  components:{ 
    HomeHeader
  },
  props:{ },
}
</script>
<style scoped lang="less">
#home {
  height: 100%;
  width: 100%;
}
.elContainer {
  height: 100%;
}
.el-header {
  background: #373d41;
}
.el-aside {
  background: #333744;
}
.el-main {
background: #eaedf1
}
</style>