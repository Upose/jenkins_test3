<template>
  <el-dialog append-to-body title="设置信息编辑项" :visible.sync="dialogVisible" width="700px">
    <div style="min-height:50px;" v-loading="loading">
      <div>
        <!-- <el-checkbox-group v-model="postForm"> -->
        <el-checkbox :key="item.id" v-for="item in list" class="info-item" v-model="item.isCheck" :disabled="!item.isEnable">{{item.propertyName}} <span v-if="item.isRequired||item.isUnique">(<span v-if="item.isRequired">必填</span> <span v-if="item.isUnique">唯一</span>)</span></el-checkbox>
        <!-- </el-checkbox-group> -->
      </div>
      <div class="ds-pass-box">
        <el-switch v-model="changePassword"></el-switch>
        <span>修改密码</span>
        <span class="tips">开启后用户将可修改密码或在忘记密码时进行密码找回</span>
      </div>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1" v-button-debounce>确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";

export default {
  data() {
    return {
      loading: false,
      dataKey: {},
      dialogVisible: false,
      id: '',
      roleList: [],
      model: [],
      list: [],
      postForm: [],
      changePassword: false,
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.getKey();
    },
    getKey() {
      if (this.list.length) return;
      this.loading = true;
      http.getJson('reader-comple-property').then(res => {
        this.list = res.data.readerEditProperties;
        this.changePassword = res.data.changePassword;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    //表单提交
    submitForm() {
      http.postJson('set-reader-comple-property', {
        readerEditProperties: this.list,
        changePassword: this.changePassword
      }).then(res => {
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
.info-item {
  width: 26%;
  margin-bottom: 20px;
}
.ds-pass-box {
  display: flex;
  align-items: center;
  margin-top: 20px;
  span {
    margin-left: 10px;
  }
  .tips {
    color: #999;
    font-size: 12px;
  }
}
</style>