<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box">
      <div class="content">
        <div class="register-box">
          <h1 class="title">注册账号</h1>
          <el-input placeholder="请输入内容" v-model="phone" class="inp">
            <el-select v-model="document" slot="append" class="document">
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
            </el-select>
          </el-input>
          <el-input v-model="phone" placeholder="所在单位" class="inp"></el-input>
          <el-input v-model="phone" placeholder="常用邮箱" class="inp"></el-input>

          <p class="tip">注册即表示您同意用户协议</p>
          <button class="btn">注 册</button>
          <p class="login">已有账号？<span href="">去登录</span></p>
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
      //   info:['身份证','护照']
      document: '身份证'
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
  .tip {
    font-size: 15px;
    line-height: 21px;
    color: rgba(0, 0, 0, 0.45);
    // margin-top: 10px;
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