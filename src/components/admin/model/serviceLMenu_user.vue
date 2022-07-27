<!--
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-05-30 10:52:16
 * @LastEditors: gongqin
 * @LastEditTime: 2022-07-27 13:26:29
-->

<!--左边菜单-->
<template>
  <LeftNavCom :dataList="dataList"/>
</template>

<script>
import http from "@/assets/public/js/http";
import LeftNavCom from './LeftNavCom/index.vue'
export default {
  name: 'test',
  components: {
    LeftNavCom
  },
  watch: {
    '$route': 'force'
  },
  data(){
    return {
      dataList: [],
    }
  },
  created() {
    // 侧边栏
    if (!this.$store.getters.authList || this.$store.getters.authList.length == 0) {
      this.getAuth();
    } else {
      let list = this.$store.getters.authList;
      // 只取第一级
      this.dataList = list.map(item => {
        return {
          ...item,
          permissionNodes: [],
        }
      })
    }
  },
  methods: {
    force() {
      this.$forceUpdate();
    },
    getAuth() {
      http.getJson('user-permission-tree').then(res => {
        let list = [];
        if (res.data.permissionNodes) {
          // 只取第一级
          list = res.data.permissionNodes.map(item => {
            return {
              ...item,
              permissionNodes: [],
            }
          })
        }
        this.dataList = list;
        this.$store.commit('setAuthList', res.data.permissionNodes);
        console.log(res.data, this.$store.getters.authList)
      }).catch(err => {
        this.$message({ type: 'error', message: '获取侧边栏数据失败!' });
      })
    },
  }
}
</script>
