'use strict';

export enum ValueType {
  Unkown = 0,
  Bool = 2,
  Number = 4,
  Unkown1 = 8,
  Unkown2 = 16,
}

export enum DataType {
  UNREACH = 0,
  UNKNOWN,
  STICKY_UNREACH,
  CONFIG_PENDING,
  LOWBAT,
  CONTROL_MODE,
  FAULT_REPORTING,
  BATTERY_STATE,
  VALVE_STATE,
  ACTUAL_TEMPERATURE,
  SET_TEMPERATURE,
  TEMPERATURE,
  HUMIDITY,
  AUTO_MODE,
  MANU_MODE,
  BOOST_MODE,
  COMFORT_MODE,
  LOWERING_MODE,
  BOOST_STATE,
  PARTY_MODE_SUBMIT,
  PARTY_TEMPERATURE,
  PARTY_START_TIME,
  PARTY_START_DAY,
  PARTY_START_MONTH,
  PARTY_START_YEAR,
  PARTY_STOP_TIME,
  PARTY_STOP_DAY,
  PARTY_STOP_MONTH,
  PARTY_STOP_YEAR,
}

export class DataPoint {
  constructor(json: any) {
    this.name = json._attributes.name;
    this.iseId = json._attributes.iseId;
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
    return this.iseId + ', ' + this.name + ', ' + this.type + ', ' + this.value + ', ' + this.timestamp;
  }

  updateValues(dataPoint: DataPoint) {
    this.value = dataPoint.value;
    this.timestamp = dataPoint.timestamp;
  }
}
