import formatMoney from "../lib/formatMoney";

describe('formatMoney function', () => {
    it('works with fractional amount', () => {
        expect(formatMoney('100')).toBe('₹100.00')
        expect(formatMoney('10')).toBe('₹10.00')
        expect(formatMoney('1')).toBe('₹1.00')
        expect(formatMoney('0.1')).toBe('₹0.10')
    });

});