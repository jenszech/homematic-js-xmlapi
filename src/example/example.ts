import { XmlApi, Device } from '../xmlApi';

const deviceMap: Map<string, Device> = new Map();
const xmlApi = new XmlApi('192.168.10.5', 80);

// Call initial device list
console.log('Get all devices ... ');
xmlApi.getDeviceList(updateCallback);

// update devices with current values
//setTimeout(updateDeviceValue, 5000);
setTimeout(updateDeviceValues, 5000);

// Print all collected devices
setTimeout(printDeviceList, 15000);

function updateDeviceValue() {
  console.log('Collecting current values ... ');
  xmlApi.getState('1481', updateCallback);
}
function updateDeviceValues() {
  console.log('Collecting current values ... ');
  xmlApi.getStateList(updateCallback);
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

function printDeviceList() {
  for (const device of deviceMap.values()) {
    console.log(device.toString());
    for (const channel of device.channel.values()) {
      console.log('  ' + channel.toString());
      for (const dataPoint of channel.dataPoint.values()) {
        console.log('   ' + dataPoint.toString());
      }
    }
  }
}
