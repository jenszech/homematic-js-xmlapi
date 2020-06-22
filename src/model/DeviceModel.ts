import {Channel} from "./ChannelModel";

export class Device {
    constructor(json:any) {
        this.name= json._attributes.name;
        this.ise_id = json._attributes.ise_id;
        this.unreach = (json._attributes.unreach === "true");
        this.sticky_unreach = (json._attributes.sticky_unreach === "true");
        this.config_pending = (json._attributes.config_pending === "true");
        if (json._attributes.hasOwnProperty("address")) {
            this.address = json._attributes.address;
        }
        if (json._attributes.hasOwnProperty("device_type")) {
            this.device_type = json._attributes.device_type;
        }

        if (Array.isArray(json.channel)) {
            for (let channelJson of json.channel) {
                let channel = new Channel(channelJson);
                this.channel.set(channel.ise_id, channel);
            }
        } else {
            let channel = new Channel(json.channel);
            this.channel.set(channel.ise_id, channel);
        }
    }
    name: string = "";
    ise_id: string = "";
    unreach: boolean = false;
    sticky_unreach = false;
    config_pending = false;
    address: string|null = null;
    device_type:string|null  = null;
    channel:Map<string, Channel> = new Map();

    toString(): string {
        return this.ise_id + ", " + this.name + ", " + this.address+ ", "+ this.device_type + ", Channels:"+this.channel.size;
    }

    updateValues(device: Device) {
        this.unreach = device.unreach
        this.sticky_unreach = device.sticky_unreach
        this.config_pending = device.config_pending
        if (this.address === null ) {
            this.address = device.address;
        }
        if (this.device_type === null ) {
            this.device_type = device.device_type;
        }
        for (let channelObj of device.channel.values()) {
            if (this.channel.has(channelObj.ise_id)) {
                this.channel.get(channelObj.ise_id)?.updateValues(channelObj);
            } else {
                this.channel.set(channelObj.ise_id, channelObj);
            }
        }
    }
}