import { Observable } from 'rxjs';
import { IRemoteSubject } from 'rxjs-broker';
import { TClientEvent } from './client-event';

export type TAwaitDataChannelObservableFactory = (
    iceServers: RTCIceServer[],
    webSocketSubject: IRemoteSubject<TClientEvent['message']>
) => Observable<RTCDataChannel>;
