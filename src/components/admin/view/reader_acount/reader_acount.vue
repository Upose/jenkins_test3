<template>
  <div>
    <div class="editdiv">
      <el-form ref="form" :model="postForm" label-width="100px">
        <el-form-item label="单位名称">
          <el-input v-model="postForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="postForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="postForm.edu" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="postForm.gender" class="radios">
            <el-radio v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key">{{item.key}}</el-radio>
            <!-- <el-radio v-model="radio" label="男"></el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职称">
          <el-select v-model="postForm.title" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Title')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="postForm.birthday" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="postForm.depart" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Depart')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地">
          <!-- <el-select v-model="postForm.addr" placeholder="请选择">
            <el-option v-for="item in departoptions" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select> -->
          <el-input v-model="postForm.addr"></el-input>
        </el-form-item>
        <el-form-item label="所在院系">
          <el-select v-model="postForm.college" placeholder="请选择">
            <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="postForm.addrDetail"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="postForm.major" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="离校日期">
          <el-date-picker v-model="postForm.leaveTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="postForm.grade" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="postForm.status" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Status')" :key="item.value" :label="item.key" :value="Number(item.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="postForm.class" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="postForm.type" placeholder="请选择">
            <el-option v-for="item in initSelect('User_Type')" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机">
          <!-- <div class="divStyle">
            <span>158****0000</span>
            <span class="renzheng">已认证</span>
            <span class="yuan"></span>
          </div> -->
          <el-input v-model="postForm.phone"></el-input>
        </el-form-item>
        <!-- <el-form-item label="第三方信息">
          <el-select v-model="postForm.usertype" placeholder="请选择">
            <el-option v-for="item in userTypeOption" :key="item.value" :label="item.key" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="身份证">
          <!-- <div class="divStyle">
            <span>370126****0000</span>
            <span class="renzheng">已认证</span>
            <span class="yuan"></span>
          </div> -->
          <el-input v-model="postForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="youxiang">
          <!-- <div class="divStyle">
            <span>23523@qq.com</span>
            <span class="renzheng">已认证</span>
            <span class="yuan"></span>
          </div> -->
          <el-input v-model="postForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="item.propertyName" v-for="item in postForm.properties" :key="item.propertyCode">
          <el-input v-model="item.propertyValue" placeholder="请输入" v-if="item.propertyType == 0 || item.propertyType == 5 || item.propertyType == 6"></el-input>
          <el-input v-model="item.propertyValue" :min="1" label="label" v-if="item.propertyType == 1"></el-input>
          <el-date-picker v-model="item.propertyValue" type="date" placeholder="选择日期" v-if="item.propertyType == 2"></el-date-picker>
          <el-radio-group v-model="item.propertyValue" v-if="item.propertyType == 3" class="radios">
            <el-radio :label="'true'">是</el-radio>
            <el-radio :label="'false'">否</el-radio>
          </el-radio-group>
          <el-select v-model="item.propertyValue" placeholder="请选择" v-if="item.propertyType == 4">
            <el-option v-for="item in initSelect(item.propertyCode)" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn_box">
        <el-button type="primary" @click="submitForm" icon="iconfont el-icon-vip-baocun1">保 存</el-button>
      </div>
    </div>
    <div class="reader-right">
      <div class="right-title">用户分组</div>
      <div class="right-box">
        <span>重点用户</span>
        <span>毕业生</span>
        <span>研究馆员</span>
      </div>
      <!-- <div class="right-title">用户标签</div> -->
      <!-- <div class="right-box">
        <span>男</span>
        <span>90后</span>
        <span>天蝎座</span>
        <span>青少年</span>
        <span>本科生</span>
        <span>重庆人</span>
        <span>移动</span>
        <span>活跃用户</span>
        <span>文学爱好者</span>
        <span>图书</span>
        <span>搜索达人<img src="@/assets/admin/img/userManager/jian.png" class="imgs" /></span>
      </div>
      <div class="right-title">更多</div>
      <div class="right-box">
        <span @click="addType">学妹<img src="@/assets/admin/img/userManager/icon_add2x.png" class="imgs" /></span>
      </div> -->
    </div>
    <el-dialog :title="titles" :visible.sync="editVisible" width="26%" :modal-append-to-body="false" :close-on-click-modal="false">
      <el-form ref="form" :model="form" label-width="70px">
        <div class="tables">
          <div class="right-box">
            <span v-for="(item,index) in list" :key="index" @click="changeStatus($event,index,item)" :class="item.ischecked?'xuanzhong':''">
              {{item.name}}
              <i class="el-icon-check duihao" v-if="item.ischecked"></i>
            </span>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false" class="btns quxiao">
          <img src="@/assets/admin/img/userManager/quxiao.png" />
          <span>取消</span>
        </el-button>
        <el-button type="primary" @click="submitForm" class="btns">
          <img src="@/assets/admin/img/userManager/icon-bc2x.png" />
          <span>保存</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import http from "@/assets/public/js/http";

