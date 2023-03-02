<!---数据库导航-总导航管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="4"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }" v-loading="loading">
        <breadcrumb :cuMenu="'总导航管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title"><span class="tab-nav current">读者卡管理</span><span class="tab-nav"
                @click="$router.push('/admin_readerCardSnyc')">同步日志</span></h1>
            <div class="search-term" v-if="dataKey"
              :style="{ 'width': searchTermWidth + 'px', 'max-height': searchTermHeight + 'px' }">
              <!-- 属性组选择 -->
              <div class="search-item-box" v-for="item in selectProperties.slice(0, selectPropLen)" :key="item.code">
                <div class="search-item" v-if="!item.external">
                  <!-- <el-date-picker v-model="searchForm[item.code]" type="date" :placeholder="item.name" v-if="!item.external && item.type==2"></el-date-picker> -->
                  <!-- 属性组是非选择 -->
                  <el-select v-model="searchForm[item.code]" :placeholder="item.name"
                    v-if="!item.external && item.type == 3" clearable>
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                  <!-- 属性组单选选择 -->
                  <el-select :style="{ width: setSelectWidth(item.code) }" v-model="searchForm[item.code]"
                    :placeholder="item.name" v-if="item.type == 4 && item.code != 'User_Depart'" clearable filterable
                    :filter-method="(value) => handleFilter(value, item.code)"
                    v-el-select-loadmore="optionLoadMore(item.code)">
                    <el-option v-for="item in initSelect(item.code)" :key="item.value" :label="item.key"
                      :value="item.value"></el-option>
                  </el-select>
                  <!-- 属性组部门选择 -->
                  <el-cascader v-if="item.code == 'User_Depart'" placeholder="部门" :options="depList"
                    v-model="searchForm[item.code]"
                    :props="{ value: 'fullPath', label: 'name', children: 'children', emitPath: false, expandTrigger: 'hover' }"
                    :show-all-levels="false" clearable></el-cascader>
                </div>
              </div>
              <!-- 文本输入 -->
              <div class="search-item-box text"
                v-if="(textProperties1.length || textProperties2.length || textProperties3.length)">
                <div class="search-item search-item-text" v-if="textProperties1.length">
                  <el-input placeholder="请输入读者姓名" v-model="searchTextValue1" class="textleft input-textleft" clearable>
                  </el-input>
                  <el-select v-model="searchTextcondition1" placeholder="请选择" class="textright">
                    <el-option v-for="(item, index) in textcondition" :key="index" :label="item.label"
                      :value="item.val"></el-option>
                  </el-select>
                </div>
                <div class="search-item search-item-text" v-if="textProperties2.length">
                  <el-input placeholder="请输入" v-model="searchTextValue2" clearable class="textleft">
                    <el-select v-model="searchTextCode2" slot="prepend" placeholder="请选择" style="width:130px"
                      @change="searchTextCodeChange2">
                      <el-option v-for="item in textProperties2" :key="item.code" :label="item.name"
                        :value="item.code"></el-option>
                    </el-select>
                  </el-input>
                  <el-select v-model="searchTextcondition2" placeholder="请选择" v-show="searchTextcondition2 > 0"
                    class="textright">
                    <el-option v-for="(item, index) in textcondition" :key="index" :label="item.label"
                      :value="item.val"></el-option>
                  </el-select>
                </div>
                <div class="search-item search-item-text" v-if="textProperties3.length">
                  <el-input placeholder="请输入" v-model="searchTextValue3" class="textleft" clearable>
                    <el-select v-model="searchTextCode3" slot="prepend" placeholder="请选择" style="width:130px"
                      @change="searchTextCodeChange3">
                      <el-option v-for="item in textProperties3" :key="item.code" :label="item.name"
                        :value="item.code"></el-option>
                    </el-select>
                  </el-input>
                  <el-select v-model="searchTextcondition3" placeholder="请选择" v-show="searchTextcondition3 > 0"
                    class="textright">
                    <el-option v-for="(item, index) in textcondition" :key="index" :label="item.label"
                      :value="item.val"></el-option>
                  </el-select>
                </div>
              </div>
              <!-- 日期选择 -->
              <div class="search-item-box date-item-box" v-if="dateRangeProperties.length">
                <div class="search-item w400">
                  <div class="date-checkbox">
                    <el-select v-model="searchDateCode" placeholder="请选择" style="width: 130px;" clearable>
                      <el-option v-for="item in dateRangeProperties" :key="item.code" :label="item.name"
                        :value="item.code"></el-option>
                    </el-select>
                    <el-date-picker v-model="searchDateValue" value-format="yyyy-MM-dd" type="daterange"
                      range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                  </div>
                </div>
              </div>
            </div>
            <div class="search-term-btn">
              <el-button type="text" icon="el-icon-more" class="more-btn" v-show="showSearchTermMore"
                @click="loadAllSearchTerm">加载更多检索条件</el-button>
              <el-button type="primary" icon="iconfont el-icon-vip-fangdajing" @click="handSearch"
                v-button-debounce>查找</el-button>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <h2 class="m-title">
              <!-- <el-button type="primary" size="medium" @click="$router.push('/readerCardSnyc')">同步日志</el-button> -->
              <div class="r-btn">
                <el-button size="medium" type="primary" class="admin-red-btn" @click="handMathChange"
                  v-has="'card:batchUpdate'">批量修改</el-button>
                <el-button type="primary" size="medium" class="blue-btn" @click="handAdd"
                  v-has="'card:create'">新增读者卡</el-button>
                <el-button type="primary" size="medium" @click="exportExcel" v-has="'card:export'">导出数据</el-button>
                <el-button type="primary" size="medium" @click="syncNow" v-has="'card:increatSync'">增量同步</el-button>
                <!-- <el-button type="primary" size="medium" @click="exportExcel" v-has="'card:increatSync'">增量同步</el-button> -->
                <!-- <el-button type="primary" size="medium" @click="exportExcel" v-has="'card:allSync'">全量同步</el-button> -->
              </div>
            </h2>
            <div class="t-p">
              <el-table @selection-change="handleSelectionChange" v-if="dataKey" ref="singleTable" stripe
                :data="tableData" border :header-cell-style="{ background: '#F1F3F7' }" class="admin-table">
                <el-table-column type="selection" width="50"></el-table-column>
                <template v-for="item in dataKey ? dataKey.showOnTableProperties : []">
                  <el-table-column show-overflow-tooltip :align="getColumnAlign(item.code)"
                    :width="item.displayWidth ? item.displayWidth : 130" :label="item.name" :key="item"
                    v-if="item.code != 'Card_Type'" :min-width="item.code == 'Card_No' ? '150' : ''">
                    <template slot-scope="scope">
                      <a :href="$setHref({ url: '/admin_readerCardEdit', query: { id: scope.row.id } })"
                        v-if="item.code == 'Card_No'" class="hover-line">{{ scope.row.displayNo }}</a>
                      <span v-else>{{ getKeyValue(item.code, scope.row) }}</span>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column prop="content" label="操作" fixed="right" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleDel(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-shanchu-1"
                      class="operate-red-btn" round v-has="'card:delete'">删除</el-button>
                    <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="iconfont el-icon-vip-yulan"
                      round v-has="'card:detail'">查看</el-button>
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
      searchForm: {},//搜索项
      groupSelect: [],//筛选项数据
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
      tableSysArrt: [],
      tableSysArrtKey: [],
      selectProperties: [],//属性组选择列表
      textProperties1: [],
      textProperties2: [],
      textProperties3: [],
      dateRangeProperties: [],//日期选择列表
      searchTextValue1: '',
      searchTextCode2: '',//文本输入code
      searchTextValue2: '',//文本输入值
      searchTextCode3: '',//文本输入code
      searchTextValue3: '',//文本输入值

      textProperties: [
        // { name: '读者姓名', code: 'Name' },
        { name: '学号/工号', code: 'StudentNo' },
        { name: '读者卡号', code: 'CardNo' },
        { name: '物理码', code: 'PhysicNo' },
      ],
      textcondition: [{
        val: 1,
        label: '模糊'
      }, {
        val: 2,
        label: '精确'
      }, {
        val: 3,
        label: '前向'
      }],
      searchType1: 3,
      searchType2: 1,
      dateRangeProperties: [
        { name: '发卡日期', code: 'CardIssueDate' }
      ],
      searchTextCode: '',//文本输入code
      searchTextValue: '',//文本输入值
      searchDateCode: 'CardIssueDate',//日期选择code
      searchDateValue: '',//日期选择值

      searchTextcondition1: 3,
      searchTextcondition2: 0,
      searchTextcondition3: 0,
      searchTermWidth: 1000,
      searchTermHeight: 118,
      showSearchTermMore: false,
      showAll: false,
      selectPropLen: 0,
      depList: [],//部门列表
    }
  },
  created() {
    this.visibleAreaWidth();
  },
  mounted() {
    this.initData();
  },
  methods: {
    visibleAreaWidth() {
      let fullWidth = document.documentElement.clientWidth;
      if (fullWidth > 1800) {
        this.searchTermWidth = 1520;
      } else if (fullWidth > 1640 && fullWidth < 1800) {
        this.searchTermWidth = 1353;
      } else {
        this.searchTermWidth = 1100;
      }
      if (!this.showAll) {
        this.changeSearchTermShow();
      }
    },
    initData() {
      //   this.getSysAttr()
      this.getKey();
      this.getDepList();
      this.getList();
    },
    // 获取初始数据
    getKey() {
      http.getJson('card-init-data').then(res => {
        this.dataKey = res.data;
        // 处理表头
        this.tableSysArrt = res.data.showOnTableProperties && res.data.showOnTableProperties.map(item => {
          return item.code;
        })
        this.sysArrt = res.data.canSearchProperties && res.data.canSearchProperties.map(item => {
          return item.code;
        })
        this.tableSysArrtKey = res.data.showOnTableProperties && res.data.showOnTableProperties.map(item => {
          let icode = '';
          let nm = item.code.split('_')
          if (item.code.indexOf('Card_') !== -1) {
            icode = (nm[0]).toLowerCase() + nm[1];
          } else {
            icode = nm.length > 1 ? nm[1].replace(nm[1][0], nm[1][0].toLowerCase()) : '';
          }
          return icode
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
        // 下拉框选项初始化时控制在10以内  
        res.data.groupSelect.forEach(item => {
          let data = {
            groupCode: item.groupCode,
            groupItems: [],
          };
          if (item.groupItems.length > 500) {
            data.groupItems = item.groupItems.slice(0, 100);
          } else {
            data.groupItems = item.groupItems;
          }
          this.groupSelect.push(data);
        });
        // 筛选项分类
        this.dataKey.canSearchProperties.forEach(item => {
          if (!item.external && (item.type == 0 || item.type == 1 || item.type == 5)) {
            if (item.searchGroup == 1) {
              this.textProperties1.push(item);
            } else if (item.searchGroup == 2) {
              this.textProperties2.push(item);

            } else if (item.searchGroup == 3) {
              this.textProperties3.push(item);
            }
          }
          if (!item.external && item.type == 2) {
            this.dateRangeProperties.push(item);
          }
          if (!item.external && (item.type == 4 || item.type == 3)) {
            this.selectProperties.push(item);
          }
        });
        this.changeSearchTermShow()

        this.searchTextCode2 = this.textProperties2.length ? this.textProperties2[0].code : '';
        this.searchTextCode3 = this.textProperties3.length ? this.textProperties3[0].code : '';
        this.searchTextcondition2 = this.textProperties2.length ? this.textProperties2[0].searchType : 0;
        this.searchTextcondition3 = this.textProperties3.length ? this.textProperties3[0].searchType : 0;
        this.searchDateCode = this.dateRangeProperties.length ? this.dateRangeProperties[0].code : '';
        if (this.textProperties1.length) {
          this.showSearchTermMore = true;
        }
        console.log(this.dataKey, 'dataKey', this.selectProperties)
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
    changeSearchTermShow() {
      if (this.selectProperties.length) {
        if (this.searchTermWidth == 1100 && this.selectProperties.length > 6) {
          this.selectPropLen = 12;
        } else if (this.searchTermWidth == 1353 && this.selectProperties.length > 8) {
          this.selectPropLen = 16;
        } else if (this.searchTermWidth == 1520 && this.selectProperties.length > 9) {
          this.selectPropLen = 18;
        } else if (this.textProperties1.length > 0 || this.textProperties2.length > 0 || this.textProperties3.length > 0) {
          this.selectPropLen = 18;
        } else if (this.dateRangeProperties.length > 0) {
          this.selectPropLen = 18;
        }
      }
    },
    loadAllSearchTerm() {
      this.showAll = true;
      this.showSearchTermMore = false;
      this.selectPropLen = this.selectProperties.length;
      this.searchTermHeight = 1000;
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('card-table-data', { ...this.postForm, ...this.pageData, searchType1: this.searchType1, searchType2: this.searchType2 }).then(res => {
        this.tableData = res.data.items || [];

        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    //获取布局
    getColumnAlign(code) {
      const leftCode = ['Card_No', 'User_Name', 'User_StudentNo', 'Card_PhysicNo']
      if (leftCode.includes(code)) return 'left';
      return 'center';
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
    // 设置筛选项宽度
    setSelectWidth(code) {
      const widthEnty = {
        'User_College': 250,
        'User_CollegeDepart': 250,
        'User_Major': 300,
        'User_Class': 250,
      }
      return (widthEnty[code] || 150) + 'px';
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
        let key = this.tableSysArrtKey[this.tableSysArrt.indexOf(code)];
        // console.log(this.sysArrt, code, key, curItem, 'key')
        if (curItem.type == 2) {//时间
          value = row[key] ? this.dateChangeFormat('YYYY-mm-dd', row[key]) : "";
        } else if (curItem.type == 3) {//是否
          value = row[key] ? '是' : '否';
        } else if (curItem.type == 4) {//属性组
          if (key == 'depart' || key == 'college' || key == 'collegeDepart' || key == 'type' || key == 'cardType') {
            value = row[`${key}Name`];
          } else {
            let slsectItems = this.dataKey.groupSelect.find((item) => (item.groupCode == code)) || {};
            let itemss = slsectItems.groupItems ? (slsectItems.groupItems.find((item) => (item.value == row[this.tableSysArrtKey[this.tableSysArrt.indexOf(code)]]))) : '';
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
            let slsectItems = this.dataKey.groupSelect.find((item) => (item.groupCode == code)) || {};
            let itemss = slsectItems.groupItems ? (slsectItems.groupItems.find((item) => (item.value == items.propertyValue))) : '';
            value = itemss ? itemss.key : '';
          } else if (curItem.type == 5) {//地址
            value = items.propertyValue ? this.showAddrName(items.propertyValue) : "";
          } else {//默认
            value = items ? items.propertyValue : '';
          }
        }
      }
      // console.log(this.sysArrtKey, curItem, value, 'showOnTableProperties')
      return value;
    },
    // 初始化下拉列表
    initSelect(code) {
      if (this.groupSelect.length == 0) return;
      let select = this.groupSelect.find(item => (item.groupCode == code)) || {};
      return select.groupItems ? select.groupItems : [];
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
    // 下拉列表过滤
    handleFilter(val, code) {
      let allList = (this.dataKey.groupSelect.find(item => (item.groupCode == code))).groupItems;
      let curList = [];
      let filterList = [];//筛选出列表 用于下拉列表加载判断
      if (val != '') {
        allList.forEach(item => {
          if (item.key.indexOf(val) != -1) {
            filterList.push(item);
            if (curList.length <= 10) {
              curList.push(item)
            }
          };
        })
      } else {
        curList = allList.slice(0, 10);
      }
      this.groupSelect.forEach(item => {
        if (item.groupCode == code) {
          item.groupItems = curList;
          item.filterList = filterList;
        }
      })
    },
    // 选择框下拉加载
    optionLoadMore(code) {
      return () => {
        let allList = (this.dataKey.groupSelect.find(item => (item.groupCode == code))).groupItems;
        let filterList = (this.groupSelect.find(item => (item.groupCode == code))).filterList;
        let curList = (this.groupSelect.find(item => (item.groupCode == code))).groupItems;
        let curSelectList = filterList && filterList.length > 0 ? filterList : allList;
        if (curSelectList.length > curList.length) {
          curList = curSelectList.slice(0, curList.length + 10);
          this.groupSelect.forEach(item => {
            if (item.groupCode == code) {
              item.groupItems = curList;
            }
          })
        }
      }
    },
    handSearch() {
      // console.log(this.searchDateValue);
      // 处理筛选项
      let search = {};
      for (const item in this.searchForm) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(item)];
        console.log(index)
        search[index] = this.searchForm[item];
      }
      if (this.searchTextValue1) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(this.textProperties1[0].code)];
        search[index] = this.searchTextValue1;
        if (this.searchTextcondition1) {
          search.searchType1 = this.searchTextcondition1;
        }
      }
      if (this.searchTextCode2 && this.searchTextValue2) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(this.searchTextCode2)];
        search[index] = this.searchTextValue2;
        if (this.searchTextcondition2) {
          search.searchType2 = this.searchTextcondition2;
        }
      }
      if (this.searchTextCode3 && this.searchTextValue3) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(this.searchTextCode3)];
        search[index] = this.searchTextValue3;
        if (this.searchTextcondition3) {
          search.searchType3 = this.searchTextcondition3;
        }
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
@import "../../../../assets/admin/css/color.less";
/**颜色配置 */
@import "../../../../assets/admin/css/form.less";

.search-table-general {
  min-width: 1100px;

  .search-term {
    max-height: 120px;
    overflow: hidden;
    line-height: normal;
  }

  .search-term-btn {
    padding: 5px 20px 11px 20px;

    .more-btn {
      margin-right: 10px;
    }

    /deep/ .el-button+.el-button {
      margin-left: 0;
    }
  }
}

.search-item-box {
  display: inline-block;
  margin-right: 10px;

  &.text {
    width: 100%;
  }

  .search-item {
    // width: 150px;
    display: inline-block;
    margin-right: 4px;
    margin-bottom: 15px;

    &.search-item-text {
      margin-right: 10px;
      width: auto;

      /deep/ .textleft {
        width: 400px;
        float: left;

        &.input-textleft,
        .el-input__inner {
          width: 270px;
        }

        .el-input--suffix {
          .el-input__inner {
            width: 130px;
          }
        }
      }

      /deep/ .el-select.textright {
        width: 100px;
        float: left;
        margin-left: 3px;
      }
    }

    /deep/ .el-select {
      width: 150px;
    }

    /deep/ .el-date-editor.el-input,
    .el-input__inner {
      width: 150px;
    }
  }
}

.search-item-box {
  &.date-item-box {
    width: 400px;
  }

  .search-item {
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
  }
}

.w400 {
  width: 400px;
}


/deep/ .el-input {
  margin-bottom: 0 !important;
}
</style>
