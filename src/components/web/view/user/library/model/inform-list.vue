<!--
 * @Author: huyu
 * @Date: 2022-06-02 17:08:07
 * @LastEditors: huyu
 * @LastEditTime: 2022-10-21 13:52:48
 * @Description: 
-->
<template>
  <div class="apply">
    <div class="title-box1">
      <span class="left">新闻公告</span>
      <!-- <span class="right" @click="linkTo(informMoreUrl)">更多<i class="el-icon-arrow-right"></i></span> -->
    </div>
    <div class="app-content">
      <div class="item-box">
        <p class="info-item1" v-for="item in list" :key="item" @click="linkTo(item)">
          <span class="info-item1-title" :title="item.title"><span class="info-item1-tag">{{item.lables&&item.lables!=''?item.lables:'新闻'}}</span>{{item.title}}</span>
          <span>{{timeFormat(item.publishDate)}}</span>
        </p>
      </div>
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
      informMoreUrl: ''
    };
  },
  created() {
    this.getList()
  },
  mounted() { },
  methods: {
    getList() {
      this.http.postJson('pront-scenes-top-news', {
        count: 3
      }).then((res) => {
        this.list = res.data;
        // this.informMoreUrl = res.data.linkUrl;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取新闻公告失败!" });
      });
    },
    linkTo(item) {
      if (item.externalLink) {
        window.open(item.externalLink)
      } else {
        location.href = item.jumpLink;
      }
    },
    timeFormat(date) {
      let format = 'mm-dd';
      date = new Date(date);
      const dataItem = {
        'Y+': date.getFullYear().toString(),
        'm+': (date.getMonth() + 1).toString(),
        'd+': date.getDate().toString(),
        'H+': date.getHours().toString(),
        'M+': date.getMinutes().toString(),
        'S+': date.getSeconds().toString(),
      };
      Object.keys(dataItem).forEach((item) => {
        const ret = new RegExp(`(${item})`).exec(format);
        if (ret) {
          format = format.replace(ret[1], ret[1].length === 1 ? dataItem[item] : dataItem[item].padStart(ret[1].length, '0'));
        }
      });
      return format;
    }
  },
};
</script>

<style scoped lang="less">
.apply {
  position: absolute;
  top: 295px;
  right: 20px;
  overflow: hidden;
  width: 300px;
  height: 140px;
  background: #fff;
  border-radius: 16px;
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
.title-box1 {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  background: #fff;

  .left {
    font-size: 16px;
    font-weight: bold;
  }
  .right {
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
}
.app-content {
  height: 140px;
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
    .info-item1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      height: 30px;
      cursor: pointer;
      .info-item1-tag {
        background: #e3eefa;
        border-radius: 11px 0px 11px 11px;
        padding: 3px 7px;
        color: #458dda;
        margin-right: 5px;
        font-size: 12px;
      }
      .info-item1-title {
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .info-item1:hover {
      opacity: 0.8;
    }
  }
  .right-arr {
    font-size: 24px;
    margin-left: 60px;
    cursor: pointer;
    color: #666;
    width: 50px;
    text-align: center;
    p {
      font-size: 14px;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
