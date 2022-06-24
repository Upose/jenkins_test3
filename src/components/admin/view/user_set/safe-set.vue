<!--
 * @Author: huyu
 * @Date: 2022-06-24 16:49:05
 * @LastEditors: huyu
 * @LastEditTime: 2022-06-24 17:27:46
 * @Description: 安全设置
-->
<template>
  <div class="content">
    <div class="form-box">
      <el-form ref="postForm" :model="postForm" label-width="130px" class="admin-form">
        <el-form-item label="密码安全强度">
          <el-radio-group v-model="postForm.name">
            <el-radio label="1">强</el-radio>
            <el-radio label="2">中</el-radio>
            <el-radio label="3">弱</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="pwd-rule-box">
          <el-form-item :label="item.title" v-for="(item,index) in passwordRule[postForm.name]" :key="index">
            <el-input v-model="item.value" disabled style="width:90%"></el-input>
            <span>{{item.unit}}</span>
          </el-form-item>
        </div>
        <el-form-item label="登录验证">
          <el-switch v-model="postForm.name"></el-switch>
        </el-form-item>
        <el-form-item label="首次登录修改密码">
          <el-switch v-model="postForm.name"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button icon="iconfont el-icon-vip-baocun1" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      postForm: {
        name: '2'
      },
      passwordRule: {
        '1': [
          { title: '密码规则', value: '大写字母+小写字母+数字+特殊字符(. @$!%*#_~?&^)' },
          { title: '密码长度', value: '8-16', unit: '位' },
          { title: '密码过期时间', value: '365', unit: '天' },
          { title: '登录失败锁定', value: '5', unit: '次/天' },
          { title: '密码登录保持时长', value: '15', unit: '天' },
        ],
        '2': [
          { title: '密码规则', value: '大写字母+小写字母+数字' },
          { title: '密码长度', value: '6-16', unit: '位' },
          { title: '密码过期时间', value: '3', unit: '年' },
          { title: '登录失败锁定', value: '5', unit: '次/天' },
          { title: '密码登录保持时长', value: '30', unit: '天' },
        ],
        '3': [
          { title: '密码规则', value: '无' },
          { title: '密码长度', value: '6-16', unit: '位' },
          { title: '密码过期时间', value: '无' },
          { title: '登录失败锁定', value: '5', unit: '次/天' },
          { title: '密码登录保持时长', value: '30', unit: '天' },
        ],
      }
    };
  },
  created() {

  },
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
.content {
  min-height: 600px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
}
.form-box {
  padding: 36px 80px;
}
.pwd-rule-box {
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #ddd;
  width: 700px;
  margin-bottom: 20px;
  /deep/ .el-input.is-disabled .el-input__inner {
    color: #666;
  }
}
</style>
