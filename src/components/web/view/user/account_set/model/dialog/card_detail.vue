<template>
  <el-dialog title="读者证详情" :visible.sync="dialogVisible" width="1000px" :before-close="dialogBeforeClose">
    <div>
      <el-form ref="form" :model="form" label-width="90px" class="detail" v-if="dataKey">
        <!-- <el-form-item label="统一认证号">
          <el-input v-model="form.identityNo" class="w-inp" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="读者卡号">
          <el-input v-model="form.no" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.studentNo" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.userName" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="发卡日期">
          <!-- <el-input v-model="form.issueDate" class="w-inp"></el-input> -->
          <el-date-picker v-model="form.issueDate" type="date" class="w-inp" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期">
          <!-- <el-input v-model="form.expireDate" class="w-inp"></el-input> -->
          <el-date-picker v-model="form.expireDate" type="date" class="w-inp" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-input :value="getKeyValue(form.status)" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="押金">
          <el-input v-model="form.deposit" class="w-inp" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="条形码号">
          <el-input v-model="form.barCode" class="w-inp" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="物理码号">
          <el-input v-model="form.physicNo" class="w-inp" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户类型">
          <el-input v-model="form" class="w-inp"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="卡密码">
          <el-input value="******" class="w-inp"></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button class="btn_bg_color child_border_color" type="primary" @click="dialogVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "index",
  props: {},
  components: {},
  data() {
    return {
      dialogVisible: false,
      form: {},
      dataKey: null
    };
  },
  created() {
  },
  mounted() {

  },
  methods: {
    show(id) {
      this.dialogVisible = true;
      this.id = id;
      this.getKey();
      this.getCard();
    },
    // 获取用户信息
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取读者卡数据
    getCard() {
      this.http.getJsonSelf('forward-reader-card-data', `/${this.id}`).then((res) => {
        this.form = res.data;
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
  },
};
</script>

<style scoped lang="less">
.w-inp {
  width: 368px;
}
.detail /deep/ .el-form-item {
  display: inline-block;
}
/deep/ .el-input.is-disabled .el-input__inner {
  color: #666;
}
</style>
