<template>
  <div class="attrTabs">
    <el-form-item :label="item.attr_name" v-for="(item,index) in onlyListData" :key="index">
      <el-input v-model="item.attr_vals"></el-input> 
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
    // 商品参数属性
    onlyListData: {
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