import { Observable } from 'rxjs';
import { IRemoteSubject } from 'rxjs-broker';
import type { createDataChannel as createDataChannelFunction } from '../functions/create-data-channels';
import { TClientEvent } from '../types';
import type { createAwaitDataChannelObservableFactory } from './await-data-channel-observable-factory';

export const createDataChannelAcceptingObservableFactory = (
    createAwaitDataChannelObservable: ReturnType<typeof createAwaitDataChannelObservableFactory>,
    createDataChannel: typeof createDataChannelFunction,
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
