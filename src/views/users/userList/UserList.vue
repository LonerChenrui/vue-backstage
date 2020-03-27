<template>
  <div class="userList">
    <!-- 用户列表面包屑 -->
    <user-breadcrumb :breadcrumbTitle="breadcrumbTitle" />

    <!-- 用户列表 -->
    <user-list-table/>
  </div>
</template>

<script>
import UserBreadcrumb from "@/components/content/breadcrumb/Breadcrumb";
import UserListTable from '@/views/users/userList/children/UserListTable'

export default {
  name: "userList",
  data() {
    return {
      breadcrumbTitle: ["用户管理","用户列表"]
    };
  },
  components: {
    UserBreadcrumb,
    UserListTable
  },
  props: {}
};
</script>
<style scoped lang="less">

</style>