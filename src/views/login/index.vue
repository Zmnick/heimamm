<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/layout_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line">|</span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :span="20">
            <el-col :span="16">
              <el-input v-model="loginForm.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeURL" @click="getCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="loginForm.isCheck"></el-checkbox>我已同意并阅读
          <el-link type="primary" href="https://1900.ml/user">用户协议</el-link>和
          <el-link type="primary" href="https://1900.ml/user">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="loginClick">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="register" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
    <!-- 注册子组件 -->
    <register ref="registerRef"></register>
  </div>
</template>

<script>
// 导入Token
import { setToken } from "@/utils/token.js";

//导入子组件
import register from "./tegister";

export default {
  name: "Login",
  // 在components中注册子组件
  components: {
    register
  },
  data() {
    return {
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 绑定需要输入的手机号和密码
      loginForm: {
        phone: "18511111111", //手机号
        password: "12345678", //密码
        code: "", //验证码
        isCheck: true //单选框
      },
      rules: {
        //校验规则
        phone: [
          // //可以写多个校验规则，数组形式
          // { required: true, message: "请输入手机号", trigger: "blur" },
          // { min: 11, max: 11, message: "必须是正确的手机号码", trigger: "blur" }
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机好不能为空"));
              }
              const reg = /^1[13456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("请输入正确的手机号码"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "密码长度6到20个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码错误", trigger: "blur" }
        ],
        //单选框
        isCheck: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("必须勾选用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //点击刷新验证码
    getCode() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=login&t=" +
        (new Date() - 0);
    },
    //登录
    loginClick() {
      // 发请求给后台进行登录 async和await写法
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;

        const res = await this.$axios.post("/login", this.loginForm);

        if (res.data.code === 200) {
          this.$message({
            message: "登录成功",
            type: "success"
          });

          //保存token
          setToken(res.data.data.token);

          // 跳转到后台管理页面
          this.$router.push("/layout");
        } else {
          this.$message.error(res.data.message);
          //输入错误自动刷新验证码
          this.codeURL =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&t=" +
            (new Date() - 0);
        }

        //发请求给后台进行登录  回调地狱的写法
        // this.$axios.post('/login', this.loginForm).then(res => {
        //   if (res.data.code === 200) {
        //     this.$message({
        //       message: "登录成功",
        //       type: "success"
        //     });
        //   } else {
        //     this.$message.error(res.data.message);
        //     //输入错误自动刷新验证码
        //     this.codeURL=process.env.VUE_APP_BASEURL +
        //       "/captcha?type=login&t=" +
        //       (new Date() - 0);
        //   }
        // });
      });
    },
    //注册
    register() {
      this.$refs.registerRef.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        font-size: 24px;
        margin-right: 14px;
        color: #8a8a8a;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>