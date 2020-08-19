<template>
  <div class="categories">
    <!-- 商品分类面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <el-card>
      <!-- 添加 -->
      <div>
        <el-button type="primary" size="small" style="margin:10px 0" @click="addGoodsDialog">添加分类</el-button>
      </div>

      <!-- 商品分类列表 -->
      <tree-table
        :data="treeTableDate"
        :columns="treeTableColumns"
        :expand-type="false"
        :selection-type="false"
        show-index
      >
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="{row}">
          <div>
            <i class="el-icon-success" v-if="row.cat_deleted"></i>
            <i class="el-icon-error" v-else></i>
          </div>
        </template>

        <!-- 排序 -->
        <template slot="sort" slot-scope="{row}">
          <div>
            <el-tag v-if="row.cat_level == 0" size="mini">标签一</el-tag>
            <el-tag v-else-if="row.cat_level == 1" type="success" size="mini">标签二</el-tag>
            <el-tag v-else="row.cat_level == 2" type="warning" size="mini">标签三</el-tag>
          </div>
        </template>

        <!-- 操作 -->
        <template slot="acitve" slot-scope="{row}">
          <div>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </div>
        </template>
      </tree-table>

      <!-- 商品分类分页 -->
      <div class="categoriesPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-size="queryInfo.pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 添加商品分类弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <div>
        <el-form
          :model="addGoodsData"
          :rules="addGoodsRules"
          ref="addGoodsRuleForm"
          label-width="100px"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addGoodsData.cat_name"></el-input>
          </el-form-item>

          <el-form-item label="父级分类">
            <el-cascader
              v-model="pitchOnValue"
              :options="parentTypeData"
              :props="cascaderProps"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveCategories">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";

import { getCateGoriesList, saveCategories } from "@/network/categories.js";
export default {
  name: "categories",
  data() {
    return {
      // 商品分类面包屑标题
      breadcrumbTitle: ["商品管理", "商品分类"],
      // 商品分类列表数据
      treeTableDate: [],
      // 商品分类列配置
      treeTableColumns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isOk",
        },
        {
          label: "排序",
          type: "template",
          template: "sort",
        },
        {
          label: "操作",
          type: "template",
          template: "acitve",
        },
      ],
      // 初始化查询列表条件
      queryInfo: {
        pagenum: 1,
        pagesize: 5,
        type: 3,
      },
      // 总条数
      total: 0,
      // 添加分类弹框
      dialogVisible: false,
      // 添加分类From数据
      addGoodsData: {
        // 分类父 ID
        cat_pid: 0,
        // 分类名称
        cat_name: "",
        // 分类层级
        cat_level: 0,
      },
      // 添加分类From验证规则
      addGoodsRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 1 到 6 个字符", trigger: "blur" },
        ],
      },
      // 分类选中项绑定值
      pitchOnValue: [],
      // 父级分类list
      parentTypeData: [],
      // 级联选择器配置项
      cascaderProps: {
        // 触发子级的方式
        expandTrigger: "hover",
        // 对应的值
        value: "cat_id",
        // 显示的文本
        label: "cat_name",
        // 哪个字段用于展示子层级
        children: "children",
        checkStrictly: true,
      },
    };
  },
  components: {
    UserBreadcrumb,
  },
  props: {},
  created() {
    this.getCateGoriesList();
  },
  methods: {
    // 获取商品分类列表
    async getCateGoriesList() {
      let res = await getCateGoriesList(this.queryInfo);
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.treeTableDate = res.data.result;
      this.total = res.data.total;
      this.queryInfo.pagesize = res.data.pagesize;
    },

    // 每页显示多少条
    handleSizeChange(val) {
      // this.queryInfo.pagesize = val;
      // this.getCateGoriesList();
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(val);
      this.queryInfo.pagenum = val;
      this.getCateGoriesList();
    },
    // 显示商品分类弹框
    addGoodsDialog() {
      getCateGoriesList({ type: 2 }).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }

        this.parentTypeData = res.data;
      });
      this.dialogVisible = true;
    },
    // 关闭商品分类弹框
    handleClose() {
      this.dialogVisible = false;
    },
    // 当选中的分类数据发生改变时触发
    handleChange() {
      console.log(this.pitchOnValue);
      if (this.pitchOnValue.length == 0) {
        this.addGoodsData.cat_pid = 0;
        this.addGoodsData.cat_level = 0;
      } else {
        this.addGoodsData.cat_pid = this.pitchOnValue[
          this.pitchOnValue.length - 1
        ];
        this.addGoodsData.cat_level = this.pitchOnValue.length;
      }
    },
    // 保存分类
    async saveCategories() {
      const res = await saveCategories(this.addGoodsData);
      if (res.meta.status !== 201) {
        return this.$message.error(res.meta.msg);
      }
      this.dialogVisible = false;
      this.getCateGoriesList();
      this.$message.success(res.meta.msg);
    },
  },
};
</script>
<style scoped lang="less">
.categoriesPage {
  margin-top: 20px;
}
.el-cascader {
  width: 100%;
}
</style>
<style lang="less">
.el-popper .el-cascader-panel {
  max-height: 500px !important;
}
</style>