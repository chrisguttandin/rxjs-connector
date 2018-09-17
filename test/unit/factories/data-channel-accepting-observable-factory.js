import { Observable } from 'rxjs';
import { createDataChannelAcceptingObservableFactory } from '../../../src/factories/data-channel-accepting-observable-factory';

describe('createDataChannelAcceptingObservable()', () => {

    let createDataChannelAcceptingObservable;
    let webSocketSubject;

    beforeEach(() => {
        createDataChannelAcceptingObservable = createDataChannelAcceptingObservableFactory([ ]);
        webSocketSubject = { };
    });

    describe('create()', () => {

        it('should return an Observable', () => {
            expect(createDataChannelAcceptingObservable(true, 'a fake label', webSocketSubject)).to.be.an.instanceOf(Observable);
        });

    });

});
