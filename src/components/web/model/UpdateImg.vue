<!--图片上传弹窗 https://github.com/xyxiao001/vue-cropper --> 
<template>
  <el-dialog title="上传头像" :visible.sync="dialogVisible" width="680px" :before-close="dialogBeforeClose">
    <div>
      <div class="cropper-content">
        <div class="left">
          <div class="cat-warp">
            <vue-cropper ref="cropper" :img="option.img" :outputSize="option.outputSize" :outputType="option.outputType" :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixed="option.fixed" :fixedNumber="option.fixedNumber" :full="option.full" :fixedBox="option.fixedBox" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :centerBox="option.centerBox" :height="option.height" :infoTrue="option.infoTrue" :maxImgSize="option.maxImgSize" :enlarge="option.enlarge" :mode="option.mode" @realTime="realTime" @imgLoad="imgLoad"></vue-cropper>
          </div>
        </div>
        <div class="right">
          <!-- <div :style="previews.div" class="img-preview">
            <img :src="previews.url" :style="previews.img">
          </div> -->

          <div class="img-preview" style="width:100px;height:100px;border-radius: 50%;">
            <img :src="previews.url" :style="previews.img">
          </div>
          <p>100x100</p>
          <div class="img-preview" style="width:64px;height:64px;border-radius: 50%;">
            <img :src="previews.url" :style="previews.img64">
          </div>
          <p>64x64</p>
          <div class="img-preview" style="width:24px;height:24px;border-radius: 50%;">
            <img :src="previews.url" :style="previews.img24">
          </div>
          <p>24x24</p>
          <div class="btn-warp">
            <p>
              <button class="btn">点击上传
                <input type="file" id="uploads" :value="input_value" accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">
              </button>
            </p>
            <!-- <p class="hint">请上传图片格式文件</p>
            <p>
              <button class="btn" @click="changeScale(1)">放大</button>
              <button class="btn" @click="changeScale(-1)">缩小</button>
              <button class="btn" @click="rotateLeft">左旋转</button>
              <button class="btn" @click="rotateRight">右旋转</button>
            </p> -->
            <p><button class="btn submit btn_bg_color child-border-color" @click="uploadImg('blob')" :style="{background:(true?this.$root.skin_number:'#a80000')}">保存图片</button></p>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { VueCropper } from 'vue-cropper';
