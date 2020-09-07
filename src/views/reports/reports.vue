<template>
  <div class="reports">
    <!-- 订单列表面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <el-card>
      <!-- 2.为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 1000px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import { getEchartsData } from "@/network/reports";
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";

// 1.引入echarts
import echarts from "echarts";

export default {
  data() {
    return {
      // 报表面包屑标题
      breadcrumbTitle: ["数据统计", "数据报表"],
      // 需要合并的数据
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  created() {},
  async mounted() {
    const res = await getEchartsData();
    if (res.meta.status !== 200) {
      return this.$message.error(result.meta.msg);
    }
    // 4.指定图表的配置项和数据
    let echartsData = Object.assign(this.options, res.data);
    //  3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 5.使用刚指定的配置项和数据显示图表。
    myChart.setOption(echartsData);
  },
  props: {},
  components: {
    UserBreadcrumb,
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang='less' scoped>
//@import url(); 引入公共css类
</style>