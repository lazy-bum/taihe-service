const Service = require('egg').Service;

class DetailSsWbService extends Service {
  async findLast10List() {
    const { app } = this;
    try {
      const data = await app.mysql.query('SELECT * FROM detail_ss_wb ORDER BY time desc limit 0,9');
      return data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

module.exports = DetailSsWbService;
