import { mask } from 'rxjs-broker';
import { mergeMap } from 'rxjs/operators';
import { IRequestEvent, IRequestMessage } from '../interfaces';
import { TDataChannelsAcceptingObservableFactoryFactory, TWebSocketEvent } from '../types';

export const createDataChannelsAcceptingObservableFactory: TDataChannelsAcceptingObservableFactoryFactory = (
    createDataChannelAcceptingObservable
) => {
    return (webSocketSubject) => mask<IRequestMessage, IRequestEvent, TWebSocketEvent>({ type: 'request' }, webSocketSubject)
        .pipe(
            mergeMap(({ isActive = true, label = null, mask: msk }) => {
                return createDataChannelAcceptingObservable(isActive, label, mask(msk, webSocketSubject));
            })
        );
};
