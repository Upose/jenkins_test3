<!--
 * @Author: huyu
 * @Date: 2022-12-23 15:02:07
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-23 15:14:04
 * @Description: 读者卡内容
-->
<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="harf-area">
        <el-form-item label="学号/工号：" prop="studentNo">
          <el-input disabled v-model="item.studentNo"></el-input>
        </el-form-item>
        <el-form-item label="统一认证号：" prop="identityNo">
          <el-input disabled v-model="item.identityNo"></el-input>
        </el-form-item>
        <el-form-item label="读者类型：" prop="readerType">
          <el-input disabled v-model="item.readerType"></el-input>
        </el-form-item>
        <el-form-item label="卡类型：" prop="typeName">
          <el-input disabled v-model="item.typeName"></el-input>
        </el-form-item>
        <el-form-item label="发卡日期：" prop="issueDate">
          <el-date-picker style="width:100%" disabled v-model="item.issueDate" type="date" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </div>
      <div class="harf-area">
        <el-form-item label="单位名称：" prop="unit">
          <el-input disabled v-model="item.unit"></el-input>
        </el-form-item>
        <el-form-item label="所在学院：" prop="collegeName">
          <el-input disabled v-model="item.collegeName"></el-input>
        </el-form-item>
        <el-form-item label="所在系：" prop="collegeDepartName">
          <el-input disabled v-model="item.collegeDepartName"></el-input>
        </el-form-item>
        <el-form-item label="专业：" prop="major">
          <el-input disabled v-model="item.major"></el-input>
        </el-form-item>
        <el-form-item label="截止日期：" prop="expireDate">
          <el-date-picker style="width:100%" disabled v-model="item.expireDate" type="date" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    item: Object
  },
  data() {
    return {

    };
  },
  created() { },
  mounted() { },
  methods: {

  },
};
</script>

<style scoped lang="less">
.harf-area {
  width: 49%;
  float: left;
}
</style>
