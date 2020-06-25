'use strict';
import { DataPoint } from './DataPointModel';
import { DataType } from './Enums';

export class Channel {
  constructor(json: any) {
    this.name = json._attributes.name;
    this.iseId = json._attributes.ise_id;
    if (json._attributes.hasOwnProperty('address')) {
      this.address = json._attributes.address;
    }

    if (json.hasOwnProperty('datapoint')) {
      if (Array.isArray(json.datapoint)) {
        for (const dataJson of json.datapoint) {
          const dataPoint = new DataPoint(dataJson);
          this.dataPoint.set(dataPoint.type, dataPoint);
        }
      } else {
        const dataPoint = new DataPoint(json.datapoint);
        this.dataPoint.set(dataPoint.type, dataPoint);
      }
    }
  }

  name: string = '';
  iseId: string = '';
  address: string | null = null;
  dataPoint: Map<DataType, DataPoint> = new Map();

  toString(): string {
    return this.iseId + ', ' + this.name + ', ' + this.address + ', DataPoints:' + this.dataPoint.size;
  }

  updateValues(channel: Channel) {
    if (this.address === null) {
      this.address = channel.address;
    }
    for (const dataObj of channel.dataPoint.values()) {
      if (this.dataPoint.has(dataObj.type)) {
        this.dataPoint.get(dataObj.type)?.updateValues(dataObj);
      } else {
        this.dataPoint.set(dataObj.type, dataObj);
      }
    }
  }
}
module.exports = { Channel };
