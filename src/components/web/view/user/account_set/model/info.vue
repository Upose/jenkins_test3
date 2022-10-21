<template>
  <div>
    <div class="user-box" v-if="!loading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="头像：">
          <div class="avatar" :class="isEdit('User_Photo')?'c-n':''" @click="handleAvatar">
            <img class="avatar-img" :src="imgPath + (form.photo?form.photo:'/public/image/default-user-head/default-user-head.png')" alt="">
          </div>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="form.name" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Name')"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称：">
          <el-input v-model="form.nickName" placeholder="请输入" style="width:400px" :disabled="isEdit('User_NickName')"></el-input>
        </el-form-item>
        <el-form-item label="所在单位：">
          <el-input v-model="form.unit" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Unit')"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="form.gender" style="width:400px" :disabled="isEdit('User_Gender')" filterable :filter-method="(value)=>handleFilter(value,'User_Gender')" v-el-select-loadmore="optionLoadMore('User_Gender')">
            <el-radio v-for="item in initSelect('User_Gender')" :key="item.value" :label="item.key">{{item.key}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期：">
          <el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Birthday')"></el-date-picker>
        </el-form-item>
        <el-form-item label="所在地区：">
          <!-- <el-input v-model="form.addr" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Addr')"></el-input> -->
          <el-cascader style="width:400px" :disabled="isEdit('User_Addr')" :options="addrList" v-model="form.addr" :props="{ value:'idDisp',label:'name',children:'children',emitPath:false }" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="form.addrDetail" placeholder="请输入" style="width:400px" :disabled="isEdit('User_Addr')"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="edu-box" v-if="!loading">
      <h2 class="edu-title">学历信息</h2>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="学历：">
          <el-select v-model="form.edu" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Edu')" filterable :filter-method="(value)=>handleFilter(value,'User_Edu')" v-el-select-loadmore="optionLoadMore('User_Edu')">
            <el-option v-for="item in initSelect('User_Edu')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系：">
          <el-select v-model="form.college" placeholder="请选择" style="width:400px" :disabled="isEdit('User_College')" filterable :filter-method="(value)=>handleFilter(value,'User_College')" v-el-select-loadmore="optionLoadMore('User_College')">
            <el-option v-for="item in initSelect('User_College')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业：">
          <el-select v-model="form.major" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Major')" filterable :filter-method="(value)=>handleFilter(value,'User_Major')" v-el-select-loadmore="optionLoadMore('User_Major')">
            <el-option v-for="item in initSelect('User_Major')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级：">
          <el-select v-model="form.grade" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Grade')" filterable :filter-method="(value)=>handleFilter(value,'User_Grade')" v-el-select-loadmore="optionLoadMore('User_Grade')">
            <el-option v-for="item in initSelect('User_Grade')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级：">
          <el-select v-model="form.class" placeholder="请选择" style="width:400px" :disabled="isEdit('User_Class')" filterable :filter-method="(value)=>handleFilter(value,'User_Class')" v-el-select-loadmore="optionLoadMore('User_Class')">
            <el-option v-for="item in initSelect('User_Class')" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-box" v-if="updateReaderInfo&&!loading">
      <el-button type="info" size="medium">取消</el-button>
      <el-button class="tborder-c1 tbg-c1 thover-bg-c2" type="primary" size="medium" @click="subForm" v-button-debounce>保存</el-button>
    </div>
    <!--加载中-->
    <div class="temp-loading" v-if="loading"></div>
    <!--暂无数据-->
    <div class="web-empty-data" v-else-if="form.length==0" :style="{background: 'url('+fileUrl+'/public/image/data-empty.png) no-repeat center'}">
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
      loading: true,
      form: {},
      dataKey: null,
      groupSelect: [],
      imgPath: localStorage.getItem('fileUrl'),
      addrList: [],
      updateReaderInfo: false,
    };
  },
  created() {
    this.getKey();
    this.checkModifyReaderPermit();
    this.getAddrList();
    this.getInfo();
  },
  mounted() { },
  directives: {
    'el-select-loadmore': (el, binding) => {
      // 获取element-ui定义好的scroll盒子
      const SELECTWRAP_DOM = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap");
      if (SELECTWRAP_DOM) {
        SELECTWRAP_DOM.addEventListener("scroll", function () {
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) binding.value && binding.value()
        });
      }
    }
  },
  methods: {
    // 获取键值对数据
    getKey() {
      this.http.getJson('forward-init-data').then((res) => {
        this.dataKey = res.data;
        // 下拉框选项初始化时控制在10以内 
        res.data.groupSelect.forEach(item => {
          let data = {
            groupCode: item.groupCode,
            groupItems: [],
          };
          if (item.groupItems.length > 500) {
            data.groupItems = item.groupItems.slice(0, 100);
          } else {
            data.groupItems = item.groupItems;
          }
          this.groupSelect.push(data);
        });
      }).catch((err) => {
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    // 初始化下拉列表
    initSelect(code) {
      if (!this.dataKey) return;
      let select = this.groupSelect.find(item => (item.groupCode == code));
      return select.groupItems;
    },
    // 下拉列表过滤
    handleFilter(val, code) {
      let allList = (this.dataKey.groupSelect.find(item => (item.groupCode == code))).groupItems;
      let curList = [];
      let filterList = [];//筛选出列表 用于下拉列表加载判断
      if (val != '') {
        allList.forEach(item => {
          if (item.key.indexOf(val) != -1) {
            filterList.push(item);
            if (curList.length <= 10) {
              curList.push(item)
            }
          };
        })
      } else {
        curList = allList.slice(0, 10);
      }
      this.groupSelect.forEach(item => {
        if (item.groupCode == code) {
          item.groupItems = curList;
          item.filterList = filterList;
        }
      })
    },
    // 选择框下拉加载
    optionLoadMore(code) {
      return () => {
        let allList = (this.dataKey.groupSelect.find(item => (item.groupCode == code))).groupItems;
        let filterList = (this.groupSelect.find(item => (item.groupCode == code))).filterList;
        let curList = (this.groupSelect.find(item => (item.groupCode == code))).groupItems;
        let curSelectList = filterList && filterList.length > 0 ? filterList : allList;
        if (curSelectList.length > curList.length) {
          curList = curSelectList.slice(0, curList.length + 10);
          this.groupSelect.forEach(item => {
            if (item.groupCode == code) {
              item.groupItems = curList;
            }
          })
        }
      }
    },
    // 获取用户修改信息权限
    checkModifyReaderPermit() {
      this.http.getJson('forward-check-modify-reader-permit').then((res) => {
        this.updateReaderInfo = res.data;
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
        this.form.addr = this.showAddrCode(this.form.addr);
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        this.$message({ type: "error", message: "获取读者信息失败!" });
      });
    },
    //处理地区编码
    showAddrCode(addr) {
      var addrArray = (addr || "").split('|');
      if (addrArray.length >= 2) {
        return addrArray[1];
      }
      return '';
    },

    // 是否不可编辑
    isEdit(code) {
      let isedit = true;
      if (this.updateReaderInfo) {
        let item = this.dataKey.readerEditProperties.find(item => (item.propertyCode == code));
        isedit = item ? false : true;
      } else {
        isedit = true;
      }
      return isedit;
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
        this.$message({ type: "error", message: this.handleError(err, "编辑读者信息失败") });
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
    .avatar-img {
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

