<template>
  <el-dialog title="设置信息编辑项" :visible.sync="dialogVisible" width="700px">
    <!-- <el-checkbox-group v-model="postForm"> -->
      <el-checkbox :key="item.id" v-for="item in list" class="info-item" v-model="item.isCheck" :disabled="!item.isEnable">{{item.propertyName}} <span v-if="item.isRequired||item.isUnique">(<span v-if="item.isRequired">必填</span> <span v-if="item.isUnique">唯一</span>)</span></el-checkbox>
    <!-- </el-checkbox-group> -->
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
      dataKey: {},
      dialogVisible: false,
      id: '',
      roleList: [],
      model: [],
      list: [],
      postForm:[],
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.getKey();
    },
    getKey() {
      http.getJson('reader-edit-property').then(res => {
        this.list = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    //表单提交
    submitForm() {
      http.postJson('set-reader-edit-property', this.list).then(res => {
        this.$message({ message: '保存成功！', type: 'success' });
        this.dialogVisible = false;
        // this.getData();
      }).catch(err => {
        this.$message({ type: 'error', message: '保存失败!' });
      })
    },
  }
}
</script>
<style lang="less" scoped>
.info-item{
  width: 26%;
  margin-bottom: 20px;
}
</style>