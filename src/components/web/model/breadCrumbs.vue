<template>
  <div>
    <div class="my-breadCrumbs main_text_color">
      <span class="el-icon-s-home bc-fs" @click="linkTo('index','/')"></span>
      <div v-for="(item,index) in blist" :key="index">
        <i>></i>
        <span @click="linkTo(item.code,item.url)">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['blist'],
  data() {
    return {

    };
  },
  created() {

  },
  mounted() { },
  methods: {
    linkTo(code, url) {
      if (url) {
        let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
        let info = urlInfo.find(item => item.code == code);
        window.location.href = info.path + url;
      }
    }
  },
};
</script>

<style scoped lang="less">
.my-breadCrumbs {
  width: 1200px;
  margin: 0 auto;
  position: absolute;
  div {
    display: inline-block;
  }
  span {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .bc-fs {
    font-size: 16px;
  }
}
</style>
