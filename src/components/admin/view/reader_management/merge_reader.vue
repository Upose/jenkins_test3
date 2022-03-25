<!---数据库导航-总导航管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'总导航管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">合并读者</h1>
            <div class="user-top-box">
              <span>已选择<span class="color-g">{{userNumber}}个</span>读者，是否合并读者信息？</span>
              <el-button type="primary" @click="handleMerge">确认并合并</el-button>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <div class="t-p">
              <div class="coml-body">
                <div class="coml-box" style="width:80px">
                  <div v-loading="loading" class="el-table admin-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
                    <div class="el-table__header-wrapper">
                      <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 1573px;">
                        <thead class="has-gutter">
                          <tr class="">
                            <th class="is-center is-leaf" style="height:120px">
                              <div class="cell">读者卡</div>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="el-table__body-wrapper is-scrolling-none">
                      <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 1573px;">
                        <tbody>
                          <tr class="el-table__row" v-for="item in titleList" :key="item">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item}}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="coml-box" v-for="(item,index) in tableData" :key="index">
                  <div class="el-table admin-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition">
                    <div class="el-table__header-wrapper">
                      <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 1573px;">
                        <thead class="has-gutter">
                          <tr class="">
                            <th colspan="1" rowspan="1" class="el-table_1_column_1   is-leaf" style="height:120px">
                              <div v-if="item.cardId">
                                <div class="cell card_title">
                                  读者卡信息
                                  <div>设为主卡：<el-switch v-model="item.isMainCard" @change="handleChangeMainCard(item.sort)"></el-switch>
                                  </div>
                                </div>
                                <div class="cell">卡号：{{item.cardNo}}</div>
                                <div class="cell">卡类型：{{item.cardTypeName}}</div>
                                <div class="cell">卡状态：{{item.cardStatusName}}</div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div class="el-table__body-wrapper is-scrolling-none">
                      <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 1573px;">
                        <tbody>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-1')?'bg_check':''" @click="handleCheckUse(item.sort+'-1',[{name:item.name}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.name}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-2')?'bg_check':''" @click="handleCheckUse(item.sort+'-2',[{typeName:item.typeName},{type:item.type}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.typeName}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-3')?'bg_check':''" @click="handleCheckUse(item.sort+'-3',[{title:item.title}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.title}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-4')?'bg_check':''" @click="handleCheckUse(item.sort+'-4',[{collegeName:item.collegeName},{college:item.college}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.collegeName}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-5')?'bg_check':''" @click="handleCheckUse(item.sort+'-5',[{collegeDepartName:item.collegeDepartName},{collegeDepart:item.collegeDepart}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.collegeDepartName}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-6')?'bg_check':''" @click="handleCheckUse(item.sort+'-6',[{major:item.major}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.major}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-7')?'bg_check':''" @click="handleCheckUse(item.sort+'-7',[{grade:item.grade}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.grade}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-8')?'bg_check':''" @click="handleCheckUse(item.sort+'-8',[{birthday:item.birthday}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{setTime(item.birthday)}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-9')?'bg_check':''" @click="handleCheckUse(item.sort+'-9',[{gender:item.gender}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.gender}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-10')?'bg_check':''" @click="handleCheckUse(item.sort+'-10',[{edu:item.edu}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.edu}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-11')?'bg_check':''" @click="handleCheckUse(item.sort+'-11',[{departName:item.departName},{depart:item.depart}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.departName}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-12')?'bg_check':''" @click="handleCheckUse(item.sort+'-12',[{phone:item.phone}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.phone}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-13')?'bg_check':''" @click="handleCheckUse(item.sort+'-13',[{idCard:item.idCard}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.idCard}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-14')?'bg_check':''" @click="handleCheckUse(item.sort+'-14',[{addr:item.addr},{addrDetail:item.addrDetail}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.addr&&item.addr!=''?item.addr.split('|')[0]:''}}{{(item.addrDetail)}}</div>
                            </td>
                          </tr>
                          <tr class="el-table__row" :class="isCheck(item.sort+'-15')?'bg_check':''" @click="handleCheckUse(item.sort+'-15',[{statusName:item.statusName},{status:item.status}])">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1 is-center ">
                              <div class="cell">{{item.statusName}}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/public/js/bus';
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb },
  data() {
    return {
      loading:false,
      userId: '',
      userList: [],
      userNumber: 1,//选择读者数量
      titleList: ['姓名', '读者类型', '职称', '学院', '系', '专业', '年级', '生日', '性别', '学历', '部门', '手机号', '身份证号', '地址', '读者状态'],
      tableData: [],//列表项
      userData: {},//有效信息
      userCheckList: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11', '1-12', '1-13', '1-14', '1-15'],//有效信息标记
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      if (this.$route.query.id) {
        this.userId = this.$route.query.id;
        this.getList();
      } else {
        this.userList = JSON.parse(this.$route.query.list);
        this.postList();
      }
    },
    // 获取列表数据
    postList() {
      this.loading = true;
      http.postJson('merge-info', this.userList).then(res => {
        this.tableData = res.data;
        this.tableData[0].isMainCard = true;
        this.userData = { ...res.data[0] };
        this.userNumber = this.tableData.length;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJsonSelf('merge-info', `/${this.$route.query.id}`).then(res => {
        this.tableData = res.data;
        this.tableData[0].isMainCard = true;
        this.userData = { ...res.data[0] };
        this.userNumber = this.tableData.length;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 有效信息判定
    isCheck(val) {
      return this.userCheckList.indexOf(val) != -1 ? true : false;
    },
    // 切换主卡
    handleChangeMainCard(sort) {
      this.tableData.forEach(item => {
        item.isMainCard = item.sort == sort ? true : false;
        this.userData = item;
      })
      this.userCheckList = [];
      for (let index = 1; index < 16; index++) {
        this.userCheckList.push(sort + '-' + index);
      }
    },
    // 选择有效项
    handleCheckUse(site, list) {
      for (let index = 1; index < 16; index++) {
        if (site.split('-')[1] == index) {
          this.$set(this.userCheckList, index - 1, site);
        }
      }
      list.forEach(item => {
        this.userData[Object.keys(item)[0]] = Object.values(item)[0];
      })
    },
    // 确认并合并
    handleMerge() {
      let userIds = this.tableData.map(item => {
        return item.id;
      })
      http.postJson('merge-user-info', { ...this.userData, userIds: userIds }).then(res => {
        this.$message({ type: 'success', message: '合并成功!' });
        if (this.userId) {
            // this.$router.replace({ path: '/admin_readerManagement', query: { id: res.data } })
            this.$route.query.newId = res.data;
            this.$router.back();
        } else {
          this.$router.back();
        }

      }).catch(err => {
        this.$message({ type: 'error', message: '合并失败!' });
      })
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";

.user-top-box {
  margin-left: 40px;
  padding: 10px 0;
}
.coml-body {
  display: flex;
  overflow-x: scroll;
}
.coml-box {
  min-width: 250px;
}
.card_title {
  margin-bottom: 5px;
  & > div {
    float: right;
  }
}
.bg_check > td {
  background: #c9d0ff !important;
}
.color-g {
  color: @6777EF;
}
</style>
