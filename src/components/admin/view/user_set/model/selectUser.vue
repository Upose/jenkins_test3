<!---权限编辑-->
<template>
  <div>
    <el-dialog title="新增授权" :visible.sync="dialogBulk" width="480px" :close-on-click-modal="false">
      <!-- <h1 class="d-title"><i class="el-icon-menu"></i> <span>已选标签：2021年毕业生</span></h1> -->
      <div class="select-user check-box">
        <div class="box-title">选择用户</div>
        <div class="check-list">
          <el-tabs :tab-position="'left'" style="height: 200px;" v-if="dataKey">
            <el-tab-pane label="类型">
              <el-checkbox :indeterminate="isUserTypeIndeterminate" v-model="checkUserTypeAll" @change="handleCheckAllUserTypeChange">全部读者</el-checkbox>
              <el-checkbox-group v-model="checkedUserTypes" @change="handleCheckedUserTypeChange">
                <el-checkbox v-for="item in dataKey.userTypeList" :label="item.code" :key="item.groupItemId">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="分组">
              <el-checkbox :indeterminate="isGroupListIndeterminate" v-model="checkGroupListAll" @change="handleCheckAllGroupListChange">全部读者</el-checkbox>
              <el-checkbox-group v-model="checkedGroupList" @change="handleCheckedGroupListChange">
                <el-checkbox v-for="item in dataKey.groupList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button icon="el-icon-close" size="medium" @click="dialogBulk = false">取消</el-button>
        <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import http from "@/assets/public/js/http";
export default {
  name: 'index',
  props: ['editPower_data'],
  data() {
    return {
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
      allGroupList: []
    }
  },
  mounted() {
    console.log(this.editPower_data);
  },
  methods: {
    show(type) {
      this.type = type;
      this.dialogBulk = true
      this.getKey();
    },
    // 获取初始数据
    getKey() {
      http.getJson('set-init-data').then(res => {
        this.dataKey = res.data;
        this.allUserTypes = this.dataKey.userTypeList.map(x => { return x.code; });
        this.allGroupList = this.dataKey.groupList.map(x => { return x.id; });
        this.initData();
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    handleCheckAllUserTypeChange(val) {
      this.checkedUserTypes = val ? this.allUserTypes : [];
      debugger
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
    /****保存按钮*******/
    submitForm() {
      var userTypeItems = this.checkedUserTypes.map(x => { return { configType: this.type, readerType: 0, refId: x }; });
      var groupListItems = this.checkedGroupList.map(x => { return { configType: this.type, readerType: 1, refId: x }; });

      var allItems = userTypeItems.concat(groupListItems);
      var urlCode = "";
      switch (this.type) {
        case 0:
          urlCode = 'set-card-claim-reader';
          break;
        case 1:
          urlCode = 'set-info-append-reader';
          break;
      }
      http.postJson(urlCode, allItems).then(res => {
        this.$message({ message: '保存成功！', type: 'success' });
        this.closeClick();
      }).catch(err => {
        this.$message({ type: 'error', message: this.handleError(err, '保存失败') });
      });
    },
    /****取消按钮*******/
    closeClick() {
      this.dialogBulk = false;
      this.checkedUserTypes = [];
      this.checkedGroupList = [];
    },
    /***x关闭按钮 **/
    handleClose(done) {
      this.checkedUserTypes = [];
      this.checkedGroupList = [];
    },
    initData() {
      var urlCode = '';
      switch (this.type) {
        case 0:
          urlCode = 'card-claim-reader';
          break;
        case 1:
          urlCode = 'info-append-reader';
          break;
      }
      var $this = this;

      http.getJson(urlCode,).then(res => { //学生专区
        $this.checkedUserTypes = res.data.filter(x => { return x.readerType == 0; }).map(x => { return x.refID; });
        $this.checkedGroupList = res.data.filter(x => { return x.readerType == 1; }).map(x => { return x.refID; });

        $this.handleCheckedUserTypeChange($this.checkedUserTypes);
        $this.handleCheckedGroupListChange($this.checkedGroupList);
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败' });
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../../assets/admin/css/color.less"; /**颜色配置 */
/deep/ .el-dialog__footer {
  padding: 0px 20px 20px;
}
.select-user {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  width: 100%;
}
.d-title {
  color: @34395E;
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
    background-color: @EBEEF5;
    line-height: 40px;
    height: 40px;
    color: @34395E;
    padding: 0 20px;
    font-weight: bold;
    /deep/ .el-checkbox__label {
      font-weight: bold;
      color: @34395E;
    }
  }
  .check-list {
    padding: 20px 0;
    /deep/ .el-checkbox {
      display: block;
      margin-bottom: 10px;
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