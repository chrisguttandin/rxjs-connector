import { accept, isSupported, request } from '../../src/module';

describe('module', () => {

    describe('accept()', () => {

        it('should be a function', () => {
            expect(accept).to.be.a('function');
        });

    });

    describe('isSupported', () => {

        it('should be a boolean', () => {
            expect(isSupported).to.be.a('boolean');
        });

    });

    describe('request()', () => {

        it('should be a function', () => {
            expect(request).to.be.a('function');
        });

    });

});
