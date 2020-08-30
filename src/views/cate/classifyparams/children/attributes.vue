<template>
  <div class="attributes">
    <!-- 动态参数、静态属性按钮 -->
    <div class="addBtn">
      <el-button type="primary" size="mini" :disabled="isDisabled" v-if="activeName == 'many'">添加参数</el-button>
      <el-button type="primary" size="mini" :disabled="isDisabled" v-else>添加属性</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  created() {
    console.log(this.paramsListData,'列表时间啦啦啦')
  },
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
  },
  components: {},
  computed: {},
  watch: {},
  methods: {
    // 编辑
    handleEdit() {},
    // 删除
    handleDelete() {},
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.addBtn {
  margin-bottom: 20px;
}
</style>