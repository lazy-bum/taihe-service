const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

module.exports = {
  // 获取字符串中最后一个中括号中的内容
  getLastContentInBrackets(str) {
    const pattern = /\[([^\]]+)\][^\[]*$/;
    const match = str.match(pattern);
    if (match) {
      const contents = match[1].split(' ');
      return contents[contents.length - 1];
    }
    return null;
  },

  // 将code中的最后一个中括号中的数当作数据key
  transformArray(arr) {
    const result = [];

    const times = [ ...new Set(arr.map(obj => obj.time)) ];

    times.forEach((time, index) => {
      const filteredObjs = arr.filter(obj => obj.time === time);

      const newObj = { id: index };
      filteredObjs.forEach(obj => (newObj[this.getLastContentInBrackets(obj.code)] = this.roundToTwoDecimalPlaces(obj.value)));
      newObj.time = this.getHourMinuteSecond(time);
      result.push(newObj);
    });

    return result;
  },

  // 保留两位小数
  roundToTwoDecimalPlaces(num) {
    return Math.round((num * 1 + Number.EPSILON) * 100) / 100;
  },

  // 只获取时分秒
  getHourMinuteSecond(time) {
    return time?.split(' ')?.[1] || '';
  },
  // 注入dayjs
  dayjs,

  // 将科学计数法转成 number
  strNumToNum(str = '') {
    const numArr = str.split('.');
    if (numArr.length > 1) {
      return (numArr[0] + `0.${Number(numArr[1])}` * 1) * 1;
    }
    return numArr[0] * 1;
  },

  // 合并相同时间的数据
  mergeDataByTime(arr = []) {
    const { strNumToNum } = this;
    const obj = {};
    arr.forEach(ele => {
      const { code, value, time } = ele || {};
      if (!obj[time]) obj[time] = {};

      obj[time][code] = obj[time][code] ? obj[time][code] + strNumToNum(value) : strNumToNum(value);
    });

    return obj;
  },
};
