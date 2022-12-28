<!--
 * @Author: huyu
 * @Date: 2022-12-28 11:43:16
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-28 13:55:56
 * @Description: 新建激活场景
-->
<template>
  <el-drawer :with-header="false" :visible.sync="drawer" :size="800" :before-close="handleClose">
    <div class="aa-tit flex-row-start"><span>新增激活场景</span></div>
    <el-form class="aa-form" ref="form" :model="form" :rules="rules" label-width="90px" label-suffix="：">
      <el-form-item label="场景名称" prop="name">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="场景说明" prop="name">
        <el-input type="textarea" :rows="4" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="name">
        <el-switch v-model="form.name"></el-switch>
      </el-form-item>
      <el-form-item label="流程阻塞" prop="name">
        <el-switch v-model="form.name"></el-switch>
      </el-form-item>
      <el-form-item label="" prop="name" label-width="0px">
        <div class="select-user check-box">
          <div class="box-title">选择用户</div>
          <div class="check-list" v-loading="loading">
            <el-tabs v-model="active" :tab-position="'left'" style="height: 200px;" v-if="dataKey">
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
      <el-form-item>
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
      form: {},
      rules: [],

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
    show() {
      this.drawer = true;
      if (!this.dataKey) {
        this.getKey();
      }
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
