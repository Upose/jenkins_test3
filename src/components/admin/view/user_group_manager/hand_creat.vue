<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }" v-loading="loading1">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">
              手动添加
            </h1>
          </div>
          <!--顶部查询 end-->

          <!-- 目录 -->
          <div class="content-box">
            <el-form ref="postForm" :model="postForm" label-width="110px" :rules="rules">
              <el-form-item label="用户组名称：" class="w500" prop="name">
                <el-input v-model="postForm.name" class="w500" minlength="2" maxlength="10" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" :rows="3" v-model="postForm.desc" class="w500" maxlength="100" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="选择读者：">
                <el-tabs v-model="activeName" style="min-width:930px">
                  <el-tab-pane label="选择" name="选择">
                    <div class="rule-box" v-if="dataKey">
                      <div class="search-box" v-if="dataKey">
                        <!-- 属性组选择 -->
                        <div class="search-item-box" v-for="item in selectProperties.slice(0, selectPropLen)" :key="item.code">
                          <div class="search-item" v-if="!item.external">
                            <!-- <el-date-picker v-model="searchForm[item.code]" type="date" :placeholder="item.name" v-if="!item.external && item.type==2"></el-date-picker> -->
                            <!-- 属性组是非选择 -->
                            <el-select v-model="searchForm[item.code]" :placeholder="item.name" v-if="!item.external && item.type==3" clearable>
                              <el-option label="是" :value="true"></el-option>
                              <el-option label="否" :value="false"></el-option>
                            </el-select>
                            <!-- 属性组单选选择 -->
                            <el-select :style="{width:setSelectWidth(item.code)}" v-model="searchForm[item.code]" :placeholder="item.name" v-if="item.type == 4 && item.code != 'User_Depart'" clearable filterable :filter-method="(value)=>handleFilter(value,item.code)" v-el-select-loadmore="optionLoadMore(item.code)">
                              <el-option v-for="item in initSelect(item.code)" :key="item.value" :label="item.key" :value="item.value"></el-option>
                            </el-select>
                            <!-- 属性组部门选择 -->
                            <el-cascader v-if="item.code == 'User_Depart'" placeholder="部门" :options="depList" v-model="searchForm[item.code]" :props="{ value:'fullPath',label:'name',children:'children',emitPath:false,expandTrigger:'hover' }" :show-all-levels="false" clearable></el-cascader>
                          </div>
                        </div>
                        <!-- 文本输入 -->
                        <template v-if="(textProperties1.length||textProperties2.length||textProperties3.length)">
                          <div class="search-item-box">
                            <div class="search-item search-item-text" v-if="textProperties1.length">
                              <el-input placeholder="请输入读者姓名" v-model="searchTextValue1" class="textleft input-textleft" clearable>
                              </el-input>
                              <el-select v-model="searchTextcondition1" placeholder="请选择" class="textright">
                                <el-option v-for="(item, index) in textcondition" :key="index" :label="item.label" :value="item.val"></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="search-item-box">
                            <div class="search-item search-item-text" v-if="textProperties2.length">
                              <el-input placeholder="请输入" v-model="searchTextValue2" clearable class="textleft">
                                <el-select v-model="searchTextCode2" slot="prepend" placeholder="请选择" style="width:130px" @change="searchTextCodeChange2">
                                  <el-option v-for="item in textProperties2" :key="item.code" :label="item.name" :value="item.code"></el-option>
                                </el-select>
                              </el-input>
                              <el-select v-model="searchTextcondition2" placeholder="请选择" v-show="searchTextcondition2>0" class="textright">
                                <el-option v-for="(item, index) in textcondition" :key="index" :label="item.label" :value="item.val"></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="search-item-box">
                            <div class="search-item search-item-text" v-if="textProperties3.length">
                              <el-input placeholder="请输入" v-model="searchTextValue3" class="textleft" clearable>
                                <el-select v-model="searchTextCode3" slot="prepend" placeholder="请选择" style="width:130px" @change="searchTextCodeChange3">
                                  <el-option v-for="item in textProperties3" :key="item.code" :label="item.name" :value="item.code"></el-option>
                                </el-select>
                              </el-input>
                              <el-select v-model="searchTextcondition3" placeholder="请选择" v-show="searchTextcondition3>0" class="textright">
                                <el-option v-for="(item, index) in textcondition" :key="index" :label="item.label" :value="item.val"></el-option>
                              </el-select>
                            </div>
                          </div>
                        </template>
                        <!-- 日期选择 -->
                        <div class="search-item-box date-item-box" v-if="dateRangeProperties.length">
                          <div class="search-item w400">
                            <div class="date-checkbox">
                              <el-select v-model="searchDateCode" placeholder="请选择" style="width: 130px;" clearable>
                                <el-option v-for="item in dateRangeProperties" :key="item.code" :label="item.name" :value="item.code"></el-option>
                              </el-select>
                              <el-date-picker v-model="searchDateValue" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </div>
                          </div>
                        </div>
                        <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="handleSearch" v-button-debounce>查找</el-button>
                      </div>

                      <div class="btn-box">
                        <el-button type="primary" size="mini" class="add-btn" @click="hanleAddList">加入</el-button>
                        <el-button type="primary" size="mini" class="cal-btn" @click="hanleDelList">移除</el-button>
                      </div>
                      <el-table v-loading="loading" :data="tableData" style="width: 56%" class="table-box" height="600px" @selection-change="handleAddChange">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="studentNo" label="学号/工号" min-width="75" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="75" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sourceFrom" label="用户来源" width="95" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{getKeyValue('User_SourceFrom',scope.row.sourceFrom)}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="手机" min-width="95" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type" label="用户类型" min-width="95" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{getKeyValue('User_Type',scope.row.type)}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="prop" label="注册日期" min-width="115" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{setTime(scope.row.createTime) }}
                          </template>
                        </el-table-column>
                      </el-table>

                      <el-table :data="chanceData" style="width: 40%;float:right" class="table-box" height="600px" @selection-change="handleDelChange">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="studentNo" label="学号/工号" min-width="75" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="75" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{scope.row.name || scope.row.userName}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="sourceFrom" label="用户来源" min-width="95" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{getKeyValue('User_SourceFrom',scope.row.sourceFrom)}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="手机" min-width="95" align="center" show-overflow-tooltip></el-table-column>
                      </el-table>
                      <paging style="text-align:left;padding-left:40px" :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="导入" name="导入">
                    <div class="rule-box">
                      <div style="padding:20px">
                        <el-button type="primary" size="medium" class="blue-btn" @click="handleDownload" v-button-debounce>下载模板</el-button>
                        <el-button type="primary" size="medium" @click="$refs.uploadFile.show()">导入数据</el-button>
                      </div>
                      <div class="btn-box">
                        <el-button type="primary" size="mini" class="add-btn" @click="hanleAddList">加入</el-button>
                        <el-button type="primary" size="mini" class="cal-btn" @click="hanleDelList">移除</el-button>
                      </div>
                      <el-table :data="tableDataImp" style="width: 56%" class="table-box" height="600px" @selection-change="handleAddChange" :row-class-name="tableRowClassName">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="85" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="phone" label="手机" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="idCard" label="身份证" align="center" show-overflow-tooltip></el-table-column>
                      </el-table>

                      <el-table :data="chanceDataImp" style="width: 40%;float:right" class="table-box" height="600px" @selection-change="handleDelChange">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="name" label="姓名" min-width="85" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{scope.row.name || scope.row.userName}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="手机" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="idCard" label="身份证" align="center" show-overflow-tooltip></el-table-column>
                      </el-table>
                    </div>
                  </el-tab-pane>
                </el-tabs>

              </el-form-item>
              <el-form-item>
                <el-button size="medium" @click="reset" icon="iconfont el-icon-vip-chushi">重 置</el-button>
                <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="validateRun" v-button-debounce>保 存</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--管理页列表 end--->
          <uploadFile ref="uploadFile" @uploadSuccess="getListImport"></uploadFile>
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from "@/assets/public/js/bus";
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import paging from "@/components/admin/model/paging";
import uploadFile from './model/uploadFile'



