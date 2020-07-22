# homematic-js-xmlapi
[![NPM](https://nodei.co/npm/homematic-js-xmlapi.png)](https://nodei.co/npm/homematic-js-xmlapi/)

[![Release](https://img.shields.io/github/release/jenszech/homematic-js-xmlapi.svg)](https://github.com/hobbyquaker/XML-API/releases/latest)
[![npm version](https://badge.fury.io/js/homematic-js-xmlapi.svg)](https://badge.fury.io/js/homematic-js-xmlapi)
[![Downloads](https://img.shields.io/npm/dm/homematic-js-xmlapi.svg?maxAge=2592000)](https://www.npmjs.com/package/homematic-js-xmlapi)
[![Issues](https://img.shields.io/github/issues/jenszech/homematic-js-xmlapi.svg)](https://github.com/jzech/homematic-js-xmlapi/issues)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

A nodejs module for connecting a Homematic CCU with an installed XML-API addon.

The module addresses the XML API and provides the required interfaces and data types in JS. It is released as npm module under [homematic-js-xmlapi](https://www.npmjs.com/package/homematic-js-xmlapi)

### Interfaces currently implemented
* devicelist.cgi
* state.cgi
* statelist.cgi
* statechange.cgi
* sysvar.cgi
* sysvarlist.cgi
* version.cgi

## Usage
### Install
```
npm install homematic-js-xmlapi
```
### Basic Usage
```javascript
import { XmlApi, DeviceManager } from 'homematic-js-xmlapi';

// initialise the API Connection
const xmlApi = new XmlApi("192.168.0.10", 80);
const deviceMgr = new DeviceManager();

// get all devices 
xmlApi.getDeviceList().then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceList(deviceList);
});

// get single state value 
xmlApi.getState('1481').then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceList(deviceList);
});
```

Example of the update implementation for receiving the data without using DeviceManager
```javascript
const deviceMap:Map<string, Device> = new Map();

function updateDeviceList(deviceList: Device[]) {
    for (let device of deviceList) {
        if (deviceMap.has(device.iseId)) {
            device.updateValues(device);
        } else {
            deviceMap.set(device.iseId, device);
        }
    }
}
```
### More Examples
More examples and details in [exampe.ts](./src/example/example.ts)

You can also check my own project for detailed usage example and inspiration<b> 
https://github.com/jenszech/hm-node-runner

## Dokumentation
### Klassen
#### XmlApi
The XmlApi class provides the XML connector for the homematic xml addon. The class provides a separate function for each call, which returns a corresponding JS data object.

Constructor usage
```javascript
import {XmlApi} from "homematic-js-xmlapi";
const xmlApi = new XmlApi("1.1.1.1", 80);
```

Api functions
```javascript
import { DeviceManager } from 'homematic-js-xmlapi';

// Get XML Addon Verion
// return Promise<number | null>
xmlApi.getVersion().then((version) => {
  console.log('XML Addon version: ', version);
});

// Get all devices ...
// return Promise<Device[] | null>
xmlApi.getDeviceList().then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceList(deviceList);
});

// Get a single device state ... 
// return Promise<Device[] | null>
xmlApi.getState('1481').then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceList(deviceList);
});

// Get all device states ...
// return Promise<Device[] | null> 
xmlApi.getStateList().then((deviceList) => {
  if (deviceList) deviceMgr.updateDeviceList(deviceList);
});

// Get a single SystemVariable value ... 
// return Promise<SystemVariable[] | null>
xmlApi.getSysVar('7264').then((sysVarList) => {
  if (deviceList) deviceMgr.updateDeviceList(deviceList);
});

// Get all SystemVariable values ...
// return Promise<SystemVariable[] | null> 
xmlApi.getSysVarList().then((sysVarList) => {
  if (deviceList) deviceMgr.updateDeviceList(deviceList);
});
```
#### DeviceManager
Constructor usage
```javascript
import { DeviceManager } from 'homematic-js-xmlapi';
const devMgr = new DeviceManager();
```

Api functions
```javascript
// Add or Update a single Device
// Parameter: Device
devMgr.updateDevice(device);

// Add or Update a list of Devices
// Parameter: Device[]
devMgr.updateDeviceList(deviceList);

// Get actual count of known devices
devMgr.mapCount();
 
// Get the actual cached device with given device name
// Parameter: name: string 
// return Device | null
devMgr.getDeviceByName(name);

// Get the actual cached Channel with given Channel name
// Parameter: name: string 
// return Channel | null
devMgr.getDeviceByName(name);

// Get the actual cached Datapoint with given DataType from given Channel
// Parameter: channel : Channel
// Parameter: type : DataType 
// return Channel | null
devMgr.getValueByTyp(name);

// print a complete list of all kown devices to console 
devMgr.printDeviceList

// print a complete list of all kown devices grouped and counted by deviceType to console
devMgr.printDeviceTypes();
```
 
#### SystemVariableManager
Constructor usage
```javascript
import { SystemVariableManager } from 'homematic-js-xmlapi';
const sysMgr = new SystemVariableManager();
```

Api functions
```javascript
// Add or Update a single Variable
// Parameter: SystemVariable
sysMgr.updateDevice(sysVar);

// Add or Update a list of variables
// Parameter: SystemVariable[]
sysMgr.updateDeviceList(sysVarList);

// Get actual count of known variables
sysMgr.mapCount();
 
// Get the actual cached device with given variable name
// Parameter: name: string 
// return SystemVariable | null
sysMgr.getVariableByName(name);

// print a complete list of all kown variables to console 
sysMgr.printSysVarList();
``` 

### Data Object
The library automatically converts the XML response into different JS data objects. The following data types are provided:

```javascript
import { Device, Channel, DataPoint, SystemVariable } from 'homematic-js-xmlapi'
import { DataType, ValueType } from 'homematic-js-xmlapi'  //only if needed
```
```javascript
Device {
  name: string;
  iseId: string;
  unreach: boolean;
  stickyUnreach: boolean;
  configPending: boolean;
  address: string | null;
  deviceType: string | null;
  channel: Map<string, Channel> = new Map();
}
```
```javascript
Channel {
   name: string;
    iseId: string;
    address: string | null;
    dataPoint: Map<DataType, DataPoint> = new Map();
}
```
```javascript
DataPoint {
  name: string;
  iseId: string;
  type: DataType;
  value: string;
  valueType: ValueType;
  timestamp: Date | null;
}
```
```javascript
SystemVariable {  
  name: string;
  iseId: string;
  value: string | number | boolean | null;
  valueList: string;
  valueType: number;
  timestamp: Date | null;
}
```

## Development and build pipeline
### Release a new version
```
npm version major|minor|patch
npm publish
```

## Further documentation
Homematic XML-API CCU Addon<br>
https://github.com/jens-maus/XML-API

Step by step: Building and publishing an NPM Typescript package.<br>
https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
