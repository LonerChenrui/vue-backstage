<template>
  <div class="basiceInfoTabs">
    <el-form-item label="商品名称" prop="goods_name">
      <el-input v-model="addGoodsDateForm.goods_name"></el-input>
    </el-form-item>

    <el-form-item label="商品价格" prop="goods_price">
      <el-input v-model="addGoodsDateForm.goods_price"></el-input>
    </el-form-item>

    <el-form-item label="商品重量" prop="goods_weight">
      <el-input v-model="addGoodsDateForm.goods_weight" type="number"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="goods_number">
      <el-input v-model="addGoodsDateForm.goods_number" type="number"></el-input>
    </el-form-item>

    <el-form-item label="商品分类" prop="goods_cat">
      <el-cascader
        v-model="addGoodsDateForm.goods_cat"
        :options="goodsTypeData"
        :props="goodsProps"
        @change="goodsTypehandleChange"
        clearable
      ></el-cascader>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
  created() {},
  mounted() {},
  props: {
    addGoodsDateForm: {
      type: Object,
      default() {
        return {};
      },
    },
    goodsTypeData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 级联选择器内容发生改变
    goodsTypehandleChange() {
      if (this.addGoodsDateForm.goods_cat.length !== 3) {
        this.$emit("handlegoodscat");
      }
    },
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>