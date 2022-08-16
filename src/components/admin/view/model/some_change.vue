<template>
  <el-dialog append-to-body title="批量修改" :visible.sync="dialogVisible" width="800px">
    <el-form :model="postForm" label-width="120px" v-if="dataKey">
      <el-form-item label="学历：">
        <el-select class="wq50" v-model="postForm.edu" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Edu')" v-el-select-loadmore="optionLoadMore('User_Edu')">
          <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
        <!-- <el-checkbox v-model="b"></el-checkbox> -->
      </el-form-item>
      <el-form-item label="院系：">
        <el-select class="wq50" v-model="postForm.college" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_College')" v-el-select-loadmore="optionLoadMore('User_College')">
          <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业：">
        <el-select class="wq50" v-model="postForm.major" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Major')" v-el-select-loadmore="optionLoadMore('User_Major')">
          <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级：">
        <el-select class="wq50" v-model="postForm.grade" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Grade')" v-el-select-loadmore="optionLoadMore('User_Grade')">
          <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级：">
        <el-select class="wq50" v-model="postForm.class" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Class')" v-el-select-loadmore="optionLoadMore('User_Class')">
          <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别：">
        <el-select class="wq50" v-model="postForm.gender" placeholder="请选择" clearable>
          <el-option v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型：">
        <el-select class="wq50" v-model="postForm.type" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Type')" v-el-select-loadmore="optionLoadMore('User_Type')">
          <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select class="wq50" v-model="postForm.status" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Status')" v-el-select-loadmore="optionLoadMore('User_Status')">
          <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="离校日期：">
        <el-date-picker class="wq50" v-model="postForm.leaveTime" type="date" placeholder="请选择" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="用户分组：">
        <el-checkbox-group v-model="postForm.groupIDList">
          <el-checkbox v-for="item in grounpOption" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1" v-button-debounce>保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";
// import paging from "@/components/admin/model/paging";

export default {
  name: 'preview',
  props: ['userList'],
  data() {
    return {
      dataKey: null,
      groupSelect: [],
      id: '',
      dialogVisible: false,
      grounpOption: [],

      userIDList: [],
      fields: [],
      postForm: {
        "groupIDList": [],
        "edu": "",
        "college": "",
        "major": "",
        "grade": "",
        "class": "",
        "gender": "",
        "type": "",
        "status": null,
        "leaveTime": null
      },

      // 系统属性code
      sysArrt: ['User_Name', 'User_NickName', 'User_StudentNo', 'User_Unit', 'User_Edu', 'User_Depart', 'User_Title', 'User_College', 'User_Grade', 'User_Major', 'User_Class', 'User_Type', 'User_Status', 'User_Phone', 'User_IdCard', 'User_Email', 'User_Birthday', 'User_Gender', 'User_AddrDetail', 'User_Addr', 'Card_No', 'User_LeaveTime', 'User_Photo', 'Card_BarCode', 'Card_PhysicNo', 'Card_Type', 'Card_IdentityNo', 'Card_Status', 'Card_IsPrincipal', 'Card_ExpireDate', 'Card_IssueDate', 'Card_Deposit'],
      // 系统属性code对应字段名称
      sysArrtKey: ['name', 'nickName', 'studentNo', 'unit', 'edu', 'depart', 'title', 'college', 'grade', 'major', 'class', 'type', 'status', 'phone', 'idCard', 'email', 'birthday', 'gender', 'addrDetail', 'addr', 'cardNo', 'leaveTime', 'photo', 'cardBarCode', 'cardPhysicNo', 'cardType', 'cardIdentityNo', 'cardStatus', 'cardIsPrincipal', 'cardExpireDate', 'cardIssueDate', 'cardDeposit']

    }
  },
  // components: { paging },
  mounted() {

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
    // 显示弹窗
    show() {
      this.getGrounpList();
      this.getKey()
      this.dialogVisible = true;
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
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
    // 获取用户组列表
    getGrounpList() {
      http.getJson('group-table-data', { pageIndex: 1, pageSize: 200 }).then(res => {
        this.grounpOption = res.data.items || [];
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.groupSelect.length) return;
      let select = this.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
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
    //表单提交
    submitForm() {
      this.userIDList = this.userList.map(item => {
        return item.id;
      });
      this.fields = [];
      for (var key in this.postForm) {
        if (this.postForm[key] && (this.postForm[key] !== [] || this.postForm[key] !== '')) {
          this.fields.push(key);
        }
      }
      http.putJson('batch-update', { ...this.postForm, fields: this.fields, userIDList: this.userIDList }).then(res => {
        this.dialogVisible = false;
        this.$message({ message: this.dataKey.needApprove ? '修改成功，等待审核！' : '修改成功！', type: 'success' });
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '修改失败') });
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
.wq50 {
  width: 50% !important;
}
</style>