<template>
  <div class="container">
    <div class="content-box" :class="isEdit?'no-background':''">
      <div class="lib-content">
        <breadCrumbs :blist="[{name:userCenterName}]"></breadCrumbs>
        <div v-if="!isEdit">
          <div class="top-right">
            <span class="item" v-if="form.isStaff" @click="linkTo('/workbench/#/admin_workbench','workbench')"><img src="../../../../../assets/web/img/icon_gy.png" alt=""> 馆员工作台</span>
            <span class="item" @click="$router.push('/web_accountSet')"><img src="../../../../../assets/web/img/icon_seting.png" alt=""> 账号设置</span>
            <span class="set-item" @click="handleSetIndex" v-if="!tempParm.isPersonalIndex"><img src="../../../../../assets/web/img/icon_swzy.png" alt=""> 设为主页</span>
            <span class="set-item" @click="handleCancalSetIndex" v-else><img src="../../../../../assets/web/img/icon_swzy.png" alt=""> 取消设为主页</span>
          </div>
          <div class="top-content">
            <div class="top-content-title-box child_bg">{{userCenterName}} <i class="top-content-title-box-right child_bg"></i></div>
            <div class="top-content-user-box">
              <div class="avatar"><img :src="imgUrl+form.photo" alt=""></div>
              <div class="name">
                <span class="text">{{form.name}}</span>
                <!-- <span class="leave">LV8</span> -->
                <div class="w-q">
                  <img src="../../../../../assets/web/img/wex.png" alt="">
                  <img src="../../../../../assets/web/img/qq.png" alt="">
                </div>
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
            </div>
            <div class="card" @click="$refs.dialog_card.show()" v-if="dataKey">
              <div>
                <h6>{{principal.userName}}<span v-if="getKeyValue(principal.type,'Card_Type')">（{{getKeyValue(principal.type,'Card_Type')}}）</span></h6>
                <span class="green" v-if="principal.status==1">{{getKeyValue(principal.status)}}</span>
                <span class="yellow" v-if="principal.status==2">{{getKeyValue(principal.status)}}</span>
                <span class="gery" v-if="principal.status==3">{{getKeyValue(principal.status)}}</span>
              </div>
              <p class="font18">卡号 {{principal.no}}</p>
              <p>有效期至 {{setTime(principal.expireDate)}}</p>
            </div>
          </div>
          <div class="apply">
            <div class="title-box">
              <span class="left">我的应用</span>
              <span class="right" @click="linkTo(appData.appCenterRouteCode)">应用中心</span>
            </div>
            <div class="app-content">
              <div class="re-box" @click="linkTo(appData.appCenterRouteCode)">
                <div class="app-box">
                  <template v-for="(item,index) in appData.appList">
                    <div class="app" :key="item.appId" v-if="index<4"><img :src="imgUrl+item.appIcon" alt=""></div>
                  </template>
                </div>
                <p class="title-name">应用中心</p>
              </div>
              <div class="item-box">
                <template v-for="(item,index) in appData.appList">
                  <div class="app-item" :key="item.appId" v-if="index<7" @click="linkTo(item.frontUrl)">
                    <div class="app">
                      <img :src="imgUrl+item.appIcon" alt="">
                    </div>
                    <p class="title-name">{{item.appName}}</p>
                  </div>
                </template>
              </div>
              <span class="right-arr" @click="linkTo(appData.myAppRouteCode)">
                <i class="el-icon-arrow-right"></i>
                <p>更多</p>
              </span>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- <div class="breadCrumbs"><i class="el-icon-s-home"></i>>账号设置</div> -->
          <div class="chance">
            <div class="title-box">
              <span class="left">选择应用</span>
            </div>
            <div class="chance-app">
              <span :class="isSelect(item.appId)?'app-select':''" v-for="item in applyList" :key="item.id" @click="handleApply(item)">{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="all-temp-box" id="all-temp-box">
          <div class="tmp-box" :class="isEdit?'sort':''" v-for="(item,index) in tempData" :key="index" :id="item.appId">
            <div class="edit-mark" v-if="isEdit">
              <el-popover class="edit-right" placement="bottom" width="120" trigger="click" popper-class="b-b" :id="'pop'+item.appId">
                <div class="popover-content">
                  <p @click="handleCancel(item)">取消关注</p>
                  <p @click="handleTop(item)">置顶</p>
                </div>
                <span class="font-w" slot="reference">···</span>
              </el-popover>
            </div>
            <div :class="item.appWidget.widgetCode" :data-set="`[{'topCount':'${item.appPlateItems[0].topCount}','sortType':'${item.appPlateItems[0].sortType}','id':'${item.appPlateItems[0].id}'}]`">
              <div :id="item.appWidget.widgetCode"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <footer class="footer"></footer> -->
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
import Sortable from "sortablejs";

import dialog_card from '@/components/web/view/user/library/model/dialog_card';
import { timeFormat } from "@/assets/public/js/util";
import breadCrumbs from '../../../model/breadCrumbs';

export default {
  components: { dialog_card, breadCrumbs },
  data() {
    return {
      baseUrl: window.apiDomainAndPort,
      userCenterName: JSON.parse(localStorage.getItem('headerFooterInfo')).userCenterName,


      isEdit: false,//是否编辑状态
      dataKey: null,//键值对数据
      form: {},//读者信息
      cardList: [],//读者卡信息
      principal: {},//主卡
      appData: [],//我的应用列表
      tempParm: {},//模板总数据
      tempData: [],//模板组件数据
      applyList: [],//模板应用列表
      applyIdList: [],//模板appid列表
      imgUrl: localStorage.getItem('fileUrl'),//图片域名
      setTime: timeFormat,
    }
  },
  created() {
    // 设置网页标题
    document.title = JSON.parse(localStorage.getItem('headerFooterInfo')).userCenterName + '-' + this.$store.getters.appInfo.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;

    this.getKey();
    this.getInfo();
    this.getCard();
    this.getMyApp();
    this.getApplyList();
  },
  mounted() {
    this.getTemp();
    this.dragSort();
  },
  methods: {
    // 获取键值对数据
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取初始数据失败!" });
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
        this.$message({ type: "error", message: "获取读者卡信息失败!" });
      });
    },
    // 获取我的应用
    getMyApp() {
      this.http.getJson('forward-getmycollectionapps').then((res) => {
        this.appData = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取应用信息失败!" });
      });
    },

    // 获取模板组件信息
    getTemp() {
      this.http.getJson('forward-personal-scene-detail').then((res) => {
        this.tempParm = res.data;
        this.tempData = res.data.sceneScreens[0].sceneApps;
        this.tempData.forEach(item => {
          this.applyIdList.push(item.appId);
          this.addStyle(item.appWidget.target);
          this.addScript(item.appWidget.target);
        })
      }).catch((err) => {
        this.$message({ type: "error", message: "获取模板组件失败!" });
      });
    },
    // 获取应用列表
    getApplyList() {
      this.http.getJsonSelf('forward-personal-app-list', `/1`).then((res) => {
        this.applyList = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取应用信息失败!" });
      });
    },
    // 应用是否已选
    isSelect(id) {
      let val = this.applyIdList.includes(id);
      return val;
    },
    //引入css文件
    addStyle(url) {
      url = url + '/component.css';
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    //引入js文件
    addScript(url) {
      url = url + '/component.js';
      var js_element = document.createElement("script");
      js_element.setAttribute("type", "text/javascript");
      js_element.setAttribute("src", url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },

    // 设为首页
    handleSetIndex() {
      this.http.postJson('forward-save-personal-scene', this.tempParm).then((res) => {
        this.http.getJson('forward-personal-scene-detail').then((res) => {
          this.http.putJsonSelf('forward-set-personal-default-scene', `/${res.data.id}/1`).then((res) => {
            // this.$message({ type: "success", message: "保存设置成功!" });
            this.tempParm.isPersonalIndex = true;
          })
        })
      })

    },
    // 取消设为主页
    handleCancalSetIndex() {
      this.http.putJsonSelf('forward-set-personal-default-scene', `/${this.tempParm.id}/0`).then((res) => {
        // this.$message({ type: "success", message: "保存设置成功!" });
        this.tempParm.isPersonalIndex = false;
      }).catch((err) => {
        this.$message({ type: "error", message: "取消失败!" });
      });
    },
    // 编辑个人图书馆
    handleEdit() {
      this.isEdit = true;
    },
    // 重置
    handleReset() {
      // this.isEdit = false;
      // this.getTemp();
      window.location.reload();
    },
    // 保存
    handleSave() {
      this.isEdit = false;
      let list = this.tempData.filter(items => (!items.noHas));
      // console.log(list);
      // 通过dom节点顺序重置列表顺序
      let parmList = [];
      let nodeList = document.getElementsByClassName('tmp-box');
      for (let i = 0; i < nodeList.length; i++) {
        const elid = nodeList[i].id;
        // console.log(elid);
        let obj = list.find(item => (item.appId == elid));
        obj.yIndex = i;
        if ((i + 1) % 2 == 0) {
          obj.xIndex = 1;
        } else {
          obj.xIndex = 0;
        }
        parmList.push(obj);
      }
      // console.log(parmList);
      let parm = this.tempParm;
      parm.sceneScreens[0].sceneApps = parmList;
      this.http.postJson('forward-save-personal-scene', parm).then((res) => {
        this.$message({ type: "success", message: "保存设置成功!" });
      }).catch((err) => {
        this.$message({ type: "error", message: "保存设置失败!" });
      });
    },
    // 选择应用
    handleApply(item) {
      if (!this.applyIdList.includes(item.appId)) {
        this.http.getJsonSelf('forward-personal-app-widget-by-app-id', `/${item.appId}`).then((res) => {
          let data = res.data;
          this.applyIdList.push(data.appId);
          let parm = {
            appId: data.appId,
            parentSceneAppId: data.appColumn.parentSceneAppId,
            appPlateItems: [data.appColumn],
            appWidget: data,
            height: 39,
            id: '',
            sceneId: this.tempParm.id,
            sceneScreenId: this.tempParm.sceneScreens[0].id,
            width: 6,
            xIndex: 6,
            yIndex: 0,
          }
          this.tempData.push(parm);
          this.addStyle(data.target);
          this.addScript(data.target);
          // console.log(this.tempData);
        }).catch((err) => {
          this.$message({ type: "error", message: "选择应用失败!" });
        });
      } else {
        this.$message({
          message: '该应用已存在，无需再次选择！',
          type: 'warning'
        })
      }
    },
    // 取消关注
    handleCancel(item) {
      // 隐藏弹窗
      let popList = document.getElementsByClassName('el-popover');
      for (let i = 0; i < popList.length; i++) {
        popList[i].style.display = 'none';
      }
      // 删除dom节点
      let dom = document.getElementById(item.appId);
      dom.remove();

      this.applyIdList = this.applyIdList.filter(items => (items != item.appId));
      //增加删除标识，直接删除有问题
      this.tempData.forEach(obj => {
        if (obj.appId == item.appId) {
          obj.noHas = 1;
        }
      })
    },
    // 置顶
    handleTop(item) {
      let dom = document.getElementById(item.appId);
      document.getElementById('all-temp-box').insertBefore(dom, document.getElementById('all-temp-box').childNodes[0]);
      // 隐藏弹窗
      let popList = document.getElementsByClassName('el-popover');
      for (let i = 0; i < popList.length; i++) {
        popList[i].style.display = 'none';
      }
    },
    //表格拖动排序
    dragSort() {
      const el = document.getElementById("all-temp-box");
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        draggable: ".sort",
        // handle: '.handleSort',
        onEnd: e => {
          // 拖动了但是没有改变位置 不执行
          if (e.newIndex == e.oldIndex) {
            return;
          }
        } //onEnd
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
  background-size: 100% 320px;
  padding-bottom: 80px;
  .lib-content {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    padding-top: 24px;
  }
}
.no-background {
  background: #eeeeee;
}
.top-right {
  // display: flex;
  // justify-content: end;
  // margin-bottom: 20px;
  // align-items: center;
  // align-content: center;
  position: absolute;
  right: 0;
  top: 15px;

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
    // width: 98px;
    // height: 28px;
    display: inline-block;
    padding: 0 8px;
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
  height: 205px;
  position: relative;
  margin-top: 40px;
  .top-content-title-box {
    position: relative;
    display: inline-block;
    width: 220px;
    height: 50px;
    color: #fff;
    line-height: 50px;
    font-size: 24px;
    font-weight: 530;
    padding-left: 70px;
    border-radius: 6px 0 0 6px;
    margin-bottom: 6px;
    .top-content-title-box-right {
      position: absolute;
      right: -30px;
      top: 0;
      width: 50px;
      height: 50px;
      border-radius: 6px;
      transform: skew(30deg);
    }
  }
  .top-content-user-box {
    position: relative;
    background: #fff;
    width: 736px;
    height: 138px;
    border: 1px solid #e1e1e1;
    border-radius: 16px;
    padding: 20px 30px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background: #ddd;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    position: absolute;
    left: 170px;
    top: 20px;

    .text {
      font-size: 24px;
      font-weight: 550;
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
    top: 80px;
    left: 170px;
    color: #666;
    span {
      margin-right: 10px;
      padding: 8px 10px;
      border: 1px solid #ececec;
      border-radius: 20px;
    }
  }
  .card {
    width: 440px;
    height: 190px;
    background: url("../../../../../assets/web/img/card-bg.png") no-repeat;
    background-size: 100%;
    // height: 100%;
    border-radius: 16px;
    padding: 20px 20px 20px 0;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;

    h6 {
      font-size: 20px;
      background: #fff;
      display: inline-block;
      padding: 8px 30px;
      border-radius: 0 50px 50px 0;
      margin-left: 20px;
      margin-top: 15px;
      color: #606060;
    }
    p {
      color: #606060;
      margin-top: 8px;
      padding-left: 50px;
    }
    .font18 {
      font-size: 26px;
      margin-top: 30px;
    }
    & > div > span {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 20px;
      margin-left: 10px;
      font-weight: 560;
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
      background: url("../../../../../assets/web/img/active-bottom.png")
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
      width: 80px;
      margin: 0 20px;
      padding: 5px;
      cursor: pointer;
      &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      }
      .app {
        width: 62px;
        height: 62px;
        border-radius: 16px;
        margin: 0 auto;
        img {
          width: 50%;
          height: 50%;
        }
        background: #e3f2ff;
        display: flex;
        justify-content: center;
        align-items: center;
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
.all-temp-box {
  margin-top: 24px;
  overflow: hidden;
}
.tmp-box {
  width: 588px;
  height: 320px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  float: left;
  margin-right: 24px;
  margin-bottom: 24px;
  position: relative;
  &:nth-child(2n) {
    margin-right: 0;
  }
  .edit-mark {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px dashed #aaa;
    border-radius: 16px;
    z-index: 100;

    .edit-right {
      position: absolute;
      right: 20px;
      top: 18px;
      font-weight: 600;
      cursor: pointer;
      font-size: 18px;
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
  z-index: 1000;

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
  z-index: 1000;

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
  color: #fff;
  background: #4fcd92;
}
.yellow {
  color: #fff;
  background: #ffa520;
}
.gery {
  color: #fff;
  background: #555;
}

.tmp-box {
  position: relative;
  &:nth-child(2n) {
    margin-right: 0;
  }
  .edit-mark {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px dashed #aaa;
  }
}
/deep/ .my-breadCrumbs {
  position: absolute;
}
</style>