export default {
  name: "index",
  created() {
    // bus.$on("collapse", (msg) => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // });
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, uploadFile },
  data() {
    return {
      loading: false,
      loading1: false,
      id: this.$route.query.id,
      dataKey: null,
      groupSelect: [],
      // 系统属性code
      sysArrt: ['User_Name', 'User_SourceFrom', 'User_NickName', 'User_StudentNo', 'User_Unit', 'User_Edu', 'User_Depart', 'User_Title', 'User_College', "User_CollegeDepart", 'User_Grade', 'User_Major', 'User_Class', 'User_Type', 'User_Status', 'User_Phone', 'User_IdCard', 'User_Email', 'User_Birthday', 'User_Gender', 'User_AddrDetail', 'User_Addr', 'User_CreateTime', 'Card_No', 'User_LeaveTime', 'User_Photo', 'Card_BarCode', 'Card_PhysicNo', 'Card_Type', 'Card_IdentityNo', 'Card_Status', 'Card_IsPrincipal', 'Card_ExpireDate', 'Card_IssueDate', 'Card_Deposit'],
      // 系统属性code对应字段名称
      sysArrtKey: ['name', 'sourceFrom', 'nickName', 'studentNo', 'unit', 'edu', 'depart', 'title', 'college', 'collegeDepart', 'grade', 'major', 'class', 'type', 'status', 'phone', 'idCard', 'email', 'birthday', 'gender', 'addrDetail', 'addr', 'createTime', 'cardNo', 'leaveTime', 'photo', 'cardBarCode', 'cardPhysicNo', 'cardType', 'cardIdentityNo', 'cardStatus', 'cardIsPrincipal', 'cardExpireDate', 'cardIssueDate', 'cardDeposit'],
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
      searchDateCode: '',//日期选择code
      searchDateValue: '',//日期选择值
      depList: [],//部门列表
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
      searchTextcondition1: 3,
      searchTextcondition2: 0,
      searchTextcondition3: 0,
      searchTermWidth: 1000,
      searchTermHeight: 118,
      depList: [],//部门列表
      searchForm: {},
      postSearch: {},
      postForm: {
        name: '',
        desc: '',
        sourceFrom: 1,
        userIds: []
      },//列表查询参数
      pageData: {
        pageIndex: 1,
        pageSize: 20,
      },//分页参数

      // 选择
      tableData: [],//列表项
      chanceData: [],//已选列表
      leftList: [],//左边勾选列表
      rightList: [],//右边勾选列表

      // 导入
      tableDataImp: [],//列表项
      chanceDataImp: [],//已选列表
      leftListImp: [],//左边勾选列表
      rightListImp: [],//右边勾选列表

      activeName: '选择',

      rules: {
        name: [
          { required: true, message: '请输入用户组名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  created() {
    this.initData();
    this.getDepList()
  },
  directives: {
    'el-select-loadmore': (el, binding) => {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
      if (SELECTWRAP_DOM) {
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) binding.value && binding.value()
        });
      }
    }
  },
  methods: {
    initData() {
      this.getKey();
      // this.getList();
      if (this.id) {
        this.getData();
      }
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
    // 获取初始数据
    getKey() {
      this.loading1 = true;
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
        // 下拉框选项初始化时控制在10以内 
        res.data.groupSelect.forEach(item => {
          let data = {
            groupCode: item.groupCode,
            groupItems: [],
          };
          if (item.groupItems.length > 10) {
            data.groupItems = item.groupItems.slice(0, 10);
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
        this.loading1 = false;
      }).catch(err => {
        this.loading1 = false;
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
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 获取数据
    getData() {
      http.getJsonSelf('by-id', `/${this.id}`).then(res => {
        this.postForm = res.data;
        this.chanceData = res.data.userInfos;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取列表数据
    getList() {
      this.loading = true;
      http.getJson('table-data', { ...this.postSearch, ...this.pageData }).then(res => {
        this.tableData = res.data.items;
        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
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
    // 查找
    handleSearch() {
      this.pageData = {
        pageIndex: 1,
        pageSize: 20,
      }
      // 处理筛选项
      let search = {};
      for (const item in this.searchForm) {
        let index = this.sysArrtKey[this.sysArrt.indexOf(item)];
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

      // this.searchForm = search;
      this.postSearch = search;
      this.getList();
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
    // 匹配键值对
    getKeyValue(code, value) {
      if (this.dataKey && this.dataKey.groupSelect) {
        let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
        if (select && select.groupItems) {
          let items = select.groupItems.find(item => (item.value == value));
          return items != null ? items.key : '';
        }
      }
      return '';
    },
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.getList();
    },
    //加入
    hanleAddList() {
      if (this.activeName == '选择') {
        this.chanceData = [...new Set([...this.chanceData, ...this.leftList])];
      } else {
        this.chanceDataImp = [...new Set([...this.chanceDataImp, ...this.leftListImp])];
      }
    },
    // 左边勾选
    handleAddChange(val) {
      if (this.activeName == '选择') {
        this.leftList = val;
      } else {
        this.leftListImp = val;
      }
    },
    //移除
    hanleDelList() {
      if (this.activeName == '选择') {
        this.chanceData = this.chanceData.filter(item => !this.rightList.includes(item))
      } else {
        this.chanceDataImp = this.chanceDataImp.filter(item => !this.rightListImp.includes(item))
      }
    },
    // 右边勾选
    handleDelChange(val) {
      if (this.activeName == '选择') {
        this.rightList = val;
      } else {
        this.rightListImp = val;
      }
    },

    // 切换
    handleTab() {
      this.activeName = this.activeName == '选择' ? '导入' : '选择';
    },
    // 下载模板
    handleDownload() {
      http.importFile('download-group-import-template').then(res => {
        this.$message({ type: 'success', message: '下载模板成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: '下载模板失败!' });
      })
    },
    // 获取列表数据
    getListImport(data) {
      this.tableDataImp = data;
    },
    // 错误项
    tableRowClassName(row) {
      if (row.row.error) {
        return 'warning-row';
      } else {
        return '';
      }
    },
    reset() {
      location.reload();
    },
    //表单提交
    submitForm() {
      let list = this.activeName == '选择' ? this.chanceData : this.chanceDataImp;
      this.postForm.userIds = list.map(item => {
        // return item.userId || item.id;
        return {
          userId: item.userId || item.id,
          userKey: item.userKey
        }
      });
      if (this.id) {
        http.putJson('user-group', this.postForm).then(res => {
          this.$message({ message: '编辑成功！', type: 'success' });
          this.$router.back();
        }).catch(err => {
          this.$message({ type: 'error', message: '编辑失败!' });
        })
      } else {
        http.postJson('user-group', this.postForm).then(res => {
          this.$message({ message: '新增成功！', type: 'success' });
          this.$router.back();
        }).catch(err => {
          this.$message({ type: 'error', message: '新增失败!' });
        })
      }
    },
    // 验证执行
    validateRun() {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          this.submitForm();
        } else {
          this.$message({
            message: '请完善信息！',
            type: 'warning'
          })
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
@import "../../../../assets/admin/css/form.less";
.content-box {
  min-height: 600px;
  background-color: @fff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
  padding: 20px;
}
.w500 {
  width: 500px;
}
.rule-box {
  min-width: 910px;
  //   padding: 20px 0;
  border-radius: 3px;
  border: 1px solid #ddd;
  position: relative;
}
.w100 {
  width: 100px;
}
.w150 {
  width: 150px;
}
.rule-item {
  position: relative;
  margin-bottom: 15px;
}
.table-box {
  display: inline-block;
  vertical-align: top;
}
.btn-box {
  padding-bottom: 20px;
}
.add-btn {
  // position: absolute;
  // top: 400px;
  margin-left: 49%;
}
.cal-btn {
  // position: absolute;
  // top: 460px;
  margin-left: 8%;
}
.search-box {
  padding: 20px;
}
// .search-item {
//   // width: 150px;
//   margin-bottom: 10px;
//   margin-right: 10px;
// }
/deep/ .el-table .warning-row {
  background: rgb(243, 208, 208);
}
.search-item-box {
  display: inline-block;
}
.search-item {
  // width: 150px;
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 15px;
  vertical-align: top;
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
</style>
