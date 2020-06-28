import { XmlApi } from '../xmlApi';
import { XmlRequest } from '../xmlRequest';

beforeEach(() => {
});

test('XmlApi Constructor', () => {
  const xmlApi = new XmlRequest('1.1.1.1', 80);
  expect(xmlApi.host).toBe('1.1.1.1');
  expect(xmlApi.port).toBe(80);
});


test('XmlApi.get - Success', async () => {
  const xmlApi = new XmlApi('1.1.1.1', 80);

  function versionCallback(version: number) {
    console.log('XML Addon version: ', version);
  }
  const dataJson = {
    _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
    version: { _text: '1.20' },
  };

  return xmlApi.getVersion(versionCallback);
});
