import { Observable } from 'rxjs';
import { createDataChannelRequestingObservableFactory } from '../../../src/factories/data-channel-requesting-observable-factory';
import { spy } from 'sinon';

describe('createDataChannelRequestingObservable()', () => {

    let createDataChannelRequestingObservable;
    let webSocketSubject;

    beforeEach(() => {
        createDataChannelRequestingObservable = createDataChannelRequestingObservableFactory([ ]);

        webSocketSubject = { next: spy() };
    });

    it('should return an Observable', () => {
        expect(createDataChannelRequestingObservable(webSocketSubject)).to.be.an.instanceOf(Observable);
    });

    it('should emit an event of type request', () => {
        createDataChannelRequestingObservable(webSocketSubject);

        expect(webSocketSubject.next).to.have.been.calledOnce;
    });

});
