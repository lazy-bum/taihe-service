'use strict';

const { Controller } = require('egg');

class BoundaryAlarmController extends Controller {
  async getAlarmList() {
    const { ctx, service } = this;
    const data = await service.electricFenceZoneAlarm.findAllAlarmByStatus(1);
    ctx.body = { data };
  }
}

module.exports = BoundaryAlarmController;
