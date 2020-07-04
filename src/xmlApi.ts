'use strict';
import XmlRequest from './xmlRequest';
import { Device } from './model/DeviceModel';
import { SystemVariable } from './model/SystemVariableModel';

export class XmlApi extends XmlRequest {
  constructor(host: string, port: number) {
    super(host, port);
  }

  public getDeviceList(): Promise<Device[] | null> {
    return this.get('devicelist.cgi').then((data) => {
      if (data === null) return null;
      const devices = new Array<Device>();
      for (const deviceJson of data.deviceList.device) {
        devices.push(new Device(deviceJson));
      }
      return devices;
    });
  }

  public getSysVarList(): Promise<SystemVariable[] | null> {
    return this.get('sysvarlist.cgi').then((data) => {
      if (data === null) return null;
      const sysVars = new Array<SystemVariable>();
      for (const sysJson of data.systemVariables.systemVariable) {
        sysVars.push(new SystemVariable(sysJson));
      }
      return sysVars;
    });
  }

  public getSysVar(id: string): Promise<SystemVariable[] | null> {
    return this.get('sysvar.cgi?ise_id=' + id).then((data) => {
      if (data === null) return null;
      const sysVars = new Array<SystemVariable>();
      sysVars.push(new SystemVariable(data.systemVariables.systemVariable));
      return sysVars;
    });
  }

  public getStateList(): Promise<Device[] | null> {
    return this.get('statelist.cgi').then((data) => {
      if (data === null) return null;
      const devices = new Array<Device>();
      for (const deviceJson of data.stateList.device) {
        devices.push(new Device(deviceJson));
      }
      return devices;
    });
  }

  public getState(id: string): Promise<Device[] | null> {
    return this.get('state.cgi?device_id=' + id).then((data) => {
      if (data === null) return null;
      const devices = new Array<Device>();
      devices.push(new Device(data.state.device));
      return devices;
    });
  }

  public getVersion(): Promise<number | null> {
    return this.get('version.cgi').then((data) => {
      if (data === null) return null;
      const version = parseFloat(data.version._text);
      return version;
    });
  }
}

export { Device } from './model/DeviceModel';
export { Channel } from './model/ChannelModel';
export { DataPoint } from './model/DataPointModel';
export { SystemVariable } from './model/SystemVariableModel';
export { VariableStatistic } from './model/SysVarStatisticModel';
export { DeviceStatistic } from './model/DeviceStatisticModel';
export { DataType, ValueType } from './model/Enums';
export { DeviceManager } from './DeviceManager';
export { SystemVariableManager } from './SystemVariableManager';
