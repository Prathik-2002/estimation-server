const isValidSoC = (SoC) => {
  return (SoC >= 0 && SoC <= 100);
};
const estimateChargingTimeInMin = (connectorPower, batteryCapacity, SoC) => {
  if (!isValidSoC(SoC)) {
    throw new Error('SoC is not in range (0, 100)');
  }
  if (connectorPower == 0 ) {
    throw new Error('Connector power can not be zero');
  }
  const energyRequiredToFullyChargeBattery = batteryCapacity * ((100 - SoC) / 100);
  const timeRequiredToChargeBatteryInHours = energyRequiredToFullyChargeBattery / connectorPower;
  const timeRequiredToChargeBatteryInMinutes = timeRequiredToChargeBatteryInHours * 60;
  return timeRequiredToChargeBatteryInMinutes;
};

module.exports = {estimateChargingTimeInMin};
