/*
 * @Description: 写一些公共方法挂载到vue原型上
 * @Author: wanjikun
 * @Date: 2022-04-24 09:52:57
 * @LastEditTime: 2022-12-30 15:02:00
 * @LastEditors: huyu
 */
import Vue from 'vue'
import store from '@/router/store'

function hightLightShow(message, highlightToken) {
  if (highlightToken == null) return message;
  if (!message) return message;
  let highlightTokens = Array.from(
    new Set(
      highlightToken
        .split(";")
        .map((z) => z.toLowerCase())
        .filter(
          (z) =>
            "<i  style='color:red;font-style: inherit;'>".indexOf(
              z
            ) == -1
        )
        .sort((a, b) => b.length - a.length)
    )
  );

  for (let index = 0; index < highlightTokens.length; index++) {
    const element = highlightTokens[index];
    message = message.replace(
      new RegExp(`(${element})`, "ig"),
      "<i  style='color:red;font-style: inherit;'>$1</i>"
    );
  }
  return message;
}

//深拷贝
function deepClone(obj) {
  //定义一个变量 并判断是数组还是对象
  var objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object" && obj != null) {
    // 判断obj存在并且是对象类型的时候 因为null也是object类型，所以要单独做判断
    for (var key in obj) {  // 循环对象类型的obj
      if (obj.hasOwnProperty(key)) {  // 判断obj中是否存在key属性
        if (obj[key] && typeof obj[key] === "object") {  //  判断如果obj[key]存在并且obj[key]是对象类型的时候应该深拷贝，即在堆内存中开辟新的内存
          objClone[key] = deepClone(obj[key]);
        } else {  //  否则就是浅复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
function copyContent(txt) {
  let transfer = document.createElement('input');//创建控件
  document.body.appendChild(transfer);
  transfer.style.cssText = 'position: fixed;opacity:0;'
  transfer.value = txt;  // 这里表示想要复制的内容
  transfer.focus();
  transfer.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  transfer.blur();
  Vue.prototype.$message.success("复制成功!");
  // console.log('复制成功');
  document.body.removeChild(transfer);//删除控件
}

/** 
 * 权限指令,对按钮权限的控制
 * 使用v-has="'权限名（permission）'"进行控制
 * permission 单个权限控制传入字符串 多个或关系传入数组
 **/
Vue.directive("has", {
  inserted: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      // el.style.display = "none";
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
});
// 权限检查方法（且把该方法添加到vue原型中）
Vue.prototype.$_has = (value) => {
  let isExist = false;
  // 获取到权限数组
  var buttonpermsStr = store.state.allAuthList;
  if (buttonpermsStr === undefined || buttonpermsStr == null) {
    return false;
  }
  // 单权限判断
  if (typeof value === "string") {
    // 若在按钮中定义的权限字段能在后端返回的权限数组中能找到，则该按钮可显示
    isExist = buttonpermsStr.indexOf(value) > -1 ? true : false;
  } else {
    // 多权限判断
    let list = buttonpermsStr.filter((item) => value.includes(item));
    isExist = list.length ? true : false;
  }
  return isExist;
};

Vue.prototype.$hightLightShow = hightLightShow;
Vue.prototype.$deepCloneObj = deepClone;
Vue.prototype.$copyContent = copyContent;