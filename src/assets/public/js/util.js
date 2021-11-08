// 工具类
/**
 * 格式化时间
 * date：：需格式化时间
 * time：：格式化精确到那一项
 * 默认到日期
*/
var timeFormat = function (date, time = '日') {
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
  
  
  export {
    timeFormat
  }