import { mergeMap } from 'rxjs/operators';
import { IRequestSubjectMessage } from '../interfaces';
import { TDataChannelsAcceptingObservableFactoryFactory } from '../types';

export const createDataChannelsAcceptingObservableFactory: TDataChannelsAcceptingObservableFactoryFactory = (
    createDataChannelAcceptingObservable
) => {
    return (webSocketSubject) => webSocketSubject
        .mask<IRequestSubjectMessage>({ type: 'request' })
        .pipe(
            mergeMap(({ isActive = true, label = null, mask }) => {
                return createDataChannelAcceptingObservable(isActive, label, webSocketSubject.mask(mask));
            })
        );
};
