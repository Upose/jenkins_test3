<template>
  <el-dialog title="审核" :visible.sync="dialogVisible" width="700px" :before-close="dialogBeforeClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="审批">
        <el-radio-group v-model="postFrom.passed">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="postFrom.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" icon="el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="submitForm" icon="el-icon-vip-baocun1">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";
// import paging from "@/components/admin/model/paging";

export default {
  name: 'preview',
  props: ['dataKey'],
  data() {
    return {
      dataKey: sessionStorage.getItem('user_dataKey'),
      id: '',
      dialogVisible: false,
      postFrom: {
        "logID": "",
        "passed": true,
        "remark": ""
      }
    }
  },
  // components: { paging },
  mounted() {
  },
  methods: {
    // 显示弹窗
    show(type, logid) {
      this.type = type;
      this.urlData = {
        'reader': { url: 'approve-user-change', id: logid },
        'attribute': { url: 'approve-property-change', id: logid },
        'register': { url: 'user-register-table-data', id: logid },
        'card': { url: 'approve-card-claim', id: logid },
      }
      this.dialogVisible = true;
    },
    //表单提交
    submitForm() {
      this.postFrom.logID = this.urlData[this.type].id;
      http.postJson(this.urlData[this.type].url, this.postFrom).then(res => {
        this.$emit('auditSub')
        this.dialogVisible = false;
        this.$message({ message: '已审核！', type: 'success' });
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '审核失败') });
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import "../../../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../../../assets/admin/css/form.less";

.name {
  padding: 10px;
  font-size: 16px;
}
.form-box {
  margin-bottom: 10px;
}
</style>