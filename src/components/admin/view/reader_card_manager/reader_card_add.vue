<!---新闻发布-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="2"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'读者账号详情'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">{{ !id && !userId ? '新增' : '编辑' }}读者卡</h1>
          </div>
          <!--顶部查询 end-->
          <div class="login-list">
            <div class="editdiv">
              <el-form @submit.prevent ref="cardForm" :model="cardForm" label-width="140px" class="admin-form"
                :rules="readerRules" :disabled="!$_has('card:update')">
                <div class="read-title">读者信息</div>
                <div class="harf-area">
                  <el-form-item label="账号激活状态：" prop="isActive">
                    <el-select v-model="cardForm.isActive" placeholder="请选择" disabled>
                      <el-option v-for="item in (isActiveList||[])" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="选择用户：" v-if="!id && !userId" prop="userId">
                    <el-select @change="changeUser" v-model="cardForm.userId" filterable remote reserve-keyword
                      placeholder="请输入用户名" :remote-method="remoteMethod" :loading="loading">
                      <el-option v-for="item in (userList||[])" :key="item.id" :label="item.name + ' ' + item.phone"
                        :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class="row-form">
                    <el-form-item prop="cardType" class="r-f-item1">
                      <el-select v-model="cardForm.cardType" placeholder="请选择" @change="hanldeCardType" clearable>
                        <el-option v-for="item in initSelect('Card_CardType')" :key="item.value" :label="item.key"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item prop="no" class="r-f-item2">
                      <el-input v-model="cardForm.no" placeholder="请输入读者卡号" clearable maxlength="20"
                        show-word-limit></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="学工/工号：" prop="studentNo">
                    <el-input v-model="cardForm.studentNo" placeholder="请输入" clearable maxlength="20"
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="统一认证号" prop="identityNo">
                    <el-input v-model="cardForm.identityNo" placeholder="请输入" clearable maxlength="20"
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="物理码号：" prop="physicNo">
                    <el-input v-model="cardForm.physicNo" placeholder="请输入" clearable maxlength="20"
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="状态：" prop="status">
                    <el-select v-model="cardForm.status" placeholder="请选择">
                      <el-option v-for="item in initSelect('Card_Status')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="读者类型：" prop="cardReaderType">
                    <el-select v-model="cardForm.cardReaderType" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_Type')"
                      v-el-select-loadmore="optionLoadMore('User_Type')">
                      <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="读者姓名：" prop="name">
                    <el-input v-model="cardForm.name" placeholder="请输入" maxlength="20" clearable
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="性别：" prop="gender">
                    <el-radio-group v-model="cardForm.gender" class="radios">
                      <el-radio v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key">{{ item.key
                      }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="单位名称：" prop="unit">
                    <el-input v-model="cardForm.unit" placeholder="请输入" maxlength="50" clearable
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="学历：" prop="edu">
                    <el-select v-model="cardForm.edu" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_Edu')"
                      v-el-select-loadmore="optionLoadMore('User_Edu')">
                      <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="职称：" prop="title">
                    <el-select v-model="cardForm.title" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_Title')"
                      v-el-select-loadmore="optionLoadMore('User_Title')">
                      <el-option v-for="item in initSelect('User_Title')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="部门：" prop="depart">
                  <!-- <el-select v-model="cardForm.depart" placeholder="请选择" clearable>
                      <el-option v-for="item in initSelect('User_Depart')" :key="item.value" :label="item.key" :value="item.value">
                      </el-option>
                                                                                                  </el-select> -->

                    <el-cascader v-bind="depList" :options="depList" v-model="cardForm.depart"
                      :props="{ value: 'fullPath', label: 'name', children: 'children', emitPath: false }"
                      clearable></el-cascader>
                  </el-form-item>
                  <el-form-item label="所在学院：" prop="college">
                    <el-select v-model="cardForm.college" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_College')"
                      v-el-select-loadmore="optionLoadMore('User_College')">
                      <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所在系：" prop="collegeDepart">
                    <el-select v-model="cardForm.collegeDepart" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_CollegeDepart')"
                      v-el-select-loadmore="optionLoadMore('User_CollegeDepart')">
                      <el-option v-for="item in initSelect('User_CollegeDepart')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="专业：" prop="major">
                    <el-select v-model="cardForm.major" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_Major')"
                      v-el-select-loadmore="optionLoadMore('User_Major')">
                      <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                <!-- <el-form-item label="状态：" prop="status">
                    <el-select v-model="cardForm.status" placeholder="请选择" filterable :filter-method="(value)=>handleFilter(value,'User_Status')" v-el-select-loadmore="optionLoadMore('User_Status')">
                      <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key" :value="Number(item.value)"></el-option>
                    </el-select>
                      </el-form-item> -->

                  <el-form-item :label="item.propertyName + '：'" v-for="(item, index) in cardForm.properties"
                    :key="item.propertyCode" :rules="getDynamicRule(item)" :prop="`properties.${index}.propertyValue`">
                    <el-input v-model="item.propertyValue" maxlength="20" clearable show-word-limit placeholder="请输入"
                      v-if="item.propertyType == 0"></el-input>
                    <el-input-number class="wq100" v-model="item.propertyValue" clearable v-if="item.propertyType == 1"
                      placeholder="请输入"></el-input-number>
                    <el-date-picker v-model="item.propertyValue" type="date" value-format="yyyy-MM-dd" clearable
                      placeholder="选择日期" v-if="item.propertyType == 2"></el-date-picker>
                    <el-radio-group v-model="item.propertyValue" v-if="item.propertyType == 3" class="radios">
                      <el-radio :label="'true'">是</el-radio>
                      <el-radio :label="'false'">否</el-radio>
                    </el-radio-group>
                    <el-select v-model="item.propertyValue" placeholder="请选择" v-if="item.propertyType == 4" clearable
                      filterable :filter-method="(value) => handleFilter(value, item.propertyCode)"
                      v-el-select-loadmore="optionLoadMore(item.propertyCode)">
                      <el-option v-for="item in initSelect(item.propertyCode)" :key="item.value" :label="item.key"
                        :value="item.value"></el-option>
                    </el-select>
                    <el-cascader v-if="item.propertyType == 5" :options="addrList" v-model="item.propertyValue"
                      :props="{ value: 'idDisp', label: 'name', children: 'children', emitPath: false }"
                      clearable></el-cascader>
                    <div v-if="item.propertyType == 6">
                      <el-upload class="d-ib upload-demo" :action="uploadUrl" :file-list="fileList" :headers="myHeaders"
                        name="files" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="uploadSuccess">
                        <el-button size="small" type="primary" @click="upaloadFile(index)">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">附件大小不超过20m</div>
                      </el-upload>
                      <el-button type="text" size="small" v-if="item.propertyValue && item.propertyValue != ''"
                        @click="downloadFile(item.propertyValue)" v-button-debounce>下载附件</el-button>
                    </div>
                  </el-form-item>
                </div>
                <div class="harf-area">
                  <el-form-item label="年级：" prop="grade">
                    <el-select v-model="cardForm.grade" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_Grade')"
                      v-el-select-loadmore="optionLoadMore('User_Grade')">
                      <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="班级：" prop="class">
                    <el-select v-model="cardForm.class" placeholder="请选择" clearable filterable
                      :filter-method="(value) => handleFilter(value, 'User_Class')"
                      v-el-select-loadmore="optionLoadMore('User_Class')">
                      <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key"
                        :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="出生年月：" prop="birthday">
                    <el-date-picker v-model="cardForm.birthday" type="date" placeholder="选择日期" clearable
                      value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="所在地：" prop="addr">
                    <!-- <el-input v-model="cardForm.addr" placeholder="请输入" maxlength="50" clearable show-word-limit></el-input> -->
                    <el-cascader v-bind="addrList" :options="addrList" v-model="cardForm.addr"
                      :props="{ value: 'idDisp', label: 'name', children: 'children', emitPath: false }"
                      clearable></el-cascader>
                  </el-form-item>
                  <el-form-item label="详细地址：" prop="addrDetail">
                    <el-input v-model="cardForm.addrDetail" placeholder="请输入" maxlength="120" clearable
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="手机号：" prop="phone">
                    <el-input v-model="cardForm.phone" placeholder="请输入" clearable @blur="refChangeCardSecret"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证：" prop="idCard">
                    <el-input v-model="cardForm.idCard" placeholder="请输入" clearable maxlength="30"
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱：" prop="email" class="youxiang">
                    <el-input v-model="cardForm.email" placeholder="请输入" clearable maxlength="30"
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="离校日期：" prop="leaveTime">
                    <el-date-picker v-model="cardForm.leaveTime" type="date" placeholder="选择日期" clearable
                      value-format="yyyy-MM-dd" format="yyyy-MM-dd">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="发卡日期：" prop="issueDate">
                    <el-date-picker class="wq95" v-model="cardForm.issueDate" type="date" placeholder="请选择"
                      clearable></el-date-picker>
                  </el-form-item>
                  <el-form-item label="截止日期：" prop="expireDate">
                    <el-date-picker class="wq95" v-model="cardForm.expireDate" type="date" value-format="yyyy-MM-dd"
                      placeholder="请选择" clearable></el-date-picker>
                  </el-form-item>
                  <el-form-item label="卡密码：" v-if="!id && !userId" prop="secret">
                    <el-input v-model="cardForm.secret" placeholder="请输入" show-password clearable maxlength="30"
                      show-word-limit></el-input>
                  </el-form-item>
                  <el-form-item label="卡密码：" prop="secret" v-else>
                    <!-- <el-input v-model="cardForm.secret" placeholder="请输入" show-password clearable maxlength="20" show-word-limit> -->
                    <el-input v-model="cardForm.secret" placeholder="请输入" show-password maxlength="30">
                      <span slot="append" v-has="'card:setSecret'">
                        <el-button type="primary" size="medium" @click="handleReset">重置密码</el-button>
                      </span>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="押金：" prop="deposit">
                    <el-input-number class="wq100" :precision="2" :min="0" v-model="cardForm.deposit" placeholder="请输入"
                      clearable maxlength="10" show-word-limit></el-input-number>
                  </el-form-item>
                  <el-form-item label="设为主卡：">
                    <el-switch v-model="cardForm.isPrincipal"></el-switch>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          <!-- <div class="card-box">
              <el-form ref="cardForm" :model="cardForm" label-width="120px" :rules="cardRules">
                <div class="read-title">读者卡信息</div>
                <el-form-item label="读者号" prop="no">
                  <el-input v-model="cardForm.no" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
                </el-form-item>
              </el-form>
                </div> -->
            <div class="right-btn-box" v-if="id">
              <div class="btn-list">
                <el-button v-if="showToStaff" v-has="'reader:batchSetAsStaff'" size="medium" type="primary"
                  class="admin-red-btn" @click="handleChange" v-button-debounce>转为馆员</el-button>
                <el-button type="primary" size="medium" class="blue-btn" @click="handleSend"
                  v-has="'reader:sendMessage'">发送消息</el-button>
              </div>
              <div class="reader-group-list">
                <div class="right-title">添加至用户分组</div>
                <div class="right-box">
                  <span :class="isGrounp(item.id) ? 'grounpSel' : ''" v-for="item in grounpList" :key="item.id"
                    :data-id="item.id" @click="handleAddGrounp(item.id)">{{ item.name }}</span>
                </div>
              </div>
            </div>
            <div class="btn_box">
              <el-button type="info" plain @click="$router.back()" icon="iconfont el-icon-vip-quxiao">取消</el-button>
              <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1" v-has="'card:update'"
                v-button-debounce> 保存</el-button>
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
      id: this.$route.query.id,
      userId: this.$route.query.userId,

      renderIndex: 0,
      // cardForm: {
      //   gender: '男',
      //   type: null,
      // },
      cardForm: {
        secret: "",
      },
      dataKey: null,
      groupSelect: [],
      properties: null,
      readerRules: {
        userId: [
          { required: true, message: '必填项', trigger: 'change' }
        ],
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


        // idCard: [
        //   {
        //     validator: this.$validator.validatePattern,
        //     message: '格式错误',
        //     pattern: this.$validator.idCard,
        //     trigger: 'blur'
        //   }
        // ],
        phone: [
          // { required: true, message: '必填项', trigger: 'blur' },
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
        ],
        studentNo: [
          { required: true, message: '必填项', trigger: 'change' }
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
        cardType: [
          {
            validator: validateType,
            trigger: 'change'
          }
        ]
      },
      cardRules: {

      },

      depList: [],
      addrList: [],
      uploadUrl: localStorage.getItem('fileUrl') + '/api/file/upload-file',
      myHeaders: { Authorization: 'Bearer ' + window.localStorage['token'] },
      fileList: [],

      userList: [],

      showToStaff: true,
      grounpList: [],
      isActiveList: [
        { value: true, key: '已激活' },
        { value: false, key: '未激活' },
      ]
    }
  },
  // props: ['id'],
  created() {
  },
  beforeMount() {
  },
  mounted() {
    this.initData();
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
    //初始化数据
    initData() {
      this.getKey();
      this.getDepList();
      this.getAddrList();
      this.getGrounpList();
      if (this.id) {
        this.getData();
      }

    },
    // 获取数据
    getUserData() {
      http.getJsonSelf('user-for-edit', `/${this.userId}`).then(res => {
        // this.cardForm = res.data;
        // this.cardForm.addr = this.showAddrCode(this.cardForm.addr)
        let curUser = res.data;
        for (const key in this.cardForm) {
          if (Object.hasOwnProperty.call(this.cardForm, key)) {
            if (curUser[key]) {
              const noCheck = ['status', 'studentNo'];
              if (noCheck.includes(key)) {// 不处理
              } else if (key == 'type') {// 特殊处理
                this.cardForm.cardReaderType = curUser.type;
              } else {
                this.cardForm[key] = curUser[key];
              }
            }
          }
        }
        this.cardForm.secret = '******';
        this.properties = res.data.properties;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取读者信息失败!' });
      })
    },
    // 获取数据
    getData() {
      http.getJsonSelf('card', `/${this.id}`).then(res => {
        this.cardForm = {
          ...res.data,
          secret: '******',
        };
        // 已是馆员不展示转为馆员
        this.showToStaff = !res.data.isStaff;
        this.cardForm.addr = this.showAddrCode(this.cardForm.addr)
        // this.cardForm.secret = '******';
        this.properties = res.data.properties;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    //处理地区编码
    showAddrCode(addr) {
      var addrArray = (addr || "").split('|');
      if (addrArray.length >= 2) {
        return addrArray[1];
      }
      return addr;
    },
    // 搜索用户
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        http.getJson('user-select-list-data', { keyword: query, pageIndex: 1, pageSize: 20 }).then(res => {
          this.userList = res.data.items;
          this.loading = false;
        }).catch(err => {
          this.$message({ type: 'error', message: '获取用户失败!' });
        })
      } else {
        this.options = [];
      }
    },
    changeUser(val) {
      let curUser = this.userList.find(item => item.id == val)
      for (const key in this.cardForm) {
        if (Object.hasOwnProperty.call(this.cardForm, key)) {
          if (curUser[key]) {
            const noCheck = ['status', 'studentNo'];
            if (noCheck.includes(key)) {// 不处理
            } else if (key == 'type') {// 特殊处理
              this.cardForm.cardReaderType = curUser.type;
            } else {
              this.cardForm[key] = curUser[key];
            }
          }
        }
      }
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
      http.getJson('card-init-data').then(res => {
        this.dataKey = res.data;
        // this.postForm = this.dataKey.userData || {};
        if (!this.id) {
          this.cardForm = this.dataKey.cardData || { secret: '' };
          this.cardForm.status = this.cardForm.status + ''
        }
        if (this.userId) {
          this.getUserData();
        }
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
      let select = this.groupSelect.find(item => (item.groupCode == code)) || {};
      return select.groupItems || [];
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

    upaloadFile(index) {
      this.index = index;
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      let data = response.data;
      // console.log(data);
      this.cardForm.properties[this.index].propertyValue = data[0];
    },
    // 下载附件
    downloadFile(url) {
      window.open(localStorage.getItem('fileUrl') + url);
    },
    newGuid() {
      var guid = "";
      for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
          guid += "-";
      }
      return guid;
    },
    //重置密码
    handleReset() {
      var cardId = this.cardForm.id;
      var newSecret = this.cardForm.no;
      this.$confirm('是否确认重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // http.postJson('reset-card-secret', { cardId: cardId, secret: newSecret }).then(res => {
        //   this.cardForm.secret = '******';
        //   this.$message({ message: `重置成功！密码为：${newSecret}`, type: 'success' });
        // }).catch(err => {
        //   this.$message({ type: 'error', message: '编辑失败!' });
        // })
        let guid = this.newGuid();
        http.getJsonSelf('reset-card-secret-verify-key', `/${guid}`).then(res => {
          http.postJson('reset-card-secret-by-verify-key', { cardId: cardId, verifyCode: guid, verifyKey: res.data }).then(res1 => {
            this.$message({ message: res1.data, type: 'success' });
            this.getData();
          }).catch(err => {
            this.$message({ type: 'error', message: '重置失败!' });
          })
        }).catch(err => {
          this.$message({ type: 'error', message: '重置失败!' });
        })
      }).catch(() => {
        // this.$message({ type: 'info', message: '已取消删除!' });
      });
    },
    //表单提交
    submitForm() {
      if (this.id && !this.cardForm.seeSensitiveInfo) {
        this.$message.warning('您没有用户隐私信息查看权限，不能修改信息。')
        return
      }
      // console.log(this.dataKey.needApprove)
      this.$refs['cardForm'].validate((cardOk) => {
        if (cardOk) {
          this.cardForm.readerType = this.dataKey.groupSelect.find(item => item.groupCode == 'User_Type').groupItems.find(item => item.value == this.cardForm.cardReaderType).key;
          if (this.id) {
            // 编辑
            http.putJson('card', this.cardForm).then(res => {
              this.$message({ message: this.dataKey.needApprove ? '已编辑成功，请等待审核！' : '编辑成功！', type: 'success' });
              this.$router.replace('/admin_readerCardList');
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '编辑失败') });
            })
          } else {
            // 新增
            this.cardForm.userId = this.cardForm.userId ? this.cardForm.userId : this.$route.query.userId;
            this.cardForm.id = undefined;
            http.postJson('card', this.cardForm).then(res => {
              this.$message({ message: this.dataKey.needApprove ? '已新增成功，请等待审核！' : '新增成功！', type: 'success' });
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
    refChangeCardSecret() {
      // var newStr = this.postForm.phone || '';
      var newStr = this.cardForm.phone || '';
      if (newStr.length == 11 && (!this.cardForm.secret || this.cardForm.secret == '')) {
        this.cardForm.secret = newStr.substring(newStr.length - 6);
      }
    },
    // 转为馆员
    handleChange() {
      this.$confirm('是否确认将该读者转为馆员?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        http.postJson('batch-set-user-as-staff', [this.id]).then(res => {
          this.$message({ type: 'success', message: '操作成功，请在馆员列表进行查看与管理!' });
          this.hideToStaff();
        }).catch(err => {
          this.$message({ type: 'error', message: this.handleError(err, '转为馆员失败!') });
        })
      }).catch(() => { })

    },
    // 发送消息
    handleSend() {
      let info = JSON.parse(localStorage.getItem('urlInfo')).find(item => item.code == 'noticecenter');
      location.href = info.path + '/noticecenter/admin_messageCreate?userId=' + this.id;
    },
    hideToStaff() {
      this.showToStaff = false;
    },
    // 获取用户组列表
    getGrounpList() {
      http.getJson('group-table-data', { pageIndex: 1, pageSize: 200 }).then(res => {
        this.grounpList = res.data.items;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 判断用户是否在用户组
    isGrounp(id) {
      return this.cardForm.groupIds && this.cardForm.groupIds.length ? this.cardForm.groupIds.includes(id) : false;
    },
    // 添加到用户组
    handleAddGrounp(id) {
      if (!this.cardForm.seeSensitiveInfo) {
        this.$message.warning('您没有用户隐私信息查看权限，不能修改信息。')
        return
      }
      if (!this.isGrounp(id)) {
        http.postJson('user-to-group', { groupId: id, userIds: [{ userId: this.cardForm.id, userKey: this.cardForm.cardKey }] }).then(res => {
          this.$message({ message: '添加成功！', type: 'success' });
          this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
        })
      } else {
        http.deleteJson('group-users', { groupId: id, userIds: [this.cardForm.id] }).then(res => {
          this.$message({ message: '取消成功！', type: 'success' });
          this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
        })
      }
    },
    hanldeCardType(val) {
      let list = this.initSelect('Card_CardType') || [];
      let curData = list.find(item => item.value == val) || {};
      this.cardForm.cardTypeName = curData.key || "";
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
/**颜色配置 */
@import "../../../../assets/admin/css/form.less";

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
    width: 100%;
    height: 62px;
    padding: 0;
    display: inline-block;
    vertical-align: top;
    position: relative;

    &::after {
      content: "*";
      position: absolute;
      color: #f56c6c;
      margin-right: 4px;
      left: 25px;
      top: 14px;
    }

    /deep/ .r-f-item1 {
      width: 49%;
      float: left;

      .el-form-item__content {
        margin-left: 40px !important;
      }
    }

    /deep/ .r-f-item2 {
      width: 50%;
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

  .harf-area {
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

.right-btn-box {
  width: 32%;
  margin-left: 3%;
  display: inline-block;
  vertical-align: top;

  .btn-list {
    margin-bottom: 20px;
  }

  .reader-group-list {
    .grounpSel {
      border-color: #6777ef;
      color: #6777ef;
    }
  }
}

/deep/ .el-input,
/deep/ .el-select,
/deep/ .admin-form .el-date-editor.el-input,
.divStyle {
  width: 95%;
  float: left;
}

/deep/ .el-form-item__content {
  // line-height: 39px;
}

/deep/ .el-cascader {
  width: 100%;
}

/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
  display: none;
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
