import { Observable } from 'rxjs';
import { IDataChannel, IMaskableSubject, TStringifyableJsonValue } from 'rxjs-broker';

export type TDataChannelAcceptingObservableFactory = (
    isActive: boolean,
    label: null | string,
    webSocketSubject: IMaskableSubject<TStringifyableJsonValue>
) => Observable<IDataChannel>;
