# homematic-js-xmlapi
[![Release](https://img.shields.io/github/release/jenszech/homematic-js-xmlapi.svg)](https://github.com/hobbyquaker/XML-API/releases/latest)
[![npm version](https://badge.fury.io/js/homematic-js-xmlapi.svg)](https://badge.fury.io/js/homematic-js-xmlapi)
[![Issues](https://img.shields.io/github/issues/jenszech/homematic-js-xmlapi.svg)](https://github.com/hobbyquaker/XML-API/issues)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

A nodejs module for connecting a Homematic CCU with an installed XML-API addon

The module addresses the XML API and provides the required interfaces and data types in JS.

## Install

```
npm install homematic-js-xmlapi
```
## Basic Usage
```
import { XmlApi } from "homematic-js-xmlapi"

const deviceMap:Map<string, Device> = new Map();
const xmlApi = new XmlApi("192.168.0.10", 80);

xmlApi.getDeviceList(updateCallback);
xmlApi.getState("1481", updateCallback);
```

Example of the local callback function for receiving the data
```
public updateCallback = (deviceList: Array<Device>):void => {
    for (let device of deviceList) {
        if (this.deviceMap.has(device.iseId)) {
            device.updateValues(device);
        } else {
            this.deviceMap.set(device.iseId, device);
        }
    }
}
```

### Interfaces currently implemented
* devicelist.cgi
* state.cgi

## Further documentation

Homematic XML-API CCU Addon<br>
https://github.com/jens-maus/XML-API

Step by step: Building and publishing an NPM Typescript package.<br>
https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

## License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
