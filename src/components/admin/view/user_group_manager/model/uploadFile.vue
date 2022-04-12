<template>
  <el-dialog append-to-body title="导入数据" :visible.sync="dialogVisible" width="400px" :before-close="dialogBeforeClose">
    <div>
      <el-upload class="upload-demo" drag :action="uploadUrl" :headers="myHeaders" ref="upload" :auto-upload="false" :on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="submitUpload" icon="iconfont el-icon-vip-baocun1">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      uploadUrl: window.apiDomainAndPort + '/usermanage/api/user-group/import-group-user',
      myHeaders: { Authorization: 'Bearer ' + window.localStorage['token'] }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    // 确认
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      let data = response.data;
      this.$emit('uploadSuccess', data)
      this.dialogVisible = false;
    },
  }
}
</script>