<template>
  <div class="classifyDialog">
    <el-dialog
      :title=" (attr_id ? '修改' : '添加') + title"
      :visible.sync="classifyDialogVisible"
      width="60%"
      :before-close="classifyDialogClose"
    >
      <span>
        <el-form
          :model="dialogFormData"
          :rules="dialogFormRules"
          ref="dialogForm"
          label-width="100px"
        >
          <el-form-item :label="title" prop="attr_name">
            <el-input v-model="dialogFormData.attr_name"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="classifyDialogClose">取 消</el-button>
        <el-button type="primary" @click="comfirmSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 弹框是否显示
      classifyDialogVisible: false,
      // 表单数据
      dialogFormData: {
        attr_name: "",
      },
      // 表单验证规则
      dialogFormRules: {
        attr_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  props: {
    // 标题名称
    title: {
      type: String,
      default() {
        return "提示";
      },
    },
    // 属性id
    attr_id: [String,Number]
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 确定保存
    comfirmSave() {
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit',this.dialogFormData.attr_name)
        } else {
          this.$message.error('验证失败')
          return false;
        }
      });
      
    },

    // ESC按键、弹框右上角x、取消按钮
    classifyDialogClose() {
      this.$confirm("确定取消？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$refs["dialogForm"].resetFields();
          this.classifyDialogVisible = false;
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>