import { Device } from '../model/DeviceModel';

const current: Date = new Date();
const testDevice1 = {
  _attributes: { name: 'Sensor', ise_id: '1111', unreach: 'false', sticky_unreach: 'true', config_pending: 'false' },
  channel: [
    {
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
    },
  ],
};

const testDevice2 = {
  _attributes: {
    name: 'Sensor',
    ise_id: '1111',
    unreach: 'false',
    sticky_unreach: 'true',
    config_pending: 'false',
    address: 'ABCD1234',
    device_type: 'ABCD',
  },
};

test('Device Constructor - Empty data', () => {
  const device = new Device(null);
  expect(device.name).toBe('');
  expect(device.iseId).toBe('');
  expect(device.unreach).toBe(false);
  expect(device.stickyUnreach).toBe(false);
  expect(device.configPending).toBe(false);
  expect(device.address).toBeNull();
  expect(device.deviceType).toBeNull();
  expect(device.channel.size).toBe(0);
});

test('Device Constructor - parse json', () => {
  const device = new Device(testDevice1);
  expect(device.name).toBe('Sensor');
  expect(device.iseId).toBe('1111');
  expect(device.unreach).toBe(false);
  expect(device.stickyUnreach).toBe(true);
  expect(device.configPending).toBe(false);
  expect(device.address).toBeNull();
  expect(device.deviceType).toBeNull();
  expect(device.channel).toBeInstanceOf(Map);
  expect(device.channel.size).toBe(1);

  const device2 = new Device(testDevice2);
  expect(device2.address).toBe('ABCD1234');
  expect(device2.deviceType).toBe('ABCD');
});

test('Device Constructor - Update Values', () => {
  const device = new Device(testDevice1);
  expect(device.address).toBeNull();
  expect(device.deviceType).toBeNull();

  const device2 = new Device(testDevice2);
  device.updateValues(device2);
  expect(device.address).toBe('ABCD1234');
  expect(device.deviceType).toBe('ABCD');
});
