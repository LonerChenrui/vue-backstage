<template>
  <div class="rolesList">
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row class="addrolesBtn">
        <el-button type="primary" size="samll">添加角色</el-button>
      </el-row>

      <!-- 角色列表 -->
      <el-table :data="rolesListTableData" border stripe lazy>
        <el-table-column type="expand" align="center">
          <template slot-scope="scoped">
            <el-row
              class="buttomBorder flexBox"
              v-for="(item1) in scoped.row.children"
              :key="item1.id"
            >
              <!-- 一级权限 -->
              <el-col :span="6">
                <el-tag
                  type="success"
                  closable
                  @close="jurisdictionDelete(scoped.row,item1.id)"
                >{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级 -->
              <el-col :span="18">
                <!-- 二级 -->
                <el-row
                  v-for="(item2,index) in item1.children"
                  :key="item2.id"
                  :class="[ index == (item1.children.length - 1) ? 'buttomNone': '' ,'buttomBorder','flexBox']"
                >
                  <el-col :span="6">
                    <el-tag
                      type="warning"
                      closable
                      @close="jurisdictionDelete(scoped.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-tag
                      class="buttonMargin"
                      type="danger"
                      closable
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      @close="jurisdictionDelete(scoped.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template>
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { jurisdictionDelete } from "@/network/power";
export default {
  name: "rolesList",
  data() {
    return {
      rolesListTableData: [],
    };
  },
  components: {},
  props: {
    // 角色列表数据
    rolesListData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    jurisdictionDelete(row, rightId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await jurisdictionDelete(row.id, rightId);
          console.log(result)
          if(result.meta.status === 200) {
            // 返回的data, 是当前角色下最新的权限数据，用于熟悉权限
            row.children = result.data;
            this.$message.success(result.meta.msg);
          }else {
            this.$message.error(result.meta.msg)
          }
        })
        .catch(() => {
          this.$message.info("已取消删除")
        });
    }
  },
  watch: {
    // 问题收集
    // vue中子组件的created、mounted钩子中获取不到props中的值问题
    // 出现这种原因是父组件传递的数据是通过ajax请求回来的，请求的过程是需要时间的，但是子组件的渲染是快于ajax的，所有此时created、mounted已经执行了，所有只能拿到默认值
    rolesListData: {
      handler(newVal, oldVal) {
        newVal && (this.rolesListTableData = newVal);
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style scoped>
.addrolesBtn {
  margin-bottom: 20px;
}

.buttomBorder {
  border-bottom: 1px solid rgb(238, 238, 238);
}
.buttomNone {
  border-bottom: 0;
}
.flexBox {
  display: flex;
  align-items: center;
}
.buttonMargin {
  margin: 5px 10px;
}
</style>