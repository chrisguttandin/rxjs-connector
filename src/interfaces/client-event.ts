import { IStringifyableJsonObject } from 'rxjs-broker';
import { ICandidateEvent } from './candidate-event';
import { IDescriptionEvent } from './description-event';

export interface IClientEvent extends IStringifyableJsonObject {

    client: {

        id: string;

    };

    message: ICandidateEvent | IDescriptionEvent;

}
