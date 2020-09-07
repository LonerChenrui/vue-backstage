<template>
  <div class="orders">
    <!-- 订单列表面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />
    <!-- 卡片 -->
    <el-card>
      <!-- 搜索 -->
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input clearable placeholder="请输入内容" v-model="queryInfo.query" @clear="handleSerch">
              <el-button slot="append" icon="el-icon-search" @click="handleSerch"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 订单列表 -->
      <template>
        <el-table :data="goodsListData" stripe border>
          <el-table-column type="index" width="90"></el-table-column>
          <el-table-column prop="order_number" label="订单编号" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="order_price" label="订单价格" width="120"></el-table-column>
          <el-table-column label="是否付款" width="100">
            <template slot-scope="{row}">
              <el-tag type="warning" v-if="row.pay_status == '1'">已付款</el-tag>
              <el-tag type="danger" v-else>未付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货"></el-table-column>
          <el-table-column label="下单时间">
            <template slot-scope="{row}">
              <div>{{row.create_time | dateFormat( "YYYY-mm-dd HH:MM:SS")}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="dialogVisible('edit')"
              ></el-button>
              <el-button
                type="success"
                icon="el-icon-location-outline"
                size="mini"
                @click="dialogVisible('location')"
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

      <!-- 弹框 -->
      <OrdersDialog
        :ordersDialogVisible="ordersDialogVisible"
        @cancel="ordersDialogVisible = false"
        :title="title"
        :locaTionOutlineData="locaTionOutlineData"
      />
    </el-card>
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";

import OrdersDialog from "./children/ordersDialog";

import { getOrdersList, getLocaTionOutlineInfo } from "@/network/orders";
export default {
  data() {
    return {
      // 订单列表面包屑标题
      breadcrumbTitle: ["订单管理", "订单列表"],
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
      // 弹框状态
      ordersDialogVisible: false,
      // 弹框标题
      title: "",
      // 物流信息数据
      locaTionOutlineData: []
    };
  },
  created() {
    this.getOrdersList();
  },
  mounted() {},
  props: {},
  components: {
    UserBreadcrumb,
    OrdersDialog,
  },
  computed: {},
  watch: {},
  methods: {
    // 获取订单列表
    async getOrdersList() {
      const res = await getOrdersList(this.queryInfo);
      if (res.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.goodsListData = res.data.goods;
      this.total = res.data.total;
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.queryInfo.pagesize = val;
      this.getOrdersList();
    },
    // 当前页显示多少条
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val;
      this.getOrdersList();
    },
    // 搜索
    handleSerch() {
      this.getOrdersList();
    },

    // 获取物流信息
    async getLocaTionOutlineInfo() {
      const res = await getLocaTionOutlineInfo();
      if (res.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.locaTionOutlineData = res.data
    },
    // 弹框操作：修改地址、查看物流
    dialogVisible(flge) {
      if (flge == "edit") {
        // 修改地址
        this.title = "修改地址";
      } else {
        // 查看物流进度
        this.title = "查看物流进度";
        this.getLocaTionOutlineInfo();
      }
      this.ordersDialogVisible = true;
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