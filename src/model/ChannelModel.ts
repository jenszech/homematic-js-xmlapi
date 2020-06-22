import {DataPoint, DataType} from "./DataPointModel";

export class Channel {
    constructor(json:any) {
        this.name= json._attributes.name;
        this.ise_id = json._attributes.ise_id;
        if (json._attributes.hasOwnProperty("address")) {
            this.address = json._attributes.address;
        }

        if (json.hasOwnProperty("datapoint")) {
            for (let dataJson of json.datapoint) {
                let dataPoint = new DataPoint(dataJson);
                this.datapoint.set(dataPoint.type, dataPoint);
            }
        }
    }
    name: string = "";
    ise_id: string = "";
    address: string|null = null;
    datapoint:Map<DataType, DataPoint> = new Map();

    toString(): string {
        return this.ise_id + ", " + this.name + ", " + this.address+ ", DataPoints:"+this.datapoint.size;
    }

    updateValues(channel: Channel) {
        if (this.address === null ) {
            this.address = channel.address;
        }
        for (let dataObj of channel.datapoint.values()) {
            if (this.datapoint.has(dataObj.type)) {
                this.datapoint.get(dataObj.type)?.updateValues(dataObj);
            } else {
                this.datapoint.set(dataObj.type, dataObj);
            }
        }
    }
}