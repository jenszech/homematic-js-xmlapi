import { XmlApi, Device } from '../xmlApi';

const deviceMap: Map<string, Device> = new Map();
// initialise the API Connection
const xmlApi = new XmlApi('192.168.0.10', 80);

xmlApi.getDeviceList(updateCallback);
xmlApi.getState('1481', updateCallback);

// Example of the local callback function for receiving the data
function updateCallback(deviceList: Device[]) {
  for (const device of deviceList) {
    if (deviceMap.has(device.iseId)) {
      device.updateValues(device);
    } else {
      deviceMap.set(device.iseId, device);
    }
  }
}
