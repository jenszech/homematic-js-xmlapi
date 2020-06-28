import { XmlRequest } from '../xmlRequest';

const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);
fetch.mockResponse(JSON.stringify({ message: 'YATTA!' }));

beforeEach(() => {
  fetch.resetMocks();
});

test('XmlRequest Constructor', () => {
  const xmlApi = new XmlRequest('1.1.1.1', 80);
  expect(xmlApi.host).toBe('1.1.1.1');
  expect(xmlApi.port).toBe(80);
});

test('XmlRequest.checkContentType ', async () => {
  const xmlApi = new XmlRequest('1.1.1.1', 80);
  expect(() => {
    xmlApi.checkContentType(null);
  }).toThrow(TypeError);
  expect(() => {
    xmlApi.checkContentType('text/html');
  }).toThrow(TypeError);
  expect(xmlApi.checkContentType('text/xml')).toBe(true);
});

test('XmlRequest.get - failed fetch', async () => {
  const xmlApi = new XmlRequest('1.1.1.1', 80);
  fetch.mockReject(new Error('fake error message'));
  return xmlApi
    .get('version.cgi')
    .then((data) => {
      console.log(data);
    })
    .catch((error: Error) => {
      expect(error.message).toMatch('fake error message');
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('http://1.1.1.1/addons/xmlapi/version.cgi');
    });
});

test('XmlRequest.get - wrong response type', async () => {
  const xmlApi = new XmlRequest('1.1.1.1', 80);
  expect.assertions(3);
  return xmlApi
    .get('version.cgi')
    .then((data) => {
      console.log(data);
    })
    .catch((error: Error) => {
      expect(error.message).toMatch('Oops, we haven`t got JSON!');
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('http://1.1.1.1/addons/xmlapi/version.cgi');
    });
});

test('XmlRequest.get - Bad Request', async () => {
  const xmlApi = new XmlRequest('1.1.1.1', 80);
  fetch.mockResponseOnce(JSON.stringify({ data: 'bad data' }), { status: 400 });
  return xmlApi
    .get('version.cgi')
    .then((data) => {
      console.log(data);
    })
    .catch((error: Error) => {
      expect(error.message).toMatch('Bad Request');
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('http://1.1.1.1/addons/xmlapi/version.cgi');
    });
});

test('XmlRequest.get - Success', async () => {
  const xmlApi = new XmlRequest('1.1.1.1', 80);
  const dataJson = {
    _declaration: { _attributes: { version: '1.0', encoding: 'ISO-8859-1' } },
    version: { _text: '1.20' },
  };
  const dataXml = "<?xml version='1.0' encoding='ISO-8859-1' ?>\n<version>1.20</version>";
  const headers = new Headers({ 'Content-Type': 'text/xml' });
  const options = { headers: headers };
  fetch.mockResponseOnce(dataXml, options);
  return xmlApi
    .get('version.cgi')
    .then((data) => {
      expect(JSON.stringify(data)).toBe(JSON.stringify(dataJson));
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual('http://1.1.1.1/addons/xmlapi/version.cgi');
    })
    .catch((error: Error) => {
      console.log(error);
      fail('No Error shouled appear!');
    });
});
