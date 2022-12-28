<!--
 * @Author: huyu
 * @Date: 2022-12-28 11:43:16
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-28 17:13:41
 * @Description: 新建激活场景
-->
<template>
  <el-drawer :with-header="false" :visible.sync="drawer" :size="800" :wrapperClosable="false">
    <div class="aa-tit flex-row-start"><span>新增激活场景</span></div>
    <el-form class="aa-form" ref="form" :model="form" :rules="rules" label-width="100px" label-suffix="：" v-loading="loading">
      <el-form-item label="场景名称" prop="title">
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="场景说明" prop="contents">
        <el-input type="textarea" :rows="3" v-model="form.contents"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label="流程阻塞" prop="isBlocking">
        <el-switch v-model="form.isBlocking"></el-switch>
      </el-form-item>
      <el-form-item label="" prop="name" label-width="0px">
        <div class="select-user check-box">
          <div class="box-title">选择用户</div>
          <div class="check-list" v-loading="loading">
            <el-tabs v-model="active" :tab-position="'left'" @tab-click="handelChange" style="height: 200px;" v-if="dataKey">
              <el-tab-pane label="类型" name="type">
                <el-checkbox :indeterminate="isUserTypeIndeterminate" v-model="checkUserTypeAll" @change="handleCheckAllUserTypeChange">全部读者</el-checkbox>
                <el-checkbox-group v-model="checkedUserTypes" @change="handleCheckedUserTypeChange">
                  <el-checkbox v-for="item in dataKey.userTypeList" :label="item.code" :key="item.groupItemId">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-tab-pane>
              <el-tab-pane label="分组" name="group">
                <el-checkbox :indeterminate="isGroupListIndeterminate" v-model="checkGroupListAll" @change="handleCheckAllGroupListChange">全部读者</el-checkbox>
                <el-checkbox-group v-model="checkedGroupList" @change="handleCheckedGroupListChange">
                  <el-checkbox v-for="item in dataKey.groupList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button icon="iconfont el-icon-vip-quxiao" @click="handleCancel">取 消</el-button>
        <el-button type="primary" icon="iconfont el-icon-vip-baocun1" @click="handleSubmit" v-button-debounce>保 存</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      drawer: false,
      id: '',
      form: {},
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        contents: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
        isBlocking: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
      },

      loading: false,
      postForm: {},
      dialogBulk: false,
      checkUserTypeAll: false,
      checkGroupListAll: false,
      isUserTypeIndeterminate: true,
      isGroupListIndeterminate: true,
      checkedUserTypes: [],
      checkedGroupList: [],

      dataKey: null,
      type: null,
      allUserTypes: [],
      allGroupList: [],
      active: 'type'
    };
  },
  created() { },
  mounted() { },
  methods: {
    show(id) {
      this.drawer = true;
      this.id = id;
      if (!this.dataKey) {
        this.getKey();
      }
      if (id) {
        this.getData();
      } else {
        this.form = {
          status: 1,
          isBlocking: true,
          title: "",
          contents: "",
        }
        this.checkedUserTypes = []
        this.checkedGroupList = []
      }
    },
    handelChange() {
      this.$confirm('切换类型将清空当前选项，是否继续切换？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.active == 'group' ? this.checkedUserTypes = [] : this.checkedGroupList = [];
      }).catch(() => {
        this.active = this.active == 'group' ? 'type' : 'group';
      })
    },
    getData() {
      this.loading = true;
      this.http.getJsonSelf('activate-activate-procedure', '/' + this.id).then(res => {
        this.form = res.data;
        if (this.form.visitingListModel.type == 1) {
          this.active = 'type';
          this.checkedUserTypes = this.form.visitingListModel.visitList.map(item => item.key)
        }
        if (this.form.visitingListModel.type == 2) {
          this.active = 'group';
          this.checkedGroupList = this.form.visitingListModel.visitList.map(item => item.key)
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取场景详情失败!' });
      })
    },
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.checkedUserTypes.length && !this.checkedGroupList.length) {
            this.$message.warning('请选择读者类型或分组！');
            return;
          }
          let visitingListModel = {
            type: 2,
            visitList: []
          }
          if (this.active == 'type') {
            visitingListModel.type = 1;
            visitingListModel.visitList = this.dataKey.userTypeList.filter(item => this.checkedUserTypes.includes(item.code)).map(item => {
              return {
                key: item.code,
                value: item.name
              }
            })
          }
          if (this.active == 'group') {
            visitingListModel.type = 2;
            visitingListModel.visitList = this.dataKey.groupList.filter(item => this.checkedGroupList.includes(item.id)).map(item => {
              return {
                key: item.id,
                value: item.name
              }
            })
          }
          if (!this.id) {
            this.http.postJson('activate-activate-procedure', { ...this.form, visitingListModel }).then(res => {
              this.$message.success('创建成功！');
              this.handleCancel();
              this.$emit('updateList')
            }).catch(err => {
              this.$message({ type: 'error', message: '创建失败!' });
            })
          } else {
            this.http.putJson('activate-activate-procedure', { ...this.form, visitingListModel }).then(res => {
              this.$message.success('创建成功！');
              this.handleCancel();
              this.$emit('updateList')
            }).catch(err => {
              this.$message({ type: 'error', message: '创建失败!' });
            })
          }
        } else {
          return false
        }
      })
    },
    // 获取初始数据
    getKey() {
      this.loading = true;
      this.http.getJson('set-init-data').then(res => {
        this.dataKey = res.data;
        this.allUserTypes = this.dataKey.userTypeList.map(x => { return x.code; });
        this.allGroupList = this.dataKey.groupList.map(x => { return x.id; });
        this.loading = false;
        // this.initData();
      }).catch(err => {
        this.loading = false;
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    handleCheckAllUserTypeChange(val) {
      this.checkedUserTypes = val ? this.allUserTypes : [];
      this.isUserTypeIndeterminate = false;
    },
    handleCheckAllGroupListChange(val) {
      this.checkedGroupList = val ? this.allGroupList : [];
      this.isGroupListIndeterminate = false;
    },
    handleCheckedUserTypeChange(value) {
      let checkedCount = value.length;
      this.checkUserTypeAll = checkedCount === this.allUserTypes.length;
      this.isUserTypeIndeterminate = checkedCount > 0 && checkedCount < this.allUserTypes.length;
    },
    handleCheckedGroupListChange(value) {
      let checkedCount = value.length;
      this.checkGroupListAll = checkedCount === this.allGroupList.length;
      this.isGroupListIndeterminate = checkedCount > 0 && checkedCount < this.allGroupList.length;
    },
    handleCancel() {
      this.$refs.form.clearValidate();
      this.form = {
        status: 1,
        isBlocking: true,
        title: "",
        contents: "",
      }
      this.checkedUserTypes = []
      this.checkedGroupList = []
      this.drawer = false;
    }
  },
};
</script>

<style scoped lang="less">
@import "../../../../../assets/admin/css/color.less"; /**颜色配置 */
.aa-tit {
  height: 62px;
  border-bottom: 1px solid #ebeef5;
  padding: 0 30px;
  color: #6777ef;
  font-size: 16px;
  font-weight: bold;
  span {
    line-height: 60px;
    border-bottom: 2px solid #6777ef;
  }
}
.aa-form {
  padding: 45px;
}
.select-user {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  width: 100%;
}
.d-title {
  color: @ph-col-n12;
  font-size: 14px;
  margin-bottom: 10px;
  span {
    vertical-align: middle;
  }
  i {
    font-size: 16px;
    vertical-align: middle;
  }
}
.check-box {
  height: 340px;
  overflow-y: auto;
  .box-title {
    background-color: @ph-col-n3;
    line-height: 40px;
    height: 40px;
    color: @ph-col-n12;
    padding: 0 20px;
    font-weight: bold;
    /deep/ .el-checkbox__label {
      font-weight: bold;
      color: @ph-col-n12;
    }
  }
  .check-list {
    padding: 20px 0;
    /deep/ .el-checkbox {
      display: block;
      margin-bottom: 10px;
      height: 20px !important;
      line-height: 20px !important;
      &:last-child {
        margin-bottom: 0;
      }
    }
    /deep/ .el-tabs--left {
      height: 257px !important;
    }
    /deep/ .el-tabs__content {
      overflow-y: auto;
      height: 257px;
    }
  }
}
</style>
