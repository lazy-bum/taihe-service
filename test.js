// 引入 modbus-serial 包
const ModbusRTU = require("modbus-serial");

// 创建一个新的 Modbus 客户端实例
const client = new ModbusRTU();

// 配置串行端口
const serialPort = "/dev/ttyUSB0"; // 串行端口，根据实际情况修改
const serialOptions = {
  baudRate: 9600, // 波特率
  dataBits: 8, // 数据位
  stopBits: 1, // 停止位
  parity: "none" // 奇偶校验
};

// 打开串行端口并连接 Modbus 设备
client.connectRTUBuffered(serialPort, serialOptions).then(() => {
  // 设置设备地址
  client.setID(1);

  // 读取保持寄存器，从寄存器地址 0 开始，读取 10 个寄存器
  client.readHoldingRegisters(0, 10).then(data => {
    console.log("保持寄存器的数据：", data.data);
  }).catch(error => {
    console.error("读取保持寄存器失败：", error);
  });
}).catch(error => {
  console.error("连接 Modbus 设备失败：", error);
});