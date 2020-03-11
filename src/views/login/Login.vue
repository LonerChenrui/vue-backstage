<template>
  <div id="login">
    <div class="go-login-but" @click="isShow = !isShow">
      <el-row>
        <el-button size="small">go Login</el-button>
      </el-row>
    </div>
    <transition 
      enter-active-class="animated  zoomInLeft" 
      leave-active-class="animated zoomOut"
    >
      <div class="login-box" v-show="isShow">
        <el-form :model="loginForm" :rules="loginFromRules" ref="loginForm" status-icon>
          <el-form-item prop="username">
            <el-input 
              v-model="loginForm.username" 
              prefix-icon="el-icon-user-solid"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              prefix-icon="el-icon-lock"
              v-model="loginForm.password" 
              show-password
            >
            </el-input>
          </el-form-item>
          <el-form-item class="itme-margin">
            <el-button size="mini" type="primary" @click="login">Login</el-button>
            <el-button size="mini" @click="resetFields">重置</el-button>
          </el-form-item>
        </el-form>  
      </div>
    </transition>
  </div>
</template>

<script>
import HttpRequest from '@/network/request'
import { login } from '@/network/login'
export default {
  name: "login",
  data() {
    return {
      // 登录表单数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 登录表单验证规则对象
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      },
      isShow: true
    }
  },
  components:{ },
  props:{ },
  methods: {
    // 登录
    login() {
      this.$refs.loginForm.validate((valid) => {
        // 校验成功
        if(valid) {
          login(this.loginForm).then(res => {
            // 登录成功
            if(res.meta.status == 200) {
              // 存储token
              sessionStorage.setItem('token',res.data.token);
              // 跳转首页
              this.$router.push('/home')

              this.$message({
                message: res.meta.msg,
                type: 'success',
                duration: 2000
              });
            }else {
              this.$message({
                message: res.meta.msg,
                type: 'warning',
                duration: 2000
              });
            }
          }).catch(error => {

          })
        }else {
          this.$message({
            message: '请填写正确的用户名和密码',
            type: 'warning',
            duration: 2000
          }); 
        }
      })
    },
    // 重置操作
    resetFields() {
      this.$refs.loginForm.resetFields();
      this.$message({
        message: '重置成功',
        type: 'success'
      });
    }
  }
}
</script>
<style scoped lang="less">
#login {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login/login.png") no-repeat center;
  background-size: contain;
  position: relative;
  .go-login-but {
    position: absolute;
    top: 3%;
    right: 3%;
  }
  .login-box {
    padding: 30px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color:rgba(0,0,0,0.2);
    border-radius: 10px;
     min-width: 380px;
    .itme-margin {
      margin-bottom: 0;
      text-align: right;
    }
  }
  ::v-deep .el-form-item__error {
    color: red;
  }
}  
</style>