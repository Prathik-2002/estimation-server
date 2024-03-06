const request = require('supertest');
const {app, closeServer} = require('../index');
const {expect} = require('chai');

const inputToString = (input) => {
  let inputString = '';
  Object.keys(input).forEach((inputKey) => {
    inputString += inputKey + ': ' + input[inputKey] + ', ';
  });
  return inputString;
};
const PositiveTestcases = [
  {
    input: {connectorPower: 50, batteryCapacity: 100, SoC: 80},
    estimatedChargingTime: 24,
  },
  {
    input: {connectorPower: 50, batteryCapacity: 100, SoC: 100},
    estimatedChargingTime: 0,
  },
  {
    input: {connectorPower: 50, batteryCapacity: 100, SoC: 0},
    estimatedChargingTime: 120,
  },
];
const NegativeTestcase = [
  {
    input: {connectorPower: 0, batteryCapacity: 100, SoC: 80},
    message: 'Connector power can not be zero',
  },
  {
    input: {connectorPower: 40, batteryCapacity: 100, SoC: 110},
    message: 'SoC is not in range (0, 100)',
  },
  {
    input: {connectorPower: 10, batteryCapacity: 100, SoC: -10},
    message: 'SoC is not in range (0, 100)',
  },
];
describe('GET /ChargingTime', ()=>{
  after(()=>{
    closeServer();
  });
  describe('Positive testcases', ()=>{
    PositiveTestcases.forEach((positiveTestcase) => {
      it(`should give 
      [Response] - Status: 200, estimatedChargingTime: ${positiveTestcase.estimatedChargingTime}
      [input] - ${inputToString(positiveTestcase.input)}`, async () => {
        const chargingTimePositiveResponse = await request(app)
            .get('/ChargingTime')
            .query(positiveTestcase.input);

        expect(chargingTimePositiveResponse.body.estimatedChargingTime)
            .equal(positiveTestcase.estimatedChargingTime);
        expect(chargingTimePositiveResponse.status).equal(200);
      });
    });
  });
  describe('Negative testcases', ()=>{
    NegativeTestcase.forEach((negativeTestcase) => {
      it(`should return 
      [Response] - Status: 404, errormessage: ${negativeTestcase.message}
      for [input] - ${inputToString(negativeTestcase.input)}`, async () => {
        const chargingTimeNegativeResponse = await request(app)
            .get('/ChargingTime')
            .query(negativeTestcase.input);

        expect(chargingTimeNegativeResponse.body.error)
            .equal(negativeTestcase.message);
        expect(chargingTimeNegativeResponse.status).equal(404);
      });
    });
  });
});
