<template>
  <div class="page-w">
    <div class="main">
      <div class="main-right">
        <div class="list-title">
          <span class="tab-bg-active"></span>
          <span class="text-color">查找</span>
          <span>数据库</span>
        </div>
        <div class="search-d">
          <div class="search-b">
            <el-input placeholder="搜索数据库名称" v-model="keywords" class="input-with-select">
            </el-input>
            <el-button icon="el-icon-search" class="btn_bg_color" @click="handleSearch"></el-button>
          </div>
        </div>
        <div class="list-title">
          <span class="tab-bg-active"></span>
          <span class="text-color">推荐</span>
          <span>数据库</span>
        </div>
        <div class="data-base-list-d">
          <div class="list-item" v-for="(item, index) in recommendList" :key="index">
            <div class="d1 text-color-hover">
              <i class="el-icon-caret-right"></i>
              <span class="cp" @click="handleToDetail(item.databaseID)">{{ item.title }}</span>
            </div>
            <div v-if="item.typeName" class="d2">
              <i v-if="item.typeName === '我的收藏'" class="el-icon-star-on" style="color:#5AC79B"></i>
              <el-image v-if="item.typeName === '最近热门'" :src="require('../../../../assets/web/img/ic21.png')"></el-image>
              <el-image v-if="item.typeName === '经常访问'" :src="require('../../../../assets/web/img/ic22.png')"></el-image>
              <span>{{ item.typeName }}</span>
            </div>
            <div class="d3">{{ item.introduction }}</div>
          </div>
        </div>
      </div>
      <div class="main-left">
        <div class="site-info-d">
          <div class="title-b">
            <span class="title">{{detail.title}}</span>
            <div class="collepc-btn child-border-color" v-if="detail.isCollected">
              <i class="el-icon-star-on text-color"></i>
              <span class="text-color">已收藏</span>
            </div>
            <div class="collepc-btn child-border-color" v-else>
              <!-- <i class="el-icon-star-on text-color"></i> -->
              <span class="text-color" @click="handleCollege">添加收藏</span>
            </div>
          </div>
          <div class="star-b">
            <i class="el-icon-star-on" v-for="(item, index) in 5" :key="index"></i>
          </div>
          <div class="enter-site-b">
            <div class="tab-text child-border-color">入口地址</div>
            <div class="site-item" v-for="(item, index) in detail.directUrls" :key="index">
              <span>{{ index + 1 + "." }}{{ item.name }}:</span>
              <span @click="onLink(item.url)">{{ item.url }}</span>
            </div>
          </div>
          <div class="content-cate-b" v-if="dataKey">
            <div>
              <span>内容分类：</span>
              <div>
                <span v-for="(item, index) in detail.articleTypes" :key="index">{{
                  getKeyValue('articleTypeDtos',item)
                }}</span>
              </div>
            </div>
            <div>
              <span>学科分类：</span>
              <div>
                <span v-for="(item, index) in detail.domainEscs" :key="index">{{
                  getKeyValue('domainEscDtos',item)
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tabs-d child-tab-color" v-if="dataKey">
          <div class="tab-item " :class="tabAct === item ? 'tab-act' : ''" v-for="(item, index) in setData.introduce" :key="index" @click="onTab(item)">
            {{ getKeyValue('otherIntroduceDtos',item) }}
          </div>
        </div>
        <div class="content-tabs-d">
          <div v-html="detail.useGuide" v-if="tabAct == 1"></div>
          <div v-html="detail.information" v-if="tabAct == 2"></div>
          <!-- <div class="title">中国知网属于综合性文献信息服务平台，目前我校购买的资源主要包括: </div>
          <div class="list">
            <div class="list-item" v-for="(item, index) in ctabsList" :key="index">
              <span>{{ item.title }}</span>
            </div>
          </div>
          <div class="site-text-b">
            <span>本地镜像地址：</span>
            <span>http://222.198.130.63/knvs35</span>
            <span>(教育网 本校有效IP登录极少数需要到知网服务器下载)</span>
          </div> -->
          <div class="introduction-b">
            <span>简介：</span>
            <span>{{detail.introduction}}</span>
          </div>
          <div class="introduction-b introduction-b2" v-if="setData.isOpenComment">
            <span>是否对您有用: </span>
            <span>
              <!-- <i class="el-icon-star-on my-star" v-for="(item, index) in 5" :key="index"></i> -->
              <el-rate v-model="rate"></el-rate>
            </span>
          </div>
          <div class="introduction-b introduction-b3" v-if="setData.isOpenFeedback">
            <span>意见反馈（请先登陆）: </span>
            <div>
              <el-input type="textarea" :rows="10" disabled placeholder="" resize="none" v-model="textarea">
              </el-input>
              <div class="sub-btn-b">
                <span class="btn_bg_color">确定</span>
                <span class="child_border_color text-color">清空</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      tabAct: 0,
      tabs: [
        {
          label: "资源详情"
        },
        {
          label: "常见问题"
        },
        {
          label: "使用指南"
        }
      ],

      id: this.$route.query.databaseid,//数据库id
      recommendList: [],//推荐数据库
      detail: {},//数据库详情
      dataKey: null,//键值对数据
      setData: null,//设置数据
      rate: '',//评分
    };
  },
  components: {},
  watch: {
    // '$router'(to,from){
    //   this.$router.go(0)
    // }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getRecommend();
      this.getDetail();
      this.getKey();
      this.getSet();
    },
    // 获取推荐数据库
    getRecommend() {
      this.http.getJson('recommend-databases').then(res => {
        let list = [...res.data.mySubscriberDatabase, ...res.data.totalityHotDatabase, ...res.data.monthlyHotDatabase];
        this.recommendList = list.splice(0, 5);
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取数据库详情
    getDetail() {
      this.http.getJson('database-terrace-portal', { databaseid: this.id }).then(res => {
        this.detail = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取选项
    getKey() {
      this.http.getJson('database-initialized-model').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    // 键值对匹配
    getKeyValue(name, value) {
      let items = this.dataKey[name].find(item => (item.value == value));
      return items ? items.key : '';
    },
    // 获取设置
    getSet() {
      this.http.getJson('database-settings-portal').then(res => {
        this.setData = res.data;
        this.tabAct = res.data.introduce.length > 0 ? res.data.introduce[0] : 0;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    //搜索
    handleSearch() {
      this.$router.push({ path: '/dataBaseHome2', query: { keywords: this.keywords } })
    },
    //收藏
    handleCollege() {
      this.http.getJsonSelf('collection-database', `/${this.id}`).then(res => {
        this.getDetail();
        this.$message({ type: 'success', message: '收藏成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: '收藏失败!' });
      })
    },
    // 前往详情
    handleToDetail(id) {
      this.$router.push({ path: '/dataBaseDetail', query: { databaseid: id } });
    },
    // 点击链接
    onLink(url) {
      location.href = url;
    },
    // 切换tab
    onTab(index) {
      this.tabAct = index;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less"; /**通用文件 */
@import "../../../../assets/web/css/color.less"; /**通用文件 */
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #a21e1e;
  border-color: #a21e1e;
}
/deep/ .el-checkbox__inner:hover {
  // background: #a21e1e;
  border-color: #a21e1e;
}

.page-w {
  width: 100%;
  background: #f5f5f5;
  padding-bottom: 20px;
  .main {
    width: 1200px;
    margin: 40px auto 40px auto;
    display: flex;
    padding-top: 25px;
  }
}
.list-title {
  padding: 0 0 20px 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  & > span:first-child {
    height: 22px;
    width: 4px;
    background: #a21e1e;
    margin-right: 10px;
  }
  & > span:nth-child(2) {
    color: #a21e1e;
  }
  & > span:last-child {
    color: #333;
  }
}
.search-d {
  padding-bottom: 29px;
  /deep/ .input-with-select {
    width: 265px;
  }
  /deep/ .el-input__inner {
    height: 40px;
    width: 265px;
    border: none;
    outline: none;
  }
  /deep/ .el-button {
    height: 40px;
    width: 40px;
    background: #a21e1e;
    border: none;
  }
  /deep/ .el-icon-search {
    font-size: 21px;
    color: #fff;
  }
  .search-b {
    display: flex;
    align-items: center;
  }
}
.data-base-list-d {
  padding: 0 16px;
  background: #fff;
  .list-item {
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px dashed #a0a0a0;
    & > div {
      color: #666;
      font-size: 12px;
    }
    .d1 {
      margin-bottom: 10px;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #333333;
      i {
        color: #333333;
        padding-right: 10px;
      }
    }
    .d2 {
      margin-bottom: 15px;
      padding-left: 22px;
      display: flex;
      align-items: center;
      .el-image {
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
    }
    .d3 {
      margin-bottom: 20px;
      padding-left: 22px;
      width: 220px;
      line-height: 30px;
      font-size: 12px;
      color: #666;
    }
  }
  .list-item:last-child {
    border: none;
  }
}
.main-left {
  flex: 1;
  & > div {
    width: 100%;
  }
  .site-info-d {
    padding: 25px 20px 13px 20px;
    background: #fff;
    .title-b {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      .title {
        font-size: 20px;
        color: #000;
      }
      .collepc-btn {
        width: 81px;
        height: 25px;
        text-align: center;
        background: #ffffff;
        border: 1px solid #a21e1e;
        border-radius: 7px 7px 7px 7px;
        color: #a21e1e;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
        margin-top: -10px;
        & > i {
          font-size: 19px;
          margin-right: 5px;
        }
      }
    }
    .star-b {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      i {
        color: #eb5f3c;
        font-size: 19px;
        margin-right: 10px;
      }
    }
    .enter-site-b {
      .tab-text {
        width: 70px;
        text-align: center;
        font-size: 14px;
        color: #101010;
        padding: 5px 3px;
        border-bottom: 3px solid #a21e1e;
        margin-bottom: 15px;
      }
      .site-item {
        font-size: 14px;
        color: #333;
        padding-bottom: 10px;
        & > span:last-child {
          color: #0d79ab;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    .content-cate-b {
      margin-top: 10px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      & > div {
        display: flex;
        align-items: center;
        & > span {
          color: #999999;
          font-size: 14px;
        }
        & > div {
          display: flex;
          align-items: center;
          & > span {
            color: #1f1f1f;
            font-size: 14px;
            padding-right: 20px;
          }
        }
      }
      & > div:first-child {
        margin-bottom: 15px;
      }
    }
  }

  .tabs-d {
    display: flex;
    align-items: center;
    padding: 15px 10px 0 10px;
    .tab-item {
      padding: 10px 0;
      font-size: 16px;
      color: #333;
      border-bottom: 3px solid transparent;
      margin-right: 37px;
      cursor: pointer;
    }
    .tab-act {
    }
  }
  .content-tabs-d {
    padding: 26px;
    background: #fff;
    font-size: 14px;
    color: #333;
    .title {
      padding-bottom: 20px;
    }
    .list {
      .list-item {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        // & > span::before {
        //   display: inline-block;
        //   content: "";
        //   width: 9px;
        //   height: 9px;
        //   border-radius: 50%;
        //   background: #f5f5f5;
        //   margin-right: 5px;
        // }
      }
    }
    .site-text-b {
      & > span:nth-child(2) {
        color: #0d79ab;
        cursor: pointer;
        &:hover {
        }
      }
      & > span:last-child {
        color: #a21e1e;
      }
    }
  }
  .introduction-b {
    padding: 17px 0;
    margin: 35px 0 20px 0;
    font-size: 14px;
    color: #333;
    border-top: 1px dashed #d2d2d2;
    border-bottom: 1px dashed #d2d2d2;
    display: flex;
    flex-direction: column;
    line-height: 24px;
  }
  .introduction-b2 {
    margin: 0 0 20px 0;
    border-top: none;
    padding-top: 0;
    .my-star {
      font-size: 28px;
      color: #999;
      margin-top: 10px;
    }
  }
  .introduction-b3 {
    margin: 0 0 20px 0;
    border-top: none;
    padding-top: 0;
    margin: 0;
    border-bottom: 0;
    padding-bottom: 0;
    .sub-btn-b {
      display: flex;
      padding: 18px 0 0 0;
      & > span {
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #a21e1e;
        border-radius: 4px;
        font-size: 14px;
        margin-right: 16px;
        border: 1px solid transparent;
        cursor: pointer;
        box-sizing: border-box;
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
}
.main-right {
  width: 307px;
  margin-right: 20px;
  & > div {
    width: 100%;
  }
}
.cp {
  cursor: pointer;
}
</style>
