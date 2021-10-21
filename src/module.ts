import { ISubjectConfig, connect, isSupported } from 'rxjs-broker';
import { createDataChannelAcceptingObservableFactory } from './factories/data-channel-accepting-observable-factory';
import { createDataChannelAwaitingObservableFactory } from './factories/data-channel-awaitting-observable-factory';
import { createDataChannelsAcceptingObservableFactory } from './factories/data-channels-accepting-observable-factory';
import { createDataChannelCreatingObservable } from './functions/create-data-channel-creating-observable';
import { emitChannel } from './functions/emit-channel';
import { TWebSocketEvent } from './types';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

const ICE_SERVERS = [
    {
        urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302']
    }
];

const createDataChannelsAcceptingObservable = createDataChannelsAcceptingObservableFactory(
    createDataChannelAcceptingObservableFactory(
        createDataChannelAwaitingObservableFactory(emitChannel),
        createDataChannelCreatingObservable,
        ICE_SERVERS
    )
);

export const accept = (url: string, subjectConfig: ISubjectConfig<TWebSocketEvent> = {}) => {
    return createDataChannelsAcceptingObservable(connect(url, subjectConfig));
};

/**
 * This property is true if the browser supports WebSockets.
 */
// @todo Do also check of RTCPeerConnection and DataChannel support.
export { isSupported };