// import http from "@/assets/js/http";
export default {
  name: "CropperImage",
  created() { },
  components: {
    VueCropper
  },
  // props: ['imgWidth','imgHeight'],//图片宽高
  props: {
    imgWidth: {
      type: Number,
      default: 100
    },
    imgHeight: {
      type: Number,
      default: 100
    },
    enlarge: {
      type: String,
      default: 2
    }
  },//图片宽高
  data() {
    return {
      dialogVisible: false,

      // name: this.Name,
      previews: {},
      input_value: '',
      option: {
        img: '',             //裁剪图片的地址
        outputSize: 1,       //裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'png',  //裁剪生成图片的格式（jpeg || png || webp）
        info: true,          //图片大小信息
        canScale: true,      //图片是否允许滚轮缩放
        autoCrop: true,      //是否默认生成截图框
        autoCropWidth: this.imgWidth,  //默认生成截图框宽度
        autoCropHeight: this.imgHeight, //默认生成截图框高度
        fixed: true,         //是否开启截图框宽高固定比例
        fixedNumber: [this.imgWidth, this.imgHeight], //截图框的宽高比例
        full: false,         //false按原比例裁切图片，不失真
        fixedBox: true,      //固定截图框大小，不允许改变
        canMove: true,       //上传图片是否可以移动
        canMoveBox: true,    //截图框能否拖动
        original: false,     //上传图片按照原始比例渲染
        centerBox: false,    //截图框是否被限制在图片里面
        height: true,        //是否按照设备的dpr 输出等比例图片
        infoTrue: false,     //true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000,    //限制图片最大宽度和高度
        enlarge: this.enlarge,          //图片根据截图框输出比例倍数
        // mode: '50px 50px'  //图片默认渲染方式
        mode: this.imgWidth + 'px ' + this.imgHeight + 'px'  //图片默认渲染方式
      }
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    //初始化函数
    imgLoad(msg) {
      console.log("工具初始化函数=====" + msg)
    },
    //图片缩放
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    //向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    //向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    //实时预览函数
    realTime(data) {
      this.previews = data;
      // 设置64像素和24像素样式
      let rgs = /\((.+?)\)/g;
      let tran = data.img.transform.match(rgs)[1];
      tran = tran.substring(1, tran.length - 1);
      let tranList = tran.split(',');
      let tran64 = parseFloat(tranList[0]) * 64 / 100 + 'px' + ',' + parseFloat(tranList[1]) * 64 / 100 + 'px' + ',' + parseFloat(tranList[2]) * 64 / 100 + 'px';
      let tran24 = parseFloat(tranList[0]) * 24 / 100 + 'px' + ',' + parseFloat(tranList[1]) * 24 / 100 + 'px' + ',' + parseFloat(tranList[2]) * 24 / 100 + 'px';
      tran64 = data.img.transform.replace(tran, tran64);
      tran24 = data.img.transform.replace(tran, tran24);
      // console.log(tran64,tran24);
      this.previews.img64 = {
        width: parseInt(data.img.width) * 64 / 100 + 'px',
        height: parseInt(data.img.height) * 64 / 100 + 'px',
        transform: tran64
      }
      this.previews.img24 = {
        width: parseInt(data.img.width) * 24 / 100 + 'px',
        height: parseInt(data.img.height) * 24 / 100 + 'px',
        transform: tran24
      }
    },
    //选择图片
    selectImg(e) {
      let file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({ message: '图片类型要求：jpeg、jpg、png', type: 'warning' });
        return false;
      }
      //转化为blob
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      //转化为base64
      reader.readAsDataURL(file)
    },
    //上传图片
    uploadImg(type) {
      let _this = this;
      if (type === 'blob') {
        //获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          let formData = new FormData();
          formData.append('files', data, "DX.jpg");
          console.log(formData);
          //调用axios上传
          this.http.postFile('upload', formData).then(res => {
            this.previews = {};
            this.input_value = '';
            this.$forceUpdate();
            this.$emit('imgUrl', res.data || []);
            this.dialogVisible = false;
            // if (res.data && res.status == 0) {
            //   this.$emit('upImg',res.data||[]);
            // } else {
            //   this.parentMessage('error', (res.msg || '无数据'));
            // }
          }).then(err => {
            this.option.img = '';
            console.log(err);
          })
        })
      }
    },
  },
}
</script>


<style scoped lang="less">
// @import "../../assets/css/color.less"; /**颜色配置 */
.cropper-content {
  display: flex;
  flex-direction: row;
  .left,
  .right {
    flex: 1;
    border-radius: 2px;
  }
  .cat-warp {
    background-color: #fff;
    height: 320px;
  }
  .right {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .img-preview {
      overflow: hidden;
      // min-height: 150px;
      max-width: 150px;
      border-radius: 2px;
      background: #f9f8ff;
      border: 1px solid #ebeef5;
    }
    .btn-warp {
      width: 100%;
      height: 140px;
      font-size: 12px;
      padding-top: 7px;
      text-align: center;
      p {
        margin-top: 5px;
      }
      .hint {
        color: #6c757d;
      }
      .btn {
        cursor: pointer;
        height: 28px;
        border-radius: 3px;
        outline: none;
        border: none;
        color: #6677ef;
        background-color: #f9f8ff;
        border: 1px solid #ebeef5;
        margin: 5px;
        padding: 0 6px;
        position: relative;
        &:hover {
          border: 1px solid #6677ef;
        }
        #uploads {
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          width: 100%;
          position: absolute;
        }
      }
      .submit {
        height: 32px;
        width: 111px;
        color: #fff;
        background-color: #6677ef;
      }
    }
  }
}
</style>
