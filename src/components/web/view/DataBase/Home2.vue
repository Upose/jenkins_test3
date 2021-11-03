<template>
  <div class="page-w">
    <div class="top-w">
      <div class="nav-name">数据库导航</div>
      <div class="tas-d" v-if="pageData.pageIndex == 1">
        <div class="tabs">
          <div class="tab-item text-color-hover2" :class="filterTabAct === index ? 'tab-act  text-color child-border-color' : ''" v-for="(item, index) in tabs" :key="index" @click="onTab(index)">
            {{ item.label }}
          </div>
        </div>
        <div class="database-list-d">
          <el-row :gutter="15">
            <el-col :sm="6" v-for="(item, index) in topShowList" :key="index">
              <div class="list-item">
                <el-image :src="item.cover" class="left-image"></el-image>
                <!-- <el-image :src="require('../../../../assets/web/img/ap22.png')" class="left-image" v-else></el-image> -->
                <div>
                  <span class="t3" @click="handleToDetail(item.databaseID)">{{ item.title }}</span>
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
    </div>
    <div class="main">
      <div class="tab2-d">
        <span class="tab-item child-border-color">所有数据</span>
      </div>
      <div class="filter-d" v-if="postForm">
        <div class="search-b">
          <el-input placeholder="数据名称/介绍" v-model="postForm.serachkey" class="input-with-select">
          </el-input>
          <el-button icon="el-icon-search" class="btn_bg_color" @click="initList"></el-button>
        </div>
        <div class="filter-tabs-d" v-if="sreachData">
          <div class="categ categ1">
            <span>按首宇母顺序浏览数据库:</span>
            <div>
              <div class="cate-item text-color-hover2" v-for="(item, index) in categoryList" :key="index" :class="
                postForm.initials == item
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('initials',item)">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="categ categ1">
            <span>按文献类型浏览数据库:</span>
            <div>
              <div class="cate-item text-color-hover2" v-for="(item, index) in sreachData.articleTypeDtos" :key="index" :class="
                postForm.articletype == item.value
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('articletype',item.value)">
                {{ item.key }}
              </div>
            </div>
          </div>
          <div class="categ categ1">
            <span>按学科浏览数据库:</span>
            <div>
              <div class="cate-item text-color-hover2" :class="
                postForm.domainescs == 'zonghe'
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('domainescs','zonghe')">
                综合
              </div>
              <div class="cate-item text-color-hover2" v-for="(item, index) in sreachData.domainEscDtos" :key="index" :class="
                postForm.domainescs == item.value
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('domainescs',item.value)">
                {{ item.key }}
              </div>
              <div class="cate-item text-color-hover2" :class="
                postForm.domainescs == 'qita'
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('domainescs','qita')">
                其他
              </div>
            </div>
          </div>
          <div class="categ categ1">
            <span>按状态浏览数据库:</span>
            <div>
              <div class="cate-item text-color-hover2" v-for="(item, index) in sreachData.purchaseTypeDtos" :key="index" :class="
                postForm.purchasetype == item.value
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('purchasetype',item.value)">
                {{ item.key }}
              </div>
            </div>
          </div>
          <div class="categ categ1">
            <span>按语种浏览数据库:</span>
            <div>
              <div class="cate-item text-color-hover2" v-for="(item, index) in sreachData.languageDtos" :key="index" :class="
                postForm.languageid == item.value
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('languageid',item.value)">
                {{ item.key }}
              </div>
            </div>
          </div>
          <div class="categ categ1" v-if="setData.canFilterCustomLabel">
            <span>按标签浏览数据库:</span>
            <div>
              <div class="cate-item text-color-hover2" v-for="(item, index) in sreachData.labels" :key="index" :class="
                postForm.languageid == item.value
                  ? 'filter-act text-color child-border-color'
                  : ''
              " @click="handleSearchTab('label',item.value)">
                {{ item.key }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="data-base-list">
        <div class="soft-b">
          <span class="m-title">数据库列表:</span>
          <div class="t-tabs-d">
            <div class="tab-item text-color-hover2" :class="postForm.sorttype === 1 ? 'sort-tab-act  text-color child-border-color' : ''" @click="handleSort(1)">
              推荐排序
            </div>
            <div class="hline"></div>
            <div class="tab-item  text-color-hover2" :class="postForm.sorttype === 2 ? 'sort-tab-act text-color  child-border-color' : ''" @click="handleSort(2)">
              访问量排序
            </div>
            <div class="hline"></div>
            <div class="tab-item text-color-hover2" :class="postForm.sorttype === 3 ? 'sort-tab-act text-color  child-border-color' : ''" @click="handleSort(3)">
              名称首字母
            </div>
          </div>
        </div>
        <el-row>
          <el-col :sm="24" style="margin-top:10px">
            <ListItem v-for="(item, index) in dataBaseList" :key="index" :title="item.title" :desc="item.introduction" :labelType="index < 2 ? 2 : 3" :accessCount="item.totalClickNum" />
          </el-col>
          <pages :total="totalPages" :totalCount="totalCount" :Cindex="pageData.pageIndex" @currentClick="currentClick"></pages>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "./ListItem2.vue";
import pages from '@/components/web/model/pages'
import Pages from '../../model/pages.vue';
export default {
  data() {
    return {
      filterTabAct: 0,
      filterTabAct2: 0,
      filterTabAct3: 0,
      filterTabAct4: 0,
      tabAct: 0,
      tabs: [
        {
          label: "推荐数据库"
        },
        {
          label: "我的数据库"
        }
      ],

      categoryList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      categoryList2: [
        "更多",
        "图书期刊",
        "期刊文献",
        "学位论文",
        "标准",
        "会议",
        "会议"
      ],
      categoryList3: [
        "更多",
        "哲学",
        "经济",
        "学法",
        "学教育",
        "学历史",
        "学理学工"
      ],
      categoryList4: ["中文", "英文"],


      filterTabAct: 0,
      recommendList: [],//推荐数据库列表
      collectList: [],//我的收藏列表
      topShowList: [],//顶部展示列表
      sreachData: null,//筛选项
      setData: null,
      postForm: {
        initials: "",
        articletype: "",
        domainescs: "",
        purchasetype: "",
        languageid: 0,
        serachkey: "",
        label: "",
        sorttype: 1,
      },//搜索参数
      pageData: {
        pageIndex: 1,
        pageSize: 10,
      },//分页参数
      totalPages: 0,//总页数
      dataBaseList: [],//数据库列表
    };
  },
  components: {
    ListItem,
    pages,
    Pages
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.$route.query.keywords) {
        this.postForm.serachkey = this.$route.query.keywords;
      }
      this.getRecommend();
      // this.getCollect();
      this.getKey();
      this.getDatabase();
      this.getSet();
    },
    // 获取推荐数据库
    getRecommend() {
      this.http.getJson('recommend-databases').then(res => {
        let list = [...res.data.mySubscriberDatabase, ...res.data.totalityHotDatabase, ...res.data.monthlyHotDatabase];
        this.recommendList = list.splice(0, 8);
        // this.collectList = res.data.mySubscriberDatabase;
        this.topShowList = this.recommendList;
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取用户收藏数据库
    getCollect() {
      this.http.getJson('collection-database').then(res => {
        // this.sreachData = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取选项
    getKey() {
      this.http.getJson('database-initialized-model').then(res => {
        this.sreachData = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    // 获取设置
    getSet() {
      this.http.getJson('database-settings-portal').then(res => {
        this.setData = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 获取数据库列表
    getDatabase() {
      this.http.getJson('database-terrace-list-portal', { ...this.postForm, ...this.pageData }).then(res => {
        this.dataBaseList = res.data.databaseTerraces.items;
        this.totalPages = res.data.databaseTerraces.totalPages;
        this.totalCount = res.data.databaseTerraces.totalCount;
      }).catch(err => {
        console.log(err);
      })
    },
    // 页面切换
    currentClick(val) {
      this.pageData.pageIndex = val;
      this.getDatabase();
    },
    // 初始化翻页
    initList() {
      this.pageData = {
        pageIndex: 1,
        pageSize: 10,
      }
      this.getDatabase();
    },
    // 点击筛选
    handleSearchTab(name, value) {
      if (name == 'languageid') {
        this.postForm[name] = value == this.postForm[name] ? 0 : value;
      }else {
        this.postForm[name] = value == this.postForm[name] ? '' : value;
      }
      this.getDatabase();
    },
    // 点击排序
    handleSort(val) {
      this.postForm.sorttype = val;
      this.initList();
    },
    // 顶部切换
    onTab(idx) {
      this.filterTabAct = idx;
      // this.topShowList = idx == 0 ? this.recommendList : this.collectList;
    },
    // 前往详情
    handleToDetail(id) {
      this.$router.push({ path: '/dataBaseDetail', query: { databaseid: id } });
    },
    onTab2(idx) {
      this.filterTabAct2 = idx;
    },
    onTab3(idx) {
      this.filterTabAct3 = idx;
    },
    onTab4(idx) {
      this.filterTabAct4 = idx;
    },

  }
};
</script>

<style lang="less" scoped>
@import "../../../../assets/web/css/style.less"; /**通用文件 */
@import "../../../../assets/web/css/color.less"; /**通用文件 */
.page-w {
  width: 100%;
  background-size: 100% 100%;
  background: #f5f5f5;
  padding-bottom: 100px;
  .t1 {
    color: #999999;
    font-size: 12px;
  }
  .t2 {
    color: #333333;
    font-size: 12px;
  }
  .t3 {
    color: #333333;
    font-size: 16px;
  }
  .t143 {
    color: #333333;
    font-size: 14px;
  }
  .main {
    width: 1200px;
    margin: 0 auto 40px auto;
    padding-top: 20px;
    .tab2-d {
      padding: 10px;
      margin-bottom: 13px;
      .tab-item {
        font-size: 18px;
        padding-bottom: 7px;
        border-bottom: 4px solid #a21e1e;
        color: #333333;
      }
    }
  }
  .top-w {
    width: 100%;
    height: 350px;
    background: url("../../../../assets/web/img/tbg12.png");
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-name {
      color: #ffffff;
      font-size: 24px;
      padding: 29px 30px 12px 30px;
      border-bottom: 1px solid #fff;
    }
    .tas-d {
      height: 240px;
      width: 1195px;
      background: #fff;
      padding: 12px;
      margin-top: 25px;
      .tabs {
        display: flex;
        align-items: center;
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

          // border-bottom: 4px solid  #a21e1e;
          // background: url("../../../../assets/web/img/tan-bg.png") no-repeat
          //   center top;
          // background-size: 100% 100%;
        }
      }
    }
    .database-list-d {
      padding: 10px 10px 0 10px;
      .list-item {
        height: 80px;
        width: 100%;
        display: flex;
        margin-bottom: 10px;
        .left-image {
          width: 80px;
          height: 80px;
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
            }
            .el-image {
              width: 16px;
              height: 16px;
            }
            & > span {
              padding-left: 10px;
            }
          }
        }
      }
    }
  }
  .filter-d {
    width: 100%;
    // height: 210px;
    background: #fff;
    padding: 25px 15px 20px 25px;
    display: flex;
    flex-direction: column;
    .filter-tabs-d {
      flex: 1;

      display: flex;
      flex-direction: column;
      & > div {
        padding-top: 15px;
        flex: 1;
        // display: flex;
        display: inline-block;
        align-items: center;
        & > span {
          font-size: 14px;
          color: #1f1f1f;
          padding-right: 20px;
          width: 180px;
          text-align: right;
          display: inline-block;
          vertical-align: top;
        }
        & > div {
          width: 960px;
          display: inline-block;
          & > div {
            margin-right: 30px;
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            display: inline-block;
          }
        }
      }
    }
    .filter-act {
      color: #a21e1e;
    }
    /deep/ .input-with-select {
      width: 260px;
    }
    /deep/ .el-input__inner {
      height: 36px;
      width: 260px;
      border: none;
      outline: none;
      background: #f5f5f5;
    }
    /deep/ .el-button {
      height: 36px;
      width: 60px;
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
  .data-base-list {
    .soft-b {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 40px 0 0 0;
    }
    .m-title {
      .t143;
    }
    .t-tabs-d {
      display: flex;
      align-items: center;
      & > div {
        padding: 10px 0;
        border-bottom: 2px solid transparent;
        cursor: pointer;
      }
      .hline {
        height: 14px;
        width: 2px;
        background: #333;
        padding: 0;
        margin: 0 10px;
      }
      .sort-tab-act {
        color: #a21e1e;
        border-color: #a21e1e;
      }
    }
  }
}
</style>
