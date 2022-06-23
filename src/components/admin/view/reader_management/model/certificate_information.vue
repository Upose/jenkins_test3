<template>
  <div>
    <div class="certificate-title">
      <el-button type="primary" class="serach-btn" @click="handleAdd" icon="iconfont el-icon-vip-tianjia2" v-if="isAuth('card:create')">添加卡片</el-button>
    </div>
    <div class="certificate-box" v-for="(item,index) in tableData" :key="index">
      <div class="certificate-box-top">
        <span class="nums">{{item.no}}</span>
        <span class="status">{{getKeyValue(item.status)}}</span>
        <span class="times">有效期：{{dateChangeFormat(item.expireDate)}}</span>
        <span class="card" v-if="item.isPrincipal">主卡</span>
        <span class="set-card" v-if="!item.isPrincipal" @click="handleSetCard(item)">设为主卡</span>
        <el-button class="caozuo" @click="handleEditPass(item)" v-if="isAuth('card:setSecret')" icon="iconfont el-icon-vip-bianji">修改密码</el-button>
        <el-button class="caozuo" @click="handleResetPass(item)" v-if="isAuth('card:setSecret')" icon="iconfont el-icon-vip-chushi">重置密码</el-button>
        <el-button class="caozuo" @click="handleLook(item)" icon="iconfont el-icon-vip-yulan">查看</el-button>
        <el-button class="caozuo" @click="shouqi(index,'tableData')">
          <i class="el-icon-arrow-up" v-if="item.showBox"></i><span v-if="item.showBox">收起</span>
          <i class="el-icon-arrow-down" v-if="item.showBox==false"></i><span v-if="item.showBox==false">展开</span>
        </el-button>
      </div>
      <div class="certificate-box-info" v-if="item.showBox">
        <div class="editdiv">
          <el-form ref="form" :model="form" label-width="100px">
            <div class="harf-area">
              <el-form-item label="学号/工号" prop="studentNo">
                <el-input disabled v-model="item.studentNo"></el-input>
              </el-form-item>
              <!-- <el-form-item label="条形码" prop="barCode">
                <el-input disabled v-model="item.barCode"></el-input>
              </el-form-item> -->
              <el-form-item label="状态" prop="status">
                <el-select disabled v-model="item.status" placeholder="请选择" style="width:100%">
                  <el-option v-for="item in initSelect('Card_Status')" :key="item.value" :label="item.key" :value="Number(item.value)"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="统一认证号" prop="identityNo">
                <el-input disabled v-model="item.identityNo"></el-input>
              </el-form-item> -->
              <el-form-item label="截止日期" prop="expireDate">
                <el-date-picker disabled v-model="item.expireDate" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="押金" prop="desposit">
                <el-input disabled v-model="item.deposit"></el-input>
              </el-form-item>
            </div>
            <div class="harf-area">
              <div class="row-form">
                <el-form-item prop="type" class="r-f-item1">
                  <el-select disabled v-model="item.type" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in initSelect('Card_Type')" :key="item.value" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="no" class="r-f-item2">
                  <el-input disabled v-model="item.no"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="发卡日期" prop="issueDate">
                <el-date-picker disabled v-model="item.issueDate" type="date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="物理码" prop="physicNo">
                <el-input disabled v-model="item.physicNo"></el-input>
              </el-form-item>
              <el-form-item label="最近同步日期" prop="updateTime">
                <el-date-picker disabled v-model="item.updateTime" type="date">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <h3 class="apply-title" v-if="logList.length">申请记录</h3>
    <div class="certificate-box" v-for="(item,index) in logList" :key="index">
      <div class="certificate-box-top">
        <span class="nums">{{item.no}}</span>
        <span class="status">{{getKeyValue(item.status)}}</span>
        <span class="times">有效期：{{dateChangeFormat(item.expireDate)}}</span>
        <span class="card" v-if="item.isPrincipal">主卡</span>
        <span>{{getKeyStatus(item.approveStatus)}}</span>
        <el-button class="caozuo" @click="shouqi(index,'logList')">
          <i class="el-icon-arrow-up" v-if="item.showBox"></i><span v-if="item.showBox">收起</span>
          <i class="el-icon-arrow-down" v-if="item.showBox==false"></i><span v-if="item.showBox==false">展开</span>
        </el-button>
      </div>
      <div class="certificate-box-info" v-if="item.showBox">
        <div class="editdiv">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="读者卡号" prop="no">
              <el-input disabled v-model="item.no"></el-input>
            </el-form-item>
            <!-- <el-form-item label="条形码" prop="barCode">
              <el-input disabled v-model="item.barCode"></el-input>
            </el-form-item> -->
            <el-form-item label="物理码" prop="physicNo">
              <el-input disabled v-model="item.physicNo"></el-input>
            </el-form-item>
            <!-- <el-form-item label="统一认证号" prop="identityNo">
              <el-input disabled v-model="item.identityNo"></el-input>
            </el-form-item> -->
            <el-form-item label="发卡日期" prop="issueDate">
              <el-date-picker disabled v-model="item.issueDate" type="date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期" prop="expireDate">
              <el-date-picker disabled v-model="item.expireDate" type="date">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select disabled v-model="item.status" placeholder="请选择">
                <el-option v-for="item in initSelect('Card_Status')" :key="item.value" :label="item.key" :value="Number(item.value)"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卡类型" prop="type">
              <el-select disabled v-model="item.type" placeholder="请选择">
                <el-option v-for="item in initSelect('Card_Type')" :key="item.value" :label="item.key" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="押金" prop="desposit">
              <el-input disabled v-model="item.deposit"></el-input>
            </el-form-item>
            <el-form-item label="最近同步日期" prop="updateTime">
              <el-date-picker disabled v-model="item.updateTime" type="date">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";
