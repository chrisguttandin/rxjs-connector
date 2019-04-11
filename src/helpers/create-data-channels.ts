import { Observable } from 'rxjs';
import { IRemoteSubject, mask } from 'rxjs-broker';
import { ICandidateEvent, ICandidateMessage, IClientEvent, IDescriptionEvent, IDescriptionMessage } from '../interfaces';

export const createDataChannel = (
    iceServers: RTCIceServer[],
    label: null | string,
    webSocketSubject: IRemoteSubject<IClientEvent['message']>
): Observable<RTCDataChannel> => {
    return new Observable((observer) => {
        const peerConnection: RTCPeerConnection = new RTCPeerConnection({ iceServers });

        const dataChannel: RTCDataChannel = peerConnection.createDataChannel((label === null) ? '' : label, {
            ordered: true
        });

        const candidateSubject = mask<ICandidateMessage, ICandidateEvent, IClientEvent['message']>(
            { type: 'candidate' },
            webSocketSubject
        );
        const descriptionSubject = mask<IDescriptionMessage, IDescriptionEvent, IClientEvent['message']>(
            { type: 'description' },
            webSocketSubject
        );

        const candidateSubjectSubscription = candidateSubject
            .subscribe(({ candidate }) => peerConnection
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch(() => {
                    // Errors can be ignored.
                }));

        const descriptionSubjectSubscription = descriptionSubject
            .subscribe(({ description }) => peerConnection
                .setRemoteDescription(new RTCSessionDescription(description))
                .catch(() => {
                    // @todo Handle this error and maybe request another description.
                }));

        dataChannel.addEventListener('open', () => {
            candidateSubjectSubscription.unsubscribe();
            descriptionSubjectSubscription.unsubscribe();

            // Make sure to close the peerConnection when the DataChannel gets closed.
            dataChannel.addEventListener('close', () => peerConnection.close());

            observer.next(dataChannel);
            observer.complete();
        });

        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate !== null) {
                // @todo Remove casting again when possible.
                candidateSubject.send(<ICandidateMessage> { candidate });
            }
        });

        peerConnection.addEventListener('negotiationneeded', () => {
            peerConnection
                .createOffer()
                .then((description) => {
                    peerConnection
                        .setLocalDescription(description)
                        .catch(() => {
                            // @todo Handle this error and maybe create another offer.
                        });

                    // @todo Remove casting again when possible.
                    descriptionSubject.send(<IDescriptionMessage> { description });
                })
                .catch(() => {
                    // @todo Handle this error and maybe create another offer.
                });
        });

        return () => {
            candidateSubjectSubscription.unsubscribe();
            descriptionSubjectSubscription.unsubscribe();

            if (dataChannel.readyState === 'connecting') {
                peerConnection.close();
            }
        };
    });
};
