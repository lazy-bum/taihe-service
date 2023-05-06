const Service = require('egg').Service;

class ElectricFenceZoneAlarmService extends Service {
  async findAllList() {
    const { app } = this;
    try {
      const data = await app.mysql.query('SELECT * FROM detail_ss_llj_rlj');
      return data || [];
    } catch (error) {
      return [];
    }
  }

  // 获取某一天的所有数据
  async findAllListByTime(time = '') {
    const { app } = this;
    try {
      const data = await app.mysql.query(`SELECT * FROM detail_ss_llj_rlj WHERE time='${time}'`);
      return data || [];
    } catch (error) {
      return [];
    }
  }

  // 获取某天之前的数据
  async findBeforeTimeData(time = '') {
    const { app, ctx } = this;

    try {
      const data = await app.mysql.query(`SELECT * FROM detail_ss_llj_rlj WHERE time>'${time}'`);
      return ctx.helper.mergeDataByTime(data || []) || {};
    } catch (error) {
      return {};
    }
  }
}

module.exports = ElectricFenceZoneAlarmService;
