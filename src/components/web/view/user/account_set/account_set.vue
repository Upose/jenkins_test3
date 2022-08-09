<template>
  <div class="container">
    <!-- <header class="header"></header> -->
    <div class="content-box">
      <breadCrumbs :blist="[{name:'账号设置'}]"></breadCrumbs>
      <div class="content">
        <div class="info-box">
          <div class="title">账号设置</div>
          <div class="nav-box">
            <span class="nav-item" :class="tab=='info'?'active tborder-c1':''" @click="tab='info'">基本信息</span>
            <span class="nav-item" :class="tab=='set'?'active tborder-c1':''" @click="tab='set'">安全设置</span>
            <span class="nav-item" :class="tab=='card'?'active tborder-c1':''" @click="tab='card'">我的读者证</span>
          </div>
          <div v-show="tab=='info'">
            <info></info>
          </div>
          <div v-show="tab=='set'">
            <set :tabShow="tab"></set>
          </div>
          <div v-show="tab=='card'">
            <card></card>
          </div>
        </div>
      </div>
      <!-- <footer class="footer"></footer> -->
    </div>
  </div>
</template>
<script>
import info from './model/info';
import set from './model/set';
import card from './model/card';
import breadCrumbs from '../../../model/breadCrumbs';
export default {
  components: { info, set, card, breadCrumbs },
  data() {
    return {
      tab: 'info'
    }
  },
  watch: {
    '$route.query.tab'(nval, oval) {
      this.changeTab();
    }
  },
  created() {
    // 设置网页标题
    document.title = '账号设置-' + this.$store.getters.appInfo.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
    this.changeTab();
  },
  methods: {
    changeTab() {
      const tabOption = {
        1: 'info',
        2: 'set',
        3: 'card'
      }
      this.tab = this.$route.query.tab ? tabOption[this.$route.query.tab] : 'info';
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../../../../../assets/web/css/user.less");
.header {
  width: 100%;
  height: 96px;
  background: #a21e1e;
}
.footer {
  width: 100%;
  height: 100px;
  background: #cccccc;
}
.content-box {
  width: 100%;
  background: #eeeeee;
  padding-top: 20px;

  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 20px 0 20px;
  }
}
.breadCrumbs {
  padding: 20px 0;
}
.info-box {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  min-height: 700px;

  .title {
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #ddd;
    font-size: 20px;
    font-weight: bold;
    line-height: 64px;
    padding-left: 20px;
  }

  .nav-box {
    padding: 20px;
    .nav-item {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      font-size: 18px;
      cursor: pointer;
    }
    .active {
      border-bottom: 2px solid;
      font-weight: bold;
    }
  }
}
</style>