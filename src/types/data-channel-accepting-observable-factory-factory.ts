import { TAwaitDataChannelObservableFactory } from './await-data-channel-observable-factory';
import { TDataChannelAcceptingObservableFactory } from './data-channel-accepting-observable-factory';

export type TDataChannelAcceptingObservableFactoryFactory = (
    createAwaitDataChannelObservable: TAwaitDataChannelObservableFactory,
    iceServers: RTCIceServer[]
) => TDataChannelAcceptingObservableFactory;
