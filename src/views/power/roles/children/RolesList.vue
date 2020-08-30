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
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="allocationJurisdiction(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="qxDialogVisible" width="60%">
      <el-tree
        ref="rightsRef"
        :data="allRights"
        :props="rightsTreeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        highlight-current
        :default-checked-keys="defaultCheckedKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qxDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleRights()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template> 

<script>
import { jurisdictionDelete, getTreeRights, roleRights } from "@/network/power";
export default {
  name: "rolesList",
  data() {
    return {
      // 角色列表
      rolesListTableData: [],
      // 分配权限弹框状态
      qxDialogVisible: false,
      // 所有权限列表
      allRights: [],
      // tree配置项
      rightsTreeProps: {
        // 显示的文本
        label: "authName",
        // 哪个属性用于节点之间嵌套
        children: "children"
      },
      // 默认选择已有权限
      defaultCheckedKeys: [],
      // 当前列表（行）数据
      row: ''
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
    // 删除指定权限
    jurisdictionDelete(row, rightId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await jurisdictionDelete(row.id, rightId);
          console.log(result);
          if (result.meta.status === 200) {
            // 返回的data, 是当前角色下最新的权限数据，用于刷新权限
            row.children = result.data;
            this.$message.success(result.meta.msg);
          } else {
            this.$message.error(result.meta.msg);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 获取已有的权限
    async allocationJurisdiction(node) {
      this.row = node;
      this.qxDialogVisible = true;
      const result = await getTreeRights();
      if (result.meta.status !== 200) {
        return this.$message.error(result.meta.msg);
      }
      this.allRights = result.data;
      this.defaultCheckedKeys = [];
      console.log(node, "总数据,用于测用递归");
      this.rowHaveRights(node);
    },
    // 递归获取最后一层的权限
    rowHaveRights(node) {
      if (!node.children) {
        return this.defaultCheckedKeys.push(node.id);
      }
      node.children.forEach(value => {
        this.rowHaveRights(value);
      });
    },
    // 角色授权
    roleRights() {
      // 获取已选中的节点id
      let rids = [
        ...this.$refs.rightsRef.getCheckedKeys(),
        ...this.$refs.rightsRef.getHalfCheckedKeys()
      ].join(','); 
      
      roleRights(this.row.id,rids).then(result => {
        if(result.meta.status !== 200) {
          return this.$message.error(result.meta.msg);
        }
        this.$emit('refreshRolesList');
        this.$message.success(result.meta.msg);
        this.qxDialogVisible = false;
      });
    }
  },
  watch: {
    // 问题收集
    // vue中子组件的created、mounted钩子中获取不到props中的值问题
    // 出现这种原因是父组件传递的数据是通过ajax请求回来的，请求的过程是需要时间的，但是子组件的渲染是快于ajax的，所以此时created、mounted已经执行了，所有只能拿到默认值
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