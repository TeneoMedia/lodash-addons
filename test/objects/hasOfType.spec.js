var lodash = require('lodash');
var expect = require('chai').expect;
var testPath = require('path').join(__dirname, '../../src/objects/hasOfType');
var _ = require(testPath)(lodash);

module.exports = function() {
    describe('hasOfType', function() {
        it('exists', function() {
            expect(_.hasOfType).to.be.a('function');
        });

        it('rejects invalid prop', function() {
            var wrapped = function() {
                _.hasOfType({});
            };

            expect(wrapped).to.throw(TypeError);
        });

        it('rejects invalid validator', function() {
            var wrapped = function() {
                _.hasOfType({}, 'test');
            };

            expect(wrapped).to.throw(TypeError);
        });

        it('returns false for any non-object', function() {
            expect(_.hasOfType(1, 'test', _.isString)).to.be.false;
            expect(_.hasOfType(null, 'test', _.isString)).to.be.false;
            expect(_.hasOfType(undefined, 'test', _.isString)).to.be.false;
            expect(_.hasOfType('', 'test', _.isString)).to.be.false;
            expect(_.hasOfType([], 'test', _.isString)).to.be.false;
        });

        it('returns false due to missing property', function() {
            expect(_.hasOfType({}, 'test', _.isString)).to.be.false;
        });

        it('returns false due to property of wrong type', function() {
            expect(_.hasOfType({ test: 5 }, 'test', _.isString)).to.be.false;
        });

        it('returns true due to valid property', function() {
            expect(_.hasOfType({ test: '' }, 'test', _.isString)).to.be.true;
        });

        it('returns true due to valid array key', function() {
            expect(_.hasOfType([''], 0, _.isString)).to.be.true;
        });

        it('returns true for path syntax', function() {
            expect(_.hasOfType({ a: { b: '' } }, 'a.b', _.isString)).to.be.true;
        });
    });
};
