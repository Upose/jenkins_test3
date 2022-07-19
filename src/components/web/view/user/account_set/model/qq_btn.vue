<!--
 * @Description: 
 * @Author: wanjikun
 * @Date: 2022-07-19 11:57:11
 * @LastEditTime: 2022-07-19 19:38:36
 * @LastEditors: wanjikun
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
      redirectUrl:'',
      service:''
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
    qqloginBtnClick(){
      let orgInfo = JSON.parse(localStorage.getItem('orgInfo')) || {};
      let redirectUrl = `${this.redirectUrl}/cas/bindQQ?orgcode=${orgInfo.orgCode}&service=${this.service}`
      // console.log('url',url);
      // QC.Login.showPopup({
      //   appId:this.appID,//102013783
      //   redirectURI:url
      // });
      
      let url = `https://graph.qq.com/oauth2.0/authorize?client_id=${this.appID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&state=6d9ace8093de42b9a23d80e967e0dfb5`
      console.log('urlhh哈哈',url);
      location.href = url;
      // window.open(url);
    },
    init() {
      this.http.getJson('reader-qq-login-config').then((res) => {
        this.redirectUrl = res.data.redirectUrl;
        this.service = res.data.service;
        this.appID = res.data.appID;
        
      }).catch((err) => {
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.freshCode)
  }
};
</script>

<style scoped lang="less">
.use{
  color: #458dda;
  cursor: pointer;
}
</style>
