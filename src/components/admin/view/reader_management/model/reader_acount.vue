<template>
  <div>
    <div class="editdiv">
      <el-form ref="readerForm" :model="postForm" label-width="100px" :rules="readerRules" :disabled="isAllowEdit">
        <div class="harf-area">
          <el-form-item label="用户类型：" prop="type">
            <el-select v-model="postForm.type" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_Type')"
              v-el-select-loadmore="optionLoadMore('User_Type')">
              <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-select v-model="postForm.status" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_Status')"
              v-el-select-loadmore="optionLoadMore('User_Status')">
              <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key"
                :value="Number(item.value)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称：" prop="unit">
            <el-input v-model="postForm.unit" placeholder="请输入" maxlength="50" clearable show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="学历：" prop="edu">
            <el-select v-model="postForm.edu" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_Edu')" v-el-select-loadmore="optionLoadMore('User_Edu')">
              <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称：" prop="title">
            <el-select v-model="postForm.title" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_Title')"
              v-el-select-loadmore="optionLoadMore('User_Title')">
              <el-option v-for="item in initSelect('User_Title')" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门：" prop="depart" v-if="postForm.isStaff">
            <!-- <el-form-item label="部门" prop="depart"> -->
            <!-- <el-select v-model="postForm.depart" placeholder="请选择" clearable>
              <el-option v-for="item in initSelect('User_Depart')" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select> -->
            <el-cascader :options="depList" v-model="postForm.depart"
              :props="{ value: 'fullPath', label: 'name', children: 'children', emitPath: false }" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="所在学院：" prop="college">
            <el-select v-model="postForm.college" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_College')"
              v-el-select-loadmore="optionLoadMore('User_College')">
              <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在系：" prop="collegeDepart">
            <el-select v-model="postForm.collegeDepart" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_CollegeDepart')"
              v-el-select-loadmore="optionLoadMore('User_CollegeDepart')">
              <el-option v-for="item in initSelect('User_CollegeDepart')" :key="item.value" :label="item.key"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业：" prop="major">
            <el-select v-model="postForm.major" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_Major')"
              v-el-select-loadmore="optionLoadMore('User_Major')">
              <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级：" prop="grade">
            <el-select v-model="postForm.grade" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_Grade')"
              v-el-select-loadmore="optionLoadMore('User_Grade')">
              <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级：" prop="class">
            <el-select v-model="postForm.class" placeholder="请选择" clearable filterable
              :filter-method="(value) => handleFilter(value, 'User_Class')"
              v-el-select-loadmore="optionLoadMore('User_Class')">
              <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard"
            :class="mergeInfo && mergeInfo.repeateIdCard && postForm.idCard == mergeInfo.idCard ? 'is-error' : ''">
            <el-input v-model="postForm.idCard" placeholder="请输入" maxlength="30" show-word-limit>
              <template slot="append">
                <div v-if="postForm.idCardIdentity">
                  <span class="yuan"></span>
                  <span class="renzheng">已认证</span>
                </div>
                <div v-if="!postForm.idCardIdentity">
                  <span class="renzheng tag-text">未认证</span>
                </div>
              </template>
            </el-input>
            <div class="el-form-item__error" v-if="mergeInfo && mergeInfo.repeateIdCard && postForm.idCard == mergeInfo.idCard">
              身份证号重复</div>
          </el-form-item>
        </div>
        <div class="harf-area">
          <el-form-item label="昵称：" prop="nickName">
            <el-input v-model="postForm.nickName" placeholder="请输入" maxlength="20" clearable show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-radio-group v-model="postForm.gender" class="radios">
              <el-radio v-for="item in initSelect('User_Gender')" :key="item.value"
                :label="item.key">{{ item.key }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone"
            :class="mergeInfo && mergeInfo.repeatePhone && postForm.phone == mergeInfo.phone ? 'is-error is-required' : ''">
            <el-input v-model="postForm.phone" placeholder="请输入">
              <template slot="append">
                <div v-if="postForm.mobileIdentity">
                  <span class="yuan"></span>
                  <span class="renzheng">已认证</span>
                </div>
                <div v-if="!postForm.mobileIdentity">
                  <span class="renzheng tag-text">未认证</span>
                </div>
              </template>
            </el-input>
            <div class="el-form-item__error" v-if="mergeInfo && mergeInfo.repeatePhone && postForm.phone == mergeInfo.phone">
              手机号重复</div>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email" class="youxiang">
            <el-input v-model="postForm.email" placeholder="请输入" maxlength="30" show-word-limit>
              <template slot="append">
                <div v-if="postForm.emailIdentity">
                  <span class="yuan"></span>
                  <span class="renzheng">已认证</span>
                </div>
                <div v-if="!postForm.emailIdentity">
                  <span class="renzheng tag-text">未认证</span>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="出生年月：" prop="birthday">
            <el-date-picker class="wq95" v-model="postForm.birthday" type="date" placeholder="选择日期" clearable
              value-format="yyyy-MM-dd" format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所在地：" prop="addr">
            <!-- <el-select v-model="postForm.addr" placeholder="请选择">
              <el-option v-for="item in departoptions" :key="item.value" :label="item.key" :value="item.value">
              </el-option>
            </el-select> -->
            <!-- <el-input v-model="postForm.addr" placeholder="请输入" maxlength="50" clearable show-word-limit></el-input> -->
            <el-cascader :options="addrList" v-model="postForm.addr"
              :props="{ value: 'idDisp', label: 'name', children: 'children', emitPath: false }" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址：" prop="addrDetail">
            <el-input v-model="postForm.addrDetail" placeholder="请输入" maxlength="120" clearable
              show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="离校日期：" prop="leaveTime">
            <el-date-picker class="wq95" v-model="postForm.leaveTime" type="date" placeholder="选择日期" clearable
              value-format="yyyy-MM-dd" format="yyyy年MM月dd日">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="第三方信息：">
            <div class="sides" v-if="postForm.WeChatOpenId || postForm.qqOpenId">
              <img :src="getImg('icon-wx')" v-if="postForm.WeChatOpenId" class="pictures" />
              <img :src="getImg('icon-qq')" v-if="postForm.qqOpenId" class="pictures" />
            </div>
            <div class="unbind" v-else>暂无</div>
          </el-form-item>
          <el-form-item :label="item.propertyName + '：'" v-for="(item, index) in postForm.properties"
            :key="item.propertyCode" :rules="getDynamicRule(item)" :prop="`properties.${index}.propertyValue`">
            <el-input v-model="item.propertyValue" maxlength="20" clearable show-word-limit placeholder="请输入"
              v-if="item.propertyType == 0"></el-input>
            <el-input-number class="wq100" v-model="item.propertyValue" v-if="item.propertyType == 1"
              placeholder="请输入"></el-input-number>
            <el-date-picker class="wq95" v-model="item.propertyValue" type="date" value-format="yyyy-MM-dd"
              placeholder="选择日期" v-if="item.propertyType == 2"></el-date-picker>
            <el-radio-group v-model="item.propertyValue" v-if="item.propertyType == 3" class="radios">
              <el-radio :label="'true'">是</el-radio>
              <el-radio :label="'false'">否</el-radio>
            </el-radio-group>
            <el-select v-model="item.propertyValue" placeholder="请选择" v-if="item.propertyType == 4" clearable filterable
              :filter-method="(value) => handleFilter(value, item.code)" v-el-select-loadmore="optionLoadMore(item.code)">
              <el-option v-for="item in initSelect(item.propertyCode)" :key="item.value" :label="item.key"
                :value="item.value"></el-option>
            </el-select>
            <el-cascader v-if="item.propertyType == 5" :options="addrList" v-model="item.propertyValue"
              :props="{ value: 'idDisp', label: 'name', children: 'children', emitPath: false }" clearable></el-cascader>
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
        <!-- <el-form-item label="学号" prop="studentNo">
          <el-input v-model="postForm.studentNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
        </el-form-item> -->
      </el-form>
      <div class="btn_box">
        <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1" v-has="'reader:update'"
          v-button-debounce>保存</el-button>
      </div>
    </div>
    <div class="reader-right">
      <!-- <div class="right-title">添加至用户分组</div>
      <div class="right-box">
        <span :class="isGrounp(item.id)?'grounpSel':''" v-for="item in grounpList" :key="item.id" :data-id="item.id" @click="handleAddGrounp(item.id)">{{item.name}}</span>
      </div> -->
      <!-- <div class="right-title">添加至用户分组</div> -->
      <!-- <div class="right-box user-tag">
        <span v-for="item in userTagList" :key="item.id" :data-id="item.id">{{item.name}}</span>
        <span>搜索达人<img src="@/assets/admin/img/userManager/jian.png" class="imgs del" /></span>
      </div> -->
      <!-- <div class="right-title">更多</div>
      <div class="right-box user-tag">
        <span @click="addTag">学妹<img src="@/assets/admin/img/userManager/icon_add2x.png" class="imgs" /></span>
      </div> -->
    </div>
    <el-dialog append-to-body :title="titles" :visible.sync="editVisible" width="26%" :modal-append-to-body="false"
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="70px">
        <div class="tables">
          <div class="right-box">
            <span v-for="(item, index) in list" :key="index" @click="changeStatus($event, index, item)"
              :class="item.ischecked ? 'xuanzhong' : ''">
              {{ item.name }}
              <i class="el-icon-check duihao" v-if="item.ischecked"></i>
            </span>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false" icon="iconfont el-icon-vip-quxiao">取消</el-button>
        <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1" v-button-debounce>保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";

export default {
  data() {
    return {
      loading: false,
      postForm: {},
      dataKey: null,
      groupSelect: [],
      properties: null,
      mergeInfo: null,//合并信息提示
      readerRules: {
        name: [
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
        ]
      },

      grounpList: [],
      userTagList: [],

      depList: [],
      addrList: [],
      uploadUrl: localStorage.getItem('fileUrl') + '/api/file/upload-file',
      myHeaders: { Authorization: 'Bearer ' + window.localStorage['token'] },
      fileList: [],
    }
  },
  props: ['id', 'iconUrl'],
  computed: {
    isAllowEdit() {
      return !this.$_has('reader:update')
    }
  },
  created() {
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
    // 初始化图标
    getImg(icon) {
      let data = {
        'icon-wx': require("@/assets/admin/img/userManager/weixin.png"),
        'icon-qq': require("@/assets/admin/img/userManager/qq.png"),
        // 'icon-mobile': require("@/assets/admin/img/userManager/duanxin.png"),
        // 'icon-card': require("@/assets/admin/img/userManager/sfz.png"),
        // 'icon-school': require("@/assets/admin/img/userManager/xuexiao.png"),
      }
      return data[icon];
    },
    // 获取用户标签列表
    getTagList() {
      http.getJson('user-tag-table-data', { pageIndex: 1, pageSize: 200 }).then(res => {
        this.userTagList = res.data.items;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取用户标签失败!' });
      })
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
    initData() {
      this.getKey();
      this.getDepList();
      this.getAddrList();
      this.getGrounpList();
      this.getTagList();

      if (this.id) {
        this.getData();
      }
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
        // 下拉框选项初始化时控制在10
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
        var groupInfo = this.dataKey.groupSelect.find(x => {
          return x.groupCode == "User_Groups";
        });
        if (groupInfo) {
          this.groups = groupInfo.groupItems;
        }
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
      return this.postForm.groupIds.includes(id);
    },
    // 获取数据
    getData() {
      this.loading = true;
      http.getJsonSelf('user-for-edit', `/${this.id}`).then(res => {
        this.rebuildFormData(res.data);
        this.postForm = res.data;
        this.properties = res.data.properties;
        if (this.postForm.isStaff) {
          this.$emit('hide-to-staff');
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
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
    // 添加到用户组
    handleAddGrounp(id) {
      if (!this.postForm.seeSensitiveInfo) {
        this.$message.warning('您没有用户隐私信息查看权限，不能修改信息。')
        return
      }
      if (!this.isGrounp(id)) {
        http.postJson('user-to-group', { groupId: id, userIds: [{ userId: this.postForm.id, userKey: this.postForm.userKey }] }).then(res => {
          this.$message({ message: '添加成功！', type: 'success' });
          this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
        })
      } else {
        http.deleteJson('group-users', { groupId: id, userIds: [this.postForm.id] }).then(res => {
          this.$message({ message: '取消成功！', type: 'success' });
          this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
        })
      }
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
      if (!this.postForm.seeSensitiveInfo) {
        this.$message.warning('您没有用户隐私信息查看权限，不能修改信息。')
        return
      }
      this.$refs['readerForm'].validate((ok) => {
        if (ok) {
          if (this.iconUrl && this.iconUrl != '') {
            this.postForm.photo = this.iconUrl
          }
          if (this.id) {
            http.postJson('with-merge', this.postForm).then(res => {
              if (!res.data.success) {
                this.$confirm('该手机账号已被占用，是否需要将读者进行合并操作！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  let repeateInfo = {};
                  res.data.repeatePhone && (repeateInfo.phone = this.postForm.phone);
                  res.data.repeateIdCard && (repeateInfo.idCard = this.postForm.idCard);
                  this.$router.push({ path: '/admin_mergeReader', query: { id: this.id, repeateInfo: JSON.stringify(repeateInfo) } })
                }).catch(() => {
                  this.mergeInfo = res.data;
                  this.mergeInfo.phone = this.postForm.phone;
                  this.mergeInfo.idCard = this.postForm.idCard;
                })
              } else {
                this.$message({ message: this.dataKey.needApprove ? '已编辑成功，请等待审核！' : '编辑成功！', type: 'success' });
                this.getData();
              }
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '编辑失败') });
            })
          } else {
            http.postJson('user', this.postForm).then(res => {
              this.$message({ message: this.dataKey.needApprove ? '已新增成功，请等待审核！' : '新增成功！', type: 'success' });
              this.id = res.data;
              this.getData();
            }).catch(err => {
              this.$message({ type: 'error', message: this.handleError(err, '新增失败') });
            })
          }
        }
      });
    },
    rebuildFormData(data) {
      if (data && data.addr) {
        data.addr = this.showAddrCode(data.addr);
      }
      if (data && data.properties) {
        data.properties.forEach(element => {
          if (element.propertyType == 5) {
            element.propertyValue = this.showAddrCode(element.propertyValue);
          }
        });
      }
    },
    //处理地区编码
    showAddrCode(addr) {
      var addrArray = (addr || "").split('|');
      if (addrArray.length >= 2) {
        return addrArray[1];
      }
      return addr;
    }
  }
}
</script>
<style scoped lang="less">
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
  width: 65%;
  float: left;

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
  // display: table;
  overflow: hidden;
  margin: 2% 0 6% 0;
  display: flex;
  flex-wrap: wrap;

  .grounpSel {
    border-color: #6777ef;
    color: #6777ef;
  }

  &.user-tag {
    span {
      cursor: auto;
    }

    .imgs {
      width: 13px;
      height: 11px;
      margin: -5px -9px 0 5px !important;
      float: right;
    }
  }
}

.right-box span {
  display: block;
  float: left;
  border: 1px solid #e4e6fc;
  color: #6c757d;
  font-size: 13px;
  text-align: center;
  padding: 6px 13px;
  margin: 10px 10px 0 0;
  cursor: pointer;
  border-radius: 3px;
}

.el-select-dropdown__item {
  padding-left: 3% !important;
}

/deep/ .el-radio {
  margin: 2% 9% 0 0;
}

/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
  display: none;
}

.tag-box {
  position: absolute;
  width: 80px;
  right: 30px;
  text-align: right;
}

.yuan {
  width: 8px !important;
  height: 8px;
  background: #8cc63f;
  border-radius: 100%;
  margin: 16px 2% 0 0;
  display: inline-block;
}

.renzheng {
  color: #6c757d;
  width: auto !important;
  margin-right: 3%;
}

.tag-text {
  color: #909399;
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

/deep/ .el-form-item {
  width: 100%;
  display: table;
  padding: 0;
  // float: left;
  display: inline-block;
  vertical-align: top;
}

/deep/ .el-input,
/deep/ .el-select,
.divStyle {
  width: 95%;
  float: left;
  min-width: 220px;
}

/deep/ .el-form-item__content {
  line-height: 1;
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
  margin-left: 100px;
  clear: both;
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

.el-form {
  .sides {
    .pictures {
      width: 40px;
      height: 40px;
      margin-right: 6px;
      cursor: pointer;
    }
  }

  .unbind {
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #666;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}</style>