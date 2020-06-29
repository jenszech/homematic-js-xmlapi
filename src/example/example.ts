import { XmlApi, Device, printDeviceList, printSysVarList } from '../xmlApi';
import { SystemVariable } from '../model/SystemVariableModel';

const deviceMap: Map<string, Device> = new Map();
const sysMap: Map<string, SystemVariable> = new Map();
const xmlApi = new XmlApi('192.168.10.5', 80);

// Call initial device list
console.log('Get XML Addon Verion ... ');
xmlApi.getVersion().then((version) => {
  console.log('XML Addon version: ', version);
});

console.log('Get all devices ... ');
xmlApi.getDeviceList().then((deviceList) => {
  if (deviceList) updateDeviceMap(deviceList);
});

console.log('Get device values ... ');
xmlApi.getState('1481').then((deviceList) => {
  if (deviceList) updateDeviceMap(deviceList);
});

xmlApi.getStateList().then((deviceList) => {
  if (deviceList) updateDeviceMap(deviceList);
});

console.log('Get SystemVariable values ... ');
xmlApi.getSysVar('7264').then((sysVarList) => {
  if (sysVarList) updateSysVarList(sysVarList);
});

xmlApi.getSysVarList().then((sysVarList) => {
  if (sysVarList) updateSysVarList(sysVarList);
});

// Print all collected devices
setTimeout(print, 10000);

// Helper Functions ------------------------------------
function print() {
  console.log('Print Devices ...');
  printDeviceList(deviceMap);

  console.log('Print Variables ...');
  printSysVarList(sysMap);
}

function updateDeviceMap(deviceList: Device[]) {
  console.log('... UpdateList with ' + deviceList.length + ' values');
  for (const device of deviceList) {
    if (deviceMap.has(device.iseId)) {
      deviceMap.get(device.iseId)?.updateValues(device);
    } else {
      deviceMap.set(device.iseId, device);
    }
  }
}

function updateSysVarList(sysVarList: SystemVariable[]) {
  console.log('... Update SysVarList with ' + sysVarList.length + ' values');
  for (const sysVar of sysVarList) {
    if (sysMap.has(sysVar.iseId)) {
      sysMap.get(sysVar.iseId)?.updateValues(sysVar);
    } else {
      sysMap.set(sysVar.iseId, sysVar);
    }
  }
}
