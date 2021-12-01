<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box" :class="isEdit?'no-background':''">
      <div class="content">
        <div v-if="!isEdit">
          <div class="top-right">
            <span class="item"><img src="../../../../../assets/web/img/icon_gy.png" alt=""> 馆员工作台</span>
            <span class="item" @click="$router.push('/accountSet')"><img src="../../../../../assets/web/img/icon_seting.png" alt=""> 账号设置</span>
            <span class="set-item"><img src="../../../../../assets/web/img/icon_swzy.png" alt=""> 设为主页</span>
          </div>
          <div class="top-content">
            <div class="avatar"><img :src="imgPath+form.photo" alt=""></div>
            <div class="name">
              <span class="text">{{form.name}}</span>
              <!-- <span class="leave">LV8</span> -->
            </div>
            <div class="w-q">
              <!-- <img src="../../../../../assets/web/img/wex.png" alt="">
              <img src="../../../../../assets/web/img/qq.png" alt=""> -->
            </div>
            <div class="certification">
              <span>
                <img src="../../../../../assets/web/img/phone-i.png" alt="">
                {{form.mobileIdentity?'已认证':'未认证'}}
              </span>
              <span>
                <img src="../../../../../assets/web/img/id-i.png" alt="">
                {{form.idCardIdentity?'已认证':'未认证'}}
              </span>
              <span>
                <img src="../../../../../assets/web/img/icon_msg.png" alt="">
                {{form.emailIdentity?'已认证':'未认证'}}
              </span>
            </div>
            <div class="card" @click="$refs.dialog_card.show()" v-if="dataKey">
              <h6>{{principal.userName}}（{{getKeyValue(principal.type,'Card_Type')}}）</h6>
              <p>{{principal.no}}</p>
              <p>有效期至 {{setTime(principal.expireDate)}}</p>
              <span class="green" v-if="principal.status==1">{{getKeyValue(principal.status)}}</span>
              <span class="yellow" v-if="principal.status==2">{{getKeyValue(principal.status)}}</span>
              <span class="gery" v-if="principal.status==3">{{getKeyValue(principal.status)}}</span>
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
        </div>
        <div v-else>
          <div class="breadCrumbs"><i class="el-icon-s-home"></i>>账号设置</div>
          <div class="chance">
            <div class="title-box">
              <span class="left">选择应用</span>
            </div>
            <div class="chance-app">
              <span class="app-select">应用</span>
              <span>应用</span>
              <span>应用</span>
              <span>应用</span>
              <span>应用</span>
              <span>应用</span>
              <span>应用</span>
            </div>
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
        <div class="tmp-box">
          <div class="tmp-detail">
            <div class="title-box b-n">
              <span class="left"></span>
              <span class="right">
                <span class="font-w">···</span>
              </span>
            </div>
            <div class="tem-content">
              <div class="search-box">
                <h1>统一检索</h1>
                <div class="search-bar">
                  <span>请输入</span>
                  <i class="el-icon-search"></i>
                </div>
                <p>
                  <span v-for="item in 4" :key="item">热门词</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer"></footer>
    <!-- 编辑按钮 -->
    <div class="edit-btn" @click="handleEdit" v-if="!isEdit"><i class="el-icon-edit"></i>编辑主页</div>
    <div class="edit-ing-btn" v-else>
      <span class="mb" @click="handleReset">
        <i class="el-icon-refresh-left"></i>重置
      </span>
      <span @click="handleSave">
        <i class="el-icon-s-claim"></i>保存
      </span>
    </div>
    <!-- 弹窗组件 -->
    <dialog_card ref="dialog_card" :cardList="cardList" :dataKey="dataKey"></dialog_card>
  </div>
</template>
<script>
import dialog_card from '@/components/web/view/user/library/model/dialog_card';
import { timeFormat } from "@/assets/public/js/util";

