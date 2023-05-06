const Service = require('egg').Service;

const STATUS = {
  NORMAL: 0,
  ALARM: 1,
};

class ElectricFenceZoneAlarmService extends Service {
  async findAllList() {
    const { app } = this;
    try {
      const data = await app.mysql.query('SELECT * FROM electric_fence_zone_alarm');
      return data || [];
    } catch (error) {
      return [];
    }
  }

  async findAllAlarmList() {
    const { findAllAlarmByStatus } = this;
    return findAllAlarmByStatus(STATUS.ALARM);
  }

  async findAllNormalList() {
    const { findAllAlarmByStatus } = this;
    return findAllAlarmByStatus(STATUS.NORMAL);
  }

  async findAllAlarmByStatus(status) {
    const { app } = this;
    try {
      const data = await app.mysql.query(`SELECT * FROM electric_fence_zone_alarm WHERE status=${status}`);
      return data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = ElectricFenceZoneAlarmService;
