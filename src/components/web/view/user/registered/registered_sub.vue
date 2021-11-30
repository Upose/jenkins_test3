<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box">
      <div class="content">
        <div class="register-box">
          <p class="success-tip">
            <i class="el-icon-success"></i>
            <span>提交成功，等待馆员审核</span>
          </p>
          <p class="result-tip">审核结果将通过邮件告知，请耐心等待...</p>
          <button class=" main_bg">关 闭</button>
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
    margin: 70px auto 12px;
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
  .result-tip {
    font-size: 15px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
    margin-bottom: 126px;
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