import { IStringifyableJsonObject } from 'rxjs-broker';

export interface IDescriptionMessage extends IStringifyableJsonObject {

    description: (RTCSessionDescription | RTCSessionDescriptionInit) & IStringifyableJsonObject;

}
