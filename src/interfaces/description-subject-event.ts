import { IStringifyableJsonObject } from 'rxjs-broker';

// @todo Remove this redundant declaration when possible.
export interface RTCSessionDescription { // tslint:disable-line:interface-name
    toJSON (): any;
}

export interface IDescriptionSubjectEvent extends IStringifyableJsonObject {

    description: RTCSessionDescription | {

        sdp: string | null;

        type: string;

    };

}
