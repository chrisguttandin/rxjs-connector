import { Observable } from 'rxjs';
import { IRemoteSubject } from 'rxjs-broker';
import { TWebSocketEvent } from './web-socket-event';

export type TDataChannelsAcceptingObservableFactory = (webSocketSubject: IRemoteSubject<TWebSocketEvent>) => Observable<RTCDataChannel>;
