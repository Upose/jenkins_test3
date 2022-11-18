<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="4"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'读者账号详情'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">新增读者卡</h1>
          </div>
          <!--顶部查询 end-->
          <div class="login-list">
            <div class="card-box">
              <el-form ref="form" :model="cardForm" label-width="180px" :rules="cardRules">
                <div class="read-title">读者卡信息</div>
                <el-form-item label="选择用户：" v-if="!id&&!userId" prop="userId">
                  <el-select @change="refChangeCardSecret" v-model="cardForm.userId" filterable remote reserve-keyword placeholder="请输入用户名" :remote-method="remoteMethod" :loading="loading">
                    <el-option v-for="item in userList" :key="item.id" :label="item.name+' '+item.phone" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用户类型：" prop="cardReaderType">
                  <el-select v-model="cardForm.cardReaderType" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Type')" v-el-select-loadmore="optionLoadMore('User_Type')">
                    <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="读者号" prop="no">
                  <el-input v-model="cardForm.no" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="统一认证号" prop="identityNo">
                  <el-input v-model="cardForm.identityNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <!-- <el-form-item label="条形码号" prop="barCode">
                  <el-input v-model="cardForm.barCode" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item> -->
                <el-form-item label="学号/工号：" prop="studentNo">
                  <el-input v-model="cardForm.studentNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <!-- <div class="row-form">
                  <el-form-item class="r-f-item1" prop="type">
                    <el-select v-model="cardForm.type" placeholder="请选择卡类型" clearable>
                      <el-option v-for="item in initSelect('Card_Type')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="r-f-item2" prop="no">
                    <el-input v-model="cardForm.no" placeholder="请输入读者卡号" clearable maxlength="20" show-word-limit></el-input>
                  </el-form-item>
                </div> -->
                <el-form-item label="物理码号：" prop="physicNo">
                  <el-input v-model="cardForm.physicNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="发卡日期：" prop="issueDate">
                  <el-date-picker class="wq95" v-model="cardForm.issueDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="截止日期：" prop="expireDate">
                  <el-date-picker class="wq95" v-model="cardForm.expireDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="状态：" prop="status">
                  <el-select v-model="cardForm.status" placeholder="请选择">
                    <el-option v-for="item in initSelect('Card_Status')" :key="item.value" :label="item.key" :value="Number(item.value)">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="卡密码：" prop="secret">
                  <el-input v-model="cardForm.secret" placeholder="请输入" show-password clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="押金：" prop="deposit">
                  <el-input-number class="wq100" :precision="2" :min="0" v-model="cardForm.deposit" placeholder="请输入" clearable maxlength="10" show-word-limit></el-input-number>
                </el-form-item>
                <el-form-item label="设为主卡：">
                  <el-switch v-model="cardForm.isPrincipal"></el-switch>
                </el-form-item>
                <el-form-item :label="item.propertyName+'：'" v-for="(item,index) in cardForm.properties" :key="item.propertyCode" :rules="getDynamicRule(item)" :prop="`properties.${index}.propertyValue`">
                  <el-input v-model="item.propertyValue" maxlength="20" clearable show-word-limit placeholder="请输入" v-if="item.propertyType == 0 "></el-input>
                  <el-input-number class="wq100" v-model="item.propertyValue" v-if="item.propertyType == 1" placeholder="请输入"></el-input-number>
                  <el-date-picker class="wq95" v-model="item.propertyValue" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-if="item.propertyType == 2"></el-date-picker>
                  <el-radio-group v-model="item.propertyValue" v-if="item.propertyType == 3" class="radios">
                    <el-radio :label="'true'">是</el-radio>
                    <el-radio :label="'false'">否</el-radio>
                  </el-radio-group>
                  <el-select v-model="item.propertyValue" placeholder="请选择" v-if="item.propertyType == 4" clearable>
                    <el-option v-for="item in initSelect(item.propertyCode)" :key="item.value" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                  <el-cascader v-if="item.propertyType == 5" :options="addrList" v-model="item.propertyValue" :props="{ value:'idDisp',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
                  <div v-if="item.propertyType == 6">
                    <el-upload class="d-ib upload-demo" :action="uploadUrl" :file-list="fileList" :headers="myHeaders" name="files" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="uploadSuccess">
                      <el-button size="small" type="primary" @click="upaloadFile(index)">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">附件大小不超过20m</div>
                    </el-upload>
                    <el-button type="text" size="small" v-if="item.propertyValue&&item.propertyValue!=''" @click="downloadFile(item.propertyValue)">下载附件</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn_box">
              <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1" v-button-debounce>保 存</el-button>
            </div>
          </div>
        </div>
        <!---content end--->
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
export default {
  name: 'index',
  created() {
    // bus.$on('collapse', msg => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // })
  },
  components: { footerPage, serviceLMenu, breadcrumb, paging },
  data() {
    let validateType = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必选项'));
      } else {
        callback();
      }
    };
    return {
      id: this.$route.query.id,
      userId: this.$route.query.userId,
      cardForm: {},
      dataKey: null,

      loading: false,
      userList: [],
      cardRules: {
        userId: [
          {
            required: true,
            message: '必填项',
            trigger: 'change',
          }
        ],
        cardReaderType: [
          {
            required: true,
            message: '必填项',
            trigger: 'change',
          }
        ],
        no: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur',
          }
        ],
        status: [
          {
            required: true,
            message: '必填项',
            trigger: 'change',
          }
        ],
        issueDate: [
          {
            required: true,
            message: '必填项',
            trigger: 'change'
          }
        ],
        expireDate: [
          {
            required: true,
            message: '必填项',
            trigger: 'change'
          }
        ],
        secret: [
          {
            required: true,
            message: '必填项',
            trigger: 'blur'
          }
        ],
        type: [
          {
            validator: validateType,
            trigger: 'change'
          }
        ]
      },
      addrList: [],
      uploadUrl: localStorage.getItem('fileUrl') + '/api/file/upload-file',
      myHeaders: { Authorization: 'Bearer ' + window.localStorage['token'] },
      fileList: [],
    }
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
  created() {
    this.initData();
  },
  methods: {
    getDynamicRule(property) {
      var rules = [];
      if (property.required) {
        rules.push(
          {
            required: true,
            message: '必填项',
            trigger: ['blur', 'change']
          }
        );
      }
      if (property.propertyType == 1) {
        rules.push(
          {
            validator: this.$validator.validatePattern,
            pattern: this.$validator.amount,
            message: '格式错误',
            trigger: ['blur', 'change']
          }
        );
      }
      return rules;

    },
    initData() {
      this.getKey();
      this.getAddrList();
      // if (this.id) {
      //   this.getData();
      // }
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.groupSelect.find(item => (item.groupCode == code));
      return select ? select.groupItems : [];
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
    // 获取初始数据
    getKey() {
      http.getJson('card-init-data').then(res => {
        this.dataKey = res.data;
        this.cardForm = this.dataKey.cardData;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取地址列表
    getAddrList() {
      http.getJson('region-list').then(res => {
        this.addrList = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 获取数据
    getData() {
      http.getJsonSelf('card', `/${this.id}`).then(res => {
        this.cardForm = res.data;
        this.properties = res.data.properties;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 搜索用户
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        http.getJson('user-select-list-data', { keyword: query, pageIndex: 1, pageSize: 20 }).then(res => {
          this.userList = res.data.items;
          this.loading = false;
        }).catch(err => {
          this.$message({ type: 'error', message: '获取设置失败!' });
        })
      } else {
        this.options = [];
      }
    },
    upaloadFile(index) {
      this.index = index;
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      let data = response.data;
      this.cardForm.properties[this.index].propertyValue = data[0];
    },
    // 下载附件
    downloadFile(url) {
      window.open(localStorage.getItem('fileUrl') + url);
    },
    refChangeCardSecret(val) {
      var userId = val || '';
      var userList = this.userList || [];
      var mapUser = userList.find(x => { return x.id == userId });
      if (mapUser) {
        var newStr = mapUser.phone || '';
        if (newStr.length <= 6) {
          this.cardForm.secret = newStr;
        } else {
          this.cardForm.secret = newStr.substring(newStr.length - 6);
        }
      }

    },
    //表单提交
    submitForm() {
      this.$refs["form"].validate((cardOk) => {
        if (cardOk) {
          this.cardForm.readerType = this.dataKey.groupSelect.find(item => item.groupCode == 'User_Type').groupItems.find(item => item.value == this.cardForm.cardReaderType).key;
          if (this.id) {
            http.putJson('card', this.cardForm).then(res => {
              this.$message({ message: '编辑成功！', type: 'success' });
              this.getData();
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '编辑失败') });
            })
          } else {
            this.cardForm.userId = this.cardForm.userId ? this.cardForm.userId : this.$route.query.userId;
            http.postJson('card', this.cardForm).then(res => {
              this.$message({ message: '新增成功！', type: 'success' });
              // this.id = res.data;
              // this.getData();
              this.$router.replace('/admin_readerCardList');
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
            })
          }
        }
      });

    },
  }
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/style.less";
.content {
  .s-w {
    min-height: 60px;
    line-height: 57px;
    padding: 0 20px;
    border-bottom: 1px solid @ph-col-n3;
    background-color: @m-col-b0;
    .d-title {
      color: @ph-col-n12;
      font-size: 14px;
      margin-left: 20px;
    }
  }
  .row-form {
    height: 62px;
    /deep/ .r-f-item1 {
      width: 320px;
      float: left;
      .el-form-item__content {
        margin-left: 107px !important;
      }
    }
    /deep/ .r-f-item2 {
      width: 273px;
      float: left;
      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
}
.login-list {
  width: 100%;
  background: #fff;
  padding: 1.5% 0;
  display: table;
  border-top: 1px solid #ebeef5;
}
.read-title {
  padding: 20px 100px;
  font-size: 16px;
  font-weight: bold;
}
/deep/ .el-input,
/deep/ .el-select,
.divStyle {
  width: 33%;
  float: left;
}
.divStyle {
  height: 40px;
  line-height: 40px;
  border: 1px solid #c0c4cc;
}
.divStyle span {
  padding: 0 !important;
  float: right !important;
}
.divStyle span:first-child {
  float: left !important;
  color: #6c757d;
  margin-left: 5%;
}
/deep/ .el-select .el-input {
  width: 100%;
}
.reader-left,
.reader-middle {
  float: left;
}
.reader-right {
  float: right;
  width: 50%;
}
.reader-right span {
  font-size: 14px;
  color: #909399;
  display: block;
  margin: 2.6% 4% 0 0;
  float: right;
  cursor: pointer;
}
/deep/ .el-tabs__item {
  height: 46px;
}
/deep/ .el-tabs__nav-wrap::after {
  background-color: #fff;
}
.reader-left {
  width: 9%;
  height: 9%;
  border-radius: 12px;
  margin: 0 2% 0 1.5%;
}
.reader-middle {
  width: 30%;
}
.middle-top,
.integral,
.times {
  width: 100%;
  display: table;
}
.middle-top {
  margin-top: 3%;
}
.names,
.numers,
.level,
.async {
  float: left;
  display: block;
  margin-right: 2%;
}
.names {
  font-size: 18px !important;
  font-weight: bold;
  color: #34395e;
}
.numers {
  color: #34395e;
  font-size: 16px !important;
  font-weight: bold;
  margin-top: 5px;
}
.level {
  color: #5568f5;
  font-size: 15px;
  background: #f1eeff;
  border-radius: 6px;
  padding: 0 2%;
  line-height: 26px;
  height: 26px;
}
.async {
  color: #5568f5;
  border: 1px solid #5568f5;
  border-radius: 5px;
  padding: 0 2%;
  line-height: 26px;
  height: 26px;
}
.integral,
.times {
  margin-top: 3%;
  width: 100%;
  display: table;
}
.integral span {
  display: block;
  float: left;
  font-size: 14px;
  color: #f58b58;
}
.integral span:first-child {
  color: #34395e;
}
.times {
  color: #34395e;
  font-size: 14px;
}
.editdiv {
  width: 60%;
  display: inline-block;
  vertical-align: top;
}
.editdiv ul {
  list-style-type: none;
  padding: 0;
}
.editdiv ul li {
  width: 100%;
  display: table;
  padding: 1% 0;
}
.editdiv ul li span {
  float: left;
  padding: 12px 2% 12px 0;
  width: 18%;
  color: #3c4b5d;
  text-align: right;
}
.editdiv ul li span:first-child {
  width: 15%;
}
.editdiv ul li span i {
  color: red;
  margin: 10px 0 0 0px;
}
.reader-right {
  width: 30%;
  float: right;
}
.right-title {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  display: table;
}
.right-box {
  width: 100%;
  display: table;
  margin: 2% 0 6% 0;
}
.right-box span {
  display: block;
  float: left;
  border: 1px solid #e4e6fc;
  color: #6c757d;
  font-size: 13px;
  text-align: center;
  padding: 6px 13px;
  margin: 2% 2% 0 0;
  cursor: pointer;
  border-radius: 3px;
}
.imgs {
  width: 13px;
  height: 11px;
  margin: -5px -9px 0 5px !important;
  float: right;
}
.el-select-dropdown__item {
  padding-left: 3% !important;
}
/deep/ .el-radio {
  margin: 2% 9% 0 0;
}

.yuan {
  width: 8px !important;
  height: 8px;
  background: #8cc63f;
  border-radius: 100%;
  margin: 16px 2% 0 0;
}
.renzheng {
  color: #6c757d;
  width: auto !important;
  margin-right: 3%;
}
.baocun {
  background: #6777ef;
  border: 0;
  padding: 1.3% 3%;
  color: #fff;
  text-align: center;
}
.xuanzhong {
  border: 1px solid #6777ef !important;
}
/deep/.el-dialog__body {
  padding: 10px 20px;
}
.duihao {
  width: 12px;
  height: 10px;
  line-height: 10px;
  text-align: center;
  background: #6777ef;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  float: right;
  margin: -7px -13px 0 2px !important;
}
.btns {
  padding: 2.5% 4% 2% 4%;
  font-size: 15px;
  background: #6777ef;
  border: 0;
}
.quxiao {
  color: #6d6d6d;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
}
.btns1 {
  float: left !important;
  padding: 3.2% 3.9% 2.9% 3.9% !important;
  margin: 2% 1% 0 0 !important;
  background: #6777ef;
}
.btns img {
  width: 14px;
  height: 12.6px;
  float: left;
  margin-right: 6px;
}
.btns span {
  display: block;
  font-size: 14px;
  float: left;
}
.btns1 span {
  display: block;
  font-size: 14px;
  padding: 0 !important;
  float: left;
  min-width: 30px !important;
  color: #fff !important;
}
/deep/ .el-dialog {
  min-width: 500px;
}
.editdiv /deep/ .el-form-item {
  width: 49%;
  display: table;
  padding: 0;
  // float: left;
  display: inline-block;
}
.card-box {
  width: 600px;
  display: inline-block;
  vertical-align: top;
}
/deep/ .el-input,
/deep/ .el-select,
.divStyle {
  width: 95%;
  float: left;
}
/deep/ .el-cascader {
  width: 100%;
}
.radios {
  width: 63%;
  margin-top: 2.2%;
  float: left;
}
.btn_box {
  margin-left: 180px;
}
// .youxiang {
//   width: 100%;
// }
// .youxiang .divStyle {
//   width: 40.5%;
// }
</style>
