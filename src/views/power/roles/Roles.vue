<template>
  <div class="roles">
    <!-- 用户列表面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <!-- 角色列表 -->
    <roles-list :rolesListData="rolesListData" />
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";
import RolesList from "./children/RolesList";
import { getRolesList } from "@/network/power";
export default {
  name: "roles",
  data() {
    return {
      // 用户列表面包屑
      breadcrumbTitle: ["权限管理", "角色列表"],
      // 加色列表
      rolesListData: []
    };
  },
  components: {
    UserBreadcrumb,
    RolesList
  },
  props: {},
  created() {
    this.getRolesList();
  },
  methods: {
    // 角色列表
    async getRolesList() {
      const res = await getRolesList();
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.rolesListData = res.data;
      // console.log(res);
    }
  }
};
</script>
<style scoped lang="less">
</style>