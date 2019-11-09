import { Observable } from 'rxjs';
import { IRemoteSubject } from 'rxjs-broker';
import { TClientEvent } from './client-event';

export type TDataChannelAcceptingObservableFactory = (
    isActive: boolean,
    label: null | string,
    webSocketSubject: IRemoteSubject<TClientEvent['message']>
) => Observable<RTCDataChannel>;
