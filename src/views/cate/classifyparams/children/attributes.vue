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
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <classify-dialog ref="classifyDialogRef" :title="title" @submit="submit"></classify-dialog>
  </div>
</template>

<script>
import { addParamsList } from "@/network/classifyparams";
import ClassifyDialog from "./classifyDialog";
export default {
  data() {
    return {
      // 弹框标题
      title: "",
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
    // 编辑
    handleEdit() {},
    // 删除
    handleDelete() {},
    // 点击按钮触发添加参数和添加属性弹框
    paramsAndAttributeDialog() {
      this.$refs.classifyDialogRef.classifyDialogVisible = true;
      this.title = this.activeName == "many" ? "动态参数" : "静态属性";
    },
    // 添加弹框中的确定操作
    submit(attr_name) {
      console.log(this.id);
      console.log(this.activeName);
      addParamsList(this.id, {
        attr_name: attr_name,
        attr_sel: this.activeName,
      })
        .then((res) => {
          if (res.meta.status == 201) {
            this.$message.success(res.meta.msg);
            this.$emit('updeParamsList')
            this.$refs.classifyDialogRef.classifyDialogVisible = false;
          } else {
            this.$message.error(res.meta.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.meta.msg);
        });
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