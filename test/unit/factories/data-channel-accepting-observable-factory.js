import { createDataChannelAcceptingObservableFactory } from '../../../src/factories/data-channel-accepting-observable-factory';
import { stub } from 'sinon';

describe('createDataChannelAcceptingObservable()', () => {
    let createDataChannelAwaitingObservable;
    let createDataChannelAcceptingObservable;
    let createDataChannelCreatingObservable;
    let dataChannelAwaitingObservable;
    let dataChannelCreatingObservable;
    let iceServers;
    let webSocketSubject;

    beforeEach(() => {
        createDataChannelAwaitingObservable = stub();
        createDataChannelCreatingObservable = stub();
        dataChannelAwaitingObservable = 'a fake observable to await data channels';
        dataChannelCreatingObservable = 'a fake observable to create data channels';
        iceServers = ['a', 'fake', 'array', 'of', 'ice', 'servers'];
        webSocketSubject = 'a fake subject';

        createDataChannelAcceptingObservable = createDataChannelAcceptingObservableFactory(
            createDataChannelAwaitingObservable,
            createDataChannelCreatingObservable,
            iceServers
        );

        createDataChannelAwaitingObservable.returns(dataChannelAwaitingObservable);
        createDataChannelCreatingObservable.returns(dataChannelCreatingObservable);
    });

    describe('with the isActive flag set to true', () => {
        let isActive;
        let label;

        beforeEach(() => {
            isActive = true;
            label = 'a fake label';
        });

        it('should call createDataChannelCreatingObservable()', () => {
            createDataChannelAcceptingObservable(isActive, label, webSocketSubject);

            expect(createDataChannelCreatingObservable).to.be.calledOnceWithExactly(iceServers, label, webSocketSubject);
        });

        it('should not call createDataChannelAwaitingObservable()', () => {
            createDataChannelAcceptingObservable(isActive, label, webSocketSubject);

            expect(createDataChannelAwaitingObservable).to.have.not.been.called;
        });

        it('should return the return value of createDataChannelCreatingObservable()', () => {
            expect(createDataChannelAcceptingObservable(isActive, label, webSocketSubject)).to.equal(dataChannelCreatingObservable);
        });
    });

    describe('with the isActive flag set to false', () => {
        let isActive;

        beforeEach(() => (isActive = false));

        it('should call createDataChannelAwaitingObservable()', () => {
            createDataChannelAcceptingObservable(isActive, null, webSocketSubject);

            expect(createDataChannelAwaitingObservable).to.be.calledOnceWithExactly(iceServers, webSocketSubject);
        });

        it('should not call createDataChannelCreatingObservable()', () => {
            createDataChannelAcceptingObservable(isActive, null, webSocketSubject);

            expect(createDataChannelCreatingObservable).to.have.not.been.called;
        });

        it('should return the return value of createDataChannelAwaitingObservable()', () => {
            expect(createDataChannelAcceptingObservable(isActive, null, webSocketSubject)).to.equal(dataChannelAwaitingObservable);
        });
    });
});
