'use strict';
import { ValueType } from './Enums';

export class SystemVariable {
  constructor(json: any) {
    if (json === null) return;
    this.iseId = json._attributes.ise_id;
    this.name = json._attributes.name;
    this.valueList = json._attributes.value_list;
    this.timestamp = new Date(parseInt(json._attributes.timestamp, 10) * 1000);
    this.valueType = parseInt(json._attributes.type, 10);
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
  }
  name: string = '';
  iseId: string = '';
  value: string | number | boolean | null = null;
  valueList: string = '';
  valueType: number = 0;
  timestamp: Date | null = null;

  toString(): string {
    return this.iseId + ', ' + this.name + ', ' + this.value + ', ' + this.getNiceLastUpdatedTime();
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

  updateValues(sysVar: SystemVariable) {
    this.value = sysVar.value;
    this.timestamp = sysVar.timestamp;
  }
}
