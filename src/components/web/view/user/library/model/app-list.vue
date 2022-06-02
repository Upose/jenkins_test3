<!--
 * @Author: huyu
 * @Date: 2022-06-02 17:08:07
 * @LastEditors: huyu
 * @LastEditTime: 2022-06-02 17:38:19
 * @Description: 
-->
<template>
  <div class="apply">
    <div class="app-title-box">
      <span class="left">我的应用</span>
      <i class="app-title-tag"></i>
      <!-- <span class="right" @click="linkTo(appData.appCenterRouteCode)">应用中心<i class="el-icon-arrow-right"></i></span> -->
    </div>
    <div class="app-content">
      <div class="item-box">
        <template v-for="(item,index) in appData.appList">
          <div class="app-item" :key="item.appId" v-if="index<6" @click="linkTo(item.frontUrl)">
            <div class="app">
              <img :src="imgUrl+item.appIcon" alt="">
            </div>
            <p class="title-name">{{item.appName}}</p>
          </div>
        </template>
      </div>
      <span class="right-arr" @click="linkTo(appData.myAppRouteCode)">
        <span>更多</span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      imgUrl: localStorage.getItem('fileUrl'),//图片域名
      appData: []
    };
  },
  created() {
    this.getMyApp()
  },
  mounted() { },
  methods: {
    // 获取我的应用
    getMyApp() {
      this.http.getJson('forward-getmycollectionapps').then((res) => {
        this.appData = res.data;
        console.log(this.appData)
      }).catch((err) => {
        this.$message({ type: "error", message: "获取应用信息失败!" });
      });
    },
    linkTo(url, code) {
      if (code) {
        let info = JSON.parse(localStorage.getItem('urlInfo')).find(item => item.code == code)
        window.open(info.path + url);
      } else {
        window.open(url);
      }
    }
  },
};
</script>

<style scoped lang="less">
.apply {
  position: absolute;
  top: 145px;
  right: 20px;
  overflow: hidden;
  width: 865px;
  height: 130px;
  background: #ffffff;
  opacity: 1;
  border-radius: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  .app-title-box {
    width: 45px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid #eee;
    background: #fff;

    .left {
      font-size: 16px;
      font-weight: bold;
      padding-right: 30px;
    }
    .app-title-tag {
      background: url("../../../../../../assets/web/img/personal/icon-right.png")
        no-repeat;
      position: absolute;
      top: 60px;
      left: 50px;
      width: 6px;
      height: 8px;
    }
    .right {
      font-size: 16px;
      color: #666;
      cursor: pointer;

      .font-w {
        font-weight: 600;
      }
    }
  }
}
.chance {
  // height: 200px;
  background: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  // padding: 25px;
  overflow: hidden;
  margin-top: 44px;
  .chance-app {
    padding: 24px 20px 40px;

    span {
      padding: 10px 16px;
      border-radius: 5px;
      border: 1px solid #ddd;
      margin: 0 20px 20px 0;
      cursor: pointer;
      color: #666;
      display: inline-block;
    }
    .app-select {
      border-color: #458dda;
      color: #458dda;
      position: relative;
      background: url("../../../../../../assets/web/img/active-bottom.png")
        no-repeat right bottom;

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        color: #458dda;
        // background: #458DDA;
        width: 12px;
        height: 10px;
        border-radius: 3px;
      }
    }
  }
}

.app-content {
  height: 140px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .re-box {
    margin-right: 74px;
  }

  .app-box {
    width: 70px;
    height: 70px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    // padding: 9px 0 0 9px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: space-evenly;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }

    .app {
      width: 24px;
      height: 24px;
      border-radius: 8px;
      background: #e3f2ff;
      display: inline-block;
      img {
        width: 50%;
        height: 50%;
        margin: 25% 0 0 25%;
      }
    }
  }
  .title-name {
    margin-top: 8px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-box {
    width: 930px;
    display: flex;

    .app-item {
      width: 100px;
      height: 90px;
      border: 1px solid #f0f1fd;
      border-radius: 6px;
      margin-right: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      }
      .app {
        width: 38px;
        height: 38px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .right-arr {
    display: inline-block;
    position: absolute;
    top: 36px;
    right: 36px;
    width: 20px;
    cursor: pointer;
    color: #666;
    text-align: center;
    p {
      font-size: 14px;
    }
    i {
      width: 15px;
      height: 15px;
      background: #f6f6f6;
      border-radius: 50%;
      text-align: center;
      line-height: 15px;
      color: #999999;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
