import { TStringifyableJsonObject } from 'rxjs-broker';

export type TRequestMessage = TStringifyableJsonObject<{

    isActive?: boolean;

    label?: string;

    mask: {

        client: {

            id: string;

        };

    };

}>;
