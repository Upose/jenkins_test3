<!---信息导航-栏目信息-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse ? 'fold-menu' : ''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{ 'content-collapse': $root.collapse }">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w">
            <h1 class="search-title">
              规则添加
            </h1>
          </div>
          <!--顶部查询 end-->

          <!-- 目录 -->
          <div class="content-box">
            <el-form ref="form" :model="postForm" label-width="150px">
              <el-form-item label="用户组名称" class="w500">
                <el-input v-model="postForm.name" class="w500"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="postForm.desc" class="w500"></el-input>
              </el-form-item>
              <el-form-item label="选择权限">
                <div class="rule-box" v-if="dataKey">
                  <div class="rule-item" v-for="(item,index) in ruleList" :key="index">
                    <el-select v-model="item.propertyId" placeholder="请选择" class="w150" @change="handleChange(item)">
                      <el-option v-for="items in dataKey.userProperties" :key="items.id" :label="items.name" :value="items.id"></el-option>
                    </el-select>
                    <el-select v-model="item.compareType" placeholder="请选择" class="w100">
                      <el-option v-for="items in compare" :key="items.value" :label="items.key" :value="items.value">
                      </el-option>
                    </el-select>
                    <el-select v-model="item.propertyValue" placeholder="请选择" class="w150">
                      <el-option v-for="items in item.valueList" :key="items.value" :label="items.key" :value="items.value"></el-option>
                    </el-select>
                    <el-select v-model="item.unionWay" placeholder="请选择" class="w100">
                      <el-option v-for="items in union" :key="items.value" :label="items.key" :value="items.value">
                      </el-option>
                    </el-select>
                    <div class="btns-el-btn" @click="addCoumn" v-if="(ruleList.length-1)==index && ruleList.length != 6">
                      <i class="el-icon-plus"></i>
                      <span>添加</span>
                    </div>
                    <div class="btns-el-btn" @click="removeCoumn(index)" v-else>
                      <i class="el-icon-minus"></i>
                      <span>删除</span>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-close" size="medium" @click="reset">重置</el-button>
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--管理页列表 end--->
        </div>
        <!---顶部查询板块 end--->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from "@/assets/public/js/bus";
import http from "@/assets/public/js/http";
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";

export default {
  name: "index",
  created() {
    bus.$on("collapse", (msg) => {
      this.$root.collapse = msg;
    });
  },
  components: { footerPage, serviceLMenu, breadcrumb },
  data() {
    return {
      id: this.$route.query.id,
      postForm: {
        name: '',
        desc: '',
        sourceFrom: 0,
        rules: []
      },
      defaultProps: {
        label: 'name',
        children: 'permissionNodes',
      },
      auth: [],

      dataKey: null,
      ruleList: [],//规则列表
      compare: [
        { key: '等于', value: 1 },
        { key: '不等于', value: 0 },
      ],
      union: [
        { key: '与', value: 1 },
        { key: '或', value: 2 },
        // { key: '非', value: 0 },
      ],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getKey();
      if (this.id) {
        // this.getData();
      } else {
        this.ruleList = [{
          "compareType": 1,
          "propertyId": "",
          "propertyValue": "",
          "sort": 0,
          "unionWay": 1,
          "valueList": []
        }]
      }
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-group-init-data').then(res => {
        this.dataKey = res.data;
        if (this.id) {
          this.getData();
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 获取数据
    getData() {
      http.getJsonSelf('by-id', `/${this.id}`).then(res => {
        this.postForm = res.data;
        this.ruleList = res.data.rules;
        this.ruleList.forEach(item => {
          this.handleChange(item);
        });
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 选择属性
    handleChange(cur) {
      let items = this.dataKey.userProperties.find(item => (item.id == cur.propertyId))
      let itemss = this.dataKey.groupSelect.find(item => (item.groupCode == items.code))
      cur.valueList = itemss ? itemss.groupItems : [];
    },
    // 添加
    addCoumn() {
      this.ruleList.push({
        "compareType": 1,
        "propertyId": "",
        "propertyValue": "",
        "sort": 0,
        "unionWay": 1,
        "valueList": []
      })
    },
    // 删除
    removeCoumn(index) {
      this.ruleList.splice(index, 1)
    },
    //表单提交
    submitForm() {
      this.postForm.rules = this.ruleList;
      if (this.id) {
        http.putJson('user-group', this.postForm).then(res => {
          this.$message({ message: '编辑成功！', type: 'success' });
          // this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '编辑失败!' });
        })
      } else {
        http.postJson('user-group', this.postForm).then(res => {
          this.$message({ message: '新增成功！', type: 'success' });
          // this.getData();
        }).catch(err => {
          this.$message({ type: 'error', message: '新增失败!' });
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
@import "../../../../assets/admin/css/form.less";
.content-box {
  min-height: 600px;
  background-color: @fff;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
  padding: 20px;
}
.w500 {
  width: 500px;
}
.rule-box {
  width: 600px;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid #ddd;
}
.w100 {
  width: 100px;
}
.w150 {
  width: 150px;
}
.rule-item {
  position: relative;
  margin-bottom: 15px;
}
.btns-el-btn {
  cursor: pointer;
  position: absolute;
  right: -5px;
  top: 3px;
  color: @6777EF;
  text-align: center;
  line-height: 18px;
  &:hover {
    opacity: 0.8;
  }
  span {
    display: block;
    font-size: 12px;
  }
}
</style>
