// 工具类
/**
 * 格式化时间
 * date：：需格式化时间
 * time：：格式化精确到那一项
 * 默认到日期
*/
var timeFormat = (date, time = '日') => {
  let times = {
    '年': 'YYYY',
    '月': 'YYYY-mm',
    '日': 'YYYY-mm-dd',
    '时': 'YYYY-mm-dd HH',
    '分': 'YYYY-mm-dd HH:MM',
    '秒': 'YYYY-mm-dd HH:MM:SS',
  }
  let format = times[time];
  date = new Date(date);
  const dataItem = {
    'Y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    'S+': date.getSeconds().toString(),
  };
  Object.keys(dataItem).forEach((item) => {
    const ret = new RegExp(`(${item})`).exec(format);
    if (ret) {
      format = format.replace(ret[1], ret[1].length === 1 ? dataItem[item] : dataItem[item].padStart(ret[1].length, '0'));
    }
  });
  return format;
}

/**
 * 表单验证
 * name：验证类型
 * value：验证值
 * min：最小长度
 * max：最大长度
 * */
var validator = (name, value, min, max) => {
  let v_data = {
    phone: /^1\d{10}$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    url: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    qq: /^[1-9][0-9]{4,10}$/,
    weixin: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
    number: /^-?\d*\.?\d+$/,
    null: /\S/,
    // length:/^.{min,max}$/
  }
  return v_data[name].test(value);
}


export {
  timeFormat,
  validator
}