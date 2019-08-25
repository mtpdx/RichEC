<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/github-logo.png" alt />
      </div>
      <el-form
        ref="login_form_ref"
        :model="login_form"
        :rules="login_rules"
        label-width="0px"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="login_form.username"
            placeholder="user name"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="login_form.password"
            placeholder="password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" v-on:click="login('login_form_ref')">Login</el-button>
          <el-button type="info" @click="reset('login_form_ref')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_form: {
        username: "sunyh",
        password: "123456" 
      },
      login_rules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],

        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    reset(formRef) {
      this.$refs[formRef].resetFields();
    },
    login(formRef) {
      this.$refs[formRef].validate(async valid => {
        if (valid) {
          //   alert("submit!");

          const { data: res, status } = await this.$axios.post(
            "user-login",
            this.login_form
          );
          if (status == 200 && res.state == 0) {
            this.$el_message.success("登录成功");
            window.sessionStorage.setItem('rich_token', res.token);
            this.$router.push('/home');
          } else {
            this.$el_message.error("登录失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #bbe6d6;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar-box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #ececec;
    padding: 10px;
    box-shadow: 0 0 5px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    //   background-color: #ececec;
    }
  }

  .login-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    .btns {
      display: flex;
      justify-content: center;
    }
  }
}
</style>