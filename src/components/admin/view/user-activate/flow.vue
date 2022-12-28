<!--
 * @Author: huyu
 * @Date: 2022-12-28 14:05:12
 * @LastEditors: huyu
 * @LastEditTime: 2022-12-28 19:06:02
 * @Description: 激活流程
-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu :isActive="6"></serviceLMenu>
      </el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'总导航管理'" :fontColor="'fff'"></breadcrumb>
        <!--面包屑导航--->
        <div class="content search-table-general">
          <div class="search-table-w flex-row-between">
            <h1 class="search-title">读者激活管理</h1>
            <div style="padding-right:20px">
              <el-button type="primary" icon="iconfont el-icon-vip-baocun1" @click="handleSubmit" v-button-debounce>保 存</el-button>
              <el-button icon="iconfont el-icon-vip-quxiao" @click="goBack">返回上一级</el-button>
            </div>
          </div>
          <!--顶部查询 end-->
          <div class="table-w">
            <div class="t-p">
              <div class="flow-box flex-row-start-start">
                <div class="fb-left">
                  <div class="fb-tit flex-row-start"><i class="icon-line"></i>流程信息</div>
                  <FlowItem v-for="(item,index) in definitionList" :key="index" :item="item" :curIndex="curIndex" :index="index" :length="definitionList.length" @chengeFlow="chengeFlow"></FlowItem>
                  <div class="fb-add hover-op" @click="addFlow">
                    <div class="flex-column-center">
                      <div class="icon-add">+</div>
                      <div>新增流程</div>
                    </div>
                  </div>
                </div>
                <div class="fb-right">
                  <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-suffix="：">
                    <div class="fr-title flex-row-start"><i class="icon-lcxx"></i>流程信息</div>
                    <el-form-item label="流程名称" prop="title">
                      <el-input style="width:400px" v-model="form.title" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="完成条件" prop="finishType">
                      <el-select style="width:400px" v-model="form.finishType" placeholder="">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="浏览时间" prop="countdown" v-if="form.finishType==2">
                      <!-- <el-input style="width:400px" v-model="form.countdown" clearable></el-input> -->
                      <el-input-number style="width:400px" v-model="form.countdown" :min="1" label="描述文字"></el-input-number>
                      <span>秒</span>
                    </el-form-item>
                    <div class="fr-title top-line flex-row-start"><i class="icon-lcnr"></i>流程内容</div>
                    <el-form-item label="" prop="name" label-width="20px">
                      <Dlib3Tinymce :contValue.sync="form.contents" width="1160" editorId="mytextarea">
                      </Dlib3Tinymce>
                    </el-form-item>
                    <!-- <el-form-item label-width="20px">
                      <el-button type="primary" @click="subFlow" v-button-debounce>确 定</el-button>
                    </el-form-item> -->
                  </el-form>
                </div>
              </div>
            </div>
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
import breadcrumb from "@/components/admin/model/breadcrumb";
import serviceLMenu from "@/components/admin/model/serviceLMenu_user";
import FlowItem from '@/components/admin/view/user-activate/components/FlowItem';
export default {
  components: {
    breadcrumb,
    serviceLMenu,
    FlowItem
  },
  props: {},
  data() {
    return {
      id: this.$route.query.id || '',
      form: {
        title: "",
        finishType: 1,
        countdown: 10,
        contents: "",
      },
      rules: {
        title: [
          { required: true, message: '请输入', trigger: 'blur' },
        ],
        finishType: [
          { required: true, message: '请输入', trigger: 'change' },
        ],
      },
      options: [
        { label: '不限制', value: 1 },
        { label: '浏览时间', value: 2 },
        { label: '滑至页底', value: 3 },
      ],//1不限制 2浏览时间 3滑至页底
      definitionList: [],
      curIndex: 0
    };
  },
  created() { },
  mounted() {
    setTimeout(() => {
      this.initEditer();
    }, 300);
    this.getFlowList();
  },
  beforeDestroy() {
    // 销毁组件前销毁编辑器
    window.tinymce.get('mytextarea').destroy();
  },
  methods: {
    getFlowList() {
      // this.definitionList = [
      //   { title: 0 },
      //   { title: 1 },
      //   { title: 2 },
      //   { title: 3 },
      //   { title: 4 },
      // ]
      // return
      this.$http.getJson('activate-definition-table-data', {
        procedureid: this.id
      }).then(res => {
        if (res.data.length) {
          this.definitionList = res.data;
        } else {
          this.definitionList.push({
            title: "",
            finishType: 1,
            countdown: 10,
            contents: "",
          })
        }
        this.setForm(0)
      }).catch(err => {
        this.$message({ type: 'error', message: '获取流程信息失败!' });
      })
    },
    setForm(index) {
      this.form = this.definitionList[index];
      tinymce.activeEditor.setContent(this.form.contents)
    },
    addFlow() {
      this.definitionList.push({
        title: "",
        finishType: 1,
        countdown: 10,
        contents: "",
      })
      this.curIndex = this.definitionList.length - 1;
      this.setForm(this.curIndex)
    },
    chengeFlow({ index, type }) {
      if (type == 'show') {
        this.curIndex = index;
      }
      if (type == 'del') {
        if (this.curIndex == index) {
          this.curIndex = index == this.definitionList.length - 1 ? index - 1 : index;
        }
        if (this.curIndex > index) {
          this.curIndex = this.curIndex - 1;
        }
        this.definitionList.splice(index, 1);
      }
      if (type == 'up') {
        let cur = this.definitionList.splice(index, 1);
        this.definitionList.splice(index - 1, 0, cur[0])
        this.curIndex = index - 1;
      }
      if (type == 'down') {
        let cur = this.definitionList.splice(index, 1);
        this.definitionList.splice(index + 1, 0, cur[0])
        this.curIndex = index + 1;
      }
      this.setForm(this.curIndex)
    },
    subFlow() {
      this.definitionList.push(this.form)
    },
    handleSubmit() {
      this.$http.postJson('activate-save-definition', {
        procedureId: this.id,
        definitionList: this.definitionList
      }).then(res => {

      }).catch(err => {
        this.$message({ type: 'error', message: '保存失败!' });
      })
    },
    goBack() {
      this.$router.back()
    },
    initEditer() {
      //tinymce 编辑器
      tinymce.init({
        selector: '#mytextarea',
        language: 'zh_CN',
        height: 800,
        min_height: 800,
        width: 800,
        toolbar_mode: 'wrap',
        branding: false,
        // toolbar_sticky: true,
        resize: true,
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        plugins: 'code upfile quickbars print preview searchreplace autolink directionality powerpaste visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern help emoticons autosave bdmap indent2em autoresize kityformula-editor',
        toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor codesample | alignleft aligncenter alignright alignjustify outdent indent | \
          styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
          table image media upfile charmap emoticons hr pagebreak insertdatetime print preview bdmap indent2em lineheight kityformula-editor',
        images_upload_handler: (blobInfo, success, failure) => { // 图片上传
          this.handleImgUpload(blobInfo, success, failure)
        },
        powerpaste_word_import: "merge",
        powerpaste_html_import: 'merge',
        powerpaste_allow_local_images: true,
        powerpaste_keep_unsupported_src: true,
        paste_data_images: true,
        file_picker_types: 'media',
        media_live_embeds: true,
        file_picker_callback: (callback, value, meta) => {
          console.log(meta);
          let input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute("accept", ".mp4");
          let that = this;
          input.onchange = function () {
            let file = this.files[0];
            let fd = new FormData();
            fd.append("files", file);
            that.handleVideoUpload(fd, callback);
          }
          input.click();
        },
        video_template_callback: data => {
          return '<span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=' + data.source + ' data-mce-p-width=' + data.width + ' data-mce-p-height=' + data.height + ' data-mce-p-controls="controls" data-mce-html="%20"> <video width=' + data.width + ' height=' + data.height + ' controls="controls"> <source src=' + data.source + ' type=' + data.sourcemime + '></source> </video> </span>';
        },
        file_callback: (file, succFun) => {
          this.handleFileUpload(file, succFun);
        }
      });
      this.$forceUpdate();
    }
  },
};
</script>

