'use strict';
import fetch from 'node-fetch';
import convert = require('xml-js');

export class XmlRequest {
  public port: number = 80;
  public host: string = '0.0.0.0';
  private url: string = '/addons/xmlapi/';

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  public checkContentType(contentType: string | null): boolean {
    if (!contentType || !contentType.includes('text/xml')) {
      throw new TypeError('Oops, we haven`t got JSON!');
    }
    return true;
  }

  private fetchData(endpoint: string): Promise<any> {
    return fetch('http://' + this.host + this.url + endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        this.checkContentType(response.headers.get('content-type'));

        return response.text();
      })
      .catch((error: Error) => {
        throw error; /* <-- rethrow the error so consumer can still catch it */
      });
  }

  public get(endpoint: string): Promise<any> {
    return this.fetchData(endpoint).then((response) => {
      return convert.xml2js(response, { compact: true });
    });
  }

  public set(endpoint: string): Promise<any> {
    return this.fetchData(endpoint).then((response) => {
      return convert.xml2js(response, { compact: true });
    });
  }
}
export default XmlRequest;
