<template>
  <div id="user_sys" class="admin-warp-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'user_sys',
  mounted(){
    this.$store.commit('getSession');
    this.$i18n.locale = this.$store.state.language;
    this.skin_template = this.$store.state.skin_template;
  },
  data(){
    return {
      
    }
  },
  methods:{
  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";
</style>
