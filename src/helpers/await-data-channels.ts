import { Observable, Subscriber } from 'rxjs';
import { IDataChannel, IMaskableSubject, TStringifyableJsonValue } from 'rxjs-broker';
import { ICandidateSubjectEvent, IDataChannelEvent, IDescriptionSubjectEvent } from '../interfaces';

export const awaitDataChannel = (
    iceServers: RTCIceServer[], webSocketSubject: IMaskableSubject<TStringifyableJsonValue>
): Observable<IDataChannel> => {
    return new Observable((observer) => {
        const peerConnection: RTCPeerConnection = new RTCPeerConnection({ iceServers });

        const candidateChannel = webSocketSubject
            .mask<ICandidateSubjectEvent>({ type: 'candidate' });

        const descriptionChannel = webSocketSubject
            .mask<IDescriptionSubjectEvent>({ type: 'description' });

        const candidateChannelSubscription = candidateChannel
            .subscribe(({ candidate }) => peerConnection
                // @todo Remove casting again when possible.
                .addIceCandidate(new RTCIceCandidate(<any> candidate))
                .catch(() => {
                    // Errors can be ignored.
                }));

        const descriptionChannelSubscription = descriptionChannel
            .subscribe(({ description }) => {
                peerConnection
                    // @todo Remove casting again when possible.
                    .setRemoteDescription(<any> new RTCSessionDescription(<any> description))
                    .catch(() => {
                        // @todo Handle this error and maybe request another description.
                    });

                peerConnection
                    .createAnswer()
                    .then((answer) => {
                        peerConnection
                            .setLocalDescription(answer)
                            .catch(() => {
                                // @todo Handle this error and maybe create another description.
                            });

                        // @todo Remove casting again when possible.
                        descriptionChannel.send(<any> { description: answer });
                    })
                    .catch(() => {
                        // @todo Handle this error and maybe create another answer.
                    });
            });

        peerConnection.addEventListener('datachannel', <EventListener> (({ channel }: IDataChannelEvent) => {
            candidateChannelSubscription.unsubscribe();
            descriptionChannelSubscription.unsubscribe();

            const emitChannel = (bsrvr: Subscriber<IDataChannel>) => {
                bsrvr.next(channel);
                bsrvr.complete();
            };

            // @todo In Firefox the channel might have a readyState of 'connecting'. That needs to be covered by a test.
            if (channel.readyState === 'connecting') {
                const emitChannelWhenOpen = () => {
                    channel.removeEventListener('open', emitChannelWhenOpen);

                    emitChannel(observer);
                };

                // @todo What happens if there is no 'open' event and the channel gets closed before.
                channel.addEventListener('open', emitChannelWhenOpen);
            } else {
                emitChannel(observer);
            }
        }));

        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate) {
                candidateChannel.send(<any> { candidate });
            }
        });

        return () => {
            candidateChannelSubscription.unsubscribe();
            descriptionChannelSubscription.unsubscribe();

            // @todo Close the PeerConnection.
        };
    });
};
