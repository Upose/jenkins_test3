<template>
  <div class="container">
    <!-- <header class="header"></header> -->
    <div class="content-box">
      <div class="content">
        <div class="breadCrumbs"><i class="el-icon-s-home"></i>>账号设置</div>
        <div class="info-box">
          <div class="title">账号设置</div>
          <div class="nav-box">
            <span class="nav-item" :class="tab=='info'?'active child_border_color':''" @click="tab='info'">基本信息</span>
            <span class="nav-item" :class="tab=='set'?'active child_border_color':''" @click="tab='set'">安全设置</span>
            <span class="nav-item" :class="tab=='card'?'active child_border_color':''" @click="tab='card'">我的读者证</span>
          </div>
          <div v-show="tab=='info'">
            <info></info>
          </div>
          <div v-show="tab=='set'">
            <set></set>
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
import info from './model/info'
import set from './model/set'
import card from './model/card'
export default {
  components: { info, set, card },
  data() {
    return {
      tab: 'info'
    }
  },
  created() {
    // 设置网页标题
    document.title = '账号设置-用户中心-' + JSON.parse(localStorage.getItem('orgInfo')).orgName + '图书馆';

  },
  methods: {

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

  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
}
.breadCrumbs {
  padding: 20px 0;
}
.info-box {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;

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