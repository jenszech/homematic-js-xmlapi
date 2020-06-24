import { Device } from '../model/DeviceModel';

test('Device Constructor', () => {
  const device = new Device(null);
  expect(device.name).toBe('');
});
