<template>
  <el-dialog append-to-body title="添加临时馆员" :visible.sync="dialogVisible" width="600px" :before-close="dialogBeforeClose">
    <el-alert title="临时馆员只能登录管理后台，如需登录前台请先添加读者信息" type="warning" show-icon></el-alert>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm admin-form" v-if="dataKey">
      <el-form-item label="读者名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" maxlength="20" clearable show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="学工号" prop="studentNo">
        <el-input v-model="ruleForm.studentNo" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="单位名称" prop="unit">
        <el-input v-model="ruleForm.unit" placeholder="请输入" maxlength="50" clearable show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="读者类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="edu">
        <el-select v-model="ruleForm.edu" placeholder="请选择">
          <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职称" prop="title">
        <el-select v-model="ruleForm.title" placeholder="请选择">
          <el-option v-for="item in initSelect('User_Title')" :key="item.value" :label="item.key" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="depart">
        <!-- <el-select v-model="ruleForm.depart" placeholder="请选择">
          <el-option v-for="item in initSelect('User_Depart')" :key="item.value" :label="item.key" :value="item.value">
          </el-option>
        </el-select> -->
        <el-cascader :options="departList" v-model="depart" :props="{ value:'fullPath',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入" clearable maxlength="11" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="ruleForm.idCard" placeholder="请输入" clearable maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForm.account" placeholder="请输入" clearable maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入" show-password clearable maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key">{{item.key}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生效日期" prop="issueDate">
        <!-- <el-date-picker v-model="ruleForm.issueDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="times-box">
              </el-date-picker> -->
        <el-date-picker v-model="ruleForm.issueDate" type="date" placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止日期" prop="expireDate">
        <!-- <el-date-picker v-model="ruleForm.issueDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="times-box">
              </el-date-picker> -->
        <el-date-picker v-model="ruleForm.expireDate" type="date" placeholder="请选择"></el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <!-- <el-option v-for="item in titleOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option> -->
          <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key" :value="Number(item.value)"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <updateIcon @coverUrl="coverUrl" style="width:92%" :cover="ruleForm.photo"></updateIcon>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="sub" icon="iconfont el-icon-vip-baocun1">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";
import updateIcon from '@/components/admin/view/model/updateIcon.vue';

export default {
  name: 'index',
  components: { updateIcon },
  props: ['dataKey', 'departList'],
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "",
        "unit": "",
        "edu": "",
        "depart": "",
        "phone": "",
        "idCard": "",
        "account": "",
        "password": "",
        "gender": "",
        "issueDate": "",
        "expireDate": "",
        "status": "",
        "type": "",
        "photo": "/public/image/default-user-head/default-user-head.png"
      },
      rules: {
        name: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        studentNo: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '必填项', trigger: 'change' }
        ],
        type: [
          { required: true, message: '必填项', trigger: 'change' }
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
        issueDate: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        expireDate: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        account: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '必填项', trigger: 'blur' },
        ],
        idCard: [
          {
            validator: this.$validator.validatePattern,
            message: '格式错误',
            pattern: this.$validator.idCard,
            trigger: 'blur'
          }
        ],
      },
    };
  },
  computed: {},
  created() {

  },
  mounted() { },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 获取图标
    coverUrl(url) {
      this.postForm.photo = url;
    },
    sub() {
      this.$refs.ruleForm.validate(ok => {
        if (ok) {
          http.postJson('temp-staff', this.ruleForm).then(res => {
            this.$message({ type: 'success', message: '添加成功!' });
            this.dialogVisible = false;
          }).catch(err => {
            this.$message({ type: 'error', message: this.handleError(err, '添加失败') });
          })
        }

      })

    },
    // 添加临时馆员
    handleAddStaff() {
      http.postJson('temp-staff', this.ruleForm).then(res => {
        this.$message({ type: 'success', message: '添加成功!' });
        this.$emit('update')
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '添加失败') });
      })
    },
  },
};
</script>
<style scoped lang='less'>
/deep/ .el-cascader {
  width: 100%;
}
.demo-ruleForm {
  margin-top: 20px;
  max-height: 400px;
  overflow-y: scroll;
}
</style>