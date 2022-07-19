<!--
 * @Description: 
 * @Author: wanjikun
 * @Date: 2022-07-19 11:57:11
 * @LastEditTime: 2022-07-19 14:36:56
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
      let url = `${this.redirectUrl}/cas/bindQQ?service=${this.service}`
      console.log('url',url);
      QC.Login.showPopup({
        appId:this.appID,//102013783
        redirectURI:'https://sso.vipslib.com/cas/bindQQ?service=http://smart.vipslib.com/'
      });
      // setInterval(()=>{

      //   let a = QC.Login.check()
      //   console.log('aaaa',a);
      //   QC.Login.getMe((ele)=>{
      //     console.log('sssssdd发发发',ele);
      //   })
      // },1000)
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
