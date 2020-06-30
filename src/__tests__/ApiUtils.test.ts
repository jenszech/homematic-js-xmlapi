import { printDeviceList, printSysVarList } from '../ApiUtils';
import { getStateListObj, getDeviceListObj, getSysVarListObj } from './__mocks__/mockData';
import { Device } from '../model/DeviceModel';
import { SystemVariable } from '../model/SystemVariableModel';

const log = jest.spyOn(console, 'log');
beforeEach(() => {
  log.mockReset();
});

test('ApiUtils.printDeviceList - Success', () => {
  log.mockImplementationOnce(jest.fn());

  const deviceMap: Map<string, Device> = new Map();
  let dev1 = new Device(getDeviceListObj.deviceList.device[0]);
  let dev2 = new Device(getDeviceListObj.deviceList.device[1]);
  let dev3 = new Device(getStateListObj.stateList.device[0]);
  let dev4 = new Device(getStateListObj.stateList.device[1]);

  expect(deviceMap.size).toBe(0);
  expect(log.mock.calls.length).toBe(0);
  deviceMap.set(dev1.iseId, dev1);
  deviceMap.set(dev2.iseId, dev2);
  deviceMap.set(dev3.iseId, dev3);
  deviceMap.set(dev4.iseId, dev4);

  printDeviceList(deviceMap);

  expect(deviceMap.size).toBe(4);
  expect(log.mock.calls.length).toBe(26);
});

test('XmlApi.printSysVarList - Success', () => {
  log.mockImplementationOnce(jest.fn());

  const sysVar: Map<string, SystemVariable> = new Map();
  let sys1 = new SystemVariable(getSysVarListObj.systemVariables.systemVariable[0]);
  let sys2 = new SystemVariable(getSysVarListObj.systemVariables.systemVariable[1]);
  let sys3 = new SystemVariable(getSysVarListObj.systemVariables.systemVariable[2]);

  expect(sysVar.size).toBe(0);
  expect(log.mock.calls.length).toBe(0);
  sysVar.set(sys1.iseId, sys1);
  sysVar.set(sys2.iseId, sys2);
  sysVar.set(sys3.iseId, sys3);

  printSysVarList(sysVar);

  expect(sysVar.size).toBe(3);
  expect(log.mock.calls.length).toBe(3);
});
