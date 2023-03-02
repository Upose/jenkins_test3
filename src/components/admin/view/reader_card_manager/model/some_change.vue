<template>
  <el-dialog append-to-body title="批量修改" :visible.sync="dialogVisible" width="500px">
    <el-form :model="postForm" label-width="120px" v-if="dataKey">
      <el-form-item label="卡类型：">
        <el-select v-model="postForm.type" placeholder="请选择" clearable>
          <el-option v-for="item in initSelect('Card_Type')" :key="item.value" :label="item.key"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡状态：">
        <el-select v-model="postForm.status" placeholder="请选择" clearable>
          <el-option v-for="item in initSelect('Card_Status')" :key="item.value" :label="item.key"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发卡日期：">
        <el-date-picker v-model="postForm.issueDate" type="date" placeholder="请选择" clearable value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期：">
        <el-date-picker v-model="postForm.expireDate" type="date" placeholder="请选择" clearable value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"></el-date-picker>
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
  props: ['dataKey', 'cardList'],
  data() {
    return {
      id: '',
      dialogVisible: false,
      postForm: {
        "cardIDList": [],
        "fields": [],
        "type": "",
        "status": null,
        "issueDate": null,
        "expireDate": null
      },

      // 系统属性code
      sysArrt: ['User_Name', 'User_NickName', 'User_StudentNo', 'User_Unit', 'User_Edu', 'User_Depart', 'User_Title', 'User_College', 'User_Grade', 'User_Major', 'User_Class', 'User_Type', 'User_Status', 'User_Phone', 'User_IdCard', 'User_Email', 'User_Birthday', 'User_Gender', 'User_AddrDetail', 'User_Addr', 'Card_No', 'User_LeaveTime', 'User_Photo', 'Card_BarCode', 'Card_PhysicNo', 'Card_Type', 'Card_IdentityNo', 'Card_Status', 'Card_IsPrincipal', 'Card_ExpireDate', 'Card_IssueDate', 'Card_Deposit'],
      // 系统属性code对应字段名称
      sysArrtKey: ['name', 'nickName', 'studentNo', 'unit', 'edu', 'depart', 'title', 'college', 'grade', 'major', 'class', 'type', 'status', 'phone', 'idCard', 'email', 'birthday', 'gender', 'addrDetail', 'addr', 'cardNo', 'leaveTime', 'photo', 'cardBarCode', 'cardPhysicNo', 'cardType', 'cardIdentityNo', 'cardStatus', 'cardIsPrincipal', 'cardExpireDate', 'cardIssueDate', 'cardDeposit']

    }
  },
  // components: { paging },
  mounted() {
    // this.getKey()
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
    //表单提交
    submitForm() {
      this.postForm.cardIDList = this.cardList.map(item => {
        return item.id;
      });
      this.postForm.fields = [];
      for (var key in this.postForm) {
        if (!Array.isArray(this.postForm[key]) && this.postForm[key]) {
          this.postForm.fields.push(key);
        }
      }
      http.putJson('card-batch-update', this.postForm).then(res => {
        this.dialogVisible = false;
        this.$message({ message: '修改成功！', type: 'success' });
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '修改失败') });
      })
    },
  },
}
</script>
<style lang="less" scoped>@import "../../../../../assets/admin/css/color.less";
/**颜色配置 */
@import "../../../../../assets/admin/css/form.less";</style>