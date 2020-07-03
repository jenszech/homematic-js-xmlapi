'use strict';
import { Device } from './model/DeviceModel';
import { Channel } from './model/ChannelModel';
import { DataType } from './model/Enums';

export class DeviceManager {
  private deviceMap: Map<string, Device> = new Map();

  public mapCount() {
    return this.deviceMap.size;
  }

  public updateDeviceList(deviceList: Device[]) {
    if (deviceList.length > 0) {
      for (const device of deviceList) {
        this.updateDevice(device);
      }
    }
  }

  public updateDevice(device: Device) {
    if (this.deviceMap.has(device.iseId)) {
      this.deviceMap.get(device.iseId)?.updateValues(device);
    } else {
      this.deviceMap.set(device.iseId, device);
    }
  }

  public getDeviceByName(name: string): Device | null {
    for (const [, value] of this.deviceMap) {
      if (value.name === name) {
        return value;
      }
    }
    return null;
  }

  public getChannelByName(name: string): Channel | null {
    for (const [, value] of this.deviceMap) {
      for (const [, cvalue] of value.channel) {
        if (cvalue.name === name) {
          return cvalue;
        }
      }
    }
    return null;
  }

  public getValueByTyp(channel: Channel, type: DataType): string | boolean | number | null {
    for (const [, value] of channel.dataPoint) {
      if (value.type === type) {
        return value.value;
      }
    }
    return null;
  }

  public printDeviceList() {
    for (const device of this.deviceMap.values()) {
      console.log(device.toString());
      for (const channel of device.channel.values()) {
        console.log('  ' + channel.toString());
        for (const datapoint of channel.dataPoint.values()) {
          console.log('   ' + datapoint.toString());
        }
      }
    }
  }

  public printDeviceTypes() {
    const deviceTypes: Map<string, number> = new Map();
    for (const device of this.deviceMap.values()) {
      let type = device.deviceType;
      if (type === null || type === '') type = 'undefined';
      if (deviceTypes.has(type)) {
        deviceTypes.set(type, (deviceTypes.get(type) as number) + 1);
      } else {
        deviceTypes.set(type, 1);
      }
    }
    for (const [key, value] of deviceTypes) {
      console.log(value, key);
    }
  }
}
