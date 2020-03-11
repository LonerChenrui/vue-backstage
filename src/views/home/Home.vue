<template>
  <div id="home">
    <el-container class="elContainer">
      <!-- 头部区域 -->
      <el-header>
        <HomeHeader/> 
      </el-header>
      <el-container>
        <!-- 侧边栏区间 -->
        <el-aside :width="width" class="home-aside">
          <home-aside @asideWidth='asideWidth'/>
        </el-aside>
        <!-- 主要内容区域 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from '@/views/home/children/HomeHeader'
import HomeAside from '@/views/home/children/HomeAside'
export default {
  name: "home",
  data() {
    return {
      width: '80px'
    }
  },
  components:{ 
    HomeHeader,
    HomeAside
  },
  props:{ },
  methods: {
    asideWidth(boolean) {
      this.width = boolean ? '80px' : '200px'
    }
  }
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

.home-aside {
  transition: all 1s;
}
</style>