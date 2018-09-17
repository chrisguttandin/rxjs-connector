import { Observable } from 'rxjs';
import { IDataChannel, IMaskableSubject, TStringifyableJsonValue } from 'rxjs-broker';

export type TDataChannelsAcceptingObservableFactory = (
    webSocketSubject: IMaskableSubject<TStringifyableJsonValue>
) => Observable<IDataChannel>;
