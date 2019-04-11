import { Observable, Subscriber } from 'rxjs';
import { IRemoteSubject, mask } from 'rxjs-broker';
import { ICandidateEvent, ICandidateMessage, IClientEvent, IDataChannelEvent, IDescriptionEvent, IDescriptionMessage } from '../interfaces';

export const awaitDataChannel = (
    iceServers: RTCIceServer[],
    webSocketSubject: IRemoteSubject<IClientEvent['message']>
): Observable<RTCDataChannel> => {
    return new Observable((observer) => {
        const peerConnection: RTCPeerConnection = new RTCPeerConnection({ iceServers });

        const candidateChannelSubject = mask<ICandidateMessage, ICandidateEvent, IClientEvent['message']>(
            { type: 'candidate' },
            webSocketSubject
        );
        const descriptionChannelSubject = mask<IDescriptionMessage, IDescriptionEvent, IClientEvent['message']>(
            { type: 'description' },
            webSocketSubject
        );

        const candidateChannelSubscription = candidateChannelSubject
            .subscribe(({ candidate }) => peerConnection
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch(() => {
                    // Errors can be ignored.
                }));

        const descriptionChannelSubscription = descriptionChannelSubject
            .subscribe(({ description }) => {
                peerConnection
                    .setRemoteDescription(new RTCSessionDescription(description))
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
                        descriptionChannelSubject.send(<IDescriptionMessage> { description: answer });
                    })
                    .catch(() => {
                        // @todo Handle this error and maybe create another answer.
                    });
            });

        peerConnection.addEventListener('datachannel', ({ channel }: IDataChannelEvent) => {
            candidateChannelSubscription.unsubscribe();
            descriptionChannelSubscription.unsubscribe();

            const emitChannel = (bsrvr: Subscriber<RTCDataChannel>) => {
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
        });

        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate !== null) {
                // @todo Remove casting again when possible.
                candidateChannelSubject.send(<ICandidateMessage> { candidate });
            }
        });

        return () => {
            candidateChannelSubscription.unsubscribe();
            descriptionChannelSubscription.unsubscribe();

            // @todo Close the PeerConnection.
        };
    });
};
