<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box">
      <div class="content">
        <div class="top-right">
          <span class="item"><img src="../../../../../assets/web/img/icon_gy.png" alt=""> 馆员工作台</span>
          <span class="item"><img src="../../../../../assets/web/img/icon_seting.png" alt=""> 账号设置</span>
          <span class="set-item"><img src="../../../../../assets/web/img/icon_swzy.png" alt=""> 设为主页</span>
        </div>
        <div class="top-content">
          <div class="avatar"><img src="" alt=""></div>
          <div class="name">
            <span class="text">小猫咪</span>
            <span class="leave">LV8</span>
          </div>
          <div class="w-q">
            <img src="../../../../../assets/web/img/wex.png" alt="">
            <img src="../../../../../assets/web/img/qq.png" alt="">
          </div>
          <div class="certification">
            <span>
              <img src="../../../../../assets/web/img/phone-i.png" alt="">
              已认证
            </span>
            <span>
              <img src="../../../../../assets/web/img/id-i.png" alt="">
              已认证
            </span>
            <span>
              <img src="../../../../../assets/web/img/icon_msg.png" alt="">
              已认证
            </span>
          </div>
          <div class="card">
            <h6>张晓（临时卡）</h6>
            <p>0100080015036</p>
            <p>有效期至 2021-12-01</p>
            <span>正常</span>
          </div>
        </div>
        <div class="apply">
          <div class="title-box">
            <span class="left">我的应用</span>
            <span class="right">应用中心</span>
          </div>
          <div class="app-content">
            <div class="re-box">
              <div class="app-box">
                <div class="app"></div>
                <div class="app"></div>
                <div class="app"></div>
                <div class="app"></div>
              </div>
              <p class="title-name">应用中心</p>
            </div>
            <div class="item-box">
              <div class="app-item">
                <div class="app"></div>
                <p class="title-name">首页</p>
              </div>
              <div class="app-item">
                <div class="app"></div>
                <p class="title-name">首页</p>
              </div>
              <div class="app-item">
                <div class="app"></div>
                <p class="title-name">首页</p>
              </div>
            </div>
            <span class="right-arr">
              <i class="el-icon-arrow-right"></i>
              <p>更多</p>
            </span>
          </div>
        </div>
        <div class="tmp-box">
          <div class="tmp-detail">
            <div class="title-box">
              <span class="left">通知消息</span>
              <span class="right">
                <span>更多 </span>
                <span class="font-w">···</span>
              </span>
            </div>
            <div class="tem-content">
              <p class="info-item" v-for="item in 6" :key="item">
                <span>【应用名称】消息内容消息内容</span>
                <span>09-21 21:12</span>
              </p>
            </div>
          </div>
        </div>
        <div class="tmp-box">
          <div class="tmp-detail">
            <div class="title-box">
              <span class="left">图书馆新闻</span>
              <span class="right">
                <span class="font-w">···</span>
              </span>
            </div>
            <div class="tem-content">
              <p class="news-item" v-for="item in 4" :key="item">
                <span>
                  <span class="tag bule">新闻</span>
                  新闻标题新闻标题
                </span>
                <span>09-21 21:12</span>
              </p>
            </div>
          </div>
        </div>
        <div class="tmp-box">
          <div class="tmp-detail">
            <div class="title-box">
              <span class="left">资源推荐类</span>
              <span class="right">
                <span>换一换</span>
                <span class="font-w">···</span>
              </span>
            </div>
            <div class="tem-content">
              <div class="resource-item" v-for="item in 4" :key="item">
                <img src="../../../../../assets/web/img/upload/book.png" alt="">
                <p>中国通史中国通史中国通史中国国通史中国</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tmp-box">
          <div class="tmp-detail">
            <div class="title-box">
              <span class="left">专题类型</span>
              <span class="right">
                <span class="font-w">···</span>
              </span>
            </div>
            <div class="tem-content">
              <div class="topic-item" v-for="item in 6" :key="item">
                <img src="../../../../../assets/web/img/upload/w-show.png" alt="">
                <p>中国通史</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tmp-box">
          <div class="tmp-detail">
            <div class="title-box">
              <span class="left">图书馆活动</span>
              <span class="right">
                <span class="font-w">···</span>
              </span>
            </div>
            <div class="tem-content">
              <div class="activity-item">
                <img src="../../../../../assets/web/img/upload/pic.png" alt="">
                <div>
                  <span class="act-tag">讲座活动</span>
                  <p>
                    <span class="act-name">活动</span>
                    <span class="act-text">2021-09-29 15:00 用户培训中心（304室）</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tmp-box">
          <div class="tmp-detail">
            <div class="title-box">
              <span class="left">常用数据库</span>
              <span class="right">
                <span class="font-w">···</span>
              </span>
            </div>
            <div class="tem-content">
              <p class="database-item" v-for="item in 3" :key="item">
                <span>消息内容消息内容</span>
                <img class="data-icon" src="../../../../../assets/web/img/icon_hot.png" alt="">
              </p>
              <p class="database-item" v-for="item in 3" :key="item">
                <span>消息内容消息内容</span>
                <img class="data-icon" src="../../../../../assets/web/img/icon_focus.png" alt="">
              </p>
              <p class="database-item" v-for="item in 3" :key="item">
                <span>消息内容消息内容</span>
                <img class="data-icon" src="../../../../../assets/web/img/icon_usual.png" alt="">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer"></footer>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
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
  background: url("../../../../../assets/web/img/l-bg.png") no-repeat #eeeeee;
  padding-bottom: 80px;
  .content {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    padding-top: 24px;
  }
}
.top-right {
  display: flex;
  justify-content: end;
  margin-bottom: 20px;
  align-items: center;
  align-content: center;

  span {
    margin-left: 20px;
    cursor: pointer;
    color: #666;
    align-items: center;
    &:hover {
      opacity: 0.8;
    }

    img {
      width: 16px;
      height: 16px;
      position: relative;
      top: -3px;
    }
  }

  .set-item {
    width: 98px;
    height: 28px;
    background: rgba(0, 0, 0, 0.25);
    opacity: 1;
    border-radius: 16px;
    text-align: center;
    color: #fff;
    line-height: 28px;

    img {
      position: relative;
      top: 0;
    }
  }
}
.top-content {
  height: 160px;
  position: relative;

  .avatar {
    width: 124px;
    height: 124px;
    border-radius: 50%;
    overflow: hidden;
    background: #ddd;
    position: absolute;
  }
  .name {
    position: absolute;
    left: 146px;
    top: 0;

    .text {
      font-size: 24px;
      font-weight: bold;
    }
    .leave {
      height: 22px;
      padding: 0 10px;
      background: linear-gradient(180deg, #f5c571 0%, #ff9a2c 100%);
      border-radius: 4px;
      font-size: 16px;
      line-height: 22px;
      display: inline-block;
      margin-left: 13px;
      color: #fff;
    }
  }
  .w-q {
    position: absolute;
    top: 50px;
    left: 146px;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  .certification {
    position: absolute;
    top: 100px;
    left: 146px;
    color: #666;
    span {
      margin-right: 20px;
    }
  }
  .card {
    width: 300px;
    height: 120px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    padding: 20px;
    position: absolute;
    top: 0;
    right: 0;

    h6 {
      font-size: 18px;
    }
    p {
      color: #666;
      margin-top: 8px;
    }
    span {
      position: absolute;
      top: 20px;
      right: 0;
      padding: 10px;
      color: #4fcd92;
      background: #e5f8ef;
    }
  }
}
.apply {
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  //   padding: 25px;
}
.title-box {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  border-bottom: 1px solid #eee;
  background: #fff;

  .left {
    font-size: 20px;
    font-weight: bold;
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
.app-content {
  height: 140px;
  display: flex;
  align-items: center;
  padding: 0 25px;

  .re-box {
    margin-right: 74px;
  }
  .app-box {
    width: 70px;
    height: 70px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    padding: 9px 0 0 9px;

    .app {
      width: 24px;
      height: 24px;
      border-radius: 8px;
      background: #e3f2ff;
      display: inline-block;
    }
  }
  .title-name {
    margin-top: 8px;
    text-align: center;
  }
  .item-box {
    width: 930px;
    display: flex;
    .app-item {
      margin-right: 62px;
      .app {
        width: 62px;
        height: 62px;
        border-radius: 16px;
        background: #e3f2ff;
      }
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
.tmp-box {
  width: 588px;
  height: 320px;
  .tmp-detail {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 24px 0;
    border-radius: 16px;
    background: #fff;

    .tem-content {
      padding: 0 20px;

      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;
        height: 40px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      .news-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;
        height: 40px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }

        .tag {
          width: 48px;
          height: 22px;
          border-radius: 14px;
          text-align: center;
          line-height: 22px;
          display: inline-block;
        }
        .bule {
          background: #e3eefa;
          color: #458dda;
        }
        .red {
          background: #fce7e2;
          color: #eb5f3c;
        }
        .green {
          background: #e5f8ef;
          color: #4fcd92;
        }
      }
      .resource-item {
        width: 20%;
        height: auto;
        margin: 0 2%;
        display: inline-block;
        margin-top: 25px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        img {
          width: 100%;
          height: auto;
        }
        p {
          width: 100%;
          height: 40px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top: 10px;
        }
      }
      .topic-item {
        width: 30%;
        height: auto;
        margin: 0 1%;
        display: inline-block;
        margin-bottom: 20px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        img {
          width: 100%;
          height: auto;
        }
        p {
          width: 100%;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 10px;
          text-align: center;
        }
      }
      .activity-item {
        width: 100%;
        height: auto;
        cursor: pointer;
        position: relative;
        &:hover {
          opacity: 0.8;
        }
        img {
          width: 100%;
          height: 100%;
        }
        div {
          width: 100%;
          height: 60px;
          overflow: hidden;
          position: absolute;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;

          .act-tag {
            width: 60px;
            height: 60px;
            background: #a21e1e;
            padding: 8px 0 0 12px;
            font-size: 18px;
            display: inline-block;
          }
          p {
            display: inline-block;
            margin-left: 16px;
          }
          .act-name {
            font-size: 15px;
            font-weight: bold;
            display: block;
            line-height: 25px;
          }
          .act-text {
            display: block;
            line-height: 25px;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: nowrap;
          }
        }
      }
      .database-item {
        width: 45%;
        height: 40px;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        float: left;
        margin: 0 2%;
        &:hover {
          opacity: 0.8;
        }
        .data-icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>