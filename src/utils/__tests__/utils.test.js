import { describe, expect, test } from 'vitest'
import * as util from '../index.js';

describe('utils', () => {
    
    test('Phone format 10 digtests', () => {
        expect(util.phoneFormat('1234567890')).toBe('123-456-7890');
    });

    test('Phone format 10 digtests', () => {
        expect(util.phoneFormat('1234567890')).not.toBe('1234567890');
    });

    // get 4 digits
    test('Get last 4 digits', () => {
        expect(util.getLast4Digits('1234567890')).toBe('7890');
    });
});