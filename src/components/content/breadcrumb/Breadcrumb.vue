<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/homemain' }">首页</el-breadcrumb-item>
      <template v-for="item in breadcrumbTitle">
        <el-breadcrumb-item :key="item">
          {{item}}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>    
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {};
  },
  components: {},
  props: {
    breadcrumbTitle: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped lang="less">
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>