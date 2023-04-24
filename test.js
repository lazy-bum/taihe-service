var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();
const hostAddress = "192.168.31.9";
const hostPort = { port: 503 };

async function modbusConnect() {
  await client.connectTCP(hostAddress, hostPort)
    .then(() => {
      if (client.isOpen) {
        console.log(`IP: ${hostAddress} /PORT ${hostPort.port}`);
        pollModbusDevices(3000);
      }
    })
    .catch(err => {
      if (err.code == 'ETIMEDOUT' || err.errno == 'ECONNREFUSED') {
        if (intervalId) {
          clearInterval(intervalId);
        }
        modbusConnect();
      }
      console.log(err.message);
    });
}

function pollModbusDevices(interval = 1000) {
  intervalId = setInterval(function () {
    for (let node of nodeIds) {
      client.setID(node);
      client.readHoldingRegisters(0, 1640, function (err, data) {
        if (data) {
          // do whatever ...
        }
        if (err) {
          console.log(err.message);
          if (err.errno == 'ECONNREFUSED') {
            client.close();
            modbusConnect();
          }
        }
      });
    }
  }, interval);
}

modbusConnect()