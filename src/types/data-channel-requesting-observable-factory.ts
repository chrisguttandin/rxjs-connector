import { Observable } from 'rxjs';
import { IDataChannel, IMaskableSubject, TStringifyableJsonValue } from 'rxjs-broker';

export type TDataChannelRequestingObservableFactory = (
    webSocketSubject: IMaskableSubject<TStringifyableJsonValue>
) => Observable<IDataChannel>;
