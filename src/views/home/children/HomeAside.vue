<template>
  <div class="home-aside">
    <div class="collapseIcon" @click="collapseIcon()">
      <span>
        <i class="el-icon-s-operation"></i>
      </span>
    </div>
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="$router.history.path"
      unique-opened
      router
    >
    <!-- 侧边栏一级路由 -->
      <el-submenu :index="item.id + ''" v-for="(item,index) in asideMenuList" :key='item.id'>
        <!-- 一级路由模板 -->
        <template slot="title">
          <!-- 一级路由图标 -->
          <i :class="asideMenuIcon[index]"></i>
          <!-- 一级路由标题 -->
          <span>{{item.authName}}</span>
        </template>
        <!-- 侧边栏二级路由 -->
        <el-menu-item :index="'/' + value.path" v-for="value in item.children" :key="value.id">
          <!-- 二级路由图标 -->
          <i class="el-icon-menu"></i>
          <!-- 二级路由标题 -->
          <span>{{value.authName}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getAsideMenuList } from "@/network/home";
import axios from "axios";
export default {
  name: "home-aside",
  data() {
    return {
      asideMenuList: [],
      asideMenuIcon: [
        'el-icon-user',
        'el-icon-view',
        'el-icon-goods',
        'el-icon-chat-line-round',
        'el-icon-coin'
      ],
      isCollapse: false
    };
  },
  components: {},
  props: {},
  created() {
    // 侧边栏菜单
    this.getAsideMenuList();
  },
  methods: {
    // ----发送网络请求----
    getAsideMenuList() {
      getAsideMenuList()
        .then(res => {
          if (res.meta.status == 200) {
            this.asideMenuList = res.data;
          } else {
            this.$message({
              message: res.meta.msg,
              type: "success",
              duration: 2000
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // ----事件处理----
    collapseIcon() {
      this.isCollapse = !this.isCollapse;
      this.$emit('asideWidth',this.isCollapse)
    }
  }
};
</script>
<style scoped lang='less'>

.home-aside {
  .el-menu {
    border-right: 0;
  }
  .collapseIcon {
    padding: 5px 20px 5px 20px;
    .el-icon-s-operation {
      font-size: 25px;
      color: #fff;
    }
  }
}
</style>