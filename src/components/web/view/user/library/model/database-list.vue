<!--
 * @Author: huyu
 * @Date: 2022-06-02 17:08:07
 * @LastEditors: huyu
 * @LastEditTime: 2022-06-02 18:10:28
 * @Description: 
-->
<template>
  <div class="database-box">
    <div class="app-title-box">
      <span class="left">我的数据库</span>
      <i class="app-title-tag"></i>
      <!-- <span class="right" @click="linkTo(appData.appCenterRouteCode)">应用中心<i class="el-icon-arrow-right"></i></span> -->
    </div>
    <div class="app-content">
      <div class="item-box">
        <template v-for="(item) in list">
          <div class="app-item" :key="item.id" @click="openurlDetails(item.directUrls[0].url,item.id)">
            <img src="../../../../../../assets/web/img/personal/icon-database.png" alt="">
            {{item.title}}
          </div>
        </template>
      </div>
      <span class="right-arr" @click="linkTo(databaseMoreUrl)">
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
      list: [],
      databaseMoreUrl: ''
    };
  },
  created() {
    this.getMyApp()
  },
  mounted() { },
  methods: {
    // 获取我的应用
    getMyApp() {
      this.http.getJsonSelf('my-favorite-databases', '/6').then((res) => {
        this.list = res.data.databases;
        this.databaseMoreUrl = res.data.moreUrl;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取我的数据库失败!" });
      });
    },
    //查看详情，到详情页面
    openurlDetails(url, id) {
      this.http.getJson('visit-databases', {
        databaseid: id
      }).then((res) => {
      })
      if(this.isThirdpartyApp(true,url)){
        location.href = url;
      }else{
        window.open(url);
      }
    },
    linkTo(url) {
      if(this.isThirdpartyApp(true,url)){
        location.href = url;
      }else{
        window.open(url);
      }
    },
  },
};
</script>

<style scoped lang="less">
.database-box {
  position: absolute;
  top: 295px;
  right: 338px;
  overflow: hidden;
  width: 545px;
  height: 140px;
  background: #ffffff;
  opacity: 1;
  border-radius: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  .app-title-box {
    width: 45px;
    height: 120px;
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
  margin-top: 10px;

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
    display: flex;
    flex-wrap: wrap;
    .app-item {
      width: 198px;
      height: 30px;
      background: #ffffff;
      border: 1px solid #e4e6fc;
      opacity: 1;
      border-radius: 2px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 10px 0 10px;
      margin: 0 10px 10px 0;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .right-arr {
    display: inline-block;
    position: absolute;
    top: 40px;
    right: 20px;
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
