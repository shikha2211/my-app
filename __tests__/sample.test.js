
function add(a,b){
    const astr = parseInt(a);
    const bstr = parseInt(b);
    return astr+bstr;
}

describe('Same test 101' , () => {
    it('works as expected' , () => {
        expect(0).toEqual(0);
        const age =100;
        expect(age).toEqual(100);
    });

    it('adds two number' , () => {
        expect(add(1,3)).toBeGreaterThanOrEqual(4)
        expect(add(1,3)).toBeCloseTo(3.999999)
    });

    it('adds two strings',() => {
        expect(add('1','3')).toBe(4)
    })
});