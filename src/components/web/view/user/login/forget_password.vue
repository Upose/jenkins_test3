<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box">
      <div class="content">
        <div class="register-box">
          <h1 class="title">忘记密码</h1>
          <el-steps :active="step-1" finish-status="success" class="step-box">
            <el-step title="输入账号"></el-step>
            <el-step title="发送验证码"></el-step>
            <el-step title="重置密码"></el-step>
          </el-steps>
          <div v-show="step == 1">
            <el-input v-model="phone" placeholder="学号/工号/读者号/一卡通" class="inp"></el-input>
            <el-input v-model="phone" placeholder="验证码" class="inp small"></el-input>
            <span class="verify-img">
              <!-- <el-image style="width: 100px; height: 100px" src="../../../../../assets/web/img/upload/yzm.png" :fit="fit"></el-image> -->
              <img src="../../../../../assets/web/img/upload/yzm.png" alt="">
            </span>
            <button class="btn" @click="step = 2">下 一 步</button>
          </div>
          <div v-show="step == 2">
            <el-input v-model="phone" placeholder="手机号" class="inp"></el-input>
            <div class="inp-box">
              <el-input v-model="code" placeholder="短信验证码" class="inp"></el-input>
              <span class="verification-code">获取验证码</span>
            </div>
            <button class="btn" @click="step = 3">下 一 步</button>
          </div>
          <div v-show="step == 3">
            <el-input v-model="phone" placeholder="新密码" class="inp" show-password></el-input>
            <el-input v-model="phone" placeholder="重复新密码" class="inp" show-password></el-input>
            <button class="btn">确 定</button>
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
      step: 1,
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
.register-box {
  width: 520px;
  height: 510px;
  background: #ffffff;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  margin: 0 auto;
  padding: 50px;

  .title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 40px;
  }
  .step-box {
    /deep/ .el-step__head {
      left: 18px;
    }
    /deep/ .el-step__head.is-success {
      color: #4fcd92;
      border-color: #4fcd92;
    }
    /deep/ .el-step__title.is-success {
      color: #4fcd92;
    }
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
    // border: 1px solid rgba(0, 0, 0, 0.14901960784313725);
    // border-radius: 4px;
    // padding: 0 20px;
    font-size: 18px;
    /deep/ input {
      height: 48px;
      background: #fafafa;

      &:focus {
        border: 1px solid #dcdfe6;
        background: #fff;
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

    img{
        width: 100%;
        height: 100%;
    }
  }
  .tip {
    font-size: 15px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 60px;
    margin-bottom: 24px;
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
    margin-top: 40px;
    margin-bottom: 24px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
  .login {
    font-size: 15px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;

    span {
      color: #458dda;
      cursor: pointer;
    }
  }
}
</style>