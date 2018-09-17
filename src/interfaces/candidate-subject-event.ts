import { IStringifyableJsonObject } from 'rxjs-broker';

// @todo Remove this redundant declaration when possible.
export interface RTCIceCandidate { // tslint:disable-line:interface-name
    toJSON (): any;
}

export interface ICandidateSubjectEvent extends IStringifyableJsonObject {

    candidate: RTCIceCandidate | {

        candidate: string;

        sdpMid: null | string;

        sdpMLineIndex: null | number;

        ufrag: string;

    };

}
