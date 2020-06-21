import { mask } from 'rxjs-broker';
import { mergeMap } from 'rxjs/operators';
import { TDataChannelsAcceptingObservableFactoryFactory, TRequestEvent, TRequestMessage, TWebSocketEvent } from '../types';

export const createDataChannelsAcceptingObservableFactory: TDataChannelsAcceptingObservableFactoryFactory = (
    createDataChannelAcceptingObservable
) => {
    return (webSocketSubject) =>
        mask<TRequestMessage, TRequestEvent, TWebSocketEvent>({ type: 'request' }, webSocketSubject).pipe(
            mergeMap(({ isActive = true, label = null, mask: msk }) => {
                return createDataChannelAcceptingObservable(isActive, label, mask(msk, webSocketSubject));
            })
        );
};
