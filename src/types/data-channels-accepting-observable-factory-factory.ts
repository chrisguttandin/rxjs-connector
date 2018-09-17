import { TDataChannelAcceptingObservableFactory } from './data-channel-accepting-observable-factory';
import { TDataChannelsAcceptingObservableFactory } from './data-channels-accepting-observable-factory';

export type TDataChannelsAcceptingObservableFactoryFactory = (
    createDataChannelAcceptingObservable: TDataChannelAcceptingObservableFactory
) => TDataChannelsAcceptingObservableFactory;
