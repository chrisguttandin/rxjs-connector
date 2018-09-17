import { TDataChannelRequestingObservableFactory } from './data-channel-requesting-observable-factory';

export type TDataChannelRequestingObservableFactoryFactory = (iceServers: RTCIceServer[]) => TDataChannelRequestingObservableFactory;
