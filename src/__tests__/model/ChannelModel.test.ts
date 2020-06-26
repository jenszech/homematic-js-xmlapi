import { Channel } from '../../model/ChannelModel';

const current: Date = new Date();
const testChannel1 = {
  _attributes: { name: 'Sensor:0', ise_id: '1112' },
  datapoint: [
    {
      _attributes: {
        name: 'Sensor.TEMPERATURE',
        type: 'TEMPERATURE',
        ise_id: '1121',
        value: '25.100000',
        valuetype: '4',
        valueunit: '°C',
        timestamp: '' + Math.round(current.getTime() / 1000),
      },
    },
    {
      _attributes: {
        name: 'Sensor.HUMIDITY',
        type: 'HUMIDITY',
        ise_id: '1122',
        value: '60',
        valuetype: '16',
        valueunit: '%',
        timestamp: '' + Math.round(current.getTime() / 1000),
      },
    },
  ],
};
const testChannel2 = {
  _attributes: { name: 'Sensor:0', ise_id: '1112', address: 'ABCD5678' },
};

test('Channel Constructor - Empty data', () => {
  const channel = new Channel(null);
  expect(channel.name).toBe('');
  expect(channel.iseId).toBe('');
  expect(channel.address).toBeNull();
  expect(channel.dataPoint).toBeInstanceOf(Map);
  expect(channel.dataPoint.size).toBe(0);
});

test('Channel Constructor - parse json', () => {
  const channel = new Channel(testChannel1);
  expect(channel.name).toBe('Sensor:0');
  expect(channel.iseId).toBe('1112');
  expect(channel.address).toBeNull();
  expect(channel.dataPoint).toBeInstanceOf(Map);
  expect(channel.dataPoint.size).toBe(2);

  const channel2 = new Channel(testChannel2);
  expect(channel2.address).toBe('ABCD5678');
});

test('Device Constructor - Update Values', () => {
  const channel1 = new Channel(testChannel1);
  expect(channel1.address).toBeNull();

  const channel2 = new Channel(testChannel2);
  channel1.updateValues(channel2);
  expect(channel1.address).toBe('ABCD5678');
});
