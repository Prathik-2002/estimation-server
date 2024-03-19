const express = require('express');
const {estimateChargingTimeInMin} = require('./estimate');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/ChargingTime', (req, res) => {
  const connectorPower = req.query.connectorPower;
  const batteryCapacity = req.query.batteryCapacity;
  const SoC = req.query.SoC;
  try {
    const estimatedChargingTimeInMin = estimateChargingTimeInMin(
        connectorPower,
        batteryCapacity,
        SoC,
    );
    res.status(200).json({estimatedChargingTimeInMin: estimatedChargingTimeInMin});
  } catch (InputError) {
    res.status(404).json({
      error: InputError.message,
      estimatedChargingTimeInMin: 'Not Available',
    });
  }
});
const server = app.listen(PORT, ()=> {
  console.log('listening on port:', PORT);
});
module.exports = {app, server};