export default {
  components: { dialog_card },
  data() {
    return {
      isEdit: false,//是否编辑状态
      dataKey: null,//键值对数据
      form: {},//读者信息
      cardList: [],//读者卡信息
      principal: {},//主卡
      imgPath: process.env.VUE_APP_IMG_URL,//图片域名
      setTime: timeFormat
    }
  },
  created() {
    this.getKey();
    this.getInfo();
    this.getCard();
  },
  methods: {
    // 获取键值对数据
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 键值对匹配
    getKeyValue(val, code = 'Card_Status') {
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      let items = select.groupItems.find(item => (item.value == val))
      return items ? items.key : '';
    },
    // 获取用户信息
    getInfo() {
      this.http.getJson('forward-reader-info').then((res) => {
        this.form = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取读者卡数据
    getCard() {
      this.http.getJson('forward-reader-card-list-data').then((res) => {
        this.cardList = res.data;
        //主卡信息
        this.principal = this.cardList.find(item => item.isPrincipal == true);
        this.principal = this.principal ? this.principal : this.cardList[0];
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 编辑个人图书馆
    handleEdit() {
      this.isEdit = true;
    },
    // 重置
    handleReset() {
      this.isEdit = false;
    },
    // 保存
    handleSave() {
      this.isEdit = false;
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../../../../../assets/web/css/user.less");
.b-b {
  border-radius: 16px;
}
</style>
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
    overflow: hidden;
  }
}
.no-background {
  background: #eeeeee;
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
    img{
      width: 100%;
      height: 100%;
    }
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
      padding: 6px 10px 6px 14px;
      color: #4fcd92;
      background: #e5f8ef;
      border-radius: 20px 0 0 20px;
    }
  }
}
.apply {
  height: 200px;
  background: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  //   padding: 25px;
  overflow: hidden;
}
.chance {
  // height: 200px;
  background: #ffffff;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  // padding: 25px;
  overflow: hidden;
  margin-top: 24px;
  .chance-app {
    padding: 24px 20px 40px;

    span {
      padding: 10px 16px;
      border-radius: 3px;
      border: 1px solid #ddd;
      margin: 0 20px 20px 0;
      cursor: pointer;
      color: #666;
    }
    .app-select {
      border-color: #458dda;
      position: relative;

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
  float: left;
  margin-right: 12px;
  margin-bottom: 24px;
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

      .search-box {
        h1 {
          text-align: center;
          color: #666;
          font-size: 24px;
          margin: 12px 0 36px;
        }
        .search-bar {
          width: 70%;
          height: 48px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.0588235294117647);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.02);
          border-radius: 24px;
          margin: 0 auto 16px;
          color: #999;
          line-height: 48px;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          i {
            font-size: 24px;
          }
        }
        p {
          text-align: center;
          span {
            padding: 0 10px;
            color: #666;
          }
        }
      }
    }
  }
}
.b-n {
  border: none;
}

.popover-content {
  p {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }

    &:last-child {
      border: none;
    }
  }
}
.edit-btn {
  width: 64px;
  height: 92px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 15px;
  position: fixed;
  right: 24px;
  top: 500px;
  text-align: center;
  cursor: pointer;
  color: #666;

  i {
    font-size: 20px;
    display: block;
    margin-bottom: 8px;
  }
  &:hover {
    opacity: 0.9;
  }
}
.edit-ing-btn {
  width: 64px;
  height: 150px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  opacity: 1;
  border-radius: 8px;
  padding: 15px;
  position: fixed;
  right: 24px;
  top: 500px;
  text-align: center;
  cursor: pointer;
  color: #666;

  i {
    font-size: 20px;
    display: block;
    margin-bottom: 8px;
  }
  &:hover {
    opacity: 0.9;
  }
  span {
    display: block;
  }
  .mb {
    margin-bottom: 30px;
  }
}
.green {
  color: #4fcd92;
  background: #e5f8ef;
}
.yellow {
  color: #ffa520;
  background: #fff2dd;
}
.gery {
  color: #555;
  background: #eee;
}
</style>