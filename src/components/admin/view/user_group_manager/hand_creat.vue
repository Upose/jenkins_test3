<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
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
            <el-form ref="postForm" :model="postForm" label-width="100px" :rules="rules">
              <el-form-item label="用户组名称" class="w500" prop="name">
                <el-input v-model="postForm.name" class="w500" minlength="2" maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="postForm.desc" class="w500" maxlength="100" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="选择读者">
                <el-tabs v-model="activeName" style="width:950px">
                  <el-tab-pane label="选择" name="选择">
                    <div class="rule-box" v-if="dataKey">
                      <div class="search-box">
                        <el-select v-model="searchForm.type" placeholder="读者类型" class="search-item" clearable>
                          <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="searchForm.status" placeholder="状态" class="search-item" clearable>
                          <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="searchForm.College" placeholder="院系" class="search-item" clearable>
                          <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                        <el-select v-model="searchForm.SourceFrom" placeholder="用户来源" class="search-item" clearable>
                          <el-option v-for="item in initSelect('User_SourceFrom')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                        </el-select>
                        <el-date-picker v-model="searchForm.LastLoginEndCompareTime" type="date" placeholder="最近登录日期" class="search-item" clearable></el-date-picker>
                        <!-- <el-date-picker v-model="searchForm.name" type="date" placeholder="注册日期" class="search-item"></el-date-picker> -->
                        <el-date-picker v-model="searchForm.ExpireDate" type="date" placeholder="截止日期" class="search-item" clearable></el-date-picker>
                        <el-input v-model="searchForm.name" placeholder="读者姓名" class="search-item" clearable></el-input>
                        <el-input v-model="searchForm.cardIdentityNo" placeholder="统一登录号" class="search-item" clearable></el-input>
                        <el-input v-model="searchForm.phone" placeholder="手机号" class="search-item" clearable></el-input>
                        <el-input v-model="searchForm.idCard" placeholder="读者身份证/护照" class="search-item" clearable></el-input>
                        <el-input v-model="searchForm.studentNo" placeholder="学号" class="search-item" clearable></el-input>
                        <el-input v-model="searchForm.cardNo" placeholder="读者卡号" class="search-item" clearable></el-input>
                        <el-button type="primary" @click="handleSearch" size="medium">查找</el-button>
                      </div>
                      <el-table :data="tableData" style="width: 520px" class="table-box" height="600px" @selection-change="handleAddChange">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="75" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="sourceFrom" label="用户来源" width="95" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{getKeyValue('User_SourceFrom',scope.row.sourceFrom)}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="手机" width="95" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type" label="用户类型" width="95" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{getKeyValue('User_Type',scope.row.type)}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="prop" label="注册日期" width="115" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{setTime(scope.row.createTime) }}
                          </template>
                        </el-table-column>
                      </el-table>

                      <el-table :data="chanceData" style="width: 320px;float:right" class="table-box" height="600px" @selection-change="handleDelChange">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="75" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{scope.row.name || scope.row.userName}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="sourceFrom" label="用户来源" width="95" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{getKeyValue('User_SourceFrom',scope.row.sourceFrom)}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="手机" width="95" align="center" show-overflow-tooltip></el-table-column>
                      </el-table>
                      <el-button type="primary" size="mini" class="add-btn" @click="hanleAddList">加入</el-button>
                      <el-button type="primary" size="mini" class="cal-btn" @click="hanleDelList">移除</el-button>
                      <paging style="text-align:left;padding-left:40px" :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
                    </div>
                  </el-tab-pane>

                  <el-tab-pane label="导入" name="导入">
                    <div class="rule-box">
                      <div style="padding:20px">
                        <el-button type="primary" size="medium" class="blue-btn" @click="handleDownload">下载模板</el-button>
                        <el-button type="primary" size="medium" @click="$refs.uploadFile.show()">导入数据</el-button>
                      </div>

                      <el-table :data="tableDataImp" style="width: 520px" class="table-box" height="600px" @selection-change="handleAddChange" :row-class-name="tableRowClassName">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="85" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="phone" label="手机" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="idCard" label="身份证" align="center" show-overflow-tooltip></el-table-column>
                      </el-table>

                      <el-table :data="chanceDataImp" style="width: 320px;float:right" class="table-box" height="600px" @selection-change="handleDelChange">
                        <el-table-column type="selection" width="48"></el-table-column>
                        <el-table-column prop="name" label="姓名" width="85" align="center" show-overflow-tooltip>
                          <template slot-scope="scope">
                            {{scope.row.name || scope.row.userName}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="phone" label="手机" align="center" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="idCard" label="身份证" align="center" show-overflow-tooltip></el-table-column>
                      </el-table>
                      <el-button type="primary" size="mini" class="add-btn" @click="hanleAddList">加入</el-button>
                      <el-button type="primary" size="mini" class="cal-btn" @click="hanleDelList">移除</el-button>
                    </div>
                  </el-tab-pane>
                </el-tabs>

              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-close" size="medium" @click="reset">重置</el-button>
                <el-button icon="el-icon-check" size="medium" type="primary" @click="validateRun">保存</el-button>
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
    bus.$on("collapse", (msg) => {
      this.$root.collapse = msg;
    });
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging, uploadFile },
  data() {
    return {
      id: this.$route.query.id,
      dataKey: null,
      searchForm: {},
      postForm: {
        name: '',
        desc: '',
        sourceFrom: 1,
        userIds: []
      },//列表查询参数
      pageData: {
        pageIndex: 1,
        pageSize: 50,
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
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getKey();
      this.getList();
      if (this.id) {
        this.getData();
      } else {

      }
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-group-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 初始化下拉列表
    initSelect(code) {
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
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
      http.getJson('table-data', { ...this.searchForm, ...this.pageData }).then(res => {
        this.tableData = res.data.items;
        //分页所需  数据总条数
        this.pageData.totalCount = res.data.totalCount;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 查找
    handleSearch() {
      this.pageData = {
        pageIndex: 1,
        pageSize: 50,
      }
      this.getList();
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
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
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
    //表单提交
    submitForm() {
      let list = this.activeName == '选择' ? this.chanceData : this.chanceDataImp;
      this.postForm.userIds = list.map(item => {
        return item.id || item.userId;
      });
      if (this.id) {
        http.putJson('user-group', this.postForm).then(res => {
          this.$message({ message: '编辑成功！', type: 'success' });
          // this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '编辑失败!' });
        })
      } else {
        http.postJson('user-group', this.postForm).then(res => {
          this.$message({ message: '新增成功！', type: 'success' });
          // this.getData();
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
  width: 910px;
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
.add-btn {
  position: absolute;
  top: 400px;
  left: 528px;
}
.cal-btn {
  position: absolute;
  top: 460px;
  left: 528px;
  margin: 0;
}
.search-box {
  padding: 20px;
}
.search-item {
  width: 170px;
  margin-bottom: 10px;
}
/deep/ .el-table .warning-row {
  background: rgb(243, 208, 208);
}
</style>
