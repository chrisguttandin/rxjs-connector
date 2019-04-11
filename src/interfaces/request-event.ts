import { IStringifyableJsonObject } from 'rxjs-broker';
import { IRequestMessage } from './request-message';

export interface IRequestEvent extends IStringifyableJsonObject {

    message: IRequestMessage;

    type: 'request';

}
