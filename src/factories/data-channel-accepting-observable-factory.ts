import { Observable } from 'rxjs';
import { IRemoteSubject } from 'rxjs-broker';
import { createDataChannel } from '../functions/create-data-channels';
import { TClientEvent } from '../types';
import type { createAwaitDataChannel } from './await-data-channel-observable-factory';

export const createDataChannelAcceptingObservableFactory = (
    createAwaitDataChannelObservable: ReturnType<typeof createAwaitDataChannel>,
    iceServers: RTCIceServer[]
) => {
    return (
        isActive: boolean,
        label: null | string,
        webSocketSubject: IRemoteSubject<TClientEvent['message']>
    ): Observable<RTCDataChannel> => {
        if (isActive) {
            return createDataChannel(iceServers, label, webSocketSubject);
        }

        return createAwaitDataChannelObservable(iceServers, webSocketSubject);
    };
};
