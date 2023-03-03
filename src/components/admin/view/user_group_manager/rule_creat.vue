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
            <el-form ref="postForm" :model="postForm" label-width="150px" :rules="rules">
              <el-form-item label="用户组名称：" class="w500" prop="name">
                <el-input v-model="postForm.name" class="w500" minlength="2" maxlength="10" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" :rows="4" v-model="postForm.desc" class="w500" maxlength="100"
                  show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="选择：" v-if="dataKey">
                <div class="rule-box" v-for="(it, idx) in ruleList" :key="idx">
                  <div class="rule-item" v-for="(item, index) in it.rules" :key="index">
                    <el-select v-model="item.propertyId" placeholder="请选择" class="w150" @change="handleChange(item)">
                      <el-option v-for="items in selectOption" :key="items.id" :label="items.name"
                        :value="items.id"></el-option>
                    </el-select>
                    <!-- 属性组 -->
                    <template v-if="item.propertyType == 4">
                      <el-select v-model="item.compareType" placeholder="请选择" class="w110">
                        <el-option v-for="items in compare" :key="items.value" :label="items.key" :value="items.value">
                        </el-option>
                      </el-select>
                      <el-select v-model="item.propertyValue" placeholder="请选择" class="w150"
                        v-if="item.propertyType == 4">
                        <el-option v-for="items in item.valueList" :key="items.value" :label="items.key"
                          :value="items.value"></el-option>
                      </el-select>
                    </template>

                    <!-- 日期 -->
                    <template v-else-if="item.propertyType == 2">
                      <el-select v-model="item.compareType" placeholder="请选择" class="w110">
                        <el-option v-for="(value, key) in dataKey.compareType" :key="value" :label="key" :value="value">
                        </el-option>
                      </el-select>
                      <el-date-picker placeholder="请选择" class="w150" v-model="item.propertyValue" type="date"
                        value-format="yyyy-MM-dd"></el-date-picker>
                    </template>
                    <el-select v-model="item.unionWay" placeholder="请选择" class="w100">
                      <el-option v-for="items in union" :key="items.value" :label="items.key" :value="items.value">
                      </el-option>
                    </el-select>
                    <div class="btns-el-btn" @click="addCoumn(idx, index)"
                      v-if="(it.rules.length - 1) == index && it.rules.length < 6">
                      <i class="el-icon-plus"></i>
                      <span>添加</span>
                    </div>
                    <div class="btns-el-btn" @click="removeCoumn(idx, index)" v-if="it.rules.length != 1">
                      <i class="el-icon-minus"></i>
                      <span>删除</span>
                    </div>
                  </div>
                  <div class="rule-box-right">
                    <div class="rule-box-btn">
                      <div class="btns-el-btn" @click="addCoumnRule(idx)"
                        v-if="(ruleList.length - 1) == idx && ruleList.length < 6">
                        <i class="el-icon-plus"></i>
                        <span>添加</span>
                      </div>
                      <div class="btns-el-btn" @click="removeCoumnRule(idx)" v-if="ruleList.length != 1">
                        <i class="el-icon-minus"></i>
                        <span>删除</span>
                      </div>
                    </div>
                    <el-select v-model="it.groupUnionWay" placeholder="请选择" class="w100">
                      <el-option v-for="items in union" :key="items.value" :label="items.key" :value="items.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button size="medium" @click="reset" icon="iconfont el-icon-vip-chushi">重 置</el-button>
                <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="validateRun"
                  v-button-debounce>保 存</el-button>
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
    // bus.$on("collapse", (msg) => {
    //   this.$root.collapse = msg;
    //   this.$forceUpdate();
    // });
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
      selectOption: [],
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

      rules: {
        name: [
          { required: true, message: '请输入用户组名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
      },

      userDepart: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.getOrgList();
      this.getKey();
      if (this.id) {
        // this.getData();
      } else {
        this.ruleList = [{
          groupSort: 1,
          groupUnionWay: 1,
          rules: [{
            "compareType": 1,
            "propertyId": "",
            "propertyValue": "",
            "sort": 0,
            "unionWay": 1,
            "valueList": [],
            "allList": [],
            "propertyType": 4,
            "propertyCode": ""
          }]
        }]
      }
    },
    // 获取初始数据
    getOrgList() {
      http.getJson('org-list').then(res => {
        if (res.data && res.data.length) {
          this.userDepart = res.data.map(item => {
            return {
              key: item.name,
              value: item.fullPath,
            }
          })
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '获取部门数据失败!' });
      })
    },
    // 获取初始数据
    getKey() {
      http.getJson('user-group-init-data').then(res => {
        this.dataKey = res.data;
        this.selectOption = [
          ...res.data.userProperties.map(item => {
            item.propertyType = 4;
            return item;
          }),
          ...res.data.groupRuleProperty.map(item => {
            item.propertyType = 2;
            return item;
          })
        ]
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
          item.rules.forEach(item1 => {
            this.handleChange(item1, 'init');
          })
        });
        console.log(this.ruleList, 'ruleList')
      }).catch(err => {
        this.$message({ type: 'error', message: '获取设置失败!' });
      })
    },
    // 选择属性
    handleChange(cur, init) {
      if (!init) {
        cur.propertyValue = "";
      }
      cur.propertyType = this.selectOption.find(item => item.id == cur.propertyId).propertyType;
      cur.propertyCode = this.selectOption.find(item => item.id == cur.propertyId).code;
      if (cur.propertyType == 4 && cur.propertyCode != 'User_Depart') {
        let items = this.dataKey.userProperties.find(item => (item.id == cur.propertyId))
        let itemss = this.dataKey.groupSelect.find(item => (item.groupCode == items.code))
        cur.valueList = itemss ? itemss.groupItems : [];
      } else if (cur.propertyCode == 'User_Depart') {
        cur.valueList = this.userDepart;
      }
    },
    // 添加-组规则
    addCoumnRule(idx) {
      this.ruleList.push({
        groupSort: 1,
        groupUnionWay: 1,
        rules: [{
          "compareType": 1,
          "propertyId": "",
          "propertyValue": "",
          "sort": 0,
          "unionWay": 1,
          "valueList": [],
          "allList": [],
          "propertyType": 4,
          "propertyCode": ""
        }]
      })
    },
    // 删除-组规则
    removeCoumnRule(idx) {
      this.ruleList.splice(idx, 1)
    },
    // 添加
    addCoumn(idx, index) {
      this.ruleList[idx].rules.push({
        "compareType": 1,
        "propertyId": "",
        "propertyValue": "",
        "sort": 0,
        "unionWay": 1,
        "valueList": [],
        "allList": [],
        "propertyType": 4,
        "propertyCode": ""
      })
    },
    // 删除
    removeCoumn(idx, index) {
      this.ruleList[idx].rules.splice(index, 1)
    },
    // 重置
    reset() {
      location.reload();
    },
    //表单提交
    submitForm() {
      // var validRules = this.ruleList.filter(x => { return x.propertyId && x.propertyValue });
      // if (!validRules || validRules.length <= 0) {
      //   this.$message({ message: '请至少添加1条规则', type: 'error' });
      //   return;
      // }
      // if (validRules.length > 6) {
      //   this.$message({ message: '最多只能添加6条规则', type: 'error' });
      //   return;
      // }
      let validRules = this.ruleList;
      let rulesList = [];
      validRules.forEach((it, idx) => {
        rulesList.push({
          groupSort: idx + 1,
          groupUnionWay: it.groupUnionWay,
          rules: it.rules.map((item, index) => {
            return {
              "compareType": item.compareType,
              "propertyId": item.propertyId,
              "propertyValue": item.propertyValue,
              "sort": index + 1,
              "unionWay": item.unionWay,
            }
          })
        })
      });
      this.postForm.rules = rulesList;

      if (this.id) {
        http.putJson('user-group', this.postForm).then(res => {
          this.$message({ message: '编辑成功！', type: 'success' });
          this.$router.back();
        }).catch(err => {
          this.$message({ type: 'error', message: '编辑失败!' });
        })
      } else {
        http.postJson('user-group', this.postForm).then(res => {
          this.$message({ message: '新增成功！', type: 'success' });
          this.$router.back();
        }).catch(err => {
          this.$message({ type: 'error', message: '新增失败!' });
        })
      }
    },
    // 验证执行
    validateRun() {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          this.submitForm();
        } else {
          this.$message({
            message: '请完善信息！',
            type: 'warning'
          })
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
/**颜色配置 */
@import "../../../../assets/admin/css/form.less";
@import "../../../../assets/admin/css/form.less";

.content-box {
  min-height: 600px;
  background-color: @m-col-b0;
  border-radius: 4px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
  padding: 20px;
}

.w500 {
  width: 500px;
}

.rule-box {
  width: 640px;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  position: relative;

  .rule-box-right {
    position: absolute;
    right: -120px;
    bottom: 0;

    .rule-box-btn {
      margin-bottom: 15px;

      span,
      i {
        font-size: 14px;
      }
    }
  }
}

.w100 {
  width: 100px;
}

.w110 {
  width: 110px;
}

.w150 {
  width: 150px !important;
}

.rule-item {
  position: relative;
  margin-bottom: 15px;
}

.btns-el-btn {
  cursor: pointer;
  display: inline-block;
  // position: absolute;
  // right: -5px;
  // top: 3px;
  color: @m-col-b7;
  text-align: center;
  line-height: 20px;
  vertical-align: top;
  margin-left: 10px;

  &:hover {
    opacity: 0.8;
  }

  span {
    display: block;
    font-size: 12px;
  }
}
</style>
