<template>
  <div>
    <div class="up-img-form-item width95">
      <div class="up-img-warp">
        <img :src="iconUrl" v-if="iconUrl != ''">
        <img :src="imgPath + cover" v-else-if="cover && cover != ''">
        <img src="@/assets/admin/img/icon2.png" v-else>
      </div>
      <div class="up-img-warp select-icon" @click="selectImg()" v-if="hasChance">
        <span>选择图标</span>
      </div>
      <div class="up-img-warp up-icon" @click="upImg()">
        <span>选择图片</span>
      </div>
    </div>
    <!-- 更新图标选择 -->
    <el-dialog title="图片上传"  append-to-body :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleClose">
      <UpdateImg @imgUrl="imgUrl" :imgWidth="coverWidth" :imgHeight="coverHeight"></UpdateImg>
    </el-dialog>
    <!-- 默认图标选择 -->
    <el-dialog title="图片选择" append-to-body :visible.sync="dialogSelectimg" width="540px" :close-on-click-modal="false" :before-close="selectImgClose">
      <p class="el-form-img-box-hint">点击图标即可选中所需要的图标</p>
      <div class="c-l">
        <div class="el-form-img-box" v-for="(i,index) in iconList" :key="index" @click="selectImgClick(i)">
          <img :src="i" />
          <img src="@/assets/admin/img/icon-select.png" :class="select_img==i?'active':''" v-if="select_img==i" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="closeClick()">取 消</el-button>
        <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitImg()">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import UpdateImg from "@/components/admin/model/UpdateImg";
// import { VueCropper } from 'vue-cropper';
export default {
  name: 'index',
  components: { UpdateImg },
  props: ['hasChance','cover','coverHeight','coverWidth'],
  data() {
    return {
      select_img: '',//选择默认图标后的url
      iconUrl: '',//上传后图片url
      dialogUPimg: false,
      dialogSelectimg: false,
      iconList: [],//默认图标列表

      imgPath:localStorage.getItem('fileUrl'),//图片域名前缀
    }
  },
  created() {
    console.log(localStorage.getItem('fileUrl'))
  },
  mounted() {

  },
  methods: {
    //选择图标
    selectImgClick(val) {
      this.select_img = val;
    },
    //打开图标选择弹窗
    selectImg() {
      this.dialogSelectimg = true;
    },
    //关闭图标选择弹窗
    closeClick() {
      this.dialogSelectimg = false;
      this.select_img = null;
    },
    //关闭图标选择弹窗
    selectImgClose(done) {
      this.select_img = null;
      done();
    },
    //确定图标选择弹窗
    submitImg() {
      this.$emit('coverUrl', this.select_img);
      this.dialogSelectimg = false;
      this.select_img = null;
    },
    //打开图标上传弹窗
    upImg() {
      this.dialogUPimg = true;
    },
    // 返回图片相对路径
    imgUrl(imgList) {
      // console.log(imgList)
      this.dialogUPimg = false;
      this.iconUrl = localStorage.getItem('fileUrl') + imgList[0];
      this.$emit('coverUrl', imgList[0]);
    },
    //图片上传-弹窗关闭
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
  }
}
</script>
<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less"; /**颜色配置 */
@import "../../../../assets/admin/css/form.less";
// @import "../../../../../assets/css/style.less";
.w500 {
  width: 500px;
}
.width95{
  width: 95%;
}
/deep/ .cropper-content {
  line-height: 1 !important;
}
.up-img-warp {
  line-height: 40px;
}
</style>
