import { XmlApi, Device, printDeviceList, printSysVarList } from '../xmlApi';
import { SystemVariable } from '../model/SystemVariableModel';

const deviceMap: Map<string, Device> = new Map();
const sysMap: Map<string, SystemVariable> = new Map();
const xmlApi = new XmlApi('192.168.10.5', 80);

// Call initial device list
console.log('Get all devices ... ');
xmlApi.getVersion(versionCallback);
xmlApi.getDeviceList(updateDeviceCallback);

// update devices with current values
setTimeout(timerSingleValue, 5000);
setTimeout(timerListValues, 10000);

// Print all collected devices
setTimeout(print, 15000);

function timerSingleValue() {
  console.log('Collecting current value ... ');
  xmlApi.getState('1481', updateDeviceCallback);
  xmlApi.getSysVar('7264', updateSysVarCallback);
}

function timerListValues() {
  console.log('Collecting current values ... ');
  xmlApi.getStateList(updateDeviceCallback);
  xmlApi.getSysVarList(updateSysVarCallback);
}

function print() {
  console.log('Print Devices ...');
  printDeviceList(deviceMap);

  console.log('Print Variables ...');
  printSysVarList(sysMap);
}

function updateDeviceCallback(deviceList: Device[]) {
  console.log('... UpdateList');
  for (const device of deviceList) {
    if (deviceMap.has(device.iseId)) {
      deviceMap.get(device.iseId)?.updateValues(device);
    } else {
      deviceMap.set(device.iseId, device);
    }
  }
}

function updateSysVarCallback(sysVarList: SystemVariable[]) {
  console.log('... Update SysVar List');
  for (const sysVar of sysVarList) {
    if (sysMap.has(sysVar.iseId)) {
      sysMap.get(sysVar.iseId)?.updateValues(sysVar);
    } else {
      sysMap.set(sysVar.iseId, sysVar);
    }
  }
}

function versionCallback(version: number) {
  console.log('XML Addon version: ', version);
}
