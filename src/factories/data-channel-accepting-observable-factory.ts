import { awaitDataChannel } from '../helpers/await-data-channels';
import { createDataChannel } from '../helpers/create-data-channels';
import { TDataChannelAcceptingObservableFactoryFactory } from '../types';

export const createDataChannelAcceptingObservableFactory: TDataChannelAcceptingObservableFactoryFactory = (iceServers) => {
    return (isActive, label, webSocketSubject) => {
        if (isActive) {
            return createDataChannel(iceServers, label, webSocketSubject);
        }

        return awaitDataChannel(iceServers, webSocketSubject);
    };
};
