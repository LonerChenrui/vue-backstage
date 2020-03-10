<template>
  <div class="home-header">
    <div>后台管理系统</div>
    <el-row>
      <el-button size="mini" @click="logDown">退出</el-button>
    </el-row>  
  </div>
</template>

<script>
export default {
  name: "home-header",
  data() {
    return {
    }
  },
  components:{ },
  props:{ },
  methods:{
    // 退出登录
    logDown() {
      sessionStorage.removeItem('token');
      this.$router.push('/login');
      this.$message({
        message: '退出登录',
        type: 'success',
        duration: 2000
      });
    }
  }
}
</script>
<style scoped lang='less'>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.home-header > div {
  color: #fff;
}
</style>