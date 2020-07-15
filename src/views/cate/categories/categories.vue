<template>
  <div class="categories">
    <!-- 商品分类面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <!-- 商品分类列表 -->
    <tree-table :data="treeTableDate" :columns="treeTableColumns" />

    <!-- 商品分类分页 -->
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";

import { getCateGoriesList } from "@/network/categories.js";
export default {
  name: "categories",
  data() {
    return {
      // 商品分类面包屑标题
      breadcrumbTitle: ["商品管理", "商品分类"],
      // 商品分类列表数据
      treeTableDate: [],
      // 商品分类列配置
      treeTableColumns: []
    };
  },
  components: {
    UserBreadcrumb
  },
  props: {},
  created() {
    this.getCateGoriesList();
  },
  methods: {
    getCateGoriesList() {
      getCateGoriesList().then(res => {
        console.log(res,'商品分类')
      })
    }
  }
};
</script>
<style scoped lang="less">
</style>