<style scoped lang="less">
.content {
  min-width: 1600px;
}
.flow-box {
  padding-bottom: 20px;
}
.fb-left {
  width: 360px;
  background: #e4ecff;
  padding: 24px 14px 17px;
  .fb-tit {
    color: #6777ef;
    font-weight: bold;
    margin-bottom: 36px;
    .icon-line {
      width: 2px;
      height: 15px;
      background: #6777ef;
      border-radius: 0px;
      margin-right: 10px;
    }
  }
  .fb-add {
    height: 80px;
    border: 1px dashed #acacac;
    border-radius: 5px;
    padding: 4px;
    & > div {
      height: 100%;
      background: #ffffff;
      border-radius: 3px;
      color: #b7bec1;
      font-size: 12px;
      .icon-add {
        font-size: 30px;
      }
    }
  }
}
.fb-right {
  width: calc(100% - 360px);
  .fr-title {
    height: 60px;
    border-bottom: 1px solid #ebeef5;
    color: #6777ef;
    font-weight: bold;
    font-size: 16px;
    padding: 0 20px;
    margin-bottom: 15px;
    i {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
    .icon-lcxx {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAgxJREFUOE+dVEFy2kAQ7JHL4JvZF8R+QeQXWP6BfhDlEMEtyiHALfiGlIuOSDlYT+AJygtCXhDygSy+2bi8kxqVllIwIBxdoGpnerenu4dwxDcY6wspm03Vsq2c2grCoS6I8K6uK7JYvT/UcxDww2ftksOlQ+QKCDN+GYOrb1/VYh/oTsBwqH0ieESYM+Mui9WlAISjPyuHyDcGnuOgnE1VuQ38AlAogtgH02S9RtHtQprO68b7LFZuONQTEEdgussT9akJ+g9gf6RTBgdC0QoQRLp3dgZfmh4eMC9StZL/dhxgSvNETSzoBnAw1p5hnrMh79CMmq8RUMfBDyLcWPobwHCoSyIsslhFbco3z2sX9LJYVSwqwMZNl8d4rQkoHhX1iVD1VoAVXYMiT1Rl4Nd+/ZFmS9sCBsxwX0vXXlyJySjzRM03MxTaJydY/Q/l52f0rJAVYC3IdZ2G26YNDtEXPxLhS11TZrG6IUkFgHS9hnt6iovaBq3iWDEkik9PWHY6kDhGNBjrwBh8zBN1JSbudqHb8tp0xuMjlJi9P9ILIqQkIJ0uL8Ek0veY8TtPlHeM0vWo3jBD0qOEZTXDZrxmU1XIq+W3ZX5RnqhUapuxfLEcZDbGQFLDzJg4Dr5b5euzayJIdu+J4G+7Yuf6qsbQQUAEuf3t1kt/yqyai2LvttlHUZIkZ7v233bPX/mEDD0lmc78AAAAAElFTkSuQmCC);
    }
    .icon-lcnr {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAATZJREFUOE/FlLFtwzAQRf+pcRlzgmSFTBBpg2wQpXHUpnHUxekkVy4lVcwG2iDKBt4g2oCuWfACGhFAOYrMCAJMgAWBu3f/Pu5ImPlQx3t6UTWAKx8+M/bVVjwPxbpAZsY7gPYMNCbCNTNqrfEod+LgxveARIiKTDRjwNVaNUTYAwiZwVojcqGTgAAarbFbLNCcQicBifBlDGQQYMkMaW2qtuLWdjYITFIVM+PBbb3MRWTfPy3fndpS5uLI+gsYGoPQTaq2YjPkbZIq6+XHKNBndLqYywBXa7UhwuuYUma8WRu8FCapugFg79hpi0y0XsDZPbRVjcGv0XALBQE+7VZ5KbRzaAziMaVBAFlkQnoBZ295NiAAyXz2++rVIzpOQzy0KTUzlv9R18US4VDm4r63y1NAQznfPM70FdTp5k0AAAAASUVORK5CYII=);
    }
  }
  .top-line {
    border-top: 1px solid #ebeef5;
  }
}
</style>
