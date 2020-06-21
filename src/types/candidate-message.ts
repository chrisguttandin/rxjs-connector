import { IStringifyableJsonObject, TStringifyableJsonObject } from 'rxjs-broker';

export type TCandidateMessage = TStringifyableJsonObject<{
    candidate: (RTCIceCandidate | RTCIceCandidateInit) & IStringifyableJsonObject;
}>;
