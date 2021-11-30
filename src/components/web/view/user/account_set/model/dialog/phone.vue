<template>
  <el-dialog title="修改手机号" :visible.sync="dialogVisible" width="480px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px" v-if="dataKey">
        <el-form-item label="读者卡号">
          <el-input v-model="form.no" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="有效日期">
          <el-input :value="setTime(form.issueDate)+'至'+setTime(form.expireDate)" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input :value="getKeyValue(form.status)" disabled></el-input>
        </el-form-item>
        <el-form-item label="物理码">
          <el-input v-model="form.physicNo" disabled></el-input>
        </el-form-item>
        <el-form-item label="条形码">
          <el-input v-model="form.barCode" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户类型">
          <el-input v-model="form"></el-input>
        </el-form-item> -->
        <el-form-item label="手机号">
          <el-input v-model="form.userPhone" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.userIdCard" disabled></el-input>
          <span><i class="red-color">*</i> 与账号预留手机号码或者身份证号码一致，可认领</span>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button class="btn_bg_color" type="primary" @click="sub">确定认领</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { timeFormat } from "@/assets/public/js/util";

export default {
  name: "index",
  props: {},
  components: {},
  data() {
    return {
      dialogVisible: false,
      form: {},
      dataKey:null,
      setTime: timeFormat
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    show(data) {
      this.dialogVisible = true;
      this.getKey();
      this.form = data;
    },
    // 获取用户信息
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 键值对匹配
    getKeyValue(val, code = 'Card_Status') {
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      let items = select.groupItems.find(item => (item.value == val))
      return items ? items.key : '';
    },
    //提交
    sub(){
      this.http.postJson('forward-claim-reader-card', { cardID:this.form.id }).then((res) => {
        this.$emit('next');
        this.dialogVisible = false;
      }).catch((err) => {
        this.$message({ type: "error", message: "无法领取此卡!" });
      });
    }
  },
};
</script>

<style scoped lang="less">
.red-color{
    color: #A21E1E;
}
/deep/ .el-input.is-disabled .el-input__inner {
    color: #666;
}
</style>
