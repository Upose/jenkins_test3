<template>
  <div>
    <div class="certificate-title">
      <el-button type="primary" class="serach-btn"><i class="el-icon-circle-plus-outline"></i><span>添加卡片</span></el-button>
    </div>
    <div class="certificate-box">
      <div class="certificate-box-top">
        <span class="nums">1000000000000000</span>
        <span class="status">正常</span>
        <span class="times">有效期：2021-09-21 09:03:56</span>
        <span class="card">主卡</span>
        <el-button class="caozuo"><img src="@/assets/admin/img/userManager/chongzhi.png" /><span>重置密码</span></el-button>
        <el-button class="caozuo" @click="shouqi"><i class="el-icon-arrow-up" v-if="showBox"></i><span v-if="showBox">收起</span><i class="el-icon-arrow-down" v-if="showBox==false"></i><span v-if="showBox==false">展开</span></el-button>
      </div>
      <div class="certificate-box-info" v-if="showBox">
        <div class="editdiv">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="读者卡号：">
              <el-input v-model="form.readerCardNumber"></el-input>
            </el-form-item>
            <el-form-item label="条形码：">
              <el-input v-model="form.barCode"></el-input>
            </el-form-item>
            <el-form-item label="物理码：">
              <el-input v-model="form.physicalCode"></el-input>
            </el-form-item>
            <el-form-item label="统一认证号：">
              <el-input v-model="form.certificationNumber"></el-input>
            </el-form-item>
            <el-form-item label="发卡日期：">
              <el-date-picker v-model="value1" type="date" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期：">
              <el-date-picker v-model="value2" type="date" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态：">
              <el-input v-model="form.status"></el-input>
            </el-form-item>
            <el-form-item label="卡类型：">
              <el-input v-model="form.carStyle"></el-input>
            </el-form-item>
            <el-form-item label="押金：">
              <el-input v-model="form.status"></el-input>
            </el-form-item>
            <el-form-item label="最近同步日期：">
              <el-date-picker v-model="datetime" type="date" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="certificate-box-top defaults">
        <span class="nums">1000000000000000</span>
        <span class="times">挂失</span>
        <span class="times">有效期：2021-09-21 09:03:56</span>
        <span class="card">设为主卡</span>
        <el-button class="caozuo"><img src="@/assets/admin/img/userManager/icon-edit2x.png" /><span>修改密码</span></el-button>
        <el-button class="caozuo"><i class="el-icon-view"></i><span>查看</span></el-button>
      </div>
      <div class="certificate-box-top defaults">
        <span class="nums">1000000000000000</span>
        <span class="times">挂失</span>
        <span class="times">有效期：2021-09-21 09:03:56</span>
        <el-button class="caozuo"><img src="@/assets/admin/img/userManager/icon_pass2x.png" /><span>审核通过</span></el-button>
        <el-button class="caozuo btg"><i class="el-icon-close"></i><span>不通过</span></el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showBox: true,
      form: {
        readerCardNumber: "",
        certificationNumber: "",
        physicalCode: "",
        barCode: "",
        card: "",
        value2: "",
        value1: "",
        status: "",
        carStyle: "",
        datetime: "",
        barCode: ""
      },
    }
  },
  methods: {
    shouqi() {
      if (this.showBox) {
        this.showBox = false;
      } else {
        this.showBox = true
      }

    }
  }
}
</script>
<style scoped lang="less">
.serach-btn {
  background: #6777ef;
  border: 0;
  padding: 0 1.5%;
  height: 37px;
  line-height: 37px;
  color: #fff;
  text-align: center;
  float: left;
}
.serach-btn i,
.serach-btn span {
  float: left;
}
.serach-btn i {
  margin-top: 11px;
  display: block;
}

.certificate-box {
  width: 66%;
  display: table;
  margin-top: 1.5%;
  min-width: 720px;
}
.certificate-box-info {
  width: 100%;
}
.certificate-title {
  width: 100%;
  display: table;
}
.nums,
.status,
.times,
.card {
  display: block;
  float: left;
  margin-right: 3%;
  font-size: 15px;
}
.nums {
  color: #34395e;
  margin: 0.3% 2% 0 2%;
}
.status {
  color: #8cc63f;
}
.times {
  color: #6c757d;
}
.card {
  color: #f58b58;
  margin-left: 3%;
}
.caozuo {
  height: 28px;
  line-height: 28px;
  background: #f9f8ff;
  border-radius: 15px;
  color: #6777ef;
  float: right;
  border: 0;
  padding: 0.2% 1% 0 1%;
  margin: -2px 2% 0 0;
}
.btg {
  color: #f56c6c;
}
.btg i {
  color: #f56c6c !important;
}
.caozuo i {
  color: #6777ef;
  font-size: 16px;
}
.caozuo img {
  width: 13px;
  height: 13px;
  margin: 7px 4px 0 0;
  display: block;
  float: left;
}
.editdiv {
  width: 100%;
  margin-top: 2%;
}
.editdiv ul {
  list-style-type: none;
  padding: 0;
}
.editdiv ul li {
  width: 100%;
  display: table;
  padding: 1% 0;
}
/deep/ .el-form-item {
  width: 49%;
  display: table;
  padding: 0;
  float: left;
}
.editdiv ul li span {
  float: left;
  padding: 10px 2% 12px 0;
  width: 16%;
  text-align: right;
  color: #3c4b5d;
}
.editdiv ul li span i {
  color: red;
  margin: 10px 0 0 0px;
}
/deep/ .el-input,
/deep/ .el-select,
.divStyle {
  width: 95%;
  float: left;
}
.certificate-box-top {
  padding: 1.7% 0 0.8% 0 !important;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.certificate-box-top,
.certificate-box-info {
  border: 1px solid #6777ef;
  display: table;
  padding: 0.8%;
  width: 100%;
}
.certificate-box-info {
  border-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.defaults {
  margin-top: 2%;
  border: 1px solid #e4e6fc;
}
</style>