import { validatePasswordMsg } from "@/assets/public/js/validator";
export default {
  data() {
    return {
      showBox: true,
      tableData: [],
      dataKey: null,
      logList: [],//申请记录列表
    }
  },
  props: ['id'],
  created() {
    this.getKey();
    this.getData();
    this.getLog();
  },
  methods: {
    // 页面子权限判定
    isAuth(name) {
      let authList = this.$store.getters.authList;
      let curAuth = authList.find(item => (item.router == '/admin_readerCardList'));
      // let curAuth = authList.find(item=>(item.router == this.$route.path));
      let curSonAuth = curAuth ? curAuth.permissionNodes.find(item => (item.permission == name)) : null;
      return curSonAuth ? true : false;
    },
    shouqi(index, list) {
      this.$set(this[list][index], 'showBox', !this[list][index].showBox)
      // this.tableData[index].showBox = !this.tableData[index].showBox
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 获取数据
    getData() {
      http.getJsonSelf('user-card-list-data', `/${this.id}`).then(res => {
        let list = res.data;
        list.forEach((item, index) => {
          item.showBox = index == 0 ? true : false;
        })
        this.tableData = list;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取申请记录
    getLog() {
      http.getJsonSelf('user-card-apply-list-data', `/${this.id}`).then(res => {
        let list = res.data;
        list.forEach((item, index) => {
          item.showBox = false;
        })
        this.logList = list;
        // this.logList = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配 审核状态
    getKeyStatus(val) {
      for (const key in this.dataKey.cardClaimStatus) {
        if (this.dataKey.cardClaimStatus[key] == val) {
          return key;
        }
      }
    },
    // 获取状态
    getKeyValue(status) {
      if (!status || !this.dataKey) return;
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == 'Card_Status'));
      if (!select) return;
      let obj = select.groupItems.find(item => (item.value == status));
      return obj ? obj.key : '';
    },
    // 时间格式化
    dateChangeFormat(date, format = 'YYYY-mm-dd') {
      date = new Date(date);
      const dataItem = {
        'Y+': date.getFullYear().toString(),
        'm+': (date.getMonth() + 1).toString(),
        'd+': date.getDate().toString(),
        'H+': date.getHours().toString(),
        'M+': date.getMinutes().toString(),
        'S+': date.getSeconds().toString(),
      };
      Object.keys(dataItem).forEach((item) => {
        const ret = new RegExp(`(${item})`).exec(format);
        if (ret) {
          format = format.replace(ret[1], ret[1].length === 1 ? dataItem[item] : dataItem[item].padStart(ret[1].length, '0'));
        }
      });
      return format;
    },
    // 添加卡片
    handleAdd() {
      this.$router.push({ path: '/admin_readerCardAdd', query: { userId: this.id } })
    },
    // 设为主卡
    handleSetCard(val) {
      http.putJson('card', { ...val, isPrincipal: true, secret: "******" }).then(res => {
        this.$message({ message: '编辑成功！', type: 'success' });
        this.getData();
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '编辑失败!') });
      })
    },
    // 查看
    handleLook(item) {
      this.$router.push({ path: '/admin_readerCardEdit', query: { id: item.id } })
    },
    // 重置密码
    handleResetPass(item) {
      this.$confirm('是否确认重置密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let guid = this.newGuid();
        http.getJsonSelf('reset-card-secret-verify-key', `/${guid}`).then(res => {
          http.postJson('reset-card-secret-by-verify-key', { cardId: item.id, verifyCode: guid, verifyKey: res.data }).then(res1 => {
            this.$message({ message: res1.data, type: 'success' });
          }).catch(err => {
            this.$message({ type: 'error', message: '重置失败!' });
          })
        }).catch(err => {
          this.$message({ type: 'error', message: '重置失败!' });
        })
      }).catch(() => { });
    },
    newGuid() {
      var guid = "";
      for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
          guid += "-";
      }
      return guid;
    },
    // 修改密码
    handleEditPass(item) {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: validatePasswordMsg(this.dataKey.secretLevel).reg,
        inputErrorMessage: validatePasswordMsg(this.dataKey.secretLevel).msg
      }).then(({ value }) => {
        // item.secret = value;
        http.postJson('set-card-secret', { cardId: item.id, secret: value }).then(res => {
          this.$message({ message: '修改成功！', type: 'success' });
          // this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '编辑失败!' });
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    },
    //表单提交
    submitForm() {
      http.postJson('user', { userData: this.postForm, cardData: this.cardForm }).then(res => {
        this.$message({ message: '新增成功！', type: 'success' });
      }).catch(err => {
        this.$message({ type: 'error', message: '新增失败!' });
      })
    },

  }
}
</script>
<style scoped lang="less">
.row-form{
  width: 100%;
  height: 62px;
  padding: 0;
  display: inline-block;
  vertical-align: top;
  /deep/ .r-f-item1{
    width: 49%;
    float: left;
    .el-form-item__content{
      margin-left: 40px !important;
    }
  }
   /deep/ .r-f-item2{
    width: 50%;
    float: left;
    .el-form-item__content{
      margin-left: 0 !important;
    }
  }
}
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
  width: 1000px;
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
.set-card {
  color: #0d772f;
  margin-left: 3%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
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
  .harf-area{
    width: 49%;
    float: left;
  }
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
  width: 100%;
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
/deep/ .el-input.is-disabled .el-input__inner {
  color: #666;
}
.apply-title {
  margin-top: 30px;
  font-weight: bold;
}
</style>