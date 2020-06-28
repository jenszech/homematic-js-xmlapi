import { SystemVariable } from '../../model/SystemVariableModel';
import { ValueType } from '../../model/Enums';

const current: Date = new Date();
const currentTs: number = Math.round(current.getTime() / 1000);

const testSysVar1 = {
  _attributes: {
    name: 'Sensor.TEMPERATURE',
    ise_id: '1121',
    value: '25.100000',
    type: '4',
    value_list: '°C',
    timestamp: '' + currentTs,
  },
};

const testSysVar2 = {
  _attributes: {
    name: 'Sensor.OPEN',
    ise_id: '1122',
    value: 'true',
    type: '2',
    value_list: '',
    timestamp: '' + currentTs,
  },
};

const testSysVar3 = {
  _attributes: {
    name: 'Sensor.OPEN',
    ise_id: '1122',
    value: 'true',
    type: '0',
    value_list: '',
    timestamp: '' + currentTs,
  },
};

test('SystemVariable Constructor - Empty data', () => {
  const sysVar = new SystemVariable(null);
  expect(sysVar.name).toBe('');
  expect(sysVar.iseId).toBe('');
  expect(sysVar.valueType).toBe(ValueType.UNKOWN);
  expect(sysVar.value).toBeNull();
  expect(sysVar.timestamp).toBeNull();
});

test('SystemVariable Constructor - parse json with number', () => {
  const sysVar = new SystemVariable(testSysVar1);
  expect(sysVar.name).toBe('Sensor.TEMPERATURE');
  expect(sysVar.iseId).toBe('1121');
  expect(sysVar.valueType).toBe(ValueType.Number);
  expect(sysVar.value).toBe(25.1);
  expect(sysVar.timestamp?.getTime()).toBe(currentTs * 1000);
});

test('SystemVariable Constructor - parse json with bool', () => {
  const sysVar = new SystemVariable(testSysVar2);
  expect(sysVar.valueType).toBe(ValueType.Bool);
  expect(sysVar.value).toBe(true);
});

test('SystemVariable Constructor - parse json with unkown', () => {
  const sysVar = new SystemVariable(testSysVar3);
  expect(sysVar.valueType).toBe(ValueType.UNKOWN);
  expect(sysVar.value).toBe('true');
});

test('SystemVariable.updateValues - update value', () => {
  const sysVar = new SystemVariable(testSysVar1);
  const sysVar2 = new SystemVariable(testSysVar1);
  expect(sysVar.value).toBe(25.1);
  expect(sysVar.timestamp?.getTime()).toBe(currentTs * 1000);

  // @ts-ignore
  const date2 = new Date(sysVar2.timestamp.getTime() + 1000);
  sysVar2.value = 22.0;
  sysVar2.timestamp = date2;
  sysVar.updateValues(sysVar2);

  expect(sysVar.value).toBe(22.0);
  expect(sysVar.timestamp?.getTime()).toBe(date2.getTime());
});

test('SystemVariable.toString', () => {
  const sysVar = new SystemVariable(testSysVar1);
  sysVar.timestamp = new Date('2020-12-31T20:30:00');
  const expectStr = '1121, Sensor.TEMPERATURE, 25.1, 2020-12-31 20:30';
  expect(sysVar.toString()).toBe(expectStr);
});
