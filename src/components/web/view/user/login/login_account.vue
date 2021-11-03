<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box">
      <div class="content">
        <div class="login-box">
          <img src="../../../../../assets/web/img/login-left.png" alt="" class="login-left">

          <div class="login-right">
            <div v-show="type=='account'">
              <h1 class="title">密码登录</h1>
              <span class="register">注册账号</span>
              <el-input v-model="phone" placeholder="学号/工号/读者号/一卡通" class="inp"></el-input>
              <el-input v-model="phone" placeholder="密码" class="inp" show-password></el-input>
              <el-input v-model="phone" placeholder="验证码" class="inp small"></el-input>
              <span class="verify-img">
                <img src="../../../../../assets/web/img/upload/yzm.png" alt="">
              </span>
              <div class="pass">
                <el-checkbox v-model="code">记住密码</el-checkbox>
                <span class="forget">忘记密码</span>
              </div>
              <button class="btn">登 录</button>
            </div>
            <div v-show="type=='idcard'">
              <h1 class="title">身份证登录</h1>
              <span class="register">注册账号</span>
              <el-input v-model="phone" placeholder="身份证号" class="inp"></el-input>
              <el-input v-model="phone" placeholder="读者证密码" class="inp" show-password></el-input>
              <el-input v-model="phone" placeholder="验证码" class="inp small"></el-input>
              <span class="verify-img">
                <img src="../../../../../assets/web/img/upload/yzm.png" alt="">
              </span>
              <div class="pass">
                <el-checkbox v-model="code">记住密码</el-checkbox>
                <span class="forget">忘记密码</span>
              </div>
              <button class="btn">登 录</button>
            </div>
            <div v-show="type=='phone'">
              <h1 class="title">手机登录</h1>
              <span class="register">注册账号</span>
              <el-input v-model="phone" placeholder="手机号" class="inp"></el-input>
              <el-input v-model="phone" placeholder="验证码" class="inp small"></el-input>
              <span class="verify-img">
                <img src="../../../../../assets/web/img/upload/yzm.png" alt="">
              </span>
              <div class="inp-box">
                <el-input v-model="code" placeholder="短信验证码" class="inp"></el-input>
                <span class="verification-code">获取验证码</span>
              </div>
              <div class="pass">
                <el-checkbox v-model="code">记住密码</el-checkbox>
                <span class="forget">忘记密码</span>
              </div>
              <button class="btn">登 录</button>
            </div>
            <div v-show="type=='wex'">
              <h1 class="title">微信登录</h1>
              <div class="qr-code">
                <img src="../../../../../assets/web/img/upload/ewm.png" alt="">
              </div>
              <p class="wex-tip">请用微信扫描二维码登录 <span @click="type='account'"> 密码登录</span></p>
            </div>

            <div class="login-type">
              <span @click="type='phone'"><img src="../../../../../assets/web/img/icon_login_phone.png" alt=""></span>
              <span @click="type='qq'"><img src="../../../../../assets/web/img/icon_login_QQ.png" alt=""></span>
              <span @click="type='wex'"><img src="../../../../../assets/web/img/icon_login_wex.png" alt=""></span>
              <span @click="type='idcard'"><img src="../../../../../assets/web/img/icon_login_id.png" alt=""></span>
              <span @click="type='account'"><img src="../../../../../assets/web/img/icon_login_school.png" alt=""></span>
            </div>
            <p class="bottom-login" v-show="type=='phone'||type=='idcard'" @click="type='account'">密码登录</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer"></footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: '',
      code: '',
      type: 'wex'
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 96px;
  background: #a21e1e;
}
.footer {
  width: 100%;
  height: 100px;
  background: #cccccc;
}
.content-box {
  width: 100%;
  height: 740px;
  background: url("../../../../../assets/web/img/bg.png") no-repeat;

  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-top: 115px;
  }
}

.login-box {
  width: 880px;
  height: 540px;
  background: #ffffff;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  margin: 0 auto;
  overflow: hidden;

  .login-left {
    width: 360px;
    height: 100%;
  }

  .login-right {
    width: 510px;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    //   float: left;
    padding: 50px 40px;
    position: relative;

    .register {
      font-size: 18px;
      line-height: 25px;
      color: rgba(0, 0, 0, 0.45);
      position: absolute;
      top: 60px;
      right: 40px;
      cursor: pointer;
    }

    .title {
      font-size: 28px;
      text-align: center;
      margin-bottom: 40px;
    }
    .inp-box {
      position: relative;

      .verification-code {
        width: 138px;
        line-height: 24px;
        position: absolute;
        top: 12px;
        right: 1px;
        border-left: 1px solid #ddd;
        text-align: center;
        cursor: pointer;
        //   background: #fff;
      }
      /deep/ input {
        padding-right: 150px;
      }
    }
    .inp {
      margin-bottom: 24px;
      width: 100%;
      height: 48px;
      font-size: 18px;

      /deep/ input {
        height: 48px;
        background: #fafafa;
        border: 1px solid #dcdfe6;

        &:focus {
          border: 1px solid #dcdfe6;
          background: #fff;
        }
      }

      .document {
        width: 138px;
        /deep/ input {
          border: 1px solid #dcdfe6 !important;
          border-radius: 0;
        }
      }
    }
    .small {
      width: 272px;
    }
    .verify-img {
      width: 136px;
      height: 48px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.14);
      border-radius: 4px;
      // display: inline-block;
      // vertical-align: top;
      float: right;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .bottom-login {
      width: 80px;
      font-size: 15px;
      line-height: 21px;
      color: rgba(0, 0, 0, 0.45);
      margin: 14px auto 0;
      text-align: center;
      cursor: pointer;
    }
    .wex-tip {
      font-size: 15px;
      line-height: 21px;
      color: rgba(0, 0, 0, 0.45);
      // margin-top: 10px;
      margin-bottom: 24px;
      text-align: center;

      span {
        color: #458dda;
        cursor: pointer;
      }
    }
    .pass {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      .forget {
        color: #458dda;
        cursor: pointer;

        &:hover {
          opacity: 0.9;
        }
      }
    }
    .qr-code {
      width: 242px;
      height: 242px;
      margin: 0 auto 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background: #a21e1e;
      border-radius: 4px;
      border: none;
      color: #fff;
      font-size: 20px;
      margin-bottom: 24px;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }
    }
    .login-type {
      display: flex;
      justify-content: center;
      span {
        width: 32px;
        height: 32px;
        margin: 0 7px;
        cursor: pointer;

        &:hover {
          opacity: 0.9;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>