import { TStringifyableJsonObject } from 'rxjs-broker';
import { TDescriptionMessage } from './description-message';

export type TDescriptionEvent = TStringifyableJsonObject<{
    message: TDescriptionMessage;

    type: 'description';
}>;
