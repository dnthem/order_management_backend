import * as util from '../index.js';

describe('utils', () => {
    test('Convert ISO date (YYYY-MM-DD) to en-US (MM/DD/YYYY)', () => {
        expect(util.convertISOToUSA('2023-05-18')).toBe('5/18/2023');
    });

    test('Convert ISO date (YYYY-MM-DD) to en-US (MM/DD/YYYY)', () => {
        expect(util.convertISOToUSA('2023-06-01')).toBe('6/1/2023');
    });
    
    test('Convert en-US date (MM/DD/YYYY) to ISO (YYYY-MM-DD)', () => {
        expect(util.convertUSAtoISO('06/01/2023')).toBe('2023-06-01');
    });

    test('Convert en-US date (MM/DD/YYYY) to ISO (YYYY-MM-DD)', () => {
        expect(util.convertUSAtoISO('05/18/2023')).toBe('2023-05-18');
    });

    test('Phone format 10 digtests', () => {
        expect(util.phoneFormat('1234567890')).toBe('123-456-7890');
    });

    test('Phone format 10 digtests', () => {
        expect(util.phoneFormat('1234567890')).not.toBe('1234567890');
    });
});