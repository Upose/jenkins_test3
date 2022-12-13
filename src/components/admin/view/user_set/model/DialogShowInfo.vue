<!--
 * @Author: huyu
 * @Date: 2022-12-13 14:39:35
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-13 15:13:33
 * @Description: 前台信息展示-隐藏弹窗
-->
<template>
  <el-dialog append-to-body title="前台展示设置" :visible.sync="dialogVisible" width="500px">
    <el-form class="dsi-box" :model="form" label-width="100px" :inline="true" v-loading="loading">
      <el-form-item :label="item.name+'：'" style="width:40%" v-for="item in list" :key="item.configType">
        <el-switch v-model="item.isDisplay" @change="handleChangeShow"></el-switch>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";

export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      list: []
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
      this.getList();
    },
    // 获取列表数据
    getList() {
      if (this.list.length) return;
      this.loading = true;
      http.getJson('sensitive-info-display').then(res => {
        let list = res.data;
        let setEmun = {
          '1': '身份证隐藏',
          '2': '手机号隐藏',
          '3': '邮箱隐藏',
        }
        this.list = list.map(item => {
          return {
            ...item,
            name: setEmun[item.configType]
          }
        })
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    handleChangeShow() {
      http.postJson('set-sensitive-info-display', this.list).then(res => {
        this.$message.success('修改展示状态成功！')
      }).catch(err => {
        this.$message({ type: 'error', message: '修改展示状态失败!' });
      })
    }
  }
}
</script>
<style lang="less" scoped>
.dsi-box {
  min-height: 50px;
}
</style>