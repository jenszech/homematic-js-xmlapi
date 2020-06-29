import {Device, XmlApi} from '../xmlApi';
import { getVersionObj, getStateObj } from './testData';

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

test('XmlApi.getState - Success', done => {
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
});

test('XmlApi.getVersion - Success', done  => {
  get.mockImplementationOnce(() => Promise.resolve(getVersionObj));
  xmlApi.getVersion().then((version) => {
    expect(version).toBe(1.25);
    done();
  });
});
