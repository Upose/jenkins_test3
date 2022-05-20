import axios from 'axios';
// import qs from 'qs'
var token = 'Bearer ' + window.localStorage['token'];
axios.defaults.timeout = 20000;

import api from '@/assets/public/js/api';
// console.log(api.postUrl)
export default {
  postUrl: api.postUrl,
  error: function (msg) {
    console.error(msg);
  },
  responseOk: function (response, resolve, reject) {
    const result = response.data;
    if (result.statusCode == 200) {
      resolve(result);
    } else if (result.statusCode == 400) {
      Vue.prototype.$message({ type: 'error', message: result.errors });
    } else {
      this.error(result.errors);
      reject(result);
    }
  },
  responseError: function (err, resolve, reject) {
    reject(err);
  },
  //不带token的get方法  --- json
  noGet: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //不带token的post方法  --- json
  noPost: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的get方法  --- json
  getJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        params: data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的delete方法  --- json
  deleteJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },

  //带token的post方法  --- json
  postJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的put方法  --- json
  putJson: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的put方法  --- json
  putJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        // data: data,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的get方法  --- plain ；data参数是在调用时拼接好的（如：id=1&name=张三）
  getPlain: function (url, data) {
    var get_url = '';
    if (data) {
      get_url = this.postUrl[url] + '?' + data;
    } else {
      get_url = this.postUrl[url];
    }
    return new Promise((resolve, reject) => {
      axios({
        url: get_url,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的get方法  --- plain ；data参数是在调用时拼接好的（如：id=1&name=张三）
  getPlain: function (url, data) {
    var get_url = '';
    if (data) {
      get_url = this.postUrl[url] + '?' + data;
    } else {
      get_url = this.postUrl[url];
    }
    return new Promise((resolve, reject) => {
      axios({
        url: get_url,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  getPlain_url: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的post方法  --- plain
  postPlain: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  // get方法 自拼参数  带token
  getJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  // post方法 自拼参数  带token
  postJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的delete方法自己拼接  --- json
  deleteJsonSelf: function (url, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url] + data,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  //带token的文件上传方法  --- form-data
  postFile: function (url, formData) {
    return new Promise((resolve, reject) => {
      axios({
        url: localStorage.getItem('fileUrl') + '/api/file/upload-file',
        // url: this.postUrl[url],
        data: formData,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',

        },
      }).then(response => {
        this.responseOk(response, resolve, reject);
      }).catch(err => {
        this.responseError(err, resolve, reject);
      });
    });
  },
  linkTo: function (url) {
    window.location.href = this.postUrl[url];
  },
  // 下载文件  文件流-转为excel
  importFile: function (url, data = {}, name = '用户数据模板') {
    return new Promise((resolve, reject) => {
      axios({
        url: this.postUrl[url],
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        responseType: 'blob' // 表明返回服务器返回的数据类型
      }).then(response => {
        const result = response.data;
        if (result) {
          const content = response.data
          const blob = new Blob([content]) // 构造一个blob对象来处理数据
          const fileName = name + '.xlsx' // 导出文件名
          // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          // IE10以上支持blob但是依然不支持download
          if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
            const link = document.createElement('a') // 创建a标签
            link.download = fileName // a标签添加属性
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click() // 执行下载
            URL.revokeObjectURL(link.href) // 释放url
            document.body.removeChild(link) // 释放标签
          } else { // 其他浏览器
            navigator.msSaveBlob(blob, fileName)
          }
          resolve();
        } else {
          // this.error(result.errors);
          reject();
        }
      }).catch(err => {
        reject(err);
      });
    });
  }
}
