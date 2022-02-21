<template>
  <el-dialog title="修改日志记录" :visible.sync="dialogVisible" width="700px" :before-close="dialogBeforeClose">
    <!-- <div class="form-box">
      <el-form ref="form" :model="postFrom" label-width="0px">
        <el-form-item label="">
          <el-input v-model="postFrom.keyword" size="medium" placeholder="请输入搜索内容" style="width:80%"></el-input>
          <el-button type="primary" size="medium" icon="iconfont el-icon-vip-fangdajing" @click="getList">搜索</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <el-table :data="tableData" style="width:100%" class="admin-table" border :header-cell-style="{background:'#F1F3F7'}" stripe>
      <el-table-column prop="fieldCode" label="字段编码"></el-table-column>
      <el-table-column prop="fieldName" label="字段名称"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span>{{ getKeyValue('propertyLogType',scope.row.changeType) }}</span>
          <!-- <span>{{ scope.row.changeType }}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="oldValue" label="原值"></el-table-column>
      <el-table-column prop="newValue" label="新值"></el-table-column>
    </el-table>
    <!-- <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging> -->

  </el-dialog>
</template>
<script>
import http from "@/assets/public/js/http";
// import paging from "@/components/admin/model/paging";

export default {
  name: 'preview',
  props: ['dataKey'],
  data() {
    return {
      dataKey: sessionStorage.getItem('user_dataKey'),
      type: '',
      urlData: '',
      dialogVisible: false,
      name: '',
      pageData: {
        pageIndex: 1,
        pageSize: 10,
      },//分页参数
      tableData: [],//列表项
      postFrom: {
        // keyword: '',
        // sortField: '',
        // IsAsc: '',
      }
    }
  },
  // components: { paging },
  mounted() {
  },
  methods: {
    // 显示弹窗
    show(type, logid) {
      this.type = type;
      this.urlData = {
        'attribute': { url: 'property-change-log-detail-items', datas: `/${logid}` },
      }
      this.getList();
      this.dialogVisible = true;
    },
    // 获取列表数据
    getList() {
      http.getJsonSelf(this.urlData[this.type].url,this.urlData[this.type].datas).then(res => {
        this.tableData = res.data;
        //分页所需  数据总条数
        // this.pageData.totalCount = res.data.logs.totalCount;
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    // 键值对匹配
    getKeyValue(name, val) {
      for (const key in this.dataKey[name]) {
        if (this.dataKey[name][key] == val) {
          return key;
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import "../../../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../../../assets/admin/css/form.less";

.name {
  padding: 10px;
  font-size: 16px;
}
.form-box {
  margin-bottom: 10px;
}
</style>