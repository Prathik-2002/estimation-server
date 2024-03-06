const express = require('express');
const {estimateChargingTime} = require('./estimate');
const app = express();
const PORT = 5050;
app.get('/ChargingTime', (req, res) => {
  const connectorPower = req.query.connectorPower;
  const batteryCapacity = req.query.batteryCapacity;
  const SoC = req.query.SoC;
  try {
    const estimatedChargingTime = estimateChargingTime(connectorPower, batteryCapacity, SoC);
    res.status(200).json({estimatedChargingTime: estimatedChargingTime});
  } catch (InputError) {
    res.status(404).j;
  }
});

const server = app.listen(PORT);
const closeServer = () => {
  server.close();
};
module.exports = {app, closeServer};
