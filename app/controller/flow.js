'use strict';

const { Controller } = require('egg');

class SiteDataController extends Controller {
  async getFlowData() {
    const { ctx, service } = this;
    const { dayjs } = ctx.helper;

    const date = dayjs();

    const day = date.format('YYYY-MM-DD');
    const startOfWeek = date.startOf('week').add(1, 'day').format('YYYY-MM-DD');
    const startOfMonth = date.startOf('month').format('YYYY-MM-DD');
    const startOfYear = date.startOf('year').format('YYYY-MM-DD');

    const data = await service.detailSsLljRlj.findBeforeTimeData(startOfYear);

    const dayData = {};
    const weekData = {};
    const monthData = {};
    const yearData = {};

    Object.keys(data).forEach(key => {

      // 如果是当前周的话
      if (dayjs(key).isSame(dayjs(day))) {
        Object.keys(data[key]).forEach(item => {
          const name = ctx.helper.getLastContentInBrackets(item);
          dayData[name] = dayData[name] ? dayData[name] + data[key][item] : data[key][item];
        });
      }

      // 如果是当前周的话
      if (dayjs(key).isSameOrAfter(dayjs(startOfWeek))) {
        Object.keys(data[key]).forEach(item => {
          const name = ctx.helper.getLastContentInBrackets(item);
          weekData[name] = weekData[name] ? weekData[name] + data[key][item] : data[key][item];
        });
      }

      // 如果是当前月的话
      if (dayjs(key).isSameOrAfter(dayjs(startOfMonth))) {
        Object.keys(data[key]).forEach(item => {
          const name = ctx.helper.getLastContentInBrackets(item);
          monthData[name] = monthData[name] ? monthData[name] + data[key][item] : data[key][item];
        });
      }

      // 如果是当前年的话
      if (dayjs(key).isSameOrAfter(dayjs(startOfYear))) {
        Object.keys(data[key]).forEach(item => {
          const name = ctx.helper.getLastContentInBrackets(item);
          yearData[name] = yearData[name] ? yearData[name] + data[key][item] : data[key][item];
        });
      }
    });

    ctx.body = {
      data: {
        day: dayData,
        week: weekData,
        month: monthData,
        year: yearData,
      },
    };
  }

}

module.exports = SiteDataController;
