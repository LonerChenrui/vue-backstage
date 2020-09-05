<template>
  <div class="paramsTabs">
    <el-form-item :label="item.attr_name" v-for="(item,index) in manyListData" :key="index">
      <el-checkbox-group v-model="item.attr_vals">
        <el-checkbox :label="val" border v-for="(val,index) in item.attr_vals" :key="index"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  props: {
    // 商品参数数据
    manyListData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {},
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>