import { connect, isSupported } from 'rxjs-broker';
import { createDataChannelAcceptingObservableFactory } from './factories/data-channel-accepting-observable-factory';
import { createDataChannelsAcceptingObservableFactory } from './factories/data-channels-accepting-observable-factory';

export * from './interfaces';
export * from './types';

const ICE_SERVERS = [ {
    urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302'
    ]
} ];

const createDataChannelsAcceptingObservable = createDataChannelsAcceptingObservableFactory(
    createDataChannelAcceptingObservableFactory(ICE_SERVERS)
);

export const accept = (url: string) => createDataChannelsAcceptingObservable(connect(url));

/**
 * This property is true if the browser supports WebSockets.
 */
// @todo Do also check of RTCPeerConnection and DataChannel support.
export { isSupported };
