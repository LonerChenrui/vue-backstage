<template>
  <div class="addGoodsList">
    <!-- 添加商品列表面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <el-card>
      <!-- 警告语 -->
      <div>
        <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
      </div>
      <!-- 步骤条 -->
      <div>
        <el-steps :active="(acitveIndex*1)" finish-status="success" align-center>
          <el-step :title="item" v-for="(item,index) in elStepTitle" :key="index"></el-step>
        </el-steps>
      </div>
      <!-- tabs标签页 -->
      <div>
        <el-form
          :model="addGoodsDateForm"
          :rules="addGoodsRules"
          ref="addGoodsRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-tabs tab-position="left" v-model="acitveIndex">
            <el-tab-pane label="基本信息" name="0"></el-tab-pane>
            <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
            <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
            <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
            <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";
export default {
  data() {
    return {
      // 分类参数面包屑标题
      breadcrumbTitle: ["商品管理", "添加商品"],
      // 当前处于哪个步骤
      acitveIndex: "0",
      // 步骤条title
      elStepTitle: [
        "基本信息",
        "商品参数",
        "商品属性",
        "商品图片",
        "商品内容",
        "完成",
      ],
      // form源数据
      addGoodsDateForm: {},
      // form验证规则
      addGoodsRules: {
        // name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  props: {},
  components: {
    UserBreadcrumb,
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.el-steps {
  padding: 20px 0;
}

.addGoodsList ::v-deep .el-step__title {
  font-size: 12px;
}
</style>