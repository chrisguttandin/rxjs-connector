import { Observable } from 'rxjs';
import { IRemoteSubject, mask } from 'rxjs-broker';
import { mergeMap } from 'rxjs/operators';
import { TRequestEvent, TRequestMessage, TWebSocketEvent } from '../types';
import type { createDataChannelAcceptingObservableFactory } from './data-channel-accepting-observable-factory';

export const createDataChannelsAcceptingObservableFactory = (
    createDataChannelAcceptingObservable: ReturnType<typeof createDataChannelAcceptingObservableFactory>
) => {
    return (webSocketSubject: IRemoteSubject<TWebSocketEvent>): Observable<RTCDataChannel> =>
        mask<TRequestMessage, TRequestEvent, TWebSocketEvent>({ type: 'request' }, webSocketSubject).pipe(
            mergeMap(({ isActive = true, label = null, mask: msk }) => {
                return createDataChannelAcceptingObservable(isActive, label, mask(msk, webSocketSubject));
            })
        );
};
