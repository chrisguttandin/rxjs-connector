import { TStringifyableJsonObject } from 'rxjs-broker';

export type TTerminationEvent = TStringifyableJsonObject<{
    message: undefined;

    type: 'termination';
}>;
