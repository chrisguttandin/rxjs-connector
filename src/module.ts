import { connect, isSupported } from 'rxjs-broker';
import { createDataChannelAcceptingObservableFactory } from './factories/data-channel-accepting-observable-factory';
import { createDataChannelsAcceptingObservableFactory } from './factories/data-channels-accepting-observable-factory';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

const ICE_SERVERS = [ {
    urls: [
        'stun:stun.l.google.com:19302',
        'stun:global.stun.twilio.com:3478?transport=udp'
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
