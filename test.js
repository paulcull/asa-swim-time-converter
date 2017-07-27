var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var gt = require('./index.js');

chai.use(chaiAsPromised);

var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

// Neg Tests - Data inputs
it('Stroke invalid', function() {
    //define some data to compare against
    var errmsg = "ERR: Unrecognised Stroke";
    //call the function we're testing
    var gtPromise = gt("NotStroke", "25m", "50m", "2:37.70");
    return gtPromise.should.eventually.be.rejectedWith(errmsg);
});
it('Time is invalid - String', function() {
    //define some data to compare against
    //var blah = 'ERR';
    var errmsg = "ERR: Not a Valid Time";
    //call the function we're testing
    var gtPromise = gt("200 Free", "25m", "50m", "Not a Time");
    //return expect(result).to.eventually.equal(blah)
    return gtPromise.should.eventually.be.rejectedWith(errmsg);
});
it('Time is invalid - Format', function() {
    //define some data to compare against
    //var blah = 'ERR';
    var errmsg = "ERR: Not a Valid Time";
    //call the function we're testing
    var gtPromise = gt("200 Free", "25m", "50m", "2:30:2.6");
    //return expect(result).to.eventually.equal(blah)
    return gtPromise.should.eventually.be.rejectedWith(errmsg);
});
it('ConvertFrom invalid', function() {
    //define some data to compare against
    var errmsg = "ERR: Unrecognised Pool Length : From";
    //call the function we're testing
    var gtPromise = gt("200 Free", "250m", "50m", "2:37.70");
    return gtPromise.should.eventually.be.rejectedWith(errmsg);
});
it('ConvertTo invalid', function() {
    //define some data to compare against
    //var blah = 'ERR';
    var errmsg = "ERR: Unrecognised Pool Length : To";
    //call the function we're testing
    var gtPromise = gt("200 Free", "25m", "500m", "2:37.70");
    //return expect(result).to.eventually.equal(blah)
    return gtPromise.should.eventually.be.rejectedWith(errmsg);
});

// Positive Test
// getTime(stroke, convertFrom, convertTo, timing)
it('Correctly converts from seconds - 100 Back from 50M to 25M', function() {
    //define some data to compare against
    var blah = '62.2';
    //call the function we're testing 1:03.50
    var gtPromise = gt("100 Back", "50m", "25m", "63.5");
    return gtPromise.should.eventually.equal(blah);
});
it('Correctly converts from minutes - 100 Back from 50M to 25M', function() {
    //define some data to compare against
    var blah = '62.2';
    //call the function we're testing 1:03.50
    var gtPromise = gt("100 Back", "50m", "25m", "1:03.5");
    return gtPromise.should.eventually.equal(blah);
});
