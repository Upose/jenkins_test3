<!--
 * @Author: huyu
 * @Date: 2022-12-28 10:20:20
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-10 14:21:02
 * @Description: 激活场景列表项
-->
<template>
  <div class="ai-box" :class="{'ai-green':index%2!=0}">
    <i class="el-icon-error ai-del hover-op" @click.stop="delFlow" v-has="'procedure:delete'"></i>
    <div class="ab-top flex-row-between">
      <div class="at-tit hover-line" @click="openAdd">{{item.title}}</div>
      <div>
        状态
        <el-switch @change="changeStatus" v-model="item.status" :active-value="1" :inactive-value="2" :disabled="!$_has('procedure:changestatus')"></el-switch>
      </div>
    </div>
    <div class="ab-bottom">
      <div class="ab-info">{{item.contents}}</div>
      <div class="flex-row-start">
        <el-switch @change="changeBlocking" v-model="item.isBlocking" :disabled="!$_has('procedure:changestatus')"></el-switch>
        <span class="ai-tit">流程阻塞</span>
        <span class="ai-tip">必须达到条件才可以进入下一流程</span>
      </div>
      <div class="ab-btn flex-row-start">
        <div class="ab-item">
          <i class="icon-yh"></i>
          <el-tooltip effect="dark" :content="srtUser" placement="bottom-start" :visible-arrow="false">
            <span>{{srtUser}}</span>
          </el-tooltip>
          <!-- <span :title="srtUser">{{srtUser}}</span> -->
        </div>
        <div class="ab-item hover-o" @click.stop="$router.push({ path:'/admin_activateFlow',query:{id:item.id} })" v-has="'definition:list'"><i class="icon-lc"></i>流程设置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    index: Number,
    item: Object
  },
  data() {
    return {
      model: false
    };
  },
  computed: {
    srtUser() {
      return this.item.visitingListModel.visitList.length ? this.item.visitingListModel.visitList.map(item => item.value).join('、') : '';
    }
  },
  created() { },
  mounted() { },
  methods: {
    openAdd() {
      this.$emit('openAdd', this.item.id);
    },
    changeStatus() {
      this.$http.postJson('activate-change-status', {
        id: this.item.id,
        status: this.item.status
      }).then(res => {
        this.$message({ type: 'success', message: '修改成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: '修改失败!' });
      })
    },
    changeBlocking() {
      this.$http.postJson('activate-change-blocking', {
        id: this.item.id,
        isBolcking: this.item.isBlocking
      }).then(res => {
        this.$message({ type: 'success', message: '修改成功!' });
      }).catch(err => {
        this.$message({ type: 'error', message: '修改失败!' });
      })
    },
    delFlow() {
      this.$confirm('是否确认删除该场景?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.deleteJsonSelf('activate-activate-procedure', `/${this.item.id}`).then(res => {
          this.$message({ type: 'success', message: '删除成功!' });
          this.$emit('updateList')
        }).catch(err => {
          this.$message({ type: 'error', message: '删除失败!' });
        })
      }).catch(() => { })
    }
  },
};
</script>

<style scoped lang="less">
.hover-o {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.ai-box {
  width: 390px;
  height: 198px;
  background: linear-gradient(270deg, #8fb7ff 0%, #7192fc 100%);
  border-radius: 5px;
  color: #fff;
  position: relative;

  .ai-del {
    position: absolute;
    font-size: 18px;
    top: -5px;
    right: -5px;
    color: #f56c6c;
    background: #fff;
    border-radius: 50%;
    display: none;
  }
  &:hover {
    .ai-del {
      display: block;
    }
  }
  .ab-top {
    height: 58px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding: 0 20px;
    .at-tit {
      font-size: 18px;
      line-height: 25px;
      font-weight: bold;
      max-width: 260px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .ab-bottom {
    height: 140px;
    padding: 20px;
    position: relative;
    .ab-info {
      font-size: 16px;
      margin-bottom: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ai-tit {
      margin: 0 10px 0 12px;
    }
    .ai-tip {
      font-size: 12px;
      opacity: 0.6;
    }
    .ab-btn {
      position: absolute;
      bottom: 0;
      left: 20px;
      width: 350px;
      height: 34px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 14px 14px 0px 0px;
      .ab-item {
        margin-left: 20px;
        max-width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 16px;
        i {
          margin-right: 6px;
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
        }
        .icon-yh {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAARxJREFUOE+dU1FVAzEQnHGABKoA6gAUFByAglIFIOFOAZWAA3DAnQKwgILpm5D0JdtceY983SW7szuzs0Q4ki4BbAHcALjOzxOADwAjye86hfWPpCEnR9z6fyC5KxdHAEmucpUffgC8kBwkXfg7AE8k145NAJ3KOyeH7t4AbKo703li5vwVer4lac7HI8ldPIe4lQF6vO9JumIN0IsbDVBzLwlW2l0kxSV5Iu8dZScD6IzkpmERyzhPQpcARgANBQB3vRH3KKxJmtbJkeROPquHOYqYRnPORUH0JKKtW8b4SHL/B8ADgNccs4pGcuvm3nggBxcxrYWp/BqpVFsY51IzM8k0mf8sU6NTA5BNY00spM1TlmvOtLyJzTofAJaBfvYhSTmBAAAAAElFTkSuQmCC);
        }
        .icon-lc {
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAV5JREFUOE+FkwFRA1EMRHcVAAqgCgAFFAWAAqgCigKoAnoOqAJAAcVBqwBwcCgI847/O+FThpu5mcslf392N7GaJyIOJF1LGks6KumVpKWkzvZ7PuIcRMS8HK6/PyX1kvZT3dz2TY03ABHBLYep8IMObPcR8SDpMuVWto+JB4AtNz9Louiu5KFz3nQHnakL57eEPpH0JOle0kISnPmm7d2ixU6pHwGQec8kEb8kASs2WpwWEPI8HQCVO4LhAACZb9a5t70XEThyMtCMiCgVr7bHKW4drvFF6e52EDEd6Ar32t5fANCkg6EuU8A2lL5q1M5AHMZSaJ5JWmcRJ7ZJYmvrO78XtgEnz0WPVUSEw8b/AJa2cQEA5gMNRnmQUJ6b8Rr/GR5eYpwiRwfMAB18D1Il2IwyxbO6OBEBCAs2LYCDY5tRTiDtMm1zYrj51zIlEDShgBvqcq2LdWzij3X+Al38mPaspM7IAAAAAElFTkSuQmCC);
        }
      }
    }
  }
}
.ai-green {
  background: linear-gradient(270deg, #14d0d4 0%, #39aed4 100%);
}
/deep/ .el-switch {
  height: 24px;
  border: 2px solid #fff;
  border-radius: 12px;
}
</style>
