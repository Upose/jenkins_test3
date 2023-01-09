<!--
 * @Author: huyu
 * @Date: 2023-01-09 10:56:54
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-09 15:39:58
 * @Description: 用户信息
-->
<template>
  <div class="top-content-user-box">
    <div class="my-name-box">
      <a :href="$setHref({ url:'/web_accountSet' })" class="avatar">
        <img :src="fileUrl+(form.photo?form.photo:'/public/image/default-user-head/default-user-head.png')" alt="">
      </a>
      <div class="name">
        <span class="text">{{form.name}} </span>
        <span class="leave" v-if="form.showLevel">LV.{{form.scoreLevel}}</span>
      </div>
    </div>
    <div class="certification">
      <span :class="{'cup': !identityList.weChatIdentity}" title="QQ" @click="!identityList.qqIdentity&&handleBind('qq')">
        <img style="width:10px" :src="replaceImg('qq')" alt="" :class="{'gray': !identityList.qqIdentity}">
        {{identityList.qqIdentity?'已认证':'未认证'}}
      </span>
      <span title="微信" @click="!identityList.weChatIdentity&&handleBind('wx')" :class="{'hover-op': !identityList.weChatIdentity}">
        <img style="width:13px" :src="replaceImg('we')" alt="" :class="{'gray': !identityList.weChatIdentity}">
        {{identityList.weChatIdentity?'已认证':'未认证'}}
      </span>
      <span title="手机号" @click="!identityList.mobileIdentity&&handleBind('phone')" :class="{'hover-op': !identityList.mobileIdentity}">
        <img style="width:8px" :src="replaceImg('phone')" alt="" :class="{'gray': !identityList.mobileIdentity}">
        {{form.mobileIdentity?'已认证':'未认证'}}
      </span>
      <span title="身份证" @click="!identityList.idCardIdentity&&handleBind('card')" :class="{'hover-op': !identityList.idCardIdentity}">
        <img style="width:13px" :src="replaceImg('card')" alt="" :class="{'gray': !identityList.idCardIdentity}">
        {{form.idCardIdentity?'已认证':'未认证'}}
      </span>
      <span title="邮箱" @click="!identityList.emailIdentity&&handleBind('msg')" :class="{'hover-op': !identityList.emailIdentity}">
        <img style="width:13px" :src="replaceImg('msg')" alt="" :class="{'gray': !identityList.emailIdentity}">
        {{form.emailIdentity?'已认证':'未认证'}}
      </span>
    </div>
    <div class="card" @click="$refs.DialogCard.show()">
      <div>
        <div class="title">
          <span>我的读者卡</span>
          <i class="next"></i>
        </div>
        <div class="list">
          <div class="list-item">
            <div class="type-name">读者号</div>
            <div class="kname" :title="principal.no">
              {{principal.no}}
            </div>
          </div>
          <i class="card-line"></i>
          <div class="list-item" v-if="principal.studentNo">
            <div class="type-name">学号/工号</div>
            <div class="kname" :title="principal.studentNo">
              {{principal.studentNo}}
            </div>
          </div>
        </div>
      </div>
      <p class="time">有效期至 &nbsp; {{setTime(principal.expireDate)}}</p>
    </div>
    <DialogCard ref="DialogCard" :cardList="cardList"></DialogCard>
  </div>
</template>

<script>
import DialogCard from './DialogCard';
export default {
  components: {
    DialogCard
  },
  props: {
    form: Object
  },
  data() {
    return {
      fileUrl: localStorage.getItem('fileUrl'),
      identityList: {},//认证信息
      cardList: [],//读者卡列表
      principal: {},//当前登录卡
    };
  },
  created() { },
  mounted() {
    this.getBindInfo();
    this.getCard();
  },
  methods: {
    // 获取绑定信息
    getBindInfo() {
      this.http.getJson('forward-reader-identity-status').then((res) => {
        this.identityList = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取用户是否已绑定信息失败!" });
      });
    },
    handleBind(type) {
      this.$router.push({ path: '/web_accountSet', query: { tab: 2, bind: type } });
    },
    // icon
    replaceImg(type) {
      let img = ''
      switch (type) {
        case 'qq':
          img = require('@/assets/web/img/icon-qq.png');
          break;
        case 'we':
          img = require('@/assets/web/img/icon-wx.png');
          break;
        case 'phone':
          img = require('@/assets/web/img/icon-phone.png');
          break;
        case 'card':
          img = require('@/assets/web/img/icon-idcard.png');
          break;
        case 'msg':
          img = require('@/assets/web/img/icon-email.png');
          break;
      }
      return img
    },
    // 获取读者卡数据
    getCard() {
      this.http.getJson('forward-reader-card-list-data').then((res) => {
        this.cardList = res.data;
        this.jwtToken();
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者卡信息失败!" });
      });
    },
    // 解析token  获取读者卡号 -- 匹配当前登录的读者卡信息
    jwtToken() {
      let strings = localStorage.getItem('token').split(".");//通过split()方法将token转为字符串数组
      //取strings[1]数组中的第二个字符进行解析
      let info = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
      let cardNo = info.CardNo;
      let principal = this.cardList.find(item => item.no == cardNo);
      this.principal = principal ? principal : this.cardList[0];
    },
  },
};
</script>

