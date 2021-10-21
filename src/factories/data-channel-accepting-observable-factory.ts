import { createDataChannel } from '../functions/create-data-channels';
import { TDataChannelAcceptingObservableFactoryFactory } from '../types';

export const createDataChannelAcceptingObservableFactory: TDataChannelAcceptingObservableFactoryFactory = (
    createAwaitDataChannelObservable,
    iceServers
) => {
    return (isActive, label, webSocketSubject) => {
        if (isActive) {
            return createDataChannel(iceServers, label, webSocketSubject);
        }

        return createAwaitDataChannelObservable(iceServers, webSocketSubject);
    };
};
