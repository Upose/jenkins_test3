<!--
 * @Author: huyu
 * @Date: 2022-08-23 16:44:33
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-29 11:47:19
 * @Description: 顶部标题
-->
<template>
  <!-- <div class="top-navi-brd-box" :style="{'background-image':'url('+fileUrl+topParms.bgUrl+')'}"> -->
  <div class="top-navi-brd-box">
    <div class="top-navi-brd-cont">
      <!-- 面包屑 -->
      <div class="top-brd-box">
        <span class="icon-home brd-hover" @click="linkTo('index','/index')"></span>
        <span v-for="(item,index) in bList" :key="index">
          <span class="brd-mlr">></span>
          <span class="brd-hover">{{item.name}}</span>
        </span>
      </div>
      <!-- 导航 -->
      <div class="top-navi-box">
        <div class="navi-logo-box">
          <img class="navi-logo" :src="fileUrl+topParms.logoUrl" alt="">
        </div>
        <div class="navi-title-box">
          <!-- <span class="navi-title-big">课程文献中心</span> -->
          <span class="navi-title-big">账号</span>
          <span class="navi-title-small">激活</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['topParms', 'bList'],
  data() {
    return {
      fileUrl: localStorage.getItem('fileUrl'),
    };
  },
  created() {
  },
  mounted() { },
  methods: {
    // 内部跳转
    handleTo(router) {
      this.$router.push(router)
    },
    // 应用间跳转
    linkTo: function linkTo(code, url) {
      if (url) {
        var urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
        var info = urlInfo.find(function (item) {
          return item.code == code;
        });

        if (code == 'index') {
          window.location.href = info.path + url + '?page=1';
        } else {
          window.location.href = info.path + url;
        }
      }
    }
  },
};
</script>

<style scoped lang="less">
.top-navi-brd-box {
  width: 100%;
  height: 130px;
  background-repeat: no-repeat !important;
  background-position: center !important;
  background: url("../../../../../assets/web/img/bg-top.png");
  background-size: 100% 100%;
}
.top-navi-brd-cont {
  width: 1200px;
  margin: 0 auto;
}
.top-brd-box {
  width: 1160px;
  display: flex;
  align-items: center;
  padding-top: 14px;
  font-size: 12px;
  margin-left: 34px;
  .icon-home {
    width: 13px;
    height: 12px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAp0lEQVQoU73S0Q2CQAwG4P9nARmlKQMYR3ADNhE3cQNHUBcgHYERmOBqjgjBS1We7GN73+XaHhGEiEhVVdeU0tHMrDzCMvECN5K1u48ppUMJ39AazJdFcEER+AQn9A1EkFtACdk0zQhgF00xyuUeqaotgJbk/hd09weAy9STqnYkTxvQue/7LkTuPhVV9b5+wZz/MxKROq9r1dNgZkNeB4BcmyP/qPEJW/+OSWl9Qg0AAAAASUVORK5CYII=")
      no-repeat;
  }
  .brd-mlr {
    margin: 0 5px;
  }
  .brd-hover {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
.top-navi-box {
  width: 100%;
  height: 76px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background: url("data:image/png;base64,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");

  .navi-logo {
    width: 33px;
    height: 33px;
  }
  .navi-title-box {
    margin-left: 10px;
    position: relative;
    .navi-title-big {
      font-size: 30px;
      font-weight: 490;
    }
    .navi-title-small {
      font-size: 24px;
    }
  }
  .navi-tab-box {
    margin-left: 30px;
    .tab-item {
      padding: 3px 12px;
      line-height: 20px;
      background: #fff;
      border-radius: 40px;
      margin-right: 10px;
      color: #000;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      &.tab-active {
        color: #fff;
      }
    }
  }
}
</style>
