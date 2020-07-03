import { XmlApi } from '../xmlApi';

import { DeviceManager } from '../DeviceManager';
import { SystemVariableManager } from '../SystemVariableManager';

const xmlApi = new XmlApi('192.168.10.5', 80);
const deviceMgr = new DeviceManager();
const sysMgr = new SystemVariableManager();

// Call initial device list
console.log('Get XML Addon Verion ... ');
xmlApi.getVersion().then((version) => {
  console.log('XML Addon version: ', version);
});

console.log('Get all devices ... ');
xmlApi.getDeviceList().then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceMap(deviceList);
});

console.log('Get device values ... ');
xmlApi.getState('1481').then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceMap(deviceList);
});

xmlApi.getStateList().then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceMap(deviceList);
});

console.log('Get SystemVariable values ... ');
xmlApi.getSysVar('7264').then((sysVarList) => {
  if (sysVarList) sysMgr.updateSysVarList(sysVarList);
});

xmlApi.getSysVarList().then((sysVarList) => {
  if (sysVarList) sysMgr.updateSysVarList(sysVarList);
});

// Print all collected devices
setTimeout(print, 10000);

// Helper Functions ------------------------------------
function print() {
  console.log('Print Devices ...');
  deviceMgr.printDeviceList();

  console.log('Print Variables ...');
  sysMgr.printSysVarList();
}
