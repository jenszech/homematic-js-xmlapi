'use strict';
import XmlRequest from './xmlRequest';
import { Device } from './model/DeviceModel';
import { SystemVariable } from './model/SystemVariableModel';

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

  public getSysVarList(updateCallback: (list: SystemVariable[]) => void) {
    if (updateCallback === null) return;
    this.get('sysvarlist.cgi').then((data) => {
      if (data === null) return null;
      const sysVars = new Array<SystemVariable>();
      for (const sysJson of data.systemVariables.systemVariable) {
        sysVars.push(new SystemVariable(sysJson));
      }
      updateCallback(sysVars);
    });
  }

  public getSysVar(id: string, updateCallback: (list: SystemVariable[]) => void) {
    if (updateCallback === null) return;
    this.get('sysvar.cgi?ise_id=' + id).then((data) => {
      if (data === null) return null;
      const sysVars = new Array<SystemVariable>();
      sysVars.push(new SystemVariable(data.systemVariables.systemVariable));
      updateCallback(sysVars);
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

export { printDeviceList, printSysVarList } from './ApiUtils';
export { Device } from './model/DeviceModel';
export { Channel } from './model/ChannelModel';
export { DataPoint } from './model/DataPointModel';
export { SystemVariable } from './model/SystemVariableModel';
export { DataType, ValueType } from './model/Enums';
