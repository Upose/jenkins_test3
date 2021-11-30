<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box">
      <div class="content">
        <div class="register-box">
          <p class="success-tip">
            <i class="el-icon-success"></i>
            <span>注册成功</span>
          </p>
          <button class="btn main_bg" @click="$router.push('/loginAccount')">马 上 登 录</button>
          <p class="login-tip">（{{countDown}}s后回到登录页）</p>
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
      countDown: 3
    }
  },
  created() {
    this.countDownTo();
  },
  methods: {
    countDownTo() {
      let fnCountDown = setInterval(() => {
        if (this.countDown > 1) {
          this.countDown -= 1;
        } else {
          clearInterval(fnCountDown);
          this.$router.push('/loginAccount')
        }
      }, 1000);
    }
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
    padding-top: 174px;
  }
}
.register-box {
  width: 500px;
  height: 400px;
  background: #ffffff;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  margin: 0 auto;
  padding: 50px;

  .success-tip {
    text-align: center;
    margin: 70px auto 110px;
    i {
      font-size: 32px;
      color: #4fcd92;
      margin-right: 16px;
      vertical-align: sub;
    }
    span {
      font-size: 24px;
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
  .login-tip {
    font-size: 18px;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
  }
}
</style>