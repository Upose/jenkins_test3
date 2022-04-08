<template>
  <el-dialog append-to-body title="批量修改" :visible.sync="dialogVisible" width="500px">
    <el-form :model="postForm" label-width="120px" v-if="dataKey">
      <el-form-item label="学历">
        <!-- <el-checkbox v-model="b"></el-checkbox> -->
        <el-select v-model="postForm.edu" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Edu')">
          <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Edu').length==200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="院系">
        <el-select v-model="postForm.college" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_College')">
          <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_College').length==200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="postForm.major" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Major')">
          <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Major').length==200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="postForm.grade" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Grade')">
          <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Grade').length==200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="postForm.class" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Class')">
          <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Class').length==200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="postForm.gender" placeholder="请选择" clearable>
          <el-option v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="postForm.type" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Type')">
          <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Type').length==200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="postForm.status" placeholder="请选择" clearable filterable :filter-method="(value)=>handleFilter(value,'User_Status')">
          <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          <el-option label="如未找到，请输入筛选..." value="000" :disabled="true" v-if="initSelect('User_Status').length==200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="离校日期">
        <el-date-picker v-model="postForm.leaveTime" type="date" placeholder="请选择" clearable></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1">保 存</el-button>
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
      postForm: {
        "userIDList": [],
        "fields": [],
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
    this.getKey()
  },
  methods: {
    // 显示弹窗
    show() {
      this.dialogVisible = true;
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
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
        console.log("🚀 ~ file: some_change.vue ~ line 121 ~ http.getJson ~ this.groupSelect", this.groupSelect)
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
    //表单提交
    submitForm() {
      this.postForm.userIDList = this.userList.map(item => {
        return item.id;
      });
      this.postForm.fields = [];
      for (var key in this.postForm) {
        if (!Array.isArray(this.postForm[key]) && this.postForm[key]) {
          this.postForm.fields.push(key);
        }
      }
      http.putJson('batch-update', this.postForm).then(res => {
        this.dialogVisible = false;
        this.$message({ message: '修改成功' + this.dataKey.needApprove ? '，等待审核！' : '！', type: 'success' });
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
</style>