<template>
  <div class="web-warp" :class="skin_template">
    <div :class="headerTemplateCode">
      <div id="zt_header_sys"></div>
    </div>
    <div class="content-warp">
      <router-view></router-view>
    </div>
    <div :class="footerTemplateCode">
      <div id="zt_footer_sys"></div>
    </div>
    <!-- <div class="template-warp">
      <span @click="skinClick('template1')">红</span>
      <span @click="skinClick('template2')">蓝</span>
      <span @click="skinClick('template3')">绿</span>
      <span @click="skinClick('template4')">紫</span>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      skin_template: (JSON.parse(localStorage.getItem('headerFooterInfo'))).themeColor || 'template1',
      headerTemplateCode:'',
      footerTemplateCode:''
    }
  },
  created() { },
  mounted() {
    this.getHeadFoot();
  },
  methods: {
    getHeadFoot() {
      let headerFooterInfo = JSON.parse(localStorage.getItem('headerFooterInfo'));
      this.headerTemplateCode = headerFooterInfo.headerTemplateCode;
      this.footerTemplateCode = headerFooterInfo.footerTemplateCode;

      this.addTemp(headerFooterInfo.headerRouter);
      this.addTemp(headerFooterInfo.footerRouter);
    },
    addTemp(url) {
      this.addStyle(url + '/component.css');
      this.addScript(url + '/component.js');
    },
    addStyle(url) {
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    addScript(url) {
      var js_element = document.createElement("script");
      js_element.setAttribute("type", "text/javascript");
      js_element.setAttribute("src", url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
    skinClick(val) {
      // this.$refs.skin_template.add(val);
      this.skin_template = val;
      this.$store.state.skin_template = this.skin_template;
      this.$store.commit('setSkinTemplate', { skin_template: this.skin_template });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  }
}
</script>
<style scoped lang="less">
.web-warp {
  min-width: 1200px;
  width: 100%;
  height: 100%;
  position: relative;
}
.template-warp {
  position: fixed;
  top: 10px;
  right: 0;
  span {
    cursor: pointer;
    padding: 1px 2px;
    border-radius: 4px;
    background-color: #eee;
    border: 1px solid #eee;
  }
}
</style>


