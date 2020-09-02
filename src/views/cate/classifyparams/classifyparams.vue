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

      <!-- tabs标签页 动态参数、静态属性 -->
      <div>
        <el-tabs v-model="activeName" @tab-click="switchTabs">
          <el-tab-pane label="动态参数" name="many">
            <attr-ibutes
              :isDisabled="isDisabled"
              :activeName="activeName"
              :paramsListData="paramsListData"
              :id="id"
              @updeParamsList="updeParamsList"
            />
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <attr-ibutes
              :isDisabled="isDisabled"
              :activeName="activeName"
              :paramsListData="paramsListData"
              :id="id"
              @updeParamsList="updeParamsList"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getCascaderGoodsList, getParamsList } from "@/network/classifyparams";

import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";
import attrIbutes from "./children/attributes";

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
      // tabs标签页默认值 many动态参数 only静态属性
      activeName: "many",
      // 分类参数所属分类
      id: "",
      // 是否禁用添加按钮
      isDisabled: true,
      // 参数列表数据
      paramsListData: [],
    };
  },
  created() {
    this.getCascaderGoodsList();
  },
  mounted() {},
  props: {},
  components: {
    UserBreadcrumb,
    attrIbutes,
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
      // 根据用户选择商品分类判断是否禁用添加按钮
      if (this.goodsTypeValue.length == 3) {
        this.isDisabled = false;
        this.id = this.goodsTypeValue[this.goodsTypeValue.length - 1];
        this.getParamsList(this.id, this.activeName);
      } else {
        this.isDisabled = true;
        this.goodsTypeValue = [];
        this.paramsListData = [];
        this.id = "";
      }
    },
    // 获取参数列表
    async getParamsList(id, activeName) {
      const res = await getParamsList(id, activeName);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      // this.paramsListData = res.data;
      // 获取列表展开行的数据
      let result = res.data.map((itme, index) => {
        // input框是否显示
        itme.inputVisible = false;
        // input框中的值
        itme.inputValue = "";
        if (itme.attr_vals && itme.attr_vals.length > 0) {
          itme.attr_vals = itme.attr_vals.split(" ");
        } else {
          itme.attr_vals = [];
        }
        return itme;
      });
      this.paramsListData = result;
    },
    // 切换tabs
    switchTabs(tab, event) {
      if (this.id) {
        this.getParamsList(this.id, this.activeName);
      }
    },
    // 添加参数列表成功后进行列表刷新
    updeParamsList() {
      this.getParamsList(this.id, this.activeName);
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