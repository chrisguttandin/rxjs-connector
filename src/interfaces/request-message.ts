import { IStringifyableJsonObject } from 'rxjs-broker';

export interface IRequestMessage extends IStringifyableJsonObject {

    isActive?: boolean;

    label?: string;

    mask: {

        client: {

            id: string;

        };

    };

}
