import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { createDataChannelAcceptingObservableFactory } from '../../../src/factories/data-channel-accepting-observable-factory';
import { createDataChannelsAcceptingObservableFactory } from '../../../src/factories/data-channels-accepting-observable-factory';
import { stub } from 'sinon';

describe('createDataChannelsAcceptingObservable()', () => {

    let createDataChannelsAcceptingObservable;
    let webSocketSubject;

    beforeEach(() => {
        createDataChannelsAcceptingObservable = createDataChannelsAcceptingObservableFactory(createDataChannelAcceptingObservableFactory([ ]));
        webSocketSubject = { pipe: stub() };

        webSocketSubject.pipe.returns(new Observable());
    });

    it('should return an AnonymousSubject', () => {
        expect(createDataChannelsAcceptingObservable(webSocketSubject)).to.be.an.instanceOf(AnonymousSubject);
    });

});
