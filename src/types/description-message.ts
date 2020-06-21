import { IStringifyableJsonObject, TStringifyableJsonObject } from 'rxjs-broker';

export type TDescriptionMessage = TStringifyableJsonObject<{
    description: (RTCSessionDescription | RTCSessionDescriptionInit) & IStringifyableJsonObject;
}>;
