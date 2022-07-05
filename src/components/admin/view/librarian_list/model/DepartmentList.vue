<!--
 * @Author: huyu
 * @Date: 2022-07-04 15:39:08
 * @LastEditors: huyu
 * @LastEditTime: 2022-07-04 18:27:05
 * @Description: 组织架构组件
-->
<template>
  <el-tree :data="checkDep" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick" class="trees" :default-expand-all="true" :highlight-current="true" node-key="id">
    <span slot-scope="{node,data}">
      {{data.name}}{{data.count?'('+data.count+'人)':''}}
    </span>
  </el-tree>
</template>

<script>
import http from '@/assets/public/js/http';
export default {
  components: {},
  props: {},
  data() {
    return {
      departList: [],
      checkDep: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  created() {
    this.getDepa();
  },
  mounted() { },
  methods: {
    // 获取部门
    getDepa() {
      http.getJson('org-count-list').then(res => {
        this.departList = res.data;
        this.checkDep = [{ name: '全部', fullPath: '' }, ...res.data]
      }).catch(err => {
        this.$message({ type: 'error', message: '获取数据失败!' });
      })
    },
    handleNodeClick(data) {
      // this.nodeDepart = data.fullPath;
      // this.handSearch();
      this.$emit('handleNodeClick', data.fullPath)
    },
  },
};
</script>

<style scoped lang="less">
.trees {
  border-right: 1px solid #ebecef;
  padding-right: 24px;

  /deep/ .el-tree-node__content {
    width: 100%;
    height: 36px;
    line-height: 36px;
    background: rgba(156, 173, 255, 0.3);
    border-radius: 4px;
    margin-top: 10px;
    &:hover {
      opacity: 0.8;
    }
  }
  /deep/ .el-tree-node__children .el-tree-node__content {
    margin-top: 0;
    background: rgba(225, 230, 255, 0.3);
    margin-bottom: 2px;
  }
  /deep/ .el-icon-caret-right:before {
    content: "";
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAKBJREFUKFNjTC9/f4GBgUGfAQr+/2f4wMTEYAji/vvHcJ6RkUEASe4CY3r5+/8wARjNyMjgCGL//8+wH0OO9hrSyt99YGRg5Ee2GpeT/jP8/8iYUfFegYGBAYThYEaH4AEQJ6PivQOaHx6ANfz9yyCPLDG7W/AgTMPfvwzwQGFmZnjISJKT/jN8GIzBipE0GP5/ZGJkNAAnjf//L6AF+UUABKNdXw/lYncAAAAASUVORK5CYII=");
  }
  /deep/
    .el-tree-node__children
    .el-tree-node__content
    .el-icon-caret-right:before {
    width: 18px;
    height: 14px;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAAAXNSR0IArs4c6QAAAV1JREFUOE+VkjFWwkAQhv8J7wGdzA3wBOIJjCcATiCNgU4sJHRiR9IYOpIKTmA8gfEGHAEv4FKGJuvbmPiSNfjMFnl5/8588+/MEGqcyVyYcYzdxuODnka6oIKlxCOArpTYBi4vrJlYEKVaeqSEF7h8X8wtgTLIWyFhqP6J8KIXlBJPqkiul0BjW4QA+vml7zDpWgG49x0+rwRZMxER4aoI0rWiM1XoFGhDhJv8MklwSQSTCM8VM3n1HR5UgkZT0Wm1EAG4yJoaBi4PdVdS4sMwYK6XvK8EKVHB2m0MkgRdw8B+veSN0q2ZUNV7SotjhPoK/Bp/jbUqhf6Asl1JG02ErXIymYtRkqBPhM6JAqHv8CrNUZ+xLTwAd3nw8QhuNjEtLuEfTiPf4esUZNmfBwKdZQ1+D1w2x7aQ/31mOt3M0S6fFICV7/C0DogI346qzu2D6DUaJ3tTSlkvOfoCCOOGF0cAhzgAAAAASUVORK5CYII=");
  }
  /deep/ .el-tree-node__children .el-tree-node__expand-icon.is-leaf::before {
    background: none !important;
  }
  /deep/ .el-tree-node__expand-icon.expanded {
    transform: none;
  }
}
</style>
