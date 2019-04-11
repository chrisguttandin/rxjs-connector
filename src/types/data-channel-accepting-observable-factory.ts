import { Observable } from 'rxjs';
import { IRemoteSubject } from 'rxjs-broker';
import { IClientEvent } from '../interfaces';

export type TDataChannelAcceptingObservableFactory = (
    isActive: boolean,
    label: null | string,
    webSocketSubject: IRemoteSubject<IClientEvent['message']>
) => Observable<RTCDataChannel>;
