<template>
  <div class="attributes">
    <!-- 动态参数、静态属性按钮 -->
    <div class="addBtn">
      <el-button
        type="primary"
        size="mini"
        :disabled="isDisabled"
        @click="paramsAndAttributeDialog"
      >{{activeName == 'many' ? '添加参数' : '添加属性'}}</el-button>
    </div>
    <!-- 动态参数、静态属性列表 -->
    <div>
      <el-table :data="paramsListData" border>
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <pre>{{row}}</pre>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column type="index"></el-table-column>
        <!-- 属性名称 -->
        <el-table-column prop="attr_name" :label="activeName == 'many' ? '参数名称' : '属性名称' "></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <classify-dialog ref="classifyDialogRef" :title="title" :attr_id="attr_id" @submit="submit"></classify-dialog>
  </div>
</template>

<script>
import {
  addParamsList,
  editParamsList,
  deleteParamsList,
} from "@/network/classifyparams";
import ClassifyDialog from "./classifyDialog";
export default {
  data() {
    return {
      // 弹框标题
      title: "",
      // 属性id
      attr_id: "",
    };
  },
  created() {},
  mounted() {},
  props: {
    // 是否禁用
    isDisabled: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 根据tabs显示对应的添加按钮
    activeName: {
      type: String,
      required: true,
    },
    // 参数列表数据
    paramsListData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 分类id
    id: {
      type: [String, Number],
    },
  },
  components: {
    ClassifyDialog,
  },
  computed: {},
  watch: {},
  methods: {
    // 编辑按钮
    handleEdit(index, row) {
      this.attr_id = row.attr_id;
      this.$refs.classifyDialogRef.dialogFormData.attr_name = row.attr_name;
      this.title = this.activeName == "many" ? "动态参数" : "静态属性";
      this.$refs.classifyDialogRef.classifyDialogVisible = true;
    },
    // 删除操作
    handleDelete(row) {
      this.$confirm("确定删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteParamsList(this.id, row.attr_id);
          if (res.meta.status !== 200) {
            this.$message.error(res.meta.msg);
            return;
          }
          this.$message.success(res.meta.msg);
          this.$emit("updeParamsList");
          this.$refs.classifyDialogRef.classifyDialogVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击按钮触发添加参数和添加属性弹框
    paramsAndAttributeDialog() {
      this.attr_id = "";
      this.$refs.classifyDialogRef.dialogFormData.attr_name = "";
      this.$refs.classifyDialogRef.classifyDialogVisible = true;
      this.title = this.activeName == "many" ? "动态参数" : "静态属性";
    },
    // 弹框中的确定操作
    submit(attr_name) {
      if (!this.attr_id) {
        // 添加 id: 分类id、attr_name:编辑名称、attr_sel：类型 [many或only]
        addParamsList(this.id, {
          attr_name: attr_name,
          attr_sel: this.activeName,
        })
          .then((res) => {
            if (res.meta.status == 201) {
              this.$message.success(res.meta.msg);
              this.$emit("updeParamsList");
              this.$refs.classifyDialogRef.classifyDialogVisible = false;
            } else {
              this.$message.error(res.meta.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.meta.msg);
          });
      } else {
        // 编辑 id: 分类id、attr_id：属性id、attr_name:编辑名称、attr_sel：类型 [many或only]
        editParamsList(this.id, this.attr_id, {
          attr_name: this.$refs.classifyDialogRef.dialogFormData.attr_name,
          attr_sel: this.activeName,
        })
          .then((res) => {
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.$emit("updeParamsList");
              this.$refs.classifyDialogRef.classifyDialogVisible = false;
            } else {
              this.$message.error(res.meta.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error.meta.msg);
          });
      }
    },
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.addBtn {
  margin-bottom: 20px;
}
</style>