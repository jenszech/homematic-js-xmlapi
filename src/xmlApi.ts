"use strict";
import XmlRequest from "./xmlRequest";
import {Device} from "./model/DeviceModel";

interface xmlResponse {
    data: string;
}

class XmlApiConnector extends XmlRequest {

    constructor(host: string, port: number) {
        super(host, port);
    }

    public getDeviceList(updateCallback:(list:Array<Device>) =>  void)  {
        this.get(
            "devicelist.cgi"
        ).then((data) => {
            if (data === null) return null;
            let devices = new Array<Device>();
            for (let deviceJson of data.deviceList.device) {
                devices.push(new Device(deviceJson));
            }
            updateCallback(devices);
        }).catch(error => {
            console.error(error);
        })
    }

    public getSysVarList() {
        const response = this.get(
            "sysvarlist.cgi"
        ).then((data) => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        })
    }

    public getSysVar(id:string) {
        const response = this.get(
            "sysvar.cgi?ise_id=" + id
        ).then((data) => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        })
    }

    public getStateList() {
        const response = this.get(
            "statelist.cgi"
        ).then((data) => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        })
    }

    public getState( id:string , updateCallback:(list:Array<Device>) =>  void) {
        this.get(
            "state.cgi?device_id=" + id
        ).then((data) => {
            if (data === null) return null;
            let devices = new Array<Device>();
            devices.push(new Device(data.state.device));
            updateCallback(devices);
        }).catch(error => {
            console.error(error);
        });
    }
}
export default XmlApiConnector;
