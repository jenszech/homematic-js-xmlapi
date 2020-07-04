'use strict';

export class DeviceStatistic {
  public lastUpdateCount = 0;
  public lastUpdateTime: Date = new Date();
  public deviceCount: number = 0;
  public channelCount: number = 0;
  public datapointCount: number = 0;
}
