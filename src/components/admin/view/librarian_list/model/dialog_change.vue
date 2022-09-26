<template>
  <el-dialog append-to-body title="变动组织" :visible.sync="dialogVisible" width="600px" :before-close="dialogBeforeClose">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="选择部门：">
        <el-cascader :options="departList" v-model="depart" :props="{ value:'fullPath',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="sub" icon="iconfont el-icon-vip-baocun1" v-button-debounce>保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";

export default {
  name: 'index',
  components: {},
  props: ['userList'],
  data() {
    return {
      dialogVisible: false,
      depart: '',
      departList: []
    };
  },
  computed: {},
  created() {

  },
  mounted() { },
  methods: {
    show() {
      this.dialogVisible = true;
      this.getDepa();
    },
    // 获取部门
    getDepa() {
      http.getJson('org-count-list').then(res => {
        this.departList = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
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