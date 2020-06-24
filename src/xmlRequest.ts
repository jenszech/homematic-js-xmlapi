'use strict';
import fetch from 'node-fetch';
import convert = require('xml-js');

class XmlRequest {
  private port: number = 80;
  private host: string = '0.0.0.0';
  private url: string = '/addons/xmlapi/';

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  public get(endpoint: string): Promise<any> {
    return fetch('http://' + this.host + this.url + endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/xml')) {
          throw new TypeError('Oops, we haven`t got JSON!');
        }
        return response.text();
      })
      .then((response) => {
        return convert.xml2js(response, { compact: true });
      })
      .catch((error: Error) => {
        console.error(error); /* <-- made up logging service */
        throw error; /* <-- rethrow the error so consumer can still catch it */
      });
  }
}
export default XmlRequest;
