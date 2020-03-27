const assert = require('assert');
const array = [1, 2, 3];
describe('Array Test', () => {
    describe("#indexOf()", () => {
        it("should return -1 when the value is not present isn array", () => {
            assert.equal(array.indexOf(6), -1);
        });
    });
});