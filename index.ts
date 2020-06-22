import XmlApiConnector from "./src/xmlApi";
import {Device} from "./src/model/DeviceModel";

const argv = require('minimist')(process.argv.slice(2));
// // Check whether host is set via cli arguments or environment
const host = argv.host || process.env.HOST || '0.0.0.0'
// Check whether port is set via cli arguments or environment
const port = argv.port || process.env.PORT || 80;


const deviceMap:Map<string, Device> = new Map();
const xmlApi = new XmlApiConnector(host, port);

//Call initial device list
console.log("Get all devices ... ");
xmlApi.getDeviceList(updateCallback);

//update devices with current values
setTimeout(updateDevices, 5000);

//Print all collected devices
setTimeout(printDeviceList, 15000);

function updateDevices () {
    console.log("Collecting current values ... ");
    xmlApi.getState("1481", updateCallback);
}

function updateCallback(deviceList: Array<Device>) {
    console.log("... UpdateList")
    for (let device of deviceList) {
        if (deviceMap.has(device.ise_id)) {
            device.updateValues(device);
        } else {
            deviceMap.set(device.ise_id, device);
        }
    }
}

function printDeviceList() {
    for (let device of deviceMap.values()) {
        console.log(device.toString());
        for (let channel of device.channel.values()) {
            console.log("  " + channel.toString());
            for (let datapoint of channel.datapoint.values()) {
                console.log("   " + datapoint.toString());
            }
        }
    }
}
