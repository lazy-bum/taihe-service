'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi';
  }

  async getAlarmList() {
    const { ctx, app } = this;
    const data = await app.mysql.query('SELECT * FROM electric_fence_zone_alarm WHERE status=1');
    console.log(data);
    ctx.body = {
      data,
    };
  }
}

module.exports = HomeController;
