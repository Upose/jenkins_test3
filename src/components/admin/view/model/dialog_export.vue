<template>
  <el-dialog append-to-body title="导出数据" :visible.sync="dialogVisible" width="800px">
    <el-form :model="postForm" label-width="20px">
      <div class="ex-title">选择导出字段<span>导出字段越多，速度越慢</span></div>
      <el-form-item label="">
        <el-checkbox-group v-model="postForm.properties" v-if="dataKey">
          <el-checkbox :label="item" :value="item" v-for="item in dataKey.exportProperties" :key="item.propertyCode" style="width:20%">{{item.propertyName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="">
        <el-radio-group v-model="postForm.exportType">
          <el-radio :label="0">导出全部结果列表</el-radio>
          <el-radio :label="1">导出当前结果页</el-radio>
          <el-radio :label="2">导出全部读者</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
      <el-button type="primary" @click="sub" icon="iconfont el-icon-vip-wancheng" v-button-debounce>确 定</el-button>
    </div>
    <!-- 导出提示 -->
    <el-dialog append-to-body width="30%" title="结果导出" :visible.sync="innerVisible">
      <div v-if="exportData">
        共{{exportData.totalCount}}条数据，共{{exportData.totalPages}}页，当前可导出第{{this.curPageIndex}}页
      </div>
      <div slot="footer">
        <el-button @click="innerVisible = false" icon="iconfont el-icon-vip-quxiao">取 消</el-button>
        <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-daochu" v-button-debounce>导出第{{this.curPageIndex}}页</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";

export default {
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,//内层

      dataKey: null,
      postForm: {
        properties: [],
        exportType: 0,
      },
      searchForm: {},
      pageData: {},
      curPageIndex: 1,//全部导出页码
      type: '',

      exportData: null,
    }
  },
  props: [],
  methods: {
    show(searchform, pagedata, type) {
      this.postForm = {
        properties: [],
        exportType: 0,
      }
      this.curPageIndex = 1;
      this.dialogVisible = true;
      this.searchForm = searchform;
      this.pageData = pagedata;
      this.type = type;
      this.getKey();
    },
    // 获取初始数据
    getKey() {
      let url = this.type == 'reader' ? 'user-init-data' : 'card-init-data';
      http.getJson(url).then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 确认
    sub() {
      if ((this.postForm.exportType == 0 || this.postForm.exportType == 1) && !this.postForm.properties.length) {
        this.$message.warning('请先勾选导出字段！');
        return;
      }
      let url = this.type == 'reader' ? 'export-user-data-brief-info' : 'export-card-data-brief-info';
      let parms = this.postForm.exportType == 1 ? { ...this.postForm, ...this.searchForm, ...this.pageData } : { ...this.postForm, ...this.searchForm, pageIndex: this.curPageIndex }
      http.postJson(url, parms).then(res => {
        this.exportData = res.data;
        if (this.postForm.exportType == 0) {
          this.curPageIndex == 1;
          this.innerVisible = true;
        } else if (this.postForm.exportType == 2) {
          this.curPageIndex == 1;
          this.innerVisible = true;
        } else {
          this.submitForm();
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '导出失败!' });
      })

    },
    // 下载第几页
    // submitFormPage(){

    // },
    //表单提交
    submitForm() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //   this.postForm = { ...this.postForm, ...this.searchForm }
      let url = this.type == 'reader' ? 'export-user-data' : 'export-card-data';
      let name = this.type == 'reader' ? '读者列表' : '读者卡列表';
      let parms = this.postForm.exportType == 1 ? { ...this.postForm, ...this.searchForm, ...this.pageData } : { ...this.postForm, ...this.searchForm, pageIndex: this.curPageIndex }
      http.importFile(url, parms, name).then(res => {
        loading.close();
        this.$message({ message: '导出成功！', type: 'success' });
        if ((this.postForm.exportType == 0 || this.postForm.exportType == 2) && this.exportData.totalPages > this.curPageIndex) {
          this.curPageIndex += 1;
        } else {
          loading.close();
          this.innerVisible = false;
          this.dialogVisible = false;
        }
      }).catch(err => {
        loading.close();
        this.$message({ type: 'error', message: '导出失败!' });
      })
    },
    closeDialog() {
      this.innerVisible = false;
      this.dialogVisible = false;

      this.dataKey = null;
      this.postForm = {
        properties: [],
        exportType: 0,
      },
        this.searchForm = {};
      this.pageData = {};
      this.curPageIndex = 1;//全部导出页码
      this.type = '';

      this.exportData = null;
    }
  }
}
</script>

<style lang="less" scoped>
.ex-title {
  font-size: 16px;
  color: #333;
  padding: 0 0 20px 20px;

  span {
    font-size: 14px;
    color: #666;
    margin-left: 10px;
  }
}
</style>