# homematic-js-xmlapi
[![Release](https://img.shields.io/github/release/jenszech/homematic-js-xmlapi.svg)](https://github.com/hobbyquaker/XML-API/releases/latest)
[![npm version](https://badge.fury.io/js/homematic-js-xmlapi.svg)](https://badge.fury.io/js/homematic-js-xmlapi)
[![Issues](https://img.shields.io/github/issues/jenszech/homematic-js-xmlapi.svg)](https://github.com/hobbyquaker/XML-API/issues)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

A nodejs module for connecting a Homematic CCU with an installed XML-API addon.

The module addresses the XML API and provides the required interfaces and data types in JS. It is released as npm module under [homematic-js-xmlapi](https://www.npmjs.com/package/homematic-js-xmlapi)

## Install
```
npm install homematic-js-xmlapi
```
## Basic Usage
```javascript
import { XmlApi, Device } from 'homematic-js-xmlapi';

// initialise the API Connection
const xmlApi = new XmlApi("192.168.0.10", 80);

// get all devices 
xmlApi.getDeviceList(updateCallback);

// get single state value 
xmlApi.getState("1481", updateCallback);
```

Example of the local callback function for receiving the data
```javascript
const deviceMap:Map<string, Device> = new Map();

function updateCallback(deviceList: Device[]) {
    for (let device of deviceList) {
        if (deviceMap.has(device.iseId)) {
            device.updateValues(device);
        } else {
            deviceMap.set(device.iseId, device);
        }
    }
}
```
More examples and details in [exampe.ts](./src/example/example.ts)

### Interfaces currently implemented
* devicelist.cgi
* state.cgi
* statelist.cgi
* sysvar.cgi
* sysvarlist.cgi
* version.cgi

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
