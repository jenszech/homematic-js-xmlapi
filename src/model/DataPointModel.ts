'use strict';
import { DataType, ValueType } from './Enums';

export class DataPoint {
  constructor(json: any) {
    if (json === null) return;
    this.name = json._attributes.name;
    this.iseId = json._attributes.ise_id;
    this.type = parseInt(DataType[json._attributes.type], 10);
    this.valueType = parseInt(json._attributes.valuetype, 10);
    switch (this.valueType) {
      case ValueType.Bool:
        this.value = json._attributes.value === 'true';
        break;
      case ValueType.Number:
        this.value = parseFloat(json._attributes.value);
        break;
      default:
        this.value = json._attributes.value;
    }
    this.timestamp = new Date(parseInt(json._attributes.timestamp, 10) * 1000);
  }

  name: string = '';
  iseId: string = '';
  type: DataType = DataType.UNKNOWN;
  value: string | number | boolean | null = null;
  valueType: ValueType = 0;
  timestamp: Date | null = null;

  toString(): string {
    return this.iseId + ', ' + this.name + ', ' + this.type + ', ' + this.value + ', ' + this.getNiceLastUpdatedTime();
  }

  updateValues(dataPoint: DataPoint) {
    this.value = dataPoint.value;
    this.timestamp = dataPoint.timestamp;
  }

  getNiceLastUpdatedTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    if (this.timestamp === null) return '';
    return this.timestamp.toLocaleDateString('de-DE', options);
  }
}
