<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="400px">
    <div id="login_container" class="ewm-code"></div>
  </el-dialog>
</template>

<script>
export default {
  name: "code",
  props: {
    wechatConfig: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {
  },
  mounted() {
  },
  watch: {
    wechatConfig(nval, oval) {
      this.wechatConfig = nval;
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.get_wx_qrcode();
      })
    },
    get_wx_qrcode() {
      // let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
      // let info = urlInfo.find(item => item.code == 'usermanage');
      // let redUrl = info.path + '/usermanage/#/web_library'; // 回调地址
      // console.log(redUrl)
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        // appid: "wxbdc5610cc59c1631", // 测试
        appid: this.wechatConfig.appID,
        scope: this.wechatConfig.scope,
        // redirect_uri: encodeURIComponent('https://passport.yhd.com/legal/showNewContract.do'), // 测试回调地址
        redirect_uri: encodeURIComponent(this.wechatConfig.redirectUrl),
        state: Math.random(),
        style: "black",
        href: "",
      });
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-dialog__body{
  text-align: center;
}
</style>
