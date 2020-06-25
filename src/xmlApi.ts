'use strict';
import XmlRequest from './xmlRequest';
import { Device } from './model/DeviceModel';

export class XmlApi extends XmlRequest {
  constructor(host: string, port: number) {
    super(host, port);
  }

  public getDeviceList(updateCallback: (list: Device[]) => void) {
    if (updateCallback === null) return;
    this.get('devicelist.cgi')
      .then((data) => {
        if (data === null) return null;
        const devices = new Array<Device>();
        for (const deviceJson of data.deviceList.device) {
          devices.push(new Device(deviceJson));
        }
        updateCallback(devices);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public getSysVarList() {
    const response = this.get('sysvarlist.cgi').then((data) => {
      console.log(data);
    });
  }

  public getSysVar(id: string) {
    this.get('sysvar.cgi?ise_id=' + id).then((data) => {
      console.log(data);
    });
  }

  public getStateList(updateCallback: (list: Device[]) => void) {
    if (updateCallback === null) return;
    this.get('statelist.cgi').then((data) => {
      if (data === null) return null;
      const devices = new Array<Device>();
      for (const deviceJson of data.stateList.device) {
        devices.push(new Device(deviceJson));
      }
      updateCallback(devices);
    });
  }

  public getState(id: string, updateCallback: (list: Device[]) => void) {
    if (updateCallback === null) return;
    this.get('state.cgi?device_id=' + id).then((data) => {
      if (data === null) return null;
      const devices = new Array<Device>();
      devices.push(new Device(data.state.device));
      updateCallback(devices);
    });
  }

  public getVersion(updateCallback: (version: number) => void) {
    if (updateCallback === null) return;
    this.get('version.cgi').then((data) => {
      if (data === null) return null;
      const version = parseFloat(data.version._text);
      updateCallback(version);
    });
  }
}

export { printDeviceList } from './ApiUtils';
export { Device } from './model/DeviceModel';
export { Channel } from './model/ChannelModel';
export { DataPoint, DataType, ValueType } from './model/DataPointModel';
