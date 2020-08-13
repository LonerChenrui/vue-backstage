<template>
  <div class="categories">
    <!-- 商品分类面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <!-- 添加 -->
    <div>
      <el-button type="primary" size="small" style="margin:10px 0">添加分类</el-button>
    </div>

    <!-- 商品分类列表 -->
    <tree-table
      :data="treeTableDate"
      :columns="treeTableColumns"
      :expand-type="false"
      :selection-type="false"
      show-index
    >
      <!-- 是否有效 -->
      <template slot="isOk" slot-scope="{row}">
        <div>
          <i class="el-icon-success" v-if="row.cat_deleted"></i>
          <i class="el-icon-error" v-else></i>
        </div>
      </template>

      <!-- 排序 -->
      <template slot="sort" slot-scope="{row}">
        <div>
          <el-tag v-if="row.cat_level == 0" size="mini">标签一</el-tag>
          <el-tag v-else-if="row.cat_level == 1" type="success" size="mini">标签二</el-tag>
          <el-tag v-else="row.cat_level == 2" type="warning" size="mini">标签三</el-tag>
        </div>
      </template>

      <!-- 操作 -->
      <template slot="acitve" slot-scope="{row}">
        <div>
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </div>
      </template>
    </tree-table>

    <!-- 商品分类分页 -->
    <div class="categoriesPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
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
      treeTableColumns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isOk",
        },
        {
          label: "排序",
          type: "template",
          template: "sort",
        },
        {
          label: "操作",
          type: "template",
          template: "acitve",
        },
      ],
      // 初始化查询列表条件
      queryInfo: {
        pagenum: 1,
        pagesize: 2,
        type: 3,
      },
      // 总条数
      total: 0,
    };
  },
  components: {
    UserBreadcrumb,
  },
  props: {},
  created() {
    this.getCateGoriesList();
  },
  methods: {
    // 获取商品分类列表
    async getCateGoriesList() {
      let res = await getCateGoriesList(this.queryInfo);
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.treeTableDate = res.data.result;
      this.total = res.data.total;
      this.queryInfo.pagesize = res.data.pagesize;
    },

    // 每页显示多少条
    handleSizeChange(val) {
      // this.queryInfo.pagesize = val;
      // this.getCateGoriesList();
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(val)
      this.queryInfo.pagenum = val;
      this.getCateGoriesList();
    },
  },
};
</script>
<style scoped lang="less">
.categoriesPage {
  margin-top: 20px;
}
</style>