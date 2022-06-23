<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="2"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'读者账号详情'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">新增读者</h1>
          </div>
          <!--顶部查询 end-->
          <div class="login-list">
            <div class="editdiv">
              <el-form @submit.prevent ref="readerForm" :model="postForm" label-width="140px" class="admin-form" :rules="readerRules">
                <div class="read-title">读者信息</div>
                <div class="harf-area">
                  <el-form-item label="读者姓名" prop="name">
                    <el-input v-model="postForm.name" placeholder="请输入" maxlength="20" clearable show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="单位名称" prop="unit">
                    <el-input v-model="postForm.unit" placeholder="请输入" maxlength="50" clearable show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="学历" prop="edu">
                    <el-select v-model="postForm.edu" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Edu')">
                      <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Edu').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="职称" prop="title">
                    <el-select v-model="postForm.title" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Title')">
                      <el-option v-for="item in initSelect('User_Title')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Title').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门" prop="depart">
                    <!-- <el-select v-model="postForm.depart" placeholder="请选择" clearable>
                      <el-option v-for="item in initSelect('User_Depart')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                    </el-select> -->
                    <el-cascader v-bind="depList" :options="depList" v-model="postForm.depart" :props="{ value:'fullPath',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
                  </el-form-item>
                  <el-form-item label="所在学院" prop="college">
                    <el-select v-model="postForm.college" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_College')">
                      <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_College').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所在系" prop="collegeDepart">
                    <el-select v-model="postForm.collegeDepart" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_CollegeDepart')">
                      <el-option v-for="item in initSelect('User_CollegeDepart')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_CollegeDepart').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="专业" prop="major">
                    <el-select v-model="postForm.major" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Major')">
                      <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Major').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="年级" prop="grade">
                    <el-select v-model="postForm.grade" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Grade')">
                      <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Grade').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="班级" prop="class">
                    <el-select v-model="postForm.class" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Class')">
                      <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Class').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="手机" prop="phone">
                    <el-input v-model="postForm.phone" placeholder="请输入" clearable maxlength="11" show-word-limit @blur="refChangeCardSecret"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" prop="idCard">
                    <el-input v-model="postForm.idCard" placeholder="请输入" clearable maxlength="30" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email" class="youxiang">
                    <el-input v-model="postForm.email" placeholder="请输入" clearable maxlength="30" show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item :label="item.propertyName" v-for="(item,index) in postForm.properties" :key="item.propertyCode" :rules="getDynamicRule(item)" :prop="`properties.${index}.propertyValue`">
                    <el-input v-model="item.propertyValue" maxlength="20" clearable show-word-limit placeholder="请输入" v-if="item.propertyType == 0"></el-input>
                    <el-input v-model="item.propertyValue" :min="1" label="label" clearable v-if="item.propertyType == 1" placeholder="请输入"></el-input>
                    <el-date-picker v-model="item.propertyValue" type="date" clearable placeholder="选择日期" v-if="item.propertyType == 2"></el-date-picker>
                    <el-radio-group v-model="item.propertyValue" v-if="item.propertyType == 3" class="radios">
                      <el-radio :label="'true'">是</el-radio>
                      <el-radio :label="'false'">否</el-radio>
                    </el-radio-group>
                    <el-select v-model="item.propertyValue" placeholder="请选择" v-if="item.propertyType == 4" clearable filterable :filter-method="(value)=>handleFilter(value,item.propertyCode)">
                      <el-option v-for="item in initSelect(item.propertyCode)" :key="item.value" :label="item.key" :value="item.value"></el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect(item.propertyCode).length==200"></el-option>
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
                </div>
                <div class="harf-area">
                  <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="postForm.nickName" placeholder="请输入" maxlength="20" clearable show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="postForm.gender" class="radios">
                      <el-radio v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key">{{item.key}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="出生年月" prop="birthday">
                    <el-date-picker v-model="postForm.birthday" type="date" placeholder="选择日期" clearable value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="所在地" prop="addr">
                    <!-- <el-input v-model="postForm.addr" placeholder="请输入" maxlength="50" clearable show-word-limit></el-input> -->
                    <el-cascader v-bind="addrList" :options="addrList" v-model="postForm.addr" :props="{ value:'idDisp',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
                  </el-form-item>
                  <el-form-item label="详细地址" prop="addrDetail">
                    <el-input v-model="postForm.addrDetail" placeholder="请输入" maxlength="120" clearable show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="最后登录日期" prop="lastLoginTime">
                    <el-date-picker v-model="postForm.lastLoginTime" type="date" placeholder="选择日期" clearable value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="离校日期" prop="leaveTime">
                    <el-date-picker v-model="postForm.leaveTime" type="date" placeholder="选择日期" clearable value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                    <el-select v-model="postForm.status" placeholder="请选择" filterable :filter-method="(value)=>handleFilter(value,'User_Status')">
                      <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key" :value="Number(item.value)"></el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Status').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="用户类型" prop="type">
                    <el-select v-model="postForm.type" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Type')">
                      <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                      <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Type').length==200"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="头像" prop="photo">
                    <updateIcon @coverUrl="coverUrl" :cover="postForm.photo"></updateIcon>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div class="card-box">
              <el-form ref="cardForm" :model="cardForm" label-width="120px" :rules="cardRules">
                <div class="read-title">读者卡信息</div>
                <el-form-item label="学工/工号" prop="studentNo">
                  <el-input v-model="cardForm.studentNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <div class="row-form">
                  <el-form-item prop="type" class="r-f-item1">
                    <el-select v-model="cardForm.type" placeholder="请选择" clearable>
                      <el-option v-for="item in initSelect('Card_Type')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="no" class="r-f-item2">
                    <el-input v-model="cardForm.no" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                  </el-form-item>
                </div>
                <!-- <el-form-item label="统一认证号" prop="identityNo">
                  <el-input v-model="cardForm.identityNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="条形码号" prop="barCode">
                  <el-input v-model="cardForm.barCode" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item> -->
                <el-form-item label="物理码号" prop="physicNo">
                  <el-input v-model="cardForm.physicNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="发卡日期" prop="issueDate">
                  <el-date-picker v-model="cardForm.issueDate" type="date" placeholder="请选择" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="截止日期" prop="expireDate">
                  <el-date-picker v-model="cardForm.expireDate" type="date" placeholder="请选择" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-select v-model="cardForm.status" placeholder="请选择">
                    <el-option v-for="item in initSelect('Card_Status')" :key="item.value" :label="item.key" :value="Number(item.value)">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="卡密码" prop="secret">
                  <el-input v-model="cardForm.secret" placeholder="请输入" show-password clearable maxlength="30" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="押金" prop="deposit">
                  <el-input v-model="cardForm.deposit" placeholder="请输入" clearable maxlength="10" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="设为主卡">
                  <el-switch v-model="cardForm.isPrincipal"></el-switch>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn_box">
              <el-button type="info" plain @click="$router.back()" icon="iconfont el-icon-vip-quxiao">取消</el-button>
              <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1"> 保存</el-button>
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
import updateIcon from "../model/updateIcon";

