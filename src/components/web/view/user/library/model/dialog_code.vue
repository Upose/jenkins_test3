<template>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="400px">
    <div id="login_container" class="ewm-code"></div>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
export default {
  name: "code",
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
  methods: {
    show() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.get_wx_qrcode();
      })
    },
    get_wx_qrcode() {
      let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
      let info = urlInfo.find(item => item.code == 'usermanage');
      let redUrl = info.path + '/usermanage/#/web_library'; // 回调地址
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wxbdc5610cc59c1631", // 暂未申请好
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent('https://passport.yhd.com/legal/showNewContract.do'), // 测试回调地址
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
