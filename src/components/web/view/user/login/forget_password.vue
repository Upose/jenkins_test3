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
            <el-input v-model="no" placeholder="学号/工号/读者号/一卡通" class="inp"></el-input>
            <el-input v-model="validateCode" placeholder="验证码" class="inp small"></el-input>
            <span class="verify-img">
              <img @click="getValidateCode" v-show="validatePic" :src="validatePic" title="点击刷新" alt="">
            </span>
            <button class="btn" @click="next">下 一 步</button>
          </div>
          <div v-show="step == 2">
            <el-input v-model="phone" placeholder="手机号" class="inp"></el-input>
            <div class="inp-box">
              <el-input v-model="verifyCode" placeholder="短信验证码" class="inp"></el-input>
              <span class="verification-code" @click="sendPhoneVerifyCode" v-if="!hasCode">获取验证码</span>
              <span class="verification-code color-grey" v-else>{{countDown}}秒后重新获取</span>
            </div>
            <button class="btn" @click="next">下 一 步</button>
          </div>
          <div v-show="step == 3">
            <el-input v-model="newPassword" placeholder="新密码" class="inp" show-password></el-input>
            <el-input v-model="repeatPassword" placeholder="重复新密码" class="inp" show-password></el-input>
            <button class="btn" @click="changePassword">确 定</button>
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
      no: '',
      validateKey: '',
      validateCode: '',
      validatePic: '',
      phone: '',
      verifyKey: '',
      verifyCode: '',
      step: 1,
      operateKey: '',
      newPassword: '',
      repeatPassword: '',
      countDown: 0,//倒计时
      hasCode: false,//是否发送验证码
    }
  },
  created() {
    this.getValidateCode();
  },
  methods: {
    next() {
      switch (this.step) {
        case 1:
          this.searchCardByNo();
          break;
        case 2:
          this.verifyPhoneCode();
          break;
      }
    },
    getValidateCode() {
      this.http
        .getJson("get-validate-code")
        .then(res => {
          this.validateKey = res.data.validateKey;
          this.validatePic = `data:image/png;base64,${res.data.imgFile}`;
        })
        .catch(err => {
          this.$message({ type: "error", message: "验证码获取失败!" });
        });
    },
    searchCardByNo() {
      if (!this.no) {
        this.$message({ type: "error", message: "请填写卡号!" });
        return;
      }
      if (!this.validateCode) {
        this.$message({ type: "error", message: "请输入验证码!" });
        return;
      }
      this.http
        .postJson("search-card-by-no", { No: this.no, validateKey: this.validateKey, validateCode: this.validateCode })
        .then(res => {
          this.operateKey = res.data;
          this.step = 2;
        })
        .catch(err => {
          this.$message({ type: "error", message: err.message });
        });
    },
    sendPhoneVerifyCode() {
      if (!this.phone) {
        this.$message({ type: "error", message: "请填写正确格式手机号!" });
        return;
      }

      this.http
        .postJson("send-phone-verify-code-forget", { phone: this.phone, operatekey: this.operateKey })
        .then(res => {
          var verifyKey = res.data;
          this.verifyKey = verifyKey;
          this.$message({ type: "success", message: "验证码已发送" });
          this.countDown = 60;
          this.hasCode = true;
          let fnCountDown = setInterval(() => {
            if (this.countDown > 1) {
              this.countDown -= 1;
            } else {
              this.hasCode = false;
              clearInterval(fnCountDown);
            }
          }, 1000);
        })
        .catch(err => {
          this.$message({ type: "error", message: err.errors });
        });
    },
    verifyPhoneCode() {
      if (!this.phone) {
        this.$message({ type: "error", message: "请填写正确格式手机号!" });
        return;
      }
      this.http
        .postJson("verify-phone-code", { phone: this.phone, operatekey: this.operateKey, verifykey: this.verifyKey, verifyCode: this.verifyCode })
        .then(res => {
          this.step = 3;
        })
        .catch(err => {
          this.$message({ type: "error", message: err.message });
        });
    },
    changePassword() {
      if (!this.newPassword || !this.repeatPassword) {
        this.$message({ type: "error", message: "请输入密码!" });
        return;
      }
      if (this.newPassword != this.repeatPassword) {
        this.$message({ type: "error", message: "输入的密码与重复密码不一致!" });
        return;
      }
      this.http
        .postJson("change-card-password", { operatekey: this.operateKey, password: this.newPassword })
        .then(res => {
          this.$message({ type: "success", message: "密码修改成功!" });
        })
        .catch(err => {
          this.$message({ type: "error", message: err.message });
        });
    },
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

    img {
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