export default {
  name: 'index',
  components: { footerPage, serviceLMenu, breadcrumb, paging, updateIcon },
  data() {
    let validateType = (rule, value, callback) => {
      if (!value) {
        callback(new Error('必选项'));
      } else {
        callback();
      }
    };
    return {
      renderIndex: 0,
      postForm: {
        gender: '男',
        type: null
      },
      cardForm: {},
      dataKey: null,
      groupSelect: [],
      properties: null,
      readerRules: {
        name: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '必选项', trigger: 'change' }
        ],
        studentNo: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '必填项', trigger: 'change' }
        ],
        status: [
          { required: true, message: '必填项', trigger: 'change' }
        ],

        idCard: [
          {
            validator: this.$validator.validatePattern,
            message: '格式错误',
            pattern: this.$validator.idCard,
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            validator: this.$validator.validatePattern,
            message: '格式错误',
            pattern: this.$validator.mobile,
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: this.$validator.validatePattern,
            message: '格式错误',
            pattern: this.$validator.email,
            trigger: 'blur'
          }
        ]
      },
      cardRules: {
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

      depList: [],
      addrList: [],
      uploadUrl: localStorage.getItem('fileUrl') + '/api/file/upload-file',
      myHeaders: { Authorization: 'Bearer ' + window.localStorage['token'] },
      fileList: [],
    }
  },
  props: ['id'],
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.initData();
  },
  methods: {

    //初始化数据
    initData() {
      this.getKey();
      this.getDepList();
      this.getAddrList();
    },
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
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
        this.postForm = this.dataKey.userData || {};
        this.cardForm = this.dataKey.cardData || { secret: '' };
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
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取部门列表
    getDepList() {
      http.getJson('org-list').then(res => {
        this.depList = res.data;
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
    // 获取图标
    coverUrl(url) {
      this.postForm.photo = url;
    },
    upaloadFile(index) {
      this.index = index;
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      let data = response.data;
      // console.log(data);
      this.postForm.properties[this.index].propertyValue = data[0];
    },
    // 下载附件
    downloadFile(url) {
      window.open(localStorage.getItem('fileUrl') + url);
    },
    //表单提交
    submitForm() {
      this.$refs['readerForm'].validate((readerOk) => {
        this.$refs['cardForm'].validate((cardOk) => {
          if (readerOk && cardOk) {
            var requestKey = 'user';
            if (this.$route.query.type == 'staff') {
              requestKey = 'user-staff';
            }
            http.postJson(requestKey, { userData: {...this.postForm, studentNo: this.cardForm.studentNo}, cardData: this.cardForm}).then(res => {
              this.$message({ message: this.dataKey.needApprove && this.$route.query.type != 'staff' ? '已新增成功，请等待审核！' : '新增成功！', type: 'success' });
              this.$router.replace('/admin_readerList');
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
            });
          }
        });
      });
    },
    refChangeCardSecret() {
      var newStr = this.postForm.phone || '';
      if (newStr.length == 11 && (!this.cardForm.secret || this.cardForm.secret == '')) {
        this.cardForm.secret = newStr.substring(newStr.length - 6);
      }
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.content {
  .s-w {
    min-height: 60px;
    line-height: 57px;
    padding: 0 20px;
    border-bottom: 1px solid @EBEEF5;
    background-color: @fff;
    .d-title {
      color: @34395E;
      font-size: 14px;
      margin-left: 20px;
    }
  }
  .row-form{
    width: 100%;
    height: 62px;
    padding: 0;
    display: inline-block;
    vertical-align: top;
    /deep/ .r-f-item1{
      width: 49%;
      float: left;
      .el-form-item__content{
        margin-left: 40px !important;
      }
    }
    /deep/ .r-f-item2{
      width: 50%;
      float: left;
      .el-form-item__content{
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
  padding: 20px 40px;
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
  .harf-area{
    width: 49%;
    float: left;
  }
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
  width: 100%;
  display: table;
  padding: 0;
  // float: left;
  display: inline-block;
  vertical-align: top;
}
.card-box {
  width: 35%;
  display: inline-block;
  vertical-align: top;
}

/deep/ .el-input,
/deep/ .el-select,
/deep/ .admin-form .el-date-editor.el-input,
.divStyle {
  width: 95%;
  float: left;
}
/deep/ .el-form-item__content {
  line-height: 39px;
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
  margin-left: 140px;
}
// .youxiang {
//   width: 100%;
// }
// .youxiang .divStyle {
//   width: 40.5%;
// }
.d-ib {
  display: inline-block;
  vertical-align: top;
}
</style>
