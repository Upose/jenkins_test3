<template>
  <div class="page-w">
    <div class="main">
      <div class="main-right">
        <div class="recommend-topic">
          <div>
            <div class="tab-item-bg-color-hover" :class="tabAct4 === 0 ? 'tab-act tab-bg-active' : ''" @click="onTab4(0)">
              <span>我 的</span>
              <span>应 用</span>
            </div>
            <div class="tab-item-bg-color-hover" :class="tabAct4 === 1 ? 'tab-act tab-bg-active' : ''" @click="onTab4(1)">
              <span>全 部</span>
              <span>应 用</span>
            </div>
          </div>
          <div class="list">
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" v-for="(item, index) in 23" :key="index">
                <div class="list-item">
                  <el-image :src="appList[0].img"></el-image>
                  <span>{{ appList[0].title }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="main-left">
        <div class="top">
          <div style="color:#fff">h</div>
          <div class="nav-name">数据库导航</div>
          <div class="sub-btn-b">
            <span class="tab-bg-active tab-item-bg-color-hover">收藏应用</span>
            <span class="child-border-color text-color tab-item-bg-color-hover">取消收藏</span>
          </div>
        </div>
        <div class="tabs">
          <div class="tab-item  text-color-hover2" :class="
              tabAct === index ? 'tab-act text-color child-border-color' : ''
            " v-for="(item, index) in tabs" :key="index" @click="onTab(index)">
            {{ item.label }}
          </div>
        </div>
        <div class="tas-d">
          <div class="database-list-d">
            <el-row :gutter="15">
              <el-col :sm="8" v-for="(item, index) in collegeList" :key="index">
                <div class="list-item">
                  <el-image :src="item.img" class="left-image"></el-image>
                  <el-image :src="require('../../../../assets/web/img/delete-icon.png')" class="delete-image" @click="handleDel(item.databaseID)"></el-image>
                  <div>
                    <span class="t3">{{ item.title }}</span>
                    <div class="collecp-b">
                      <i v-if="item.typeName === '我的收藏'" class="el-icon-star-on" style="color:#5AC79B"></i>
                      <el-image v-if="item.typeName === '最近热门'" :src="require('../../../../assets/web/img/ic21.png')"></el-image>
                      <el-image v-if="item.typeName === '经常访问'" :src="require('../../../../assets/web/img/ic22.png')"></el-image>
                      <span class="t1">{{ item.typeName }}</span>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="tabs">
          <div class="tab-item tab-act child-border-color text-color">
            推荐收藏
          </div>
        </div>
        <el-row>
          <el-col :sm="24" style="margin-top:10px">
            <!-- <ListItem v-for="(item, index) in recommendList" :key="index" title="中国知网(CNKI):期刊论文学位论文会议论文报纸" desc="本校毕业论文库 百度文库(需注册并登陆个人账号)" accessCount="34,567" btnText="添加收藏" :labelType="index < 2 ? 2 : 3" /> -->
            <ListItem v-for="(item, index) in recommendList" :key="index" :title="item.title" :desc="item.introduction" :typename="item.typeName" :accessCount="item.totalCount" btnText="添加收藏" @handleCollege="handleCollege(item.databaseID)" />

          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem2.vue";
export default {
  data() {
    return {
      keywords: "",
      tabAct: 0,
      tabAct4: 0,
      appList: [
        {
          title: "标题标题",
          img: require("../../../../assets/web/img/appimg.png")
        }
      ],

      tabs: [
        {
          label: "我的数据库"
        },
        {
          label: "所有数据库"
        }
      ],
      recommendList: [],//推荐数据库列表
      collegeList: [],//收藏的数据库列表
    };
  },
  components: {
    ListItem
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getRecommend();
      this.getCollect();
    },
    // 获取推荐数据库
    getRecommend() {
      this.http.getJson('recommend-databases').then(res => {
        let list = [...res.data.totalityHotDatabase, ...res.data.monthlyHotDatabase];
        this.recommendList = list;
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取用户收藏数据库
    getCollect() {
      this.http.getJson('collection-database').then(res => {
        this.collegeList = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    //取消收藏
    handleDel(id) {
      this.$confirm('是否从我的数据库删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.http.deleteJsonSelf('collection-database', `?databaseid=${id}`).then(res => {
        this.getCollect();
      }).catch(err => {
        console.log(err);
      })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
      
    },
    // 添加收藏
    handleCollege(id) {
      this.$confirm('是否加入我的数据库?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.http.getJsonSelf('collection-database', `/${id}`).then(res => {
          this.getCollect();
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },

    onTab(idx) {
      this.tabAct = idx;
    },
    onTab2(idx) {
      this.tabAct2 = idx;
    },
    onTab3(idx) {
      this.tabAct3 = idx;
    },
    onTab4(idx) {
      this.tabAct4 = idx;
    },
    onTab5(idx) {
      this.tabAct5 = idx;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less"; /**通用文件 */
@import "../../../../assets/web/css/color.less"; /**通用文件 */
.page-w {
  width: 100%;
  background: #f5f5f5;
  padding: 20px 0;
  .main {
    width: 1200px;
    margin: 40px auto 40px auto;
    display: flex;
  }
}
.main-left {
  width: 893px;
  & > div {
    width: 100%;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav-name {
      width: 198px;
      color: #333;
      font-size: 24px;
      padding: 0 30px 15px 30px;
      border-bottom: 1px solid #cccccc;
    }
    .sub-btn-b {
      display: flex;
      padding: 10px 0;
      & > span {
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #a21e1e;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 10px;
        border: 1px solid transparent;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          color: #fff !important;
        }
      }
      & > span:first-child {
        background: #a21e1e;
        color: #fff;
        &:hover {
          background: rgba(162, 30, 30, 0.8);
        }
      }
      & > span:last-child {
        background: #fff;
        color: #a21e1e;
        border-color: #a21e1e;
        &:hover {
          border-color: rgba(162, 30, 30, 0.5);
        }
      }
    }
  }
  .tabs {
    display: flex;
    align-items: center;
    margin-top: 28px;
    .tab-item {
      padding-bottom: 5px;
      margin-right: 20px;
      font-size: 16px;
      color: #1f1f1f;
      background-size: 100% 100%;
      cursor: pointer;
      border-bottom: 4px solid transparent;
    }
    .tab-act {
      font-size: 18px;
      color: #a21e1e;
      border-color: #a21e1e;
      // background: url("../../../../assets/web/img/tan-bg.png") no-repeat
      //   center top;
      // background-size: 100% 100%;
    }
  }
  .tas-d {
    background: #fff;
    padding: 12px;
  }
  .database-list-d {
    padding: 10px 10px 0 10px;
    .list-item {
      height: 80px;
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      position: relative;
      .left-image {
        width: 80px;
        height: 80px;
      }
      .delete-image {
        position: absolute;
        width: 18px;
        height: 18px;
        top: 0;
        left: 0;
        cursor: pointer;
      }
      & > div {
        & > span {
          color: #333333;
        }
      }
      & > div:last-child {
        flex: 1;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & > div {
          display: flex;
          align-items: center;

          & > i {
            font-size: 16px;
            margin-right: 10px;
          }
          .el-image {
            width: 16px;
            height: 16px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.main-right {
  width: 307px;
  padding-right: 20px;
  & > div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    // & > div:first-child {
    //   padding-right: 10px;
    //   font-size: 16px;
    //   width: 26px;
    //   & > span:first-child {
    //     color: #a21e1e;
    //   }
    // }
  }
  .recommend-topic {
    & > div:first-child {
      width: 26px;
      .tab-act {
        color: #fff !important;
      }
      & > div {
        width: 100%;
        margin-bottom: 10px;
        background: #e7e7e7;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        cursor: pointer;
        padding: 10px 0;
        text-align: center;
        &:hover {
          .tab-act;
        }
      }
    }
    .list {
      background: #fff;
      padding: 20px;
      flex: 1;
      width: 0;
      .list-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        /deep/ .el-image {
          width: 90px;
          height: 90px;
          border: 1px solid #e5e5e5;
        }
        & > span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 40px;
          line-height: 40px;
          color: #333333;
        }
      }
    }
  }
}
</style>
