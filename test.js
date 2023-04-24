var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

client.connectTCP("192.168.31.9", { port: 503 });

setInterval(function () {
  client.readHoldingRegisters(22, 10, function (err, data) {
    // 获取当前时间
    //moment.locale('zh-cn');
    console.log("----------------------------------------------------------------------");
    console.log(data?.data);
    console.log("----------------------------------------------------------------------");

    //console.log(data.data);
  });
}, 5000);