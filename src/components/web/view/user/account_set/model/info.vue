<template>
  <div v-if="dataKey">
    <div class="user-box">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="头像">
          <div class="avatar" :class="isEdit('User_Photo')?'c-n':''" @click="handleAvatar">
            <img :src="imgPath + form.photo" alt="">
          </div>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Name')"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="form.nickName" placeholder="请输入" style="width:400px" :disabled="isEdit('User_NickName')"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender" style="width:400px" :disabled="isEdit('User_Gender')">
            <el-radio v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key">{{item.key}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.birthday" type="date" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Birthday')"></el-date-picker>
        </el-form-item>
        <el-form-item label="所在地区">
          <!-- <el-input v-model="form.addr" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Addr')"></el-input> -->
          <el-cascader style="width:400px" :disabled="isEdit('User_Addr')" :options="addrList" v-model="form.addr" :props="{ value:'idDisp',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.addrDetail" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Addr')"></el-input>
        </el-form-item>
        <el-form-item label="所在单位">
          <el-input v-model="form.unit" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Unit')"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="edu-box">
      <h2 class="edu-title">学历信息</h2>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="学历">
          <el-select v-model="form.edu" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Edu')">
            <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系">
          <el-select v-model="form.college" placeholder="请选择" style="width:400px" :disabled="isEdit('User_College')">
            <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="form.major" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Major')">
            <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="form.grade" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Grade')">
            <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="form.class" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Class')">
            <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-box">
      <el-button type="info" size="medium">取消</el-button>
      <el-button class="main_bg" type="primary" size="medium" @click="subForm">保存</el-button>
    </div>

    <!-- 组件 -->
    <UpdateImg ref="UpdateImg" @imgUrl="imgUrl"></UpdateImg>
  </div>
</template>

<script>
import UpdateImg from '@/components/web/model/UpdateImg'
export default {
  name: "index",
  props: {},
  components: { UpdateImg },
  data() {
    return {
      form: {},
      dataKey: null,
      imgPath: process.env.VUE_APP_IMG_URL,
      addrList: [],
    };
  },
  created() {
    this.getKey();
    this.getAddrList();
    this.getInfo();
  },
  mounted() { },
  methods: {
    // 获取用户信息
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 获取地址列表
    getAddrList() {
      this.http.getJson('forward-region-list').then(res => {
        this.addrList = res.data;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取用户信息
    getInfo() {
      this.http.getJson('forward-reader-info').then((res) => {
        this.form = res.data;
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 初始化下拉列表
    initSelect(code) {
      let select = this.dataKey.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 是否可编辑
    isEdit(code) {
      let item = this.dataKey.readerEditProperties.find(item => (item.propertyCode == code));
      return item ? false : true;
    },
    // 更换头像
    handleAvatar() {
      if (!this.isEdit('User_Photo')) {
        this.$refs.UpdateImg.show();
      }
    },
    // 头像上传成功
    imgUrl(imgList) {
      this.form.photo = imgList[0];
    },
    // 编辑保存
    subForm() {
      this.http.putJson('forward-reader-info', this.form).then((res) => {
        // this.form = res.data;
        this.$message({
          message: '编辑成功！',
          type: 'success'
        })
      }).catch((err) => {
        this.$message({ type: "error", message: "编辑读者信息失败!" });
      });
    }
  },
};
</script>

<style scoped lang="less">
.user-box {
  display: inline-block;
  width: 45%;
  .avatar {
    width: 158px;
    height: 158px;
    background: #ddd;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.edu-box {
  display: inline-block;
  width: 45%;
  vertical-align: top;
  margin-top: 135px;

  .edu-title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.65);
    padding-left: 120px;
    margin-bottom: 20px;
  }
}
.btn-box {
  padding: 20px 120px 30px;
}
/deep/ .el-input.is-disabled .el-input__inner {
  color: #666;
}
.c-n {
  cursor: not-allowed;
}
</style>

