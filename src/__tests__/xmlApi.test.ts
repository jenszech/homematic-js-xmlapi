import { DataType, Device, SystemVariable, XmlApi } from '../xmlApi';
import {
  getStateListObj,
  getStateObj,
  getVersionObj,
  getSysVarListObj,
  getSysVarObj,
  getDeviceListObj,
} from './__mocks__/mockData';

const xmlApi = new XmlApi('1.1.1.1', 80);
const get = jest.spyOn(xmlApi, 'get');
beforeEach(() => {
  get.mockReset();
});

test('XmlApi Constructor', () => {
  const xmlApi = new XmlApi('1.1.1.1', 80);
  expect(xmlApi.host).toBe('1.1.1.1');
  expect(xmlApi.port).toBe(80);
});

test('XmlApi.getDeviceList - Success', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(getDeviceListObj));
  xmlApi.getDeviceList().then((deviceList) => {
    expect(deviceList).not.toBe(null);
    if (deviceList === null) return;
    expect(deviceList.length).toBe(2);
    expect(deviceList[0].iseId).toBe('16879');
    expect(deviceList[0].deviceType).toBe('HM-CC-RT-DN');
    expect(deviceList[0].channel.size).toBe(6);
    expect(deviceList[0].channel?.get('16909')?.address).toBe('KEQ1234567:1');
    expect(deviceList[0].channel?.get('16909')?.dataPoint.size).toBe(0);
    expect(deviceList[0].channel?.get('16956')?.address).toBe('KEQ1234567:5');
    expect(deviceList[0].channel?.get('16956')?.dataPoint.size).toBe(0);
    expect(deviceList[1].iseId).toBe('11753');
    expect(deviceList[1].channel.size).toBe(1);
    expect(deviceList[1].deviceType).toBe('HM-LC-Bl1PBU-FM');
    expect(deviceList[1].channel?.get('11782')?.address).toBe('JEQ1234567:1');
    expect(deviceList[1].channel?.get('11782')?.dataPoint.size).toBe(0);
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('devicelist.cgi');
});

test('XmlApi.getDeviceList - null data', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(null));
  xmlApi.getDeviceList().then((deviceList) => {
    expect(deviceList).toBe(null);
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('devicelist.cgi');
});

test('XmlApi.getSysVar - Success', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(getSysVarObj));
  xmlApi.getSysVar('6250').then((sysList) => {
    expect(sysList).not.toBe(null);
    if (sysList === null) return;
    expect(sysList.length).toBe(1);
    expect(sysList[0].iseId).toBe('6250');
    expect(sysList[0].value).toBe(3954.6);
    expect(JSON.stringify(sysList[0])).toBe(
      JSON.stringify(new SystemVariable(getSysVarObj.systemVariables.systemVariable)),
    );
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('sysvar.cgi?ise_id=6250');
});

test('XmlApi.getSysVar - null data', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(null));
  xmlApi.getSysVar('6250').then((sysList) => {
    expect(sysList).toBe(null);
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('sysvar.cgi?ise_id=6250');
});

test('XmlApi.getSysVarList - Success', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(getSysVarListObj));
  xmlApi.getSysVarList().then((sysList) => {
    expect(sysList).not.toBe(null);
    if (sysList === null) return;
    expect(sysList.length).toBe(3);
    expect(sysList[0].iseId).toBe('13893');
    expect(sysList[1].iseId).toBe('950');
    expect(sysList[1].value).toBe(false);
    expect(sysList[2].iseId).toBe('6250');
    expect(sysList[2].value).toBe(3954.6);
    expect(JSON.stringify(sysList[2])).toBe(
      JSON.stringify(new SystemVariable(getSysVarObj.systemVariables.systemVariable)),
    );
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('sysvarlist.cgi');
});

test('XmlApi.getSysVarList - null data', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(null));
  xmlApi.getSysVarList().then((sysList) => {
    expect(sysList).toBe(null);
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('sysvarlist.cgi');
});

test('XmlApi.getStateList - Success', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(getStateListObj));
  xmlApi.getStateList().then((deviceList) => {
    expect(deviceList).not.toBe(null);
    if (deviceList === null) return;
    expect(deviceList.length).toBe(2);
    expect(deviceList[0].iseId).toBe('1481');
    expect(deviceList[1].iseId).toBe('6911');
    expect(deviceList[0].channel.size).toBe(2);
    expect(deviceList[0].channel?.get('1482')?.dataPoint.size).toBe(4);
    expect(deviceList[0].channel?.get('1501')?.dataPoint.size).toBe(2);
    expect(deviceList[1].channel?.get('6940')?.dataPoint?.get(DataType.STATE)?.value).toBe(true);
    expect(JSON.stringify(deviceList[0])).toBe(JSON.stringify(new Device(getStateObj.state.device)));
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('statelist.cgi');
});

test('XmlApi.getStateList - null data', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(null));
  xmlApi.getStateList().then((deviceList) => {
    expect(deviceList).toBe(null);
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('statelist.cgi');
});

test('XmlApi.getState - Success', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(getStateObj));
  xmlApi.getState('1481').then((deviceList) => {
    expect(deviceList).not.toBe(null);
    if (deviceList === null) return;
    expect(deviceList.length).toBe(1);
    expect(deviceList[0].iseId).toBe('1481');
    expect(deviceList[0].channel.size).toBe(2);
    expect(deviceList[0].channel?.get('1482')?.dataPoint.size).toBe(4);
    expect(deviceList[0].channel?.get('1501')?.dataPoint.size).toBe(2);
    expect(JSON.stringify(deviceList[0])).toBe(JSON.stringify(new Device(getStateObj.state.device)));
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('state.cgi?device_id=1481');
});

test('XmlApi.getState - null data', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(null));
  xmlApi.getState('1481').then((deviceList) => {
    expect(deviceList).toBe(null);
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('state.cgi?device_id=1481');
});

test('XmlApi.getVersion - Success', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(getVersionObj));
  xmlApi.getVersion().then((version) => {
    expect(version).toBe(1.25);
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('version.cgi');
});

test('XmlApi.getVersion - null data', (done) => {
  get.mockImplementationOnce(() => Promise.resolve(null));
  xmlApi.getVersion().then((version) => {
    expect(version).toBeNull();
    done();
  });
  expect(get.mock.calls.length).toBe(1);
  expect(get.mock.calls[0][0]).toBe('version.cgi');
});
