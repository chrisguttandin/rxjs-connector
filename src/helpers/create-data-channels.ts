import { Observable } from 'rxjs';
import { IDataChannel, IMaskableSubject, TStringifyableJsonValue } from 'rxjs-broker';
import {
    ICandidateSubjectEvent,
    IDescriptionSubjectEvent
} from '../interfaces';

export const createDataChannel = (
    iceServers: RTCIceServer[], label: null | string, webSocketSubject: IMaskableSubject<TStringifyableJsonValue>
): Observable<IDataChannel> => {
    return new Observable((observer) => {
        const peerConnection: RTCPeerConnection = new RTCPeerConnection({ iceServers });

        // @todo Casting peerConnection to any should not be necessary forever.
        const dataChannel: IDataChannel = (<any> peerConnection).createDataChannel(label, {
            ordered: true
        });

        const candidateSubject = webSocketSubject
            .mask<ICandidateSubjectEvent>({ type: 'candidate' });

        const descriptionSubject = webSocketSubject
            .mask<IDescriptionSubjectEvent>({ type: 'description' });

        const candidateSubjectSubscription = candidateSubject
            .subscribe(({ candidate }) => peerConnection
                // @todo Remove casting again when possible.
                .addIceCandidate(new RTCIceCandidate(<any> candidate))
                .catch(() => {
                    // Errors can be ignored.
                }));

        const descriptionSubjectSubscription = descriptionSubject
            .subscribe(({ description }) => peerConnection
                // @todo Remove casting again when possible.
                .setRemoteDescription(<any> new RTCSessionDescription(<any> description))
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
            if (candidate) {
                candidateSubject.send(<any> { candidate });
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
                    descriptionSubject.send(<any> { description });
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
