<template>
  <div class="quillEditorTabs">
    <!-- 富文本编辑器 -->
    <quill-editor ref="myQuillEditor" v-model="addGoodsDateForm.goods_introduce" />
    <!-- 保存 -->
    <div>
      <el-button size="small" type="primary" @click="submitForm">添加商品</el-button>
    </div>
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
    addGoodsDateForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 添加商品
    submitForm(formName) {
      this.$emit("submitForm");
    },
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类

.quillEditorTabs ::v-deep .ql-editor {
  height: 100vh !important;
}
.el-button {
  margin-top: 20px;
}
</style>