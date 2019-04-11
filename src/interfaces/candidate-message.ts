import { IStringifyableJsonObject } from 'rxjs-broker';

export interface ICandidateMessage extends IStringifyableJsonObject {

    candidate: (RTCIceCandidate | RTCIceCandidateInit) & IStringifyableJsonObject;

}
