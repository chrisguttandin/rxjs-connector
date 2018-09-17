import { IStringifyableJsonObject, TParsedJsonValue } from 'rxjs-broker';

export interface IRequestSubjectMessage extends IStringifyableJsonObject {

    isActive?: boolean;

    label?: string;

    mask: TParsedJsonValue;

}
