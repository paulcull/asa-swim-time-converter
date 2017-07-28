var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var gt = require('./../src/index.js');

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
