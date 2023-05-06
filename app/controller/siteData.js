'use strict';

const { Controller } = require('egg');

class SiteDataController extends Controller {
  async getPressureAndTemperatureList() {
    const { ctx, service } = this;
    const [ pressure, temperature ] = await Promise.all([ service.detailSsYb.findLast10List(), service.detailSsWb.findLast10List() ]);
    ctx.body = {
      data: {
        temperature: ctx.helper.transformArray(temperature),
        pressure: ctx.helper.transformArray(pressure),
      },
    };
  }
}

module.exports = SiteDataController;
