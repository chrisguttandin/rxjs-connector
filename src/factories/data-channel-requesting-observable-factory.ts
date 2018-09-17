import { awaitDataChannel } from '../helpers/await-data-channels';
import { TDataChannelRequestingObservableFactoryFactory } from '../types';

export const createDataChannelRequestingObservableFactory: TDataChannelRequestingObservableFactoryFactory = (iceServers) => {
    return (webSocketSubject) => {
        webSocketSubject.next({ type: 'request' });

        return awaitDataChannel(iceServers, webSocketSubject);
    };
};
