import { TDataChannelAcceptingObservableFactory } from './data-channel-accepting-observable-factory';

export type TDataChannelAcceptingObservableFactoryFactory = (iceServers: RTCIceServer[]) => TDataChannelAcceptingObservableFactory;