<style scoped lang="less">
.top-content-user-box {
  position: relative;
  box-sizing: border-box;
  float: left;
  width: 280px;
  height: 419px;
  background: #fff;
  border-radius: 16px;
  padding: 10px;
}
.my-name-box {
  display: flex;
  align-items: center;
  position: absolute;
  top: 16px;
  left: 10px;
  height: 84px;
}
.avatar {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  overflow: hidden;
  background: #ddd;
  margin-right: 10px;
  border: 2px solid #fff;
  box-shadow: 0 0 8px #ddd;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.name {
  width: 150px;
  .text {
    font-size: 20px;
    font-weight: bold;
    color: #3a3536;
  }
  .grade {
    display: inline-block;
    padding: 0 7px;
    font-size: 16px;
    font-weight: 800;
    line-height: 22px;
    color: #ffffff;
    background: #f4c05c;
    height: 22px;
    border: 1px solid #ffffff;
    background: linear-gradient(121deg, #ffe3a4 0%, #eeac31 100%);
    border-radius: 4px;
    margin-left: 13px;
    font-weight: normal;
    letter-spacing: 2px;
  }
  .leave {
    width: 48px;
    height: 24px;
    background: linear-gradient(89deg, #f1c86c 0%, #efaf36 100%);
    border-radius: 5px 5px 5px 5px;
    border: 1px solid #ffffff;
    line-height: 24px;
    text-align: center;
    display: inline-block;
    font-style: oblique;
    // margin-left: 13px;
    margin-top: 5px;
    color: #fff;
  }
}
.w-q {
  // position: absolute;
  // top: 50px;
  // left: 146px;
  margin-left: 20px;
  display: inline-block;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    margin-right: 2px;
  }
}
.certification {
  position: absolute;
  top: 120px;
  left: 10px;
  color: #666;
  width: 260px;
  display: flex;
  flex-wrap: wrap;
  span {
    // display: inline-block;
    margin-right: 5px;
    padding: 4px 10px;
    background: #ffffff;
    border: 1px solid #d8e0ff;
    border-radius: 20px;
    font-size: 12px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    img {
      // vertical-align: middle;
      // width: 14px;
      margin-right: 5px;
      &.gray {
        filter: contrast(5%);
      }
    }
  }
}
.card {
  background: url("../../../../../assets/web/img/personal/bg-card.png")
    no-repeat;
  background-size: 100%;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 280px;
  height: 221px;
  opacity: 1;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #6a5efa;
    padding: 6px 0 0 0;
    text-align: center;
    position: absolute;
    top: 65px;
    left: 90px;
    .next {
      vertical-align: -3px;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(../../../../../assets/web/img/personal/next.png) no-repeat
        center #6a5efa;
      border-radius: 50%;
    }
  }
  .blue-area {
    width: 6px;
    height: 30px;
    border-radius: 0 10px 10px 0;
    background: #3965d8;
    position: absolute;
    top: 72px;
    left: 10px;
  }
  .status {
    position: absolute;
    top: 24px;
    right: 15px;
    transform: rotate(50deg);
    span {
      color: #584927;
      font-size: 16px;
    }
  }
  .list {
    position: absolute;
    top: 110px;
    left: 15px;
    .card-line {
      display: block;
      height: 1px;
      margin: 5px 0;
      width: 250px;
      background: url("../../../../../assets/web/img/personal/icon-line.png");
    }
    .list-item {
      display: flex;
      justify-content: center;
      .type-name {
        color: #2f2c23;
        font-size: 14px;
        margin-bottom: 4px;
        margin-right: 6px;
      }
      .kname {
        color: #3a3536;
        font-size: 14px;
        font-weight: bold;
        // max-width: 149px;
      }
    }
  }
  .time {
    font-size: 12px;
    color: #fff;
    position: absolute;
    bottom: 20px;
    // left: 65px;
    width: 100%;
    text-align: center;
  }
}
</style>
