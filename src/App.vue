<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    if(document.body.clientWidth < 1400){
      this.$root.collapse = true;
    }
  },
}
</script>

<style lang="less">
@import "./assets/font/iconfont.css";/**通用文件 */
@import "./assets/css/style.less";/**通用文件 */
@import "./assets/css/color.less";/**颜色配置 */
</style>
