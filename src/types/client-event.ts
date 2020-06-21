import { TStringifyableJsonObject } from 'rxjs-broker';
import { TCandidateEvent } from './candidate-event';
import { TDescriptionEvent } from './description-event';

export type TClientEvent = TStringifyableJsonObject<{
    client: {
        id: string;
    };

    message: TCandidateEvent | TDescriptionEvent;
}>;
