import { IStringifyableJsonObject } from 'rxjs-broker';
import { ICandidateMessage } from './candidate-message';

export interface ICandidateEvent extends IStringifyableJsonObject {

    message: ICandidateMessage;

    type: 'candidate';

}
