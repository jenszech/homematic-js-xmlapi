'use strict';
import { Channel } from './ChannelModel';

export class Device {
  constructor(json: any) {
    if (json === null) return;
    this.name = json._attributes.name;
    this.iseId = json._attributes.ise_id;
    this.unreach = json._attributes.unreach === 'true';
    this.stickyUnreach = json._attributes.sticky_unreach === 'true';
    this.configPending = json._attributes.config_pending === 'true';
    if (json._attributes.hasOwnProperty('address')) {
      this.address = json._attributes.address;
    }
    if (json._attributes.hasOwnProperty('device_type')) {
      this.deviceType = json._attributes.device_type;
    }

    if (json.hasOwnProperty('channel')) {
      if (Array.isArray(json.channel)) {
        for (const channelJson of json.channel) {
          const channel = new Channel(channelJson);
          this.channel.set(channel.iseId, channel);
        }
      } else {
        const channel = new Channel(json.channel);
        this.channel.set(channel.iseId, channel);
      }
    }
  }
  name: string = '';
  iseId: string = '';
  unreach: boolean = false;
  stickyUnreach: boolean = false;
  configPending: boolean = false;
  address: string | null = null;
  deviceType: string | null = null;
  channel: Map<string, Channel> = new Map();

  toString(): string {
    return (
      this.iseId + ', ' + this.name + ', ' + this.address + ', ' + this.deviceType + ', Channels:' + this.channel.size
    );
  }

  updateValues(device: Device) {
    this.unreach = device.unreach;
    this.stickyUnreach = device.stickyUnreach;
    this.configPending = device.configPending;
    if (this.address === null) {
      this.address = device.address;
    }
    if (this.deviceType === null) {
      this.deviceType = device.deviceType;
    }
    for (const channelObj of device.channel.values()) {
      if (this.channel.has(channelObj.iseId)) {
        this.channel.get(channelObj.iseId)?.updateValues(channelObj);
      } else {
        this.channel.set(channelObj.iseId, channelObj);
      }
    }
  }
}
