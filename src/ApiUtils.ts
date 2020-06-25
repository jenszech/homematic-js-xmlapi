import { Device } from './xmlApi';

export function printDeviceList(deviceMap: Map<string, Device>) {
  for (const device of deviceMap.values()) {
    console.log(device.toString());
    for (const channel of device.channel.values()) {
      console.log('  ' + channel.toString());
      for (const dataPoint of channel.dataPoint.values()) {
        console.log('   ' + dataPoint.toString());
      }
    }
  }
}