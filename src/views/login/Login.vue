<template>
  <div id="login">
    <div class="go-login-but">
      <el-row>
        <el-button size="small">Sign in</el-button>
      </el-row>
    </div>
    <div class="login-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input 
            v-model="ruleForm.userName" 
            prefix-icon="el-icon-user-solid"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input 
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password" 
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item class="itme-margin">
          <el-button size="mini" type="primary">Login</el-button>
          <el-button size="mini">重置</el-button>
        </el-form-item>
      </el-form>  
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      ruleForm: {
        userName: 'admin',
        password: '123456'
      },
      rules: {

      }
    }
  },
  components:{ },
  props:{ },
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
    background-color:rgba(0,0,0,0.3);
    // opacity: 0.7;
    border-radius: 10px;
     min-width: 380px;
    .itme-margin {
      margin-bottom: 0;
      text-align: right;
    }
  }
}  


</style>