import { XmlApi, Device, printDeviceList } from '../xmlApi';

const deviceMap: Map<string, Device> = new Map();
const xmlApi = new XmlApi('192.168.10.5', 80);

// Call initial device list
console.log('Get all devices ... ');
xmlApi.getVersion(versionCallback);
xmlApi.getDeviceList(updateCallback);

// update devices with current values
// setTimeout(updateDeviceValue, 5000);
setTimeout(updateDeviceValues, 5000);

// Print all collected devices
setTimeout(print, 15000);

function updateDeviceValue() {
  console.log('Collecting current values ... ');
  xmlApi.getState('1481', updateCallback);
}

function updateDeviceValues() {
  console.log('Collecting current values ... ');
  xmlApi.getStateList(updateCallback);
}

function print() {
  printDeviceList(deviceMap);
}

function updateCallback(deviceList: Device[]) {
  console.log('... UpdateList');
  for (const device of deviceList) {
    if (deviceMap.has(device.iseId)) {
      device.updateValues(device);
    } else {
      deviceMap.set(device.iseId, device);
    }
  }
}

function versionCallback(version: number) {
  console.log('XML Addon version: ', version);
}

