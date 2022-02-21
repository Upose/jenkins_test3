<template>
  <el-dialog title="变动组织" :visible.sync="dialogVisible" width="600px" :before-close="dialogBeforeClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="选择部门">
        <el-cascader :options="departList" v-model="depart" :props="{ value:'fullPath',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="sub" icon="el-icon-vip-baocun1">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";

export default {
  name: 'index',
  components: {},
  props: ['departList', 'userList'],
  data() {
    return {
      dialogVisible: false,
      depart: '',
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
    sub() {
      let userIds = this.userList.map(item => {
        return item.id;
      })
      http.postJson('batch-set-department', { userIds: userIds, depart: this.depart }).then(res => {
        this.$message({ type: 'success', message: '变动成功!' });
        this.dialogVisible = false;
        this.$emit('getList');
      }).catch(err => {
        this.$message({ type: 'error', message: '变动失败!' });
      })
    }
  },
};
</script>
<style scoped lang='less'>
/deep/ .el-cascader {
  width: 100%;
}
</style>