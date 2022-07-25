<!--
 * @Description: 
 * @Author: wanjikun
 * @Date: 2022-07-19 11:57:11
 * @LastEditTime: 2022-07-25 17:07:05
 * @LastEditors: huyu
-->
<template>
  <div>
    <span class="use" id="qqLoginBtn" @click="qqloginBtnClick">立即设置</span>
  </div>
</template>

<script>
export default {
  name: "code",
  components: {},
  data() {
    return {
      redirectUrl: '',
      service: ''
    };
  },
  created() {
  },
  mounted() {
    this.init()


    // var js_element=document.createElement("script");
    // js_element.setAttribute("type","text/javascript");
    // js_element.setAttribute("data-callback",'true');
    // js_element.setAttribute("data-appid",'102013783');
    // js_element.setAttribute("data-redirecturi",'https://sso.vipslib.com/cas/login?service=http://smart.vipslib.com/');
    // js_element.setAttribute("src",'https://connect.qq.com/qc_jssdk.js');
    // document.getElementsByTagName("body")[0].appendChild(js_element);
    // console.log('hhhh ');
    //   this.$nextTick(()=>{
    //     setTimeout(()=>{
    //       QC.Login({
    //           btnId:"qqLoginBtn",	//插入按钮的节点id
    //           //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
    //           // size: "A_XL"
    //       });
    //     },1000)
    //     })
  },
  methods: {
    qqloginBtnClick() {
      let orgInfo = JSON.parse(localStorage.getItem('orgInfo')) || {};
      let redirectUrl = `${this.redirectUrl}/cas/bindQQ?orgcode=${orgInfo.orgCode}&service=${this.service}`
      // console.log('url',url);
      // QC.Login.showPopup({
      //   appId:this.appID,//102013783
      //   redirectURI:url
      // });

      let url = `https://graph.qq.com/oauth2.0/authorize?client_id=${this.appID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&state=6d9ace8093de42b9a23d80e967e0dfb5`
      console.log('urlhh哈哈', url);
      location.href = url;
      // window.open(url);
    },
    init() {
      this.http.getJson('reader-qq-login-config').then((res) => {
        this.redirectUrl = res.data.redirectUrl;
        this.service = res.data.service;
        this.appID = res.data.appID;
        if (this.$route.query.bind && this.$route.query.bind == 'qq') {
          this.handleByBind();
        }
      }).catch((err) => {
      });
    },
    // 个人中心绑定QQ进入
    handleByBind() {
      let url = window.location.href;
      url = this.changeURLArg(url, 'bind', 'qqback');
      window.history.pushState({}, 0, url);
      this.qqloginBtnClick();
    },
    /* 
    * 修改当前url参数值
    * url 目标url 
    * arg 需要替换的参数名称 
    * arg_val 替换后的参数的值 
    * return url 参数替换后的url 
    */
    changeURLArg(url, arg, arg_val) {
      var pattern = arg + '=([^&]*)';
      var replaceText = arg + '=' + arg_val;
      if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
      } else {
        if (url.match('[\?]')) {
          return url + '&' + replaceText;
        } else {
          return url + '?' + replaceText;
        }
      }
      return url + '\n' + arg + '\n' + arg_val;
    },
  },
  beforeDestroy() {
    clearInterval(this.freshCode)
  }
};
</script>

<style scoped lang="less">
.use {
  color: #458dda;
  cursor: pointer;
}
</style>
