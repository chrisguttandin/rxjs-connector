import { IDataChannel } from 'rxjs-broker';

export interface IDataChannelEvent extends Event {

    channel: IDataChannel;

}
