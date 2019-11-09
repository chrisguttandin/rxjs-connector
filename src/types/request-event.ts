import { TStringifyableJsonObject } from 'rxjs-broker';
import { TRequestMessage } from './request-message';

export type TRequestEvent = TStringifyableJsonObject<{

    message: TRequestMessage;

    type: 'request';

}>;
