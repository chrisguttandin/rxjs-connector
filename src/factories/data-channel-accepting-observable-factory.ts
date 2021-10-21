import { Observable } from 'rxjs';
import { IRemoteSubject } from 'rxjs-broker';
import type { createDataChannelCreatingObservable as createDataChannelCreatingObservableFunction } from '../functions/create-data-channel-creating-observable';
import { TClientEvent } from '../types';
import type { createDataChannelAwaitingObservableFactory } from './data-channel-awaitting-observable-factory';

export const createDataChannelAcceptingObservableFactory = (
    createDataChannelAwaitingObservable: ReturnType<typeof createDataChannelAwaitingObservableFactory>,
    createDataChannelCreatingObservable: typeof createDataChannelCreatingObservableFunction,
    iceServers: RTCIceServer[]
) => {
    return (
        isActive: boolean,
        label: null | string,
        webSocketSubject: IRemoteSubject<TClientEvent['message']>
    ): Observable<RTCDataChannel> => {
        if (isActive) {
            return createDataChannelCreatingObservable(iceServers, label, webSocketSubject);
        }

        return createDataChannelAwaitingObservable(iceServers, webSocketSubject);
    };
};
