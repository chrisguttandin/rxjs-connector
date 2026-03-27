import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs';
import { createDataChannelsAcceptingObservableFactory } from '../../../src/factories/data-channels-accepting-observable-factory';

describe('createDataChannelsAcceptingObservable()', () => {
    let createDataChannelsAcceptingObservable;
    let webSocketSubject;

    beforeEach(() => {
        createDataChannelsAcceptingObservable = createDataChannelsAcceptingObservableFactory(() => {});
        webSocketSubject = { pipe: vi.fn() };

        webSocketSubject.pipe.mockReturnValue(new Observable());
    });

    it('should return an AnonymousSubject', () => {
        expect(createDataChannelsAcceptingObservable(webSocketSubject)).to.be.an.instanceOf(AnonymousSubject);
    });
});
