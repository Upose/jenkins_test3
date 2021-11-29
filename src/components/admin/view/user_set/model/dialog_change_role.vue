<template>
  <el-dialog title="修改角色" :visible.sync="dialogVisible" width="500px">
    <el-form :model="form" label-width="100px">
      <el-form-item label="选择角色">
        <el-checkbox-group v-model="roleID">
          <el-checkbox :label="item.id" :value="item.id" v-for="item in roleList" :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";

export default { 
  data() {
    return {
      dialogVisible: false,
      id: '',
      roleList: [],
      roleID:[]
    }
  },
  props:['id'],
  methods: {
    show(id) {
      this.id = id;
      this.dialogVisible = true;
      this.getList();
    },
    // 获取列表数据
    getList() {
      http.getJson('role-table-data').then(res => {
        let list = res.data.items || [];
        this.roleList = list;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    //表单提交
    submitForm() {
      http.postJson('set-user-roles', {
        userId:this.id,
        roleIds:this.roleID
      }).then(res => {
        this.$message({ message: '修改成功！', type: 'success' });
        this.dialogVisible = false;
        this.$emit('update')
        // this.getData();
      }).catch(err => {
        this.$message({ type: 'error', message: '修改失败!' });
      })
    },
  }
}
</script>