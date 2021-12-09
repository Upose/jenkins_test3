<template>
  <el-dialog title="同步配置" :visible.sync="dialogVisible" width="600px" :before-close="dialogBeforeClose">
    <el-form :model="form" ref="form" label-width="140px" :rules="rules">
      <el-form-item label="任务程序集名称" prop="assemblyFullName">
        <el-input v-model="form.assemblyFullName"></el-input>
      </el-form-item>
      <el-form-item label="任务类名" prop="classFullName">
        <el-input v-model="form.classFullName"></el-input>
      </el-form-item>
      <el-form-item label="任务参数">
        <el-input v-model="form.taskParam"></el-input>
      </el-form-item>
      <el-form-item label="适配器程序集名称" prop="adapterAssemblyFullName">
        <el-input v-model="form.adapterAssemblyFullName"></el-input>
      </el-form-item>
      <el-form-item label="适配器类名" prop="adapterClassFullName">
        <el-input v-model="form.adapterClassFullName"></el-input>
      </el-form-item>
      <el-form-item label="适配器参数">
        <el-input v-model="form.adapterParm"></el-input>
      </el-form-item>
      <el-form-item label="Cron表达式" prop="cron">
        <el-input v-model="form.cron"></el-input>
      </el-form-item>
      <el-form-item label="Cron说明">
        <el-input v-model="form.cronRemark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="validateRun">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'index',
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      form: {
        "jobName": "",
        "cron": "",
        "cronRemark": "",
        "assemblyFullName": "",
        "classFullName": "",
        "taskParam": "",
        "adapterAssemblyFullName": "",
        "adapterClassFullName": "",
        "adapterParm": "",
        "jobStatus": 0,
        "remark": ""
      },

      rules: {
        assemblyFullName: [
          { required: true, message: '请输入任务程序集名称', trigger: 'blur' },
        ],
        classFullName: [
          { required: true, message: '请输入任务类名', trigger: 'blur' },
        ],
        adapterAssemblyFullName: [
          { required: true, message: '请输入适配器程序集名称', trigger: 'blur' },
        ],
        adapterClassFullName: [
          { required: true, message: '请输入适配器类名', trigger: 'blur' },
        ],
        cron: [
          { required: true, message: '请输入Cron表达式', trigger: 'blur' },
        ],
      }
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
    submit() {
      this.http.postJson('set-sync-card-config', this.form).then(res => {
        this.$message({ type: 'success', message: '同步配置成功!' });
        this.dialogVisible = false;
      }).catch(err => {
        this.$message({ type: 'error', message: '同步配置失败!' });
      })
    },
    validateRun() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.submit();
        } else {
          this.$message({
            message: '请完善信息！',
            type: 'warning'
          })
        }
      });
    }
  },
};
</script>
<style scoped lang='less'>
</style>