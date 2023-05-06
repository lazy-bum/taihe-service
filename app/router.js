'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 获取告警列表
  router.get('/boundaryAlarm/getAlarmList', controller.boundaryAlarm.getAlarmList);

  // 获取站点温度和压力
  router.get('/siteData/getPressureAndTemperatureList', controller.siteData.getPressureAndTemperatureList);

  // 获取流量数据
  router.get('/flow/getFlowData', controller.flow.getFlowData);
};