export default {
  data() {
    return {
      postForm: null,
      dataKey: null,
      properties:null
    }
  },
  props: ['id'],
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getKey();
      if (this.id) {
        this.getData();
      } else {
        this.postForm = {}
      }
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-init-data').then(res => {
        this.dataKey = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取数据
    getData() {
      http.getJsonSelf('user', `/${this.id}`).then(res => {
        this.postForm = res.data;
        this.properties = res.data.properties;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 初始化下拉列表
    initSelect(code) {
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    //表单提交
    submitForm() {
      if (this.id) {
        http.putJson('user', this.postForm).then(res => {
          this.$message({ message: '编辑成功！', type: 'success' });
          this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '编辑失败!' });
        })
      } else {
        http.postJson('user', this.postForm).then(res => {
          this.$message({ message: '新增成功！', type: 'success' });
          this.id = res.data;
          this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '新增失败!' });
        })
      }

    },
    saveEdit() {
      var lists = [];
      this.list.forEach(function (item) {
        if (item.ischecked) {
          lists.push(item.name)
        }
      })

      if (lists == "") {
        this.$message.error("请至少选择一个");
        return;
      }
      this.editVisible = false;
    },
    addInfo(row) {
      this.editVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData()
    },
    // 分页导航
    handlePageChange(val) {
      this.pageNum = val
      this.getData();
    },
    changeStatus(e, number, row) {
      if (e.target.className.indexOf("xuanzhong") == -1) {
        // e.target.className = "xuanzhong"; //选中div样式
        row.ischecked = true
      } else {
        // e.target.className = "";//未选中div样式
        row.ischecked = false
      }
    },
    addType() {
      this.editVisible = true
    },
    handleStatus(row) {
      var _this = this;
      let text = row.status == 0 ? "停用" : "启用";
      this.$confirm('确认要"' + text + '"该条信息吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        var status = row.status == 0 ? 2 : 0

      })
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .el-input,
/deep/ .el-select,
.divStyle {
  width: 33%;
  float: left;
}
.divStyle {
  height: 40px;
  line-height: 40px;
  border: 1px solid #c0c4cc;
}
.divStyle span {
  padding: 0 !important;
  float: right !important;
}
.divStyle span:first-child {
  float: left !important;
  color: #6c757d;
  margin-left: 5%;
}
/deep/ .el-select .el-input {
  width: 100%;
}
.reader-left,
.reader-middle {
  float: left;
}
.reader-right {
  float: right;
  width: 50%;
}
.reader-right span {
  font-size: 14px;
  color: #909399;
  display: block;
  margin: 2.6% 4% 0 0;
  float: right;
  cursor: pointer;
}
/deep/ .el-tabs__item {
  height: 46px;
}
/deep/ .el-tabs__nav-wrap::after {
  background-color: #fff;
}
.reader-left {
  width: 9%;
  height: 9%;
  border-radius: 12px;
  margin: 0 2% 0 1.5%;
}
.reader-middle {
  width: 30%;
}
.middle-top,
.integral,
.times {
  width: 100%;
  display: table;
}
.middle-top {
  margin-top: 3%;
}
.names,
.numers,
.level,
.async {
  float: left;
  display: block;
  margin-right: 2%;
}
.names {
  font-size: 18px !important;
  font-weight: bold;
  color: #34395e;
}
.numers {
  color: #34395e;
  font-size: 16px !important;
  font-weight: bold;
  margin-top: 5px;
}
.level {
  color: #5568f5;
  font-size: 15px;
  background: #f1eeff;
  border-radius: 6px;
  padding: 0 2%;
  line-height: 26px;
  height: 26px;
}
.async {
  color: #5568f5;
  border: 1px solid #5568f5;
  border-radius: 5px;
  padding: 0 2%;
  line-height: 26px;
  height: 26px;
}
.integral,
.times {
  margin-top: 3%;
  width: 100%;
  display: table;
}
.integral span {
  display: block;
  float: left;
  font-size: 14px;
  color: #f58b58;
}
.integral span:first-child {
  color: #34395e;
}
.times {
  color: #34395e;
  font-size: 14px;
}
.editdiv {
  width: 60%;
  float: left;
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
.editdiv ul li span {
  float: left;
  padding: 12px 2% 12px 0;
  width: 18%;
  color: #3c4b5d;
  text-align: right;
}
.editdiv ul li span:first-child {
  width: 15%;
}
.editdiv ul li span i {
  color: red;
  margin: 10px 0 0 0px;
}
.reader-right {
  width: 30%;
  float: right;
}
.right-title {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  display: table;
}
.right-box {
  width: 100%;
  display: table;
  margin: 2% 0 6% 0;
}
.right-box span {
  display: block;
  float: left;
  border: 1px solid #e4e6fc;
  color: #6c757d;
  font-size: 13px;
  text-align: center;
  padding: 6px 13px;
  margin: 2% 2% 0 0;
  cursor: pointer;
  border-radius: 3px;
}
.imgs {
  width: 13px;
  height: 11px;
  margin: -5px -9px 0 5px !important;
  float: right;
}
.el-select-dropdown__item {
  padding-left: 3% !important;
}
/deep/ .el-radio {
  margin: 2% 9% 0 0;
}

.yuan {
  width: 8px !important;
  height: 8px;
  background: #8cc63f;
  border-radius: 100%;
  margin: 16px 2% 0 0;
}
.renzheng {
  color: #6c757d;
  width: auto !important;
  margin-right: 3%;
}
.baocun {
  background: #6777ef;
  border: 0;
  padding: 1.3% 3%;
  color: #fff;
  text-align: center;
}
.xuanzhong {
  border: 1px solid #6777ef !important;
}
/deep/.el-dialog__body {
  padding: 10px 20px;
}
.duihao {
  width: 12px;
  height: 10px;
  line-height: 10px;
  text-align: center;
  background: #6777ef;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  float: right;
  margin: -7px -13px 0 2px !important;
}
.btns {
  padding: 2.5% 4% 2% 4%;
  font-size: 15px;
  background: #6777ef;
  border: 0;
}
.quxiao {
  color: #6d6d6d;
  background: #f3f3f3;
  border: 1px solid #f3f3f3;
}
.btns1 {
  float: left !important;
  padding: 3.2% 3.9% 2.9% 3.9% !important;
  margin: 2% 1% 0 0 !important;
  background: #6777ef;
}
.btns img {
  width: 14px;
  height: 12.6px;
  float: left;
  margin-right: 6px;
}
.btns span {
  display: block;
  font-size: 14px;
  float: left;
}
.btns1 span {
  display: block;
  font-size: 14px;
  padding: 0 !important;
  float: left;
  min-width: 30px !important;
  color: #fff !important;
}
/deep/ .el-dialog {
  min-width: 500px;
}
/deep/ .el-form-item {
  width: 49%;
  display: table;
  padding: 0;
  // float: left;
  display: inline-block;
}
/deep/ .el-input,
/deep/ .el-select,
.divStyle {
  width: 95%;
  float: left;
}
.radios {
  width: 63%;
  margin-top: 2.2%;
  float: left;
}
.btn_box{
  margin-left: 100px;
}
// .youxiang {
//   width: 100%;
// }
// .youxiang .divStyle {
//   width: 40.5%;
// }
</style>