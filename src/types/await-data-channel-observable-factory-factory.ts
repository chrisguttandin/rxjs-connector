import { Subscriber } from 'rxjs';
import { TAwaitDataChannelObservableFactory } from './await-data-channel-observable-factory';

export type TAwaitDataChannelObservableFactoryFactory = (
    emitDataChannel: (channel: RTCDataChannel, observer: Subscriber<RTCDataChannel>) => void
) => TAwaitDataChannelObservableFactory;
