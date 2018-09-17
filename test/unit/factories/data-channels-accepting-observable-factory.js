import { Observable } from 'rxjs';
import { createDataChannelAcceptingObservableFactory } from '../../../src/factories/data-channel-accepting-observable-factory';
import { createDataChannelsAcceptingObservableFactory } from '../../../src/factories/data-channels-accepting-observable-factory';
import { stub } from 'sinon';

describe('createDataChannelsAcceptingObservable()', () => {

    let createDataChannelsAcceptingObservable;
    let webSocketSubject;

    beforeEach(() => {
        createDataChannelsAcceptingObservable = createDataChannelsAcceptingObservableFactory(createDataChannelAcceptingObservableFactory([ ]));
        webSocketSubject = { mask: stub(), pipe: stub() };

        webSocketSubject.mask.returns(webSocketSubject);
        webSocketSubject.pipe.returns(new Observable());
    });

    it('should return an Observable', () => {
        expect(createDataChannelsAcceptingObservable(webSocketSubject)).to.be.an.instanceOf(Observable);
    });

});
