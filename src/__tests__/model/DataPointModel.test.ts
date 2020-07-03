import { DataPoint } from '../../model/DataPointModel';
import { DataType, ValueType } from '../../model/Enums';

const current: Date = new Date();
const currentTs: number = Math.round(current.getTime() / 1000);

const testDataPoint1 = {
  _attributes: {
    name: 'Sensor.TEMPERATURE',
    type: 'TEMPERATURE',
    ise_id: '1121',
    value: '25.100000',
    valuetype: '4',
    valueunit: '°C',
    timestamp: '' + currentTs,
  },
};
const testDataPoint2 = {
  _attributes: {
    name: 'Sensor.CONFIG_PENDING',
    type: 'CONFIG_PENDING',
    ise_id: '1121',
    value: 'true',
    valuetype: '2',
    valueunit: '',
    timestamp: '' + currentTs,
  },
};

test('DataPoint Constructor - Empty data', () => {
  const dataPoint = new DataPoint(null);
  expect(dataPoint.name).toBe('');
  expect(dataPoint.iseId).toBe('');
  expect(dataPoint.type).toBe(DataType.UNKNOWN);
  expect(dataPoint.valueType).toBe(ValueType.UNKOWN);
  expect(dataPoint.value).toBeNull();
  expect(dataPoint.timestamp).toBeNull();
});

test('DataPoint Constructor - parse json with number', () => {
  const dataPoint = new DataPoint(testDataPoint1);
  expect(dataPoint.name).toBe('Sensor.TEMPERATURE');
  expect(dataPoint.iseId).toBe('1121');
  expect(dataPoint.type).toBe(DataType.TEMPERATURE);
  expect(dataPoint.valueType).toBe(ValueType.Number);
  expect(dataPoint.value).toBe(25.1);
  expect(dataPoint.timestamp?.getTime()).toBe(currentTs * 1000);
});

test('DataPoint Constructor - parse json with bool', () => {
  const dataPoint = new DataPoint(testDataPoint2);
  expect(dataPoint.type).toBe(DataType.CONFIG_PENDING);
  expect(dataPoint.valueType).toBe(ValueType.Bool);
  expect(dataPoint.value).toBe(true);
  expect(dataPoint.timestamp?.getTime()).toBe(currentTs * 1000);
});

test('DataPoint.updateValues - update value', () => {
  const dataPoint = new DataPoint(testDataPoint1);
  const dataPoint2 = new DataPoint(testDataPoint1);
  expect(dataPoint.value).toBe(25.1);
  expect(dataPoint.timestamp?.getTime()).toBe(currentTs * 1000);

  // @ts-ignore
  const date2 = new Date(dataPoint2.timestamp.getTime() + 1000);
  dataPoint2.value = 22.0;
  dataPoint2.timestamp = date2;
  dataPoint.updateValues(dataPoint2);

  expect(dataPoint.value).toBe(22.0);
  expect(dataPoint.timestamp?.getTime()).toBe(date2.getTime());
});

test('DataPoint.toString', () => {
  const dataPoint = new DataPoint(testDataPoint1);
  dataPoint.timestamp = new Date('2020-12-31T20:30:00');
  const expectStr = '1121, Sensor.TEMPERATURE, 28, 25.1, 2020-12-31 20:30';
  expect(dataPoint.toString()).toBe(expectStr);
});
