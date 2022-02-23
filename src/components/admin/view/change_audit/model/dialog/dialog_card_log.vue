<template>
  <el-dialog append-to-body title="详细记录" :visible.sync="dialogVisible" width="500px" :before-close="dialogBeforeClose">
    <div>
        <el-form ref="form" :model="form" label-width="90px" class="detail">
        <el-form-item label="读者卡号">
          <el-input v-model="form.no" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.userName" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="发卡日期">
          <el-date-picker v-model="form.issueDate" type="date" class="w-inp" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker v-model="form.expireDate" type="date" class="w-inp" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-input :value="getKeyValue(form.status)" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="条形码号">
          <el-input v-model="form.barCode" class="w-inp" disabled></el-input>
        </el-form-item>
        <el-form-item label="物理码号">
          <el-input v-model="form.physicNo" class="w-inp" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
import http from "@/assets/public/js/http";
export default {
  name: "index",
  props: ['dataKey'],
  components: {},
  data() {
    return {
      dialogVisible: false,
      form: {},
      id:'',
    };
  },
  created() {

  },
  mounted() { },
  methods: {
    show(id) {
      this.dialogVisible = true;
      this.id = id;
      this.getData();
    },
    getData() {
      http.getJsonSelf('card-claim-detail-info',`/${this.id}`).then(res => {
        this.form = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配
    getKeyValue(val) {
      for (const key in this.dataKey.cardStatus) {
        if(this.dataKey.cardStatus[key] == val){
          return key;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/ .el-input.is-disabled .el-input__inner {
  color: #666;
}
.w-inp {
  width: 368px;
}
</style>
