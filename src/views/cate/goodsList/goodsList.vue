<template>
  <div class="goodsList">
    <!-- 商品列表面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />
    <!-- 卡片 -->
    <el-card>
      <!-- 搜索、添加 -->
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input clearable placeholder="请输入内容" v-model="queryInfo.query" @clear="handleSerch">
              <el-button slot="append" icon="el-icon-search" @click="handleSerch"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="setPath">添加商品</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 商品列表 -->
      <template>
        <el-table :data="goodsListData" stripe border>
          <el-table-column type="index" width="90"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格（元）" width="120"></el-table-column>
          <el-table-column prop="goods_weight" label="商品重量" width="100"></el-table-column>
          <el-table-column prop="upd_time" label="创建时间">
            <template slot-scope="{row}">
              <span>{{row.upd_time | dateFormat("YYYY-mm-dd HH:MM:SS")}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="{row}">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteGoodsList(row.goods_id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";
import { getGoodsList, deleteGoodsList } from "@/network/goodsList";
export default {
  data() {
    return {
      // 分类参数面包屑标题
      breadcrumbTitle: ["商品管理", "商品列表"],
      // table源数据
      goodsListData: [],
      // 列表查询参数
      queryInfo: {
        // 输入框搜索内容
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
      // 总条数
      total: 0,
    };
  },
  created() {
    this.getGoodsList();
  },
  mounted() {},
  props: {},
  components: {
    UserBreadcrumb,
  },
  computed: {},
  watch: {},
  methods: {
    // 获取商品列表
    async getGoodsList() {
      const res = await getGoodsList(this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.goodsListData = res.data.goods;
      this.total = res.data.total;
      // console.log(this.goodsListData);
    },
    // 每页显示多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val;
      this.getGoodsList();
    },
    // 当前页显示多少条
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getGoodsList();
    },
    // 搜索
    handleSerch() {
      this.getGoodsList();
    },
    // 删除列表

    deleteGoodsList(id) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteGoodsList(id);
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg);
          }
          this.getGoodsList();
          this.$message.success(res.meta.msg);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加添加组件
    setPath() {
      this.$router.push({
        path: "addgoodslist",
        query: {},
      });
    },
  },
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
.el-pagination {
  padding: 20px 0;
}
.el-table {
  margin-top: 20px;
}
</style>