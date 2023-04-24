const net = require('net');
const Modbus = require('jsmodbus');

// 创建TCP连接
const socket = new net.Socket();
const client = new Modbus.client.TCP(socket, 1);

socket.connect(503, '192.168.31.9', function () {
  client.readInputRegisters(0, 10).then(function (resp) {
    console.log(resp);
    socket.destroy();
  }).catch(function () {
    socket.destroy();
  });
});