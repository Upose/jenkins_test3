<!--
 * @Author: huyu
 * @Date: 2023-01-09 09:25:59
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-09 17:27:05
 * @Description: 个人中心 新
-->
<template>
  <div class="container" v-loading="infoLoading&&tempLoading">
    <div class="content-box" :class="isEdit?'no-background':''">
      <div class="lib-content">
        <BreadCrumbs :blist="[{name:userCenterName}]"></BreadCrumbs>
        <template v-if="!isEdit">
          <TopTitle :isStaff="form.isStaff" :tempParm="tempParm" v-if="!infoLoading&&!tempLoading"></TopTitle>
          <div class="top-content">
            <UserInfo :form="form" v-if="!infoLoading"></UserInfo>
            <SearchBox />
            <AppList v-if="!tempLoading" :myObj="myObj" />
            <DatabaseList v-if="!tempLoading" :myObj="myObj" />
            <InformList />
          </div>
        </template>
        <template v-else>
          <ChanceApp :applyIdList="applyIdList" @handleApply="handleApply"></ChanceApp>
        </template>

        <div class="ml-temp-warp">
          <!-- 2022.11.2 新增校友导航 -->
          <div v-if="isSchoolfellow" :class="schoolfellowInfo.appWidget.widgetCode" :data-set="`[{'topCount':'${schoolfellowInfo.appPlateItems[0]?schoolfellowInfo.appPlateItems[0].topCount:''}','sortType':'${schoolfellowInfo.appPlateItems[0]?schoolfellowInfo.appPlateItems[0].sortType:''}','id':'${schoolfellowInfo.appPlateItems[0]?schoolfellowInfo.appPlateItems[0].id:''}'}]`">
            <div :id="schoolfellowInfo.appWidget.widgetCode"></div>
          </div>
          <div class="service_sys_temp19"></div>
          <!-- 2022.11.2 新增校友导航 end -->
          <div class="all-temp-box" id="all-temp-box">
            <div class="tmp-box" :class="isEdit?'sort':''" v-for="(item,index) in tempData" :key="index" :id="item.appId">
              <div class="edit-mark" v-if="isEdit">
                <el-popover class="edit-right" placement="bottom" width="120" trigger="click" popper-class="b-b" :id="'pop'+item.appId">
                  <div class="popover-content">
                    <p @click="handleCancel(item)">取消关注</p>
                    <p @click="handleTop(item)">置顶</p>
                  </div>
                  <span slot="reference" class="font-w hide-more">···</span>
                </el-popover>
              </div>
              <div :class="item.appWidget.widgetCode" :data-set="`[{'topCount':'${item.appPlateItems[0]?item.appPlateItems[0].topCount:''}','sortType':'${item.appPlateItems[0]?item.appPlateItems[0].sortType:''}','id':'${item.appPlateItems[0]?item.appPlateItems[0].id:''}'}]`">
                <div :id="item.appWidget.widgetCode"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <EditBtn v-if="!tempLoading&&!isSchoolfellow" :isEdit.sync="isEdit" @handleSave="handleSave"></EditBtn>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import BreadCrumbs from '../../model/breadCrumbs';
import TopTitle from './components/TopTitle';
import UserInfo from './components/UserInfo';
import AppList from './components/AppList.vue';
import DatabaseList from './components/DatabaseList.vue';
import InformList from './components/InformList.vue';
import SearchBox from './components/SearchBox.vue';
import ChanceApp from './components/ChanceApp';
import EditBtn from './components/EditBtn';

export default {
  components: {
    BreadCrumbs,
    TopTitle,
    UserInfo,
    AppList,
    DatabaseList,
    InformList,
    SearchBox,
    ChanceApp,
    EditBtn
  },
  props: {},
  data() {
    return {
      userCenterName: JSON.parse(localStorage.getItem('headerFooterInfo')).userCenterName,
      isEdit: false,// 是否编辑状态

      infoLoading: true,// 读者信息加载
      form: {},//读者信息
      myObj: {},// 用于我的应用、我的数据库获取列表

      tempLoading: true,//模板加载
      tempParm: {},//模板总数据
      tempData: [],//模板组件数据
      applyIdList: [],//选中appid
      isSchoolfellow: false,//是否为校友导航
      schoolfellowInfo: {},//校友导航信息
    };
  },
  created() {
    // 设置网页标题
    document.title = JSON.parse(localStorage.getItem('headerFooterInfo')).userCenterName + '-' + this.$store.getters.appInfo.appName + '-' + JSON.parse(localStorage.getItem('orgInfo')).orgName;
  },
  mounted() {
    this.getUserInfo();
    this.getTemp();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.http.getJson('forward-reader-info').then((res) => {
        this.form = res.data;
        this.infoLoading = false;
      }).catch((err) => {
        this.infoLoading = false;
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取模板组件信息
    getTemp() {
      this.http.getJson('forward-personal-scene-detail').then((res) => {
        this.tempParm = res.data;
        if (res.data.sceneUsers.length) {
          this.myObj = {
            visitorLimitType: res.data.visitorLimitType,
            userSetId: res.data.sceneUsers[0].userSetId,
          }
        } else {
          this.myObj = {
            visitorLimitType: null,
            userSetId: null,
          }
        }

        let tempData = res.data.sceneScreens[0].sceneApps;
        let targetList = []
        let schoolfellowIndex = -1;
        tempData.forEach((item, index) => {
          if (item.appWidget) {
            this.applyIdList.push(item.appId);
            targetList.push(item.appWidget.target);

            // 2022.11.2 重大定制校友导航
            if (item.appWidget.name == '校友导航') {
              this.isSchoolfellow = true;
              schoolfellowIndex = index;
              this.schoolfellowInfo = item;
            }
          }
        })
        this.tempData = schoolfellowIndex == -1 ? tempData.filter(item => item.appWidget) : tempData.filter((item, index) => index != schoolfellowIndex && item.appWidget);
        setTimeout(() => {
          targetList.forEach(target => {
            this.addStyle(target);
            this.addScript(target);
          })
        }, 300);
        this.tempLoading = false;
        this.$nextTick(() => {
          this.dragSort();
        })
      }).catch((err) => {
        this.tempLoading = false;
        this.$message({ type: "error", message: "获取模板组件失败!" });
      });
    },
    //引入css文件
    addStyle(url) {
      url = url + '/component.css?v=' + new Date().getTime();
      var link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    //引入js文件
    addScript(url) {
      url = url + '/component.js?v=' + new Date().getTime();
      var js_element = document.createElement("script");
      js_element.setAttribute("type", "text/javascript");
      js_element.setAttribute("src", url + '?version=' + new Date().getTime());
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
    // 拖动排序
    dragSort() {
      const el = document.getElementById("all-temp-box");
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        draggable: ".sort",
        onEnd: e => {
          // 拖动了但是没有改变位置 不执行
          if (e.newIndex == e.oldIndex) {
            return;
          }
        } //onEnd
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
        }).catch((err) => {
          this.$message({ type: "error", message: "选择应用失败!" });
        });
      } else {
        this.handleCancel(item)
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
  },
};
</script>

<style scoped lang="less">
.content-box {
  width: 100%;
  background: #eeeeee url("../../../../assets/web/img/personal/top-bg.png")
    no-repeat;
  background-size: 100% 804px;
  padding-bottom: 80px;
  .lib-content {
    width: 1200px;
    min-height: calc(100vh - 200px);
    margin: 0 auto;
    position: relative;
    padding-top: 7px;
  }
  /deep/ .my-breadCrumbs {
    &.main_text_color {
      color: #333333;
      font-size: 12px;
    }
  }
}
.no-background {
  background: #eeeeee;
}
.top-content {
  width: 1200px;
  height: 466px;
  background: #f6f7fa;
  border: 1px solid #ffffff;
  box-shadow: 0px 11px 21px #b2cce5;
  border-radius: 16px;
  position: relative;
  margin-top: 24px;
  background: #f6f7fa;
  margin-bottom: 20px;
  padding: 20px;
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
}
.all-temp-box {
  margin-top: 24px;
  overflow: hidden;
  .sort {
    cursor: move;
  }
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
.tmp-box {
  width: 588px;
  height: 320px;
  border-radius: 5px;
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
    border-radius: 5px;
    z-index: 100;

    .edit-right {
      position: absolute;
      right: 20px;
      top: 18px;
      font-weight: 600;
      font-size: 18px;
      /deep/ .el-popover__reference-wrapper {
        width: 100px;
        height: 30px;
        background: #fff;
        display: inline-block;
        text-align: right;
        position: relative;
        left: 1px;
      }
    }
    .hide-more {
      cursor: pointer;
    }
  }
}
</style>
