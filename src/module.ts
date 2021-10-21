import { ISubjectConfig, connect, isSupported } from 'rxjs-broker';
import { createAwaitDataChannel } from './factories/await-data-channel-observable-factory';
import { createDataChannelAcceptingObservableFactory } from './factories/data-channel-accepting-observable-factory';
import { createDataChannelsAcceptingObservableFactory } from './factories/data-channels-accepting-observable-factory';
import { emitChannel } from './helpers/emit-channel';
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
    createDataChannelAcceptingObservableFactory(createAwaitDataChannel(emitChannel), ICE_SERVERS)
);

export const accept = (url: string, subjectConfig: ISubjectConfig<TWebSocketEvent> = {}) => {
    return createDataChannelsAcceptingObservable(connect(url, subjectConfig));
};

/**
 * This property is true if the browser supports WebSockets.
 */
// @todo Do also check of RTCPeerConnection and DataChannel support.
export { isSupported };
