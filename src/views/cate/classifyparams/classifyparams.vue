<template>
  <div class="app">
    <!-- 分类参数面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />
    <!-- 卡片 -->
    <el-card>
      <!-- 提示语 -->
      <template>
        <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
      </template>

      <!-- 选择商品分类级联选择器 -->
      <div class="cascader">
        <span>选择商品分类：</span>
        <el-cascader
          v-model="goodsTypeValue"
          :options="goodsTypeData"
          :props="goodsProps"
          @change="goodsTypehandleChange"
          clearable
        ></el-cascader>
      </div>

      <!-- tabs标签页 动态参数、静态属性  @tab-click="handleClick"-->
      <div>
        <el-tabs v-model="activeName" >
          <el-tab-pane label="动态参数" name="first">动态参数11</el-tab-pane>
          <el-tab-pane label="静态属性" name="second">静态属性22</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCascaderGoodsList } from "@/network/classifyparams";

import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";

export default {
  data() {
    return {
      // 分类参数面包屑标题
      breadcrumbTitle: ["商品管理", "参数列表"],
      // 级联选择器选中值
      goodsTypeValue: [],
      // 级联选择器选源数据
      goodsTypeData: [],
      // 级联选择器配置
      goodsProps: {
        // 触发方式
        expandTrigger: "hover",
        // 对应的值
        value: "cat_id",
        // 显示的文本
        label: "cat_name",
        // 哪个字段用于展示子层级
        children: "children",
      },
      // tabs标签页默认值
      activeName: 'first'
    };
  },
  created() {
    this.getCascaderGoodsList();
  },
  mounted() {},
  props: {},
  components: {
    UserBreadcrumb,
  },
  computed: {},
  watch: {},
  methods: {
    // 级联选择器商品分类数据
    async getCascaderGoodsList() {
      const result = await getCascaderGoodsList({ type: 3 });
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.goodsTypeData = result.data;
    },

    // 当级联选择器内容发生改变时
    goodsTypehandleChange() {
      console.log(this.goodsTypeValue);
    },
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.cascader {
  margin: 20px 0;
}
</style>