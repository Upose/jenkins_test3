<!---数据库导航-总导航管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="4"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}" v-loading="loading">
        <breadcrumb :cuMenu="'总导航管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title"><span class="tab-nav current">读者卡管理</span><span class="tab-nav" @click="$router.push('/admin_readerCardSnyc')">同步日志</span></h1>
            <div class="search-term" v-if="dataKey">
              <div class="search-item-box text">
                <el-input placeholder="请输入" v-model="searchTextValue" style="width:500px" clearable>
                  <el-select v-model="searchTextCode" slot="prepend" placeholder="请选择" style="width:130px">
                    <el-option v-for="item in textProperties" :key="item.code" :label="item.name" :value="item.code"></el-option>
                  </el-select>
                </el-input>
              </div>
              <div class="search-item-box">
                <div class="search-item">
                  <el-select v-model="postForm.cardType" placeholder="卡类型" clearable>
                    <el-option v-for="item in initSelect('Card_Type')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="search-item-box">
                <div class="search-item">
                  <el-select v-model="postForm.cardStatus" placeholder="卡状态" clearable>
                    <el-option v-for="item in initSelect('Card_Status')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <!-- 日期选择 -->
              <div class="search-item-box" v-if="dateRangeProperties.length">
                <div class="search-item w400">
                  <div class="date-checkbox">
                    <el-select v-model="searchDateCode" placeholder="请选择" size="medium" clearable>
                      <el-option v-for="item in dateRangeProperties" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                    <el-date-picker v-model="searchDateValue" value-format="yyyy-MM-dd" size="medium" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </div>
                </div>
              </div>
              <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handSearch">查找</el-button>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <h2 class="m-title">
              <!-- <el-button type="primary" size="medium" @click="$router.push('/readerCardSnyc')">同步日志</el-button> -->
              <div class="r-btn">
                <el-button size="medium" type="primary" class="admin-red-btn" @click="handMathChange" v-if="isAuth('card:batchUpdate')">批量修改</el-button>
                <el-button type="primary" size="medium" class="blue-btn" @click="handAdd" v-if="isAuth('card:create')">新增读者卡</el-button>
                <el-button type="primary" size="medium" @click="exportExcel" v-if="isAuth('card:export')">导出数据</el-button>
                <el-button type="primary" size="medium" @click="syncNow" v-if="isAuth('card:increatSync')">增量同步</el-button>
                <!-- <el-button type="primary" size="medium" @click="exportExcel" v-if="isAuth('card:increatSync')">增量同步</el-button> -->
                <!-- <el-button type="primary" size="medium" @click="exportExcel" v-if="isAuth('card:allSync')">全量同步</el-button> -->
              </div>
            </h2>
            <div class="t-p">
              <el-table @selection-change="handleSelectionChange" v-if="dataKey" ref="singleTable" stripe :data="isAuth('card:list')?tableData:[]" border :header-cell-style="{background:'#F1F3F7'}" class="admin-table">
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column show-overflow-tooltip :align="getColumnAlign(item)" :label="item.name" v-for="item in dataKey.showOnTableProperties" :key="item">
                  <template slot-scope="scope">
                    <span>{{getKeyValue(item.code,scope.row)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="操作" fixed="right" width="260" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1" class="operate-red-btn" round v-if="isAuth('card:delete')">删除</el-button>
                    <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-yulan" round v-if="isAuth('card:detail')">查看</el-button>
                  </template>
                </el-table-column>

              </el-table>
              <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
            </div>
          </div>
          <!--管理页列表 end--->
          <someChange ref="someChange" :dataKey="dataKey" :cardList="multipleSelection"></someChange>
          <dialog_export ref="dialog_export"></dialog_export>
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import dialog_export from '../model/dialog_export'
import someChange from './model/some_change'

export default {
  name: 'index',
  components: { footerPage, serviceLMenu, breadcrumb, paging, dialog_export, someChange },
  data() {
    return {
      loading: false,
      dataKey: null,
      postForm: {},//列表查询参数
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表

      // 系统属性code
      // sysArrt: ['User_Name', 'User_NickName', 'User_StudentNo', 'Card_StudentNo', 'User_Unit', 'User_Edu', 'User_Depart', 'User_Title', 'User_College', 'User_Grade', 'User_Major', 'User_Class', 'User_Type', 'User_Status', 'User_Phone', 'User_IdCard', 'User_Email', 'User_Birthday', 'User_Gender', 'User_AddrDetail', 'User_Addr', 'Card_No', 'User_LeaveTime', 'User_Photo', 'Card_BarCode', 'Card_PhysicNo', 'Card_Type', 'Card_IdentityNo', 'Card_Status', 'Card_IsPrincipal', 'Card_ExpireDate', 'Card_IssueDate', 'Card_Deposit'],
      // 系统属性code对应字段名称
      // sysArrtKey: ['userName', 'nickName', 'userStudentNo', 'studentNo', 'unit', 'edu', 'depart', 'title', 'college', 'grade', 'major', 'class', 'userType', 'userStatus', 'phone', 'idCard', 'email', 'birthday', 'gender', 'addrDetail', 'addr', 'no', 'leaveTime', 'photo', 'barCode', 'physicNo', 'type', 'identityNo', 'status', 'isPrincipal', 'expireDate', 'issueDate', 'deposit'],
      // sysArrtKey: ['name', 'nickName', 'studentNo', 'unit', 'edu', 'depart', 'title', 'college', 'grade', 'major', 'class', 'type', 'status', 'phone', 'idCard', 'email', 'birthday', 'gender', 'addrDetail', 'addr', 'cardNo', 'leaveTime', 'photo', 'cardBarCode', 'cardPhysicNo', 'cardType', 'cardIdentityNo', 'cardStatus', 'cardIsPrincipal', 'cardExpireDate', 'cardIssueDate', 'cardDeposit']
      sysArrt: [],
      sysArrtKey: [],

      textProperties: [
        { name: '读者姓名', code: 'Name' },
        { name: '读者卡号', code: 'CardNo' },
        { name: '物理码', code: 'PhysicNo' },
        { name: '学号', code: 'StudentNo' },
      ],
      dateRangeProperties: [
        { name: '发卡日期', code: 'CardIssueDate' }
      ],
      searchTextCode: '',//文本输入code
      searchTextValue: '',//文本输入值
      searchDateCode: '',//日期选择code
      searchDateValue: '',//日期选择值
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      //   this.getSysAttr()
      this.getKey();
      this.getList();
    },
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_readerCardList'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    // 获取初始数据
    getKey() {
      http.getJson('card-init-data').then(res => {
        this.dataKey = res.data;
        // 处理表头
        this.sysArrt = res.data.canSearchProperties && res.data.canSearchProperties.map(item => {
          return item.code;
        })
        this.sysArrtKey = res.data.canSearchProperties && res.data.canSearchProperties.map(item => {
          let icode = '';
          let nm = item.code.split('_');
          if (item.code.indexOf('User_') !== -1) {
            icode = (nm[0]).toLowerCase() + nm[1];
          } else {
            icode = nm.length > 1 ? nm[1].replace(nm[1][0], nm[1][0].toLowerCase()) : '';
          }
          return icode
        })
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('card-table-data', { ...this.postForm, ...this.pageData }).then(res => {
        this.tableData = res.data.items;

        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    //获取布局
    getColumnAlign(property) {
      var align = 'center';
      return align;
    },
    //获取列宽
    getColumnWidth(property) {
      var width = '110px';
      switch (property.type) {
        case 0:
        case 4:
        case 5:
        case 6:
          width = '120px';
          break;
        case 1:
          width = '110px';
          break;
        case 2:
          width = '150px';
          break;
        case 3:
          width = '100px';
          break;
        default:
          width = '110px';
          break;
      }
      if (property.code == 'User_IdCard') {
        width = '170px';
      }
      if (property.code == 'User_Email') {
        width = '160px';
      }
      return width;
    },
    // 初始化分页数据 并刷新列表
    initGetList() {
      this.pageData = {
        pageIndex: 1,
        pageSize: 20,
      }
      this.getList();
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.getList();
    },
    // 数据处理
    getKeyValue(code, row) {
      let value = '';
      let curItem = this.dataKey.showOnTableProperties.find((item) => (item.code == code));
      if (!curItem.external) {
        let key = this.sysArrtKey[this.sysArrt.indexOf(code)];
        if (curItem.type == 2) {//时间
          value = row[key] ? this.dateChangeFormat('YYYY-mm-dd', row[key]) : "";
        } else if (curItem.type == 3) {//是否
          value = row[key] ? '是' : '否';
        } else if (curItem.type == 4) {//属性组
          let slsectItems = this.dataKey.groupSelect.find((item) => (item.groupCode == code));
          let itemss = slsectItems.groupItems.find((item) => (item.value == row[this.sysArrtKey[this.sysArrt.indexOf(code)]]))
          value = itemss ? itemss.key : row[key];
        } else {//默认
          value = row[key] ? row[key] : '';
        }
      } else {
        if (row.properties.length) {
          let items = row.properties.find((item) => (item.propertyCode == code));
          if (items && items.propertyType == 2) {//时间
            value = items.propertyValue ? this.dateChangeFormat('YYYY-mm-dd', items.propertyValue) : '';
          } else if (items && items.propertyType == 3) {//是否
            value = items.propertyValue ? '是' : '否';
          } else if (items && items.propertyType == 4) {//属性组
            let slsectItems = this.dataKey.groupSelect.find((item) => (item.groupCode == code));
            let itemss = slsectItems.groupItems.find((item) => (item.value == items.propertyValue))
            value = itemss ? itemss.key : '';
          } else {//默认
            value = items ? items.propertyValue : '';
          }
        }
      }
      return value;
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      return select ? select.groupItems : false;
    },
    // 时间格式化
    dateChangeFormat(format, date) {
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
    },
    // 查找
    handSearch() {
      let search = {};
      search['cardType'] = this.postForm.cardType;
      search['cardStatus'] = this.postForm.cardStatus;
      if (this.searchTextCode && this.searchTextValue) {
        // let index = this.sysArrtKey[this.sysArrt.indexOf(this.searchTextCode)];
        search[this.searchTextCode] = this.searchTextValue;
      }
      if (this.searchDateCode && this.searchDateValue) {
        var dateSearchCode = this.searchDateCode;
        dateSearchCode = (dateSearchCode || '').replace('Date', '');
        dateSearchCode = (dateSearchCode || '').replace('Time', '');
        search[dateSearchCode + 'StartTime'] = this.searchDateValue[0];
        search[dateSearchCode + 'EndTime'] = this.searchDateValue[1];
      }

      this.postForm = search;
      // console.log(search);
      this.initGetList();
    },

    // 编辑
    handleSet(row) {
      this.$router.push({ path: '/admin_readerCardEdit', query: { id: row.id } })
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('card', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    /** 新增读者卡 */
    handAdd() {
      this.$router.push('/admin_readerCardAdd');
    },
    //导出excel
    exportExcel() {
      this.$refs.dialog_export.show(this.postForm, this.pageData, 'card')
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量修改
    handMathChange() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: '请勾选需要修改的读者！',
          type: 'warning'
        })
        return;
      }
      this.$refs.someChange.show();
    },
    //新增立即同步任务
    syncNow() {
      http.postJson('add-sync-card-task', {}).then(res => {
        this.$message({ type: 'success', message: '添加同步任务成功，任务执行需要时间，请耐心等待' });
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '添加同步任务失败') });
      })
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.search-item-box {
  display: inline-block;
  margin-right: 10px;
  &.text {
    width: 100%;
  }
}
.search-item {
  width: 150px;
  display: inline-block;
}

.search-table-w .search-title .tab-nav {
  font-size: 18px;
  cursor: pointer;
  margin-right: 40px;
  padding-bottom: 10px;
}
.search-table-w .search-title .current {
  border-bottom: 2px solid @6777EF;
}
.date-checkbox {
  width: 400px;
  display: flex;
  align-items: center;
  // display: inline-block;

  /deep/ .el-select {
    width: 130px;
    color: #909399;

    .el-input__inner {
      background: #f5f7fa;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid #e4e6fc !important;
      border-right: 0;
      color: #909399;
    }
  }
  /deep/ .el-date-editor {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: 270px;

    .el-range-separator {
      width: 30px;
    }
  }
}
.w400 {
  width: 400px;
}
/deep/ .el-input {
  margin-bottom: 0 !important;
}
</style>
