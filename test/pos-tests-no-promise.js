(function() {

    'use strict';

    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    var getTime = require('../src/index').getTime;

    chai.use(chaiAsPromised);

    var expect = chai.expect;
    // var assert = chai.assert;
    // var should = chai.should();

    // getTime(stroke, convertFrom, convertTo, timing)
    // Positive Test - From 50
    it('Correctly converts from seconds - 100 Back from 50M to 25M', function() {
        //define some data to compare against
        var blah = '62.2';
        //call the function we're testing 1:03.50
        return chai.expect(
            getTime('100 Back', '50m', '25m', '63.5')
        ).to.equal(blah);
    });
    it('Correctly converts from minutes - 100 Back from 50M to 25M', function() {
        //define some data to compare against
        var blah = '62.2';
        //call the function we're testing 1:03.50
        return chai.expect(
            getTime('100 Back', '50m', '25m', '1:03.5')
        ).equal(blah);
    });
    // Positive Test - From 25
    it('Correctly converts from seconds - 100 Back from 25M to 50M', function() {
        //define some data to compare against
        var blah = '76.8';
        //call the function we're testing 1:03.50
        return expect(getTime('100 Back', '25m', '50m', '75.79')).to.equal(blah);
    });
    it('Correctly converts from seconds - 50 Free from 25M to 50M', function() {
        //define some data to compare against
        var blah = '30.5';
        //call the function we're testing 1:03.50
        return chai.expect(
            getTime('50 Free', '25m', '50m', '29.79')
        ).to.equal(blah);
    });

}());