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
          class="demo-ruleForm"
          label-position="top"
        >
          <el-tabs
            tab-position="left"
            v-model="acitveIndex"
            :before-leave="beforeLeaveTab"
            @tab-click="tabClick"
          >
            <el-tab-pane label="基本信息" name="0">
              <BasiceInfoTabs
                :addGoodsDateForm="addGoodsDateForm"
                :goodsTypeData="goodsTypeData"
                @handlegoodscat="handlegoodscat"
              />
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <ParamsTabs :manyListData="manyListData" />
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <AttrTabs :onlyListData="onlyListData" />
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <UploadImgTabs
                :addGoodsDateForm="addGoodsDateForm"
                @updatePics="value => addGoodsDateForm.pics = value"
              />
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <QuillEditorTabs :addGoodsDateForm="addGoodsDateForm" @submitForm="submitForm" />
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";
import BasiceInfoTabs from "./children/basicsInfoTabs";
import ParamsTabs from "./children/paramsTabs";
import AttrTabs from "./children/attrTabs";
import UploadImgTabs from "./children/uploadImgTabs";
import QuillEditorTabs from "./children/quillEditorTabs";

import {
  getCascaderGoodsList,
  getParamsList,
  addGoodsList,
} from "@/network/addGoodsList";

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
      addGoodsDateForm: {
        // 商品名称
        goods_name: "",
        // 商品价格
        goods_price: "1",
        // 商品重量
        goods_weight: "1",
        // 商品数量
        goods_number: "1",
        // 商品分类 (级联选择器选中的值) 处理成字符串
        goods_cat: [],
        // 商品的参数（数组），包含 `动态参数` 和 `静态属性`
        attrs: [],
        // 上传图片的临时路径
        pics: [],
        // 富文本编辑内容
        goods_introduce: "",
      },
      // 级联选择器源数据
      goodsTypeData: [],
      // 商品参数
      manyListData: [],
      // 商品属性
      onlyListData: [],

      // form验证规则
      addGoodsRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请输入三级商品分类", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getCascaderGoodsList();
  },
  mounted() {},
  props: {},
  components: {
    UserBreadcrumb,
    BasiceInfoTabs,
    ParamsTabs,
    AttrTabs,
    UploadImgTabs,
    QuillEditorTabs,
  },
  computed: {
    // 选择了三级分类数据
    getGoodsCatValue() {
      if (this.addGoodsDateForm.goods_cat.length == 3) {
        let val = this.addGoodsDateForm.goods_cat[
          this.addGoodsDateForm.goods_cat.length - 1
        ];
        return val;
      }
    },
  },
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
    // 级联选择器只能选择三级分类
    handlegoodscat() {
      this.addGoodsDateForm.goods_cat = [];
    },
    // 阻止切换tabs (before-leave 钩子函数 返回 false 或者 Promise 且被 reject，则阻止切换。)
    beforeLeaveTab(activeName, oldActiveName) {
      if (this.addGoodsDateForm.goods_cat.length != 3) {
        this.$message.error("请选择三级分类");
        return false;
      }
    },

    // 切换Tabs
    tabClick() {
      if (this.acitveIndex == "1") {
        this.getParamsList(this.getGoodsCatValue, "many");
      }
      if (this.acitveIndex == "2") {
        this.getParamsList(this.getGoodsCatValue, "only");
      }
    },

    // 获取参数列表
    async getParamsList(id, activeName) {
      const res = await getParamsList(id, activeName);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      let result = res.data.map((itme, index) => {
        if (itme.attr_vals && itme.attr_vals.length > 0) {
          if (activeName == "many") {
            itme.attr_vals = itme.attr_vals.split(" ");
          } else {
            itme.attr_vals = itme.attr_vals;
          }
        } else {
          if (activeName == "many") {
            itme.attr_vals = [];
          } else {
            itme.attr_vals = "";
          }
        }
        return itme;
      });
      if (activeName == "many") {
        this.manyListData = result;
      } else {
        this.onlyListData = result;
      }
    },

    // 保存添加商品
    submitForm() {
      let addGoodsDateFormCopy = JSON.parse(
        JSON.stringify(this.addGoodsDateForm)
      );
      let manyListDataCopy = JSON.parse(JSON.stringify(this.manyListData));
      let onlyListDataCopy = JSON.parse(JSON.stringify(this.onlyListData));

      let attrArray = [];
      for (let [index, item] of manyListDataCopy.entries()) {
        let obj = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(" "),
        };
        attrArray.push(obj);
      }
      for (let [index, item] of onlyListDataCopy.entries()) {
        let obj = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals,
        };
        attrArray.push(obj);
      }

      addGoodsDateFormCopy.goods_cat = addGoodsDateFormCopy.goods_cat.join(",");
      addGoodsDateFormCopy.attrs = attrArray;

      this.$refs.addGoodsRef.validate(async (valid) => {
        if (valid) {
          const res = await addGoodsList(addGoodsDateFormCopy);
          if (res.meta.status !== 201) return this.$message.error(res.meta.msg);

          this.$message.success(res.meta.msg);
          this.$router.push({
            path: "/goods",
            query: {},
          });
        } else {
          return this.$message.error("res.meta.msg");
        }
      });
    },
  },
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