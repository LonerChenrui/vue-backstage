<template>
  <div class="userListTable">
    <el-card>
      <!-- 用户列表搜素 -->
      <el-row :gutter="20" class="userSearch">
        <el-col :span="12">
          <el-input
            placeholder="请输入内容"
            v-model="userInfoParams.query"
            clearable
            @clear="serachAndClear"
            @change="serachAndClear"
          >
            <el-button slot="append" icon="el-icon-search" @click="serachAndClear"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addUserBtn()">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表Table -->
      <template>
        <el-table :data="userTableData" stripe border>
          <el-table-column type="index" :index="1"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="address" label="状态">
            <template slot-scope="scope">
              <el-switch
                @change="switchType(scope)"
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="178" class="operation">
            <template slot-scope="scope">
              <el-button
                @click="editorUserInfo(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
              <el-button
                @click="deleteUser(scope.row.id)"
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userInfoParams.pagenum"
          :page-sizes="[2, 5, 10, 15]"
          :page-size="userInfoParams.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 添加用户 -->
    <el-dialog ref="elDialogRef" :title="elDialogTitle" :visible.sync="assUserVisible" width="60%">
      <el-form
        :model="addUserForm"
        :rules="addUserRules"
        ref="addUserRef"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" :disabled="isDisabled"></el-input>
        </el-form-item>

        <el-form-item v-show="isHidePassword" label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetAddUserForm">取 消</el-button>
        <el-button type="primary" @click="submitAddUserForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserListData,
  alterUserState,
  addUser,
  editorUser,
  deleteUser
} from "@/network/user";
export default {
  name: "userListTable",
  data() {
    // 添加用户email验证
    const addUserEmailReg = (rule, value, callback) => {
      const userEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (userEmail.test(value)) return callback();
      callback(new Error("请输正确邮箱"));
    };

    // 添加用户手机号验证
    const addUserMobileReg = (rule, value, callback) => {
      const userEmail = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (userEmail.test(value)) return callback();
      callback(new Error("请输正确手机号"));
    };

    return {
      // 用户添加、编辑弹框标题
      elDialogTitle: "添加用户",
      // 用户列表数据
      userTableData: [],
      // 初始化传递的参数数据
      userInfoParams: {
        // 用户输入的内容
        query: "",
        // 当前页
        pagenum: 1,
        // 每页显示几条数据
        pagesize: 2
      },
      // 总页数
      total: 0,
      // 添加用户弹框是否隐藏
      assUserVisible: false,
      // 添加用户form数据对象
      addUserForm: {
        // 用户名
        username: "",
        // 密码
        password: "",
        // 邮箱
        email: "",
        // 手机
        mobile: ""
      },
      // 是否显示密码项
      isHidePassword: true,
      // 是否禁用输入框
      isDisabled: false,
      // 用户id
      userId: "",
      // 添加用户验证规则
      addUserRules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请填写邮箱", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          },
          { validator: addUserEmailReg, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "blur"
          },
          { validator: addUserMobileReg, trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  props: {},
  created() {
    this.getUserListData();
  },
  methods: {
    // 获取列表数据
    async getUserListData() {
      const { data, meta } = await getUserListData(this.userInfoParams);
      if (meta.status !== 200) return this.$message.warning(meta.msg);
      this.userTableData = data.users;
      this.total = data.total;
    },
    // 每页显示几条数据
    handleSizeChange(val) {
      this.userInfoParams.pagesize = val;
      this.getUserListData();
    },
    // 当前页
    handleCurrentChange(val) {
      this.userInfoParams.pagenum = val;
      this.getUserListData();
    },
    // 监听状态开关的改变
    async switchType(scope) {
      const { meta } = await alterUserState(scope);
      if (meta.status !== 200) return this.$message.error("状态设置失败");
      this.$message.success("状态设置成功");
    },
    // 搜索、监听输入框清空
    serachAndClear() {
      this.getUserListData();
    },
    // 监听添加用户弹框右上角关闭图标
    handleClose(done) {
      console.log(1111111111111);
    },
    // 添加、编辑用户
    submitAddUserForm() {
      this.$refs.addUserRef.validate(async valid => {
        if (valid) {
          // 添加用户操作
          if (!this.userId) {
            const { meta } = await addUser(this.addUserForm);
            if (meta.status !== 201) return this.$message.error(meta.msg);
            this.$message.success(meta.msg);
          } else {
            // 编辑用户操作
            const editorFormData = {
              id: this.userId,
              email: this.addUserForm.email,
              mobile: this.addUserForm.mobile
            };
            const { meta } = await editorUser(editorFormData);
            if (meta.status !== 200) return this.$message.error(meta.msg);
            this.$message.success(meta.msg);
            console.log(meta);
          }
          // 刷新用户列表
          this.getUserListData();
          this.resetAddUserForm();
        }
      });
    },
    // 重置添加用户表单
    resetAddUserForm() {
      this.$refs.addUserRef.resetFields();
      this.assUserVisible = false;
    },
    // 添加用户ui界面处理
    addUserBtn() {
      this.assUserVisible = true;
      this.elDialogTitle = "添加用户";
      this.addUserRules.username[0].required = true;
      this.addUserRules.password[0].required = true;
      this.isHidePassword = true;
      this.isDisabled = false;
      this.addUserForm.username = "";
      this.addUserForm.email = "";
      this.addUserForm.mobile = "";
    },
    // 编辑用户信息 有用户id处理页面ui
    editorUserInfo(row) {
      console.log(row);
      this.userId = row.id;
      if (!row.id) return;
      this.assUserVisible = true;
      this.elDialogTitle = "修改用户信息";
      this.addUserRules.username[0].required = false;
      this.addUserRules.password[0].required = false;
      this.isHidePassword = false;
      this.isDisabled = true;
      this.addUserForm.username = row.username;
      this.addUserForm.email = row.email;
      this.addUserForm.mobile = row.mobile;
    },
    // 删除单个用户
    async deleteUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { meta } = await deleteUser(id);
          if (meta.status == 200) {
            this.$message.success(meta.msg);
            // 刷新列表
            this.userInfoParams.pagenum = 1;
            this.getUserListData();
          } else {
            this.$message.error(meta.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style scoped lang="less">
.userSearch {
  margin-bottom: 20px;
}
.pagination {
  margin: 20px 0 0 0;
}
</style>