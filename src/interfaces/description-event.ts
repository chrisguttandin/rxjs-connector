import { IStringifyableJsonObject } from 'rxjs-broker';
import { IDescriptionMessage } from './description-message';

export interface IDescriptionEvent extends IStringifyableJsonObject {

    message: IDescriptionMessage;

    type: 'description';

}
