<template>
  <div>
    <div class="wx-mark" v-show="weshow">
      <el-dialog title="" :visible="true" :append-to-body="false" :modal="false" :modal-append-to-body="false" :destroy-on-close="true" @close="beforeClose" width="400px">
        <div id="login_container" class="ewm-code"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "code",
  components: {},
  data() {
    return {
      freshCode: '',
      wechatConfig: {},
      weshow: false,
    };
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    beforeClose() {
      this.weshow = false;
    },
    show() {
      this.weshow = true;
      this.freshCode = setInterval(this.getWxQrcode(), 3 * 60 * 1000);
    },
    init() {
      this.http.getJson('reader-wechat-login-config').then((res) => {
        this.wechatConfig = res.data;
        if (this.$route.query.bind == 'wx') {
          this.weshow = true;
          this.freshCode = setInterval(this.getWxQrcode(), 3 * 60 * 1000);
        }
      }).catch((err) => {
      });
    },
    getWxQrcode() {
      let obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        // appid: "wxbdc5610cc59c1631", // 测试
        appid: this.wechatConfig.appID,
        scope: this.wechatConfig.scope,
        // redirect_uri: encodeURIComponent('https://passport.yhd.com/legal/showNewContract.do'), // 测试回调地址
        redirect_uri: encodeURIComponent(this.wechatConfig.redirectUrl + '/cas/bindWeixin'),
        state: Math.random(),
        style: "black",
        href: "",
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.freshCode)
  }
};
</script>

<style scoped lang="less">
.wx-mark {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  background: rgba(0, 0, 0, 0.4);
}
/deep/ .el-dialog__body {
  text-align: center;
}
/deep/ .el-dialog__header {
  border-bottom: none;
}
</style>
