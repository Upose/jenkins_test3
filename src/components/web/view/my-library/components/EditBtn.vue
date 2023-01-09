<!--
 * @Author: huyu
 * @Date: 2023-01-09 15:21:46
 * @LastEditors: huyu
 * @LastEditTime: 2023-01-09 16:34:50
 * @Description: 编辑按钮
-->
<template>
  <div v-if="!isSchoolfellow">
    <div class="edit-btn" @click="handleEdit" v-if="!isEdit"><i class="icon-edit"></i>编辑主页</div>
    <div class="edit-ing-btn" v-else>
      <span class="mb" @click="handleReset">
        <span class="hover-op"><i class="edit-ing-reset"></i>重置</span>
      </span>
      <span @click="handleSave">
        <span class="hover-op"><i class="edit-ing-save"></i>保存</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    isSchoolfellow: {
      default: false
    },
    isEdit: Boolean
  },
  data() {
    return {

    };
  },
  created() { },
  mounted() { },
  methods: {
    // 编辑个人图书馆
    handleEdit() {
      this.$emit('update:isEdit', true)
    },
    // 重置
    handleReset() {
      // this.isEdit = false;
      // this.getTemp();
      window.location.reload();
    },
    // 保存
    handleSave() {
      this.$emit('handleSave')
    },
  },
};
</script>

<style scoped lang="less">
.edit-btn {
  width: 60px;
  height: 118px;
  background: #ffffff;
  box-shadow: 0px 3px 40px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 25px 16px 23px 16px;
  position: fixed;
  // right: 24px;
  left: calc((100% - 1200px) / 2 + 1240px);
  top: 50vh;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
  border-radius: 0px 35px 35px 35px;
  font-size: 14px;
  font-weight: 400;
  color: #2d3240;
  i {
    width: 26px;
    height: 24px;
    display: inline-block;
    margin-bottom: 2px;
    background: url(~@/assets/web/img/personal/icon-edit.png);
  }
  &:hover {
    opacity: 0.9;
  }
}
.edit-ing-btn {
  width: 60px;
  height: 168px;
  background: #ffffff;
  box-shadow: 0px 3px 40px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0px 35px 35px 35px;
  padding: 20px 15px;
  position: fixed;
  // right: 24px;
  left: calc((100% - 1200px) / 2 + 1240px);
  top: 48vh;
  text-align: center;
  color: #2d3240;
  z-index: 1000;

  i {
    display: inline-block;
    width: 26px;
    height: 26px;
    margin-bottom: 7px;
  }
  .edit-ing-reset {
    height: 27px;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAYAAABiFp9rAAAAAXNSR0IArs4c6QAAA65JREFUSEu1ll9oHFUUxr/v7qYa+yfFWoIUpWLSus6s3VlEUcnOCCpCpPiH0oqioC+KVkSxovgkUhUKYumjPlSFPFiVWqgPEbsbU2rQdDbZ2UXXKLGNVWvNNqVp0+7uPTKT7LIbN9m0ifN4z3fO75wz9557iSafEXc6lMhmkF2A3CiCa0leA8GEUP6hYEALvwnp8Z7h4eHJmnCqo+P2FSMjA2f8Nc7FiUadmySMt0g80iyZwC5S0MCeyQJ3jo4mi6Zlfwlwg+cmO+cEmTH7FSi+SeDKBUFqRCIYATFIYKu/rLXclk2nvp9VkROOWvgAxJNzA6QIwd8CriFxRbNERORtz029XgcyY87HVHh8trOI9Irg05KWr38a7vvNT9TXmPFEBFp1UwWJmY2gIpLz3JRRBZkx+zUq7qwVC/ALhU9n3EOpJpnTsBI7FNU7jXQa6AxAkViiM0SVqW2FQA6d49mHfh0cnGjWnqA6yz5M8s7GIHk1AJmWs692d/mVnNW4dTSdPL0QiK+JWvZ+kDaAtgat380Oq2ttK9XvAFsqgnIZXbmhZP9CIbU6wzCWkWva0aLaNWQtwbZT5fEDNGKJ55RSeypigRzwjqY2Xw5kPh+altNDYlsVVJaHvaHUF/8DyM6TDE4vgFLh5IVVY2NHzi85KBq3zwFsDQKLnMi4qXVLDfHj0bTsMkk1DUI24yYbHrzFwmnG7QmCq6Y5ctw7mrp+sUEb+fsVZUneXDFOFEtXH8v0F5YCFrmlK86Qas+57PVBPSSru04LtmTd5L7FgkzLeZnErpl//xVNK/EUqT6sbm+RXs9N3bcY0PqYs3olMQZi+XQcOU9/cQXxZ93I17o7k+47eLkw07LfJ/lC1V/k4Myss3eT3F4zHf7AxSnL8wb+ulRYNOY8BoVP6vyk7ASgYN4hlAexuqaFORTlfs/rO75QmGElnlDTvyFc8dGC/Vk3+WD1PjIsZ5sieuozkYIWvpRNJz+qXHaNoBs23bFumWp5g1TP1NvlxAVyU34wearuhjXi9g4FvvufYCJ5AT6TMvtQRnpyEqevatMRpegf7ntIPFo7/Wd22kkNfXfW/TYXTIbZQU3L3k7yPQChhbZstk5Efi7p8gM/DvXnK7aGz62IlUiEofaCWH8pMBHRIPZOnZl6sfKemxfkGzduvGtlS2v4eSg8S/C6+YFSFOHnQHGX5x7+oZF2zgdkjThkxJ17laBbiBsgWA7KRQiPEXqkJMioYvG7bPbI+HzJ/Au/Pm0ACvdYCAAAAABJRU5ErkJggg==");
  }
  .edit-ing-save {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAARtJREFUSEvtlj1uwkAQhd+zXaTgBqGgQKmABDokiiUn4gBJlwvkJNwAtqDHhSXocJSGQ4AnWglH2NoYG+1SRLiy5Jn59s2fl/2h2oHowNEjGWZJrD/L4dgfKXHE+A1jg3kBGWIZVgBlgncKVk0UHokoBOYkWmW/c1gBJBmmSax1E5CxrapzDvMOytPoBNQbqm8S7apMFEHAFoJ9o9QREYHJJR9vXXeTObKp++eKRKBJpJcKW+e7CDokVG7rpL1NsKfn18cwQGTeN+vFV+9FKQZYOgedL+fDAeMwwIN3kFllRol3kFdF3YFqR6cabWOdeqtRuRPvoDqzabWpTh3wRmGjX/lfJxHKhMCHdWCvPn4Nxxtub8cXSKs4QfoD+//EXRgP8hEAAAAASUVORK5CYII=");
  }
  span {
    display: block;
  }
  .mb {
    margin-bottom: 20px;
  }
}
</style>
