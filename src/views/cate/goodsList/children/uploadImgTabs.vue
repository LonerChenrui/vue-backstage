<template>
  <div class="uploadImgTabs">
    <!-- 图片上传 -->
    <el-upload
      action="https://www.liulongbin.top:8888/api/private/v1/upload"
      list-type="picture"
      :headers="headers"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-preview="onPreview"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <!-- 图片阅览 -->
    <el-dialog title="预览" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div>
        <img :src="imgPath" alt="" class="imgPath">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 设置上传的请求头部
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      // 图片临时路劲
      tmpPath: [],
      // 图片预览弹框
      dialogVisible: false,
      // 图片路劲
      imgPath: ''
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
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 文件上次成功
    onSuccess(response, file, fileList) {
      let picObj = {
        pic: response.data.tmp_path,
      };
      this.tmpPath.push(picObj);
      this.$emit("updatePics", this.tmpPath);
    },
    //  文件移除时
    onRemove(file) {
      let tmp_path = file.response.data.tmp_path;
      let index = this.tmpPath.findIndex((value, index, arr) => {
        console.log(this, "这个是this对象");
        return value.pic == tmp_path;
      });
      this.tmpPath.splice(index, 1);
      this.$emit("updatePics", this.tmpPath);
    },
    // 点击已经上传的文件列表，进行图片预览
    onPreview(file) {
      this.imgPath = file.response.data.url;
      this.dialogVisible = true;
    },

    // 关闭图片预览
    handleClose() {
      this.dialogVisible = false;
    }

  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.imgPath {
  width: 100%;
  height: 100%;
}
</style>