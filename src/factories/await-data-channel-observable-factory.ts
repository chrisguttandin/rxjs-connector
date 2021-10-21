import { Observable, filter } from 'rxjs';
import { mask } from 'rxjs-broker';
import { IDataChannelEvent } from '../interfaces';
import {
    TAwaitDataChannelObservableFactoryFactory,
    TCandidateEvent,
    TCandidateMessage,
    TClientEvent,
    TDescriptionEvent,
    TDescriptionMessage,
    TTerminationEvent
} from '../types';

export const createAwaitDataChannel: TAwaitDataChannelObservableFactoryFactory = (emitChannel) => {
    return (iceServers, webSocketSubject) => {
        return new Observable((observer) => {
            const peerConnection: RTCPeerConnection = new RTCPeerConnection({ iceServers });

            const candidateChannelSubject = mask<TCandidateMessage, TCandidateEvent, TClientEvent['message']>(
                { type: 'candidate' },
                webSocketSubject
            );
            const descriptionChannelSubject = mask<TDescriptionMessage, TDescriptionEvent, TClientEvent['message']>(
                { type: 'description' },
                webSocketSubject
            );
            const termination$ = webSocketSubject.pipe(filter((event): event is TTerminationEvent => event.type === 'termination'));

            const candidateChannelSubscription = candidateChannelSubject.subscribe(({ candidate }) =>
                peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {
                    // Errors can be ignored.
                })
            );

            const descriptionChannelSubscription = descriptionChannelSubject.subscribe(({ description }) => {
                peerConnection.setRemoteDescription(new RTCSessionDescription(description)).catch(() => {
                    // @todo Handle this error and maybe request another description.
                });

                peerConnection
                    .createAnswer()
                    .then((answer) => {
                        peerConnection.setLocalDescription(answer).catch(() => {
                            // @todo Handle this error and maybe create another description.
                        });

                        // @todo Remove casting again when possible.
                        descriptionChannelSubject.send(<TDescriptionMessage>{ description: answer });
                    })
                    .catch(() => {
                        // @todo Handle this error and maybe create another answer.
                    });
            });

            const terminationSubscription = termination$.subscribe(() => {
                unsubscribe();

                observer.complete();

                peerConnection.close();
            });

            const unsubscribe = () => {
                candidateChannelSubscription.unsubscribe();
                descriptionChannelSubscription.unsubscribe();
                terminationSubscription.unsubscribe();
            };

            peerConnection.addEventListener('datachannel', ({ channel }: IDataChannelEvent) => {
                unsubscribe();

                // @todo In Firefox the channel might have a readyState of 'connecting'. That needs to be covered by a test.
                if (channel.readyState === 'connecting') {
                    const emitChannelWhenOpen = () => {
                        channel.removeEventListener('open', emitChannelWhenOpen);

                        emitChannel(channel, observer);
                    };

                    // @todo What happens if there is no 'open' event and the channel gets closed before.
                    channel.addEventListener('open', emitChannelWhenOpen);
                } else {
                    emitChannel(channel, observer);
                }
            });

            peerConnection.addEventListener('icecandidate', ({ candidate }) => {
                if (candidate !== null) {
                    // @todo Remove casting again when possible.
                    candidateChannelSubject.send(<TCandidateMessage>{ candidate });
                }
            });

            return () => {
                unsubscribe();

                // @todo Close the PeerConnection.
            };
        });
    };
};
