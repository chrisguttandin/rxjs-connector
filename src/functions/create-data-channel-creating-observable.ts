import { Observable, filter } from 'rxjs';
import { IRemoteSubject, mask } from 'rxjs-broker';
import { TCandidateEvent, TCandidateMessage, TClientEvent, TDescriptionEvent, TDescriptionMessage, TTerminationEvent } from '../types';

export const createDataChannelCreatingObservable = (
    iceServers: RTCIceServer[],
    label: null | string,
    webSocketSubject: IRemoteSubject<TClientEvent['message']>
): Observable<RTCDataChannel> => {
    return new Observable((observer) => {
        const peerConnection = new RTCPeerConnection({ iceServers });
        const dataChannel = peerConnection.createDataChannel(label === null ? '' : label, { ordered: true });

        const candidateSubject = mask<TCandidateMessage, TCandidateEvent, TClientEvent['message']>({ type: 'candidate' }, webSocketSubject);
        const descriptionSubject = mask<TDescriptionMessage, TDescriptionEvent, TClientEvent['message']>(
            { type: 'description' },
            webSocketSubject
        );
        const termination$ = webSocketSubject.pipe(filter((event): event is TTerminationEvent => event.type === 'termination'));

        const candidateSubjectSubscription = candidateSubject.subscribe(({ candidate }) =>
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {
                // Errors can be ignored.
            })
        );

        const descriptionSubjectSubscription = descriptionSubject.subscribe(({ description }) =>
            peerConnection.setRemoteDescription(new RTCSessionDescription(description)).catch(() => {
                // @todo Handle this error and maybe request another description.
            })
        );

        const terminationSubscription = termination$.subscribe(() => {
            unsubscribe();

            observer.complete();

            peerConnection.close();
        });

        const unsubscribe = () => {
            candidateSubjectSubscription.unsubscribe();
            descriptionSubjectSubscription.unsubscribe();
            terminationSubscription.unsubscribe();
        };

        dataChannel.addEventListener('open', () => {
            unsubscribe();

            // Make sure to close the peerConnection when the DataChannel gets closed.
            dataChannel.addEventListener('close', () => peerConnection.close());

            observer.next(dataChannel);
            observer.complete();
        });

        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate !== null) {
                // @todo Remove casting again when possible.
                candidateSubject.send(<TCandidateMessage>{ candidate });
            }
        });

        peerConnection.addEventListener('negotiationneeded', () => {
            peerConnection
                .createOffer()
                .then((description) => {
                    peerConnection.setLocalDescription(description).catch(() => {
                        // @todo Handle this error and maybe create another offer.
                    });

                    // @todo Remove casting again when possible.
                    descriptionSubject.send(<TDescriptionMessage>{ description });
                })
                .catch(() => {
                    // @todo Handle this error and maybe create another offer.
                });
        });

        return () => {
            unsubscribe();

            if (dataChannel.readyState === 'connecting') {
                peerConnection.close();
            }
        };
    });
};
