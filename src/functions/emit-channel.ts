import { Subscriber } from 'rxjs';

export const emitChannel = (channel: RTCDataChannel, observer: Subscriber<RTCDataChannel>): void => {
    observer.next(channel);
    observer.complete();
};
