import { getDeviceListObj, getStateListObj, getStateObj } from './__mocks__/mockData';
import { Device } from '../model/DeviceModel';
import { DeviceManager } from '../DeviceManager';
import { Channel } from '../model/ChannelModel';
import { DataType } from '../model/Enums';

const log = jest.spyOn(console, 'log');
beforeEach(() => {
  log.mockReset();
});

test('DeviceManager.mapCount - Success', () => {
  const devMgr = new DeviceManager();
  expect(devMgr.mapCount()).toBe(0);
  let dev1 = new Device(getDeviceListObj.deviceList.device[0]);
  devMgr.updateDevice(dev1);
  expect(devMgr.mapCount()).toBe(1);
  let dev2 = new Device(getDeviceListObj.deviceList.device[1]);
  devMgr.updateDevice(dev2);
  expect(devMgr.mapCount()).toBe(2);
});

test('DeviceManager.updateDevice - Add', () => {
  const devMgr = new DeviceManager();
  expect(devMgr.mapCount()).toBe(0);
  const dev1 = new Device(getDeviceListObj.deviceList.device[0]);
  devMgr.updateDevice(dev1);
  expect(devMgr.mapCount()).toBe(1);
  devMgr.updateDevice(dev1);
  expect(devMgr.mapCount()).toBe(1);
});

test('DeviceManager.updateDeviceFromList - Add', () => {
  const devMgr = new DeviceManager();
  const list = new Array<Device>();
  expect(devMgr.mapCount()).toBe(0);
  list.push(new Device(getDeviceListObj.deviceList.device[0]));
  list.push(new Device(getDeviceListObj.deviceList.device[1]));
  list.push(new Device(getStateListObj.stateList.device[0]));

  devMgr.updateDeviceList(list);
  expect(devMgr.mapCount()).toBe(3);

  devMgr.updateDeviceList(list);
  expect(devMgr.mapCount()).toBe(3);

  list.push(new Device(getStateListObj.stateList.device[1]));
  devMgr.updateDeviceList(list);
  expect(devMgr.mapCount()).toBe(4);
});

test('DeviceManager.getDeviceByName', () => {
  const devMgr = new DeviceManager();
  const list = new Array<Device>();
  expect(devMgr.mapCount()).toBe(0);

  list.push(new Device(getDeviceListObj.deviceList.device[0]));
  list.push(new Device(getDeviceListObj.deviceList.device[1]));
  list.push(new Device(getStateListObj.stateList.device[0]));
  list.push(new Device(getStateListObj.stateList.device[1]));
  devMgr.updateDeviceList(list);

  expect(devMgr.mapCount()).toBe(4);
  expect(devMgr.getDeviceByName(list[1].name)?.iseId).toBe('11753');

  expect(devMgr.getDeviceByName('NotFound')).toBeNull();
});

test('DeviceManager.getChannelByName', () => {
  const devMgr = new DeviceManager();
  const list = new Array<Device>();
  expect(devMgr.mapCount()).toBe(0);

  list.push(new Device(getDeviceListObj.deviceList.device[0]));
  list.push(new Device(getDeviceListObj.deviceList.device[1]));
  list.push(new Device(getStateListObj.stateList.device[0]));
  list.push(new Device(getStateListObj.stateList.device[1]));
  devMgr.updateDeviceList(list);

  expect(devMgr.mapCount()).toBe(4);
  expect(devMgr.getChannelByName('Sensor.EG.Kueche')?.iseId).toBe('1501');

  expect(devMgr.getChannelByName('NotFound')).toBeNull();
});

test('DeviceManager.getValueByTyp', () => {
  const devMgr = new DeviceManager();
  const list = new Array<Device>();
  expect(devMgr.mapCount()).toBe(0);

  const channel = new Channel(getStateObj.state.device.channel[0]);

  expect(devMgr.getValueByTyp(channel, DataType.LOWBAT)).toBe(false);
  expect(devMgr.getValueByTyp(channel, DataType.STICKY_UNREACH)).toBe(true);
  expect(devMgr.getValueByTyp(channel, DataType.UNKNOWN)).toBeNull();
});

test('DeviceManager.printDeviceList - Success', () => {
  log.mockImplementationOnce(jest.fn());
  const devMgr = new DeviceManager();

  const list = new Array<Device>();
  expect(devMgr.mapCount()).toBe(0);
  expect(log.mock.calls.length).toBe(0);

  list.push(new Device(getDeviceListObj.deviceList.device[0]));
  list.push(new Device(getDeviceListObj.deviceList.device[1]));
  list.push(new Device(getStateListObj.stateList.device[0]));
  list.push(new Device(getStateListObj.stateList.device[1]));
  devMgr.updateDeviceList(list);

  devMgr.printDeviceList();

  expect(devMgr.mapCount()).toBe(4);
  expect(log.mock.calls.length).toBe(26);
});

test('DeviceManager.printDeviceTypes - Success', () => {
  log.mockImplementationOnce(jest.fn());
  const devMgr = new DeviceManager();

  const list = new Array<Device>();
  expect(devMgr.mapCount()).toBe(0);
  expect(log.mock.calls.length).toBe(0);

  list.push(new Device(getDeviceListObj.deviceList.device[0]));
  list.push(new Device(getDeviceListObj.deviceList.device[1]));
  list.push(new Device(getStateListObj.stateList.device[0]));
  list.push(new Device(getStateListObj.stateList.device[1]));
  devMgr.updateDeviceList(list);

  devMgr.printDeviceTypes();

  expect(devMgr.mapCount()).toBe(4);
  expect(log.mock.calls.length).toBe(3);
});
