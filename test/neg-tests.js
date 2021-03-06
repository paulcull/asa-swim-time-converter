(function() {

    'use strict';

    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    var getTime = require('../src/index').getTimePromise;

    chai.use(chaiAsPromised);

    var expect = chai.expect;
    var assert = chai.assert;
    var should = chai.should();

    // Neg Tests - Data inputs
    it('Stroke invalid', function() {
        //define some data to compare against
        var errmsg = 'ERR: Unrecognised Stroke';
        //call the function we're testing
        //  getTime('50 Free',   '25m', '50m', '31.0')
        var getTimePromise = getTime('NotStroke', '25m', '50m', '2:37.70');
        return getTimePromise.should.eventually.be.rejectedWith(errmsg);
    });
    it('Time is invalid - String', function() {
        //define some data to compare against
        //var blah = 'ERR';
        var errmsg = 'ERR: Not a Valid Time';
        //call the function we're testing
        var getTimePromise = getTime('200 Free', '25m', '50m', 'Not a Time');
        //return expect(result).to.eventually.equal(blah)
        return getTimePromise.should.eventually.be.rejectedWith(errmsg);
    });
    it('Time is invalid - Format', function() {
        //define some data to compare against
        //var blah = 'ERR';
        var errmsg = 'ERR: Not a Valid Time';
        //call the function we're testing
        var getTimePromise = getTime('200 Free', '25m', '50m', '2:30:2.6');
        //return expect(result).to.eventually.equal(blah)
        return getTimePromise.should.eventually.be.rejectedWith(errmsg);
    });
    it('ConvertFrom invalid', function() {
        //define some data to compare against
        var errmsg = 'ERR: Unrecognised Pool Length : From';
        //call the function we're testing
        var getTimePromise = getTime('200 Free', '250m', '50m', '2:37.70');
        return getTimePromise.should.eventually.be.rejectedWith(errmsg);
    });
    it('ConvertTo invalid', function() {
        //define some data to compare against
        //var blah = 'ERR';
        var errmsg = 'ERR: Unrecognised Pool Length : To';
        //call the function we're testing
        var getTimePromise = getTime('200 Free', '25m', '500m', '2:37.70');
        //return expect(result).to.eventually.equal(blah)
        return getTimePromise.should.eventually.be.rejectedWith(errmsg);
    });

}());