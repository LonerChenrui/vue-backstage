<template>
  <div class="powerList">
    <!-- 用户列表面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <!-- 权限列表 -->
    <el-table :data="powerListData" border stripe style="width: 100%">
      <el-table-column fixed="left" type="index" index="1" width="120" align="center"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="150" align="center"></el-table-column>
      <el-table-column prop="path" label="路径" width="150" align="center"></el-table-column>
      <el-table-column prop="level" label="权限等级" width="150" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag type="success" v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level == 1">二级</el-tag>
            <el-tag type="danger" v-else>三级</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="可左右滑动" width="150" align="center"></el-table-column>
      <el-table-column label="#" width="150" align="center"></el-table-column>
      <el-table-column label="#" width="150" align="center"></el-table-column>
      <el-table-column label="#" width="150" align="center"></el-table-column>
      <el-table-column label="#" width="150" align="center"></el-table-column>
      <el-table-column label="#" width="150" align="center"></el-table-column>
      <el-table-column label="#" width="150" align="center"></el-table-column>
      <el-table-column label="#" width="150" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";
import { getPowerList } from "@/network/power";
export default {
  name: "powerList",
  data() {
    return {
      // 用户列表面包屑
      breadcrumbTitle: ["权限管理", "权限列表"],
      // 权限列表
      powerListData: []
    };
  },
  components: {
    UserBreadcrumb
  },
  props: {},
  created() {
    this.getPowerList();
  },
  methods: {
    // 权限列表
    async getPowerList() {
      const res = await getPowerList();
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.powerListData = res.data;
    }
  },
  computed: {
   
  }
};
</script>
<style scoped lang="less">
</style>