import { accept, isSupported } from '../../src/module';

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
});
