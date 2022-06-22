<!---数据库导航-总导航管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="2"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}" v-loading="loading">
        <breadcrumb :cuMenu="'读者管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">读者管理</h1>
            <!-- 顶部查询 -->
            <div class="search-term" v-if="dataKey">
              <!-- 属性组选择 -->
              <div class="search-item-box" v-for="item in selectProperties" :key="item.code">
                <div class="search-item" v-if="!item.external">
                  <!-- <el-date-picker v-model="searchForm[item.code]" type="date" :placeholder="item.name" v-if="!item.external && item.type==2"></el-date-picker> -->
                  <!-- 属性组是非选择 -->
                  <el-select v-model="searchForm[item.code]" :placeholder="item.name" v-if="!item.external && item.type==3" clearable>
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                  <!-- 属性组单选选择 -->
                  <el-select v-model="searchForm[item.code]" :placeholder="item.name" v-if="item.type == 4 && item.code != 'User_Depart'" clearable filterable :filter-method="(value)=>handleFilter(value,item.code)">
                    <el-option v-for="item in initSelect(item.code)" :key="item.value" :label="item.key" :value="item.value"></el-option>
                    <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect(item.code).length==200"></el-option>
                  </el-select>
                  <!-- 属性组部门选择 -->
                  <el-cascader v-if="item.code == 'User_Depart'" placeholder="部门" :options="depList" v-model="searchForm[item.code]" :props="{ value:'fullPath',label:'name',children:'children',emitPath:false,expandTrigger:'hover' }" :show-all-levels="false" clearable></el-cascader>
                </div>
              </div>
              <!-- 文本输入 -->
              <div class="search-item-box text" v-if="textProperties.length">
                <div class="search-item" style="width:500px">
                  <el-input placeholder="请输入" v-model="searchTextValue" style="width:500px" clearable>
                    <el-select v-model="searchTextCode" slot="prepend" placeholder="请选择" style="width:130px">
                      <el-option v-for="item in textProperties" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                  </el-input>
                </div>
              </div>
              <!-- 日期选择 -->
              <div class="search-item-box" v-if="dateRangeProperties.length">
                <div class="search-item w400">
                  <div class="date-checkbox">
                    <el-select v-model="searchDateCode" placeholder="请选择" clearable>
                      <el-option v-for="item in dateRangeProperties" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                    <el-date-picker v-model="searchDateValue" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </div>
                </div>
              </div>
              <el-button type="primary" icon="iconfont el-icon-vip-fangdajing" @click="handSearch">查找</el-button>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <h2 class="m-title">
              <div class="r-btn">
                <el-button size="medium" type="primary" class="admin-red-btn" @click="handMathChange" v-if="isAuth('reader:batchUpdate')">批量修改</el-button>
                <el-button type="primary" size="medium" class="blue-btn" @click="handAdd" v-if="isAuth('reader:create')">新增读者</el-button>
                <el-button type="primary" size="medium" @click="handleMergeReader" v-if="isAuth('reader:export')">合并读者</el-button>
                <el-button type="primary" size="medium" @click="exportExcel" v-if="isAuth('reader:export')">导出数据</el-button>
                <el-button type="primary" size="medium" @click="importExcel" v-if="isAuth('reader:import')">导入数据</el-button>
              </div>
            </h2>
            <div class="t-p">
              <el-table @selection-change="handleSelectionChange" v-if="dataKey" ref="singleTable" stripe :data="isAuth('reader:list')?tableData:[]" border class="admin-table">
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column show-overflow-tooltip :align="getColumnAlign(item)" :label="item.name" v-for="item in dataKey.showOnTableProperties" :key="item">
                  <template slot-scope="scope">
                    <span @click="clickRow(item,scope.row)" :class="item.code=='User_Name'?'cu-p':''">{{getKeyValue(item.code,scope.row)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="content" label="操作" width="260" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1" class="operate-red-btn" round v-if="isAuth('reader:delete')">删除</el-button>
                    <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-yulan" round v-if="isAuth('reader:detail')">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
            </div>
          </div>
          <!--管理页列表 end--->
          <someChange ref="someChange" :dataKey="dataKey" :userList="multipleSelection"></someChange>
          <dialog_export ref="dialog_export"></dialog_export>
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// // import bus from '@/assets/public/js/bus';;
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import paging from "@/components/admin/model/paging";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import someChange from '../model/some_change';
import dialog_export from '../model/dialog_export';

export default {
  name: 'index',
  components: { footerPage, serviceLMenu, breadcrumb, paging, someChange, dialog_export },
  data() {
    return {
      loading: false,
      dataKey: null,
      groupSelect: [],//筛选项数据
      postForm: {},//列表查询参数
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数
      tableData: [],//列表项
      multipleSelection: [],//勾选列表
      searchForm: {},//搜索项

      // 系统属性code
      // sysArrt: ['User_Name', 'User_SourceFrom', 'User_NickName', 'User_StudentNo', 'User_Unit', 'User_Edu', 'User_Depart', 'User_Title', 'User_College', "User_CollegeDepart", 'User_Grade', 'User_Major', 'User_Class', 'User_Type', 'User_Status', 'User_Phone', 'User_IdCard', 'User_Email', 'User_Birthday', 'User_Gender', 'User_AddrDetail', 'User_Addr', 'User_CreateTime', 'Card_No', 'User_LeaveTime', 'User_Photo', 'Card_BarCode', 'Card_PhysicNo', 'Card_Type', 'Card_IdentityNo', 'Card_Status', 'Card_IsPrincipal', 'Card_ExpireDate', 'Card_IssueDate', 'Card_Deposit'],
      // 系统属性code对应字段名称
      // sysArrtKey: ['name', 'sourceFrom', 'nickName', 'studentNo', 'unit', 'edu', 'depart', 'title', 'college', 'collegeDepart', 'grade', 'major', 'class', 'type', 'status', 'phone', 'idCard', 'email', 'birthday', 'gender', 'addrDetail', 'addr', 'createTime', 'cardNo', 'leaveTime', 'photo', 'cardBarCode', 'cardPhysicNo', 'cardType', 'cardIdentityNo', 'cardStatus', 'cardIsPrincipal', 'cardExpireDate', 'cardIssueDate', 'cardDeposit'],
      sysArrt: [],
      sysArrtKey: [],
      selectProperties: [],//属性组选择列表
      textProperties: [],//文本输入列表
      dateRangeProperties: [],//日期选择列表
      searchTextCode: '',//文本输入code
      searchTextValue: '',//文本输入值
      searchDateCode: '',//日期选择code
      searchDateValue: '',//日期选择值
      depList: [],//部门列表
    }
  },
  mounted() {
    this.initData();
  },
  beforeDestroy() {

  },
  methods: {
    initData() {
      //   this.getSysAttr()
      this.getKey();
      this.getDepList();
      this.getList();
    },
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_readerList'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
        // 处理表头
        this.sysArrt = res.data.canSearchProperties && res.data.canSearchProperties.map(item => {
          return item.code;
        })
        this.sysArrtKey = res.data.canSearchProperties && res.data.canSearchProperties.map(item => {
          let icode = '';
          let nm = item.code.split('_')
          if (item.code.indexOf('Card_') !== -1) {
            icode = (nm[0]).toLowerCase() + nm[1];
          } else {
            icode = nm.length > 1 ? nm[1].replace(nm[1][0], nm[1][0].toLowerCase()) : '';
          }
          return icode
        })
        // console.log(this.sysArrt, this.sysArrtKey, 'sysArrtKey')
        // 下拉框选项初始化时控制在200以内  避免销毁页面时间过长
        res.data.groupSelect.forEach(item => {
          let data = {
            groupCode: item.groupCode,
            groupItems: [],
          };
          if (item.groupItems.length > 200) {
            data.groupItems = item.groupItems.slice(0, 200);
          } else {
            data.groupItems = item.groupItems;
          }
          this.groupSelect.push(data);
        });
        // 筛选项分类
        this.dataKey.canSearchProperties.forEach(item => {
          if (!item.external && (item.type == 0 || item.type == 1 || item.type == 5)) {
            this.textProperties.push(item);
          }
          if (!item.external && item.type == 2) {
            this.dateRangeProperties.push(item);
          }
          if (!item.external && (item.type == 4 || item.type == 3)) {
            this.selectProperties.push(item);
          }
        });
        // console.log(this.dataKey, 'dataKey')
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getDepList() {
      http.getJson('org-list').then(res => {
        this.depList = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    //获取布局
    getColumnAlign(item) {
      let prop = ''
      switch (item.align) {
        case 1:
          prop = 'left';
          break;
        case 2:
          prop = 'center';
          break;
        case 3:
          prop = 'right';
          break;
        default:
          prop = 'center';
          break;
      }
      return prop;
    },
    //获取列宽
    getColumnWidth(property) {
      var width = '110px';
      switch (property.type) {
        case 0:
        case 4:
        case 5:
        case 6:
          width = '130px';
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
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('table-data', { ...this.postForm, ...this.pageData }).then(res => {
        this.tableData = res.data.items;

        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
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
    // 初始化下拉列表
    initSelect(code) {
      if (this.groupSelect.length == 0) return;
      let select = this.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 下拉列表过滤
    handleFilter(val, code) {
      let allList = (this.dataKey.groupSelect.find(item => (item.groupCode == code))).groupItems;
      let curList = [];
      if (val != '') {
        allList.forEach(item => {
          if (item.key.indexOf(val) != -1 && curList.length <= 200) curList.push(item);
        })
      } else {
        curList = allList.slice(0, 200);
      }
      this.groupSelect.forEach(item => {
        if (item.groupCode == code) {
          item.groupItems = curList;
        }
      })
    },
    // 查找
    handSearch() {
      // console.log(this.searchDateValue);
      // 处理筛选项
      let search = {};
      for (const item in this.searchForm) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(item)];
        search[index] = this.searchForm[item];
      }
      if (this.searchTextCode && this.searchTextValue) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(this.searchTextCode)];
        search[index] = this.searchTextValue;
      }
      if (this.searchDateCode && this.searchDateValue) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(this.searchDateCode)];
        index = (index || '').replace('Date', '');
        index = (index || '').replace('Time', '');
        search[index + 'StartTime'] = this.searchDateValue[0];
        search[index + 'EndTime'] = this.searchDateValue[1];
      }

      this.postForm = search;
      // console.log(search);
      this.initGetList();
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
          if (key == 'depart' || key == 'college' || key == 'collegeDepart' || key == 'type' || key == 'cardType') {
            value = row[`${key}Name`];
          } else {
            let slsectItems = this.dataKey.groupSelect.find((item) => (item.groupCode == code));
            let itemss = slsectItems.groupItems.find((item) => (item.value == row[this.sysArrtKey[this.sysArrt.indexOf(code)]]))
            value = itemss ? itemss.key : row[key];
          }
        } else if (curItem.type == 5) {//地址
          value = row[key] ? this.showAddrName(row[key]) : "";
        }
        else {//默认
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
          } else if (curItem.type == 5) {//地址
            value = items.propertyValue ? this.showAddrName(items.propertyValue) : "";
          } else {//默认
            value = items ? items.propertyValue : '';
          }
        }
      }
      return value;
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

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    clickRow(item, row) {
      if (item.code == "User_Name" && this.isAuth('reader:detail')) {
        this.$router.push({ path: '/admin_readerManagement', query: { id: row.id } })
      }
    },
    // 编辑
    handleSet(row) {
      this.$router.push({ path: '/admin_readerManagement', query: { id: row.id } })
    },
    // 删除
    handleDel(row) {
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.deleteJsonSelf('user', `/${row.id}`).then(res => {
          this.getList();
          this.$message({ type: 'success', message: this.dataKey.needApprove ? '删除成功，等待审核！' : '删除成功!' });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除!' });
      });
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
    // 合并读者
    handleMergeReader() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: '请勾选需要合并的读者！',
          type: 'warning'
        })
        return;
      }
      this.$confirm('读者信息合并过程不可逆转，请谨慎操作。是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let list = this.multipleSelection.map(item => {
          return item.id;
        });
        this.$router.push({ path: '/admin_mergeReader', query: { list: JSON.stringify(list) } })
      }).catch(() => { })
    },
    /** 新增读者 */
    handAdd() {
      this.$router.push('/admin_readerAdd');
    },
    // 导入
    importExcel() {
      this.$router.push('/admin_importUser');
    },

    //导出excel
    exportExcel() {
      this.$refs.dialog_export.show(this.postForm, this.pageData, 'reader')
    },
    showAddrName(addr) {
      var addrArray = (addr || "").split('|');
      if (addrArray.length >= 1) {
        return addrArray[0];
      }
      return '';
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
  margin-right: 4px;

  /deep/ .el-date-editor.el-input,
  .el-input__inner {
    width: 150px;
  }
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
.cu-p {
  cursor: pointer;
  &:hover {
    color: @6777EF;
    text-decoration: underline;
  }
}
</style>
