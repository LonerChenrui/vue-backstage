<template>
  <div class="classifyDialog">
    <el-dialog
      :title="title"
      :visible.sync="ordersDialogVisible"
      width="60%"
      :before-close="classifyDialogClose"
    >
      <!-- 省市三级联动 -->
      <div v-show="title == '修改地址'">
        <el-form
          :model="dialogFormData"
          :rules="dialogFormRules"
          ref="dialogForm"
          label-width="100px"
        >
          <el-form-item label="省市区/县" prop>
            <v-distpicker />
          </el-form-item>
          <el-form-item label="详细地址" prop>
            <el-input type="text"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- Timeline 时间线 -->
      <div v-show="title == '查看物流进度'">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in locaTionOutlineData"
            :key="index"
            :timestamp="activity.time"
          >{{activity.context}}</el-timeline-item>
        </el-timeline>
      </div>
      <span slot="footer" class="dialog-footer" v-show="title == '修改地址'">
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
      // 表单数据
      dialogFormData: {},
      // 表单验证规则
      dialogFormRules: {
        // attr_name: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        // ],
      },
      // 时间线 倒序或者正序
      reverse: true,
      // locaTionOutlineData: [
      //   {
      //     content: "活动按期开始",
      //     timestamp: "2018-04-15",
      //   },
      //   {
      //     content: "通过审核",
      //     timestamp: "2018-04-13",
      //   },
      //   {
      //     content: "创建成功",
      //     timestamp: "2018-04-11",
      //   },
      // ],
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
    // 弹框是否显示
    ordersDialogVisible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    // 物流信息数据
    locaTionOutlineData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 确定保存
    comfirmSave() {
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          this.$emit("cancel");
          // this.$emit("submit");
        } else {
          this.$message.error("验证失败");
          return false;
        }
      });
    },

    // ESC按键、弹框右上角x、取消按钮
    classifyDialogClose() {
      // this.$refs["dialogForm"].resetFields();
      this.$emit("cancel");
    },
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>