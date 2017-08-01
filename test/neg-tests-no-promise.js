(function() {

    'use strict';

    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    var getTime = require('../src/index').getTime;

    chai.use(chaiAsPromised);

    var expect = chai.expect;
    var assert = chai.assert;
    // var should = chai.should();

    // Neg Tests - Data inputs
    it('Stroke invalid', function() {
        //define some data to compare against
        var errmsg = 'ERR: Unrecognised Stroke';
        //call the function we're testing
        return chai.expect(
            getTime.bind(null, 'NotStroke', '25m', '50m', '2:37.70')
        ).to.throw(errmsg);
    });
    it('Time is invalid - String', function() {
        //define some data to compare against
        var errmsg = 'ERR: Not a Valid Time';
        //call the function we're testing
        return chai.expect(
            getTime.bind(null, '200 Free', '25m', '50m', 'Not a Time')
        ).to.throw(errmsg);
    });
    it('Time is invalid - Format', function() {
        //define some data to compare against
        //var blah = 'ERR';
        var errmsg = 'ERR: Not a Valid Time';
        //call the function we're testing
        return chai.expect(
            getTime.bind(null, '200 Free', '25m', '50m', '2:30:2.6')
        ).to.throw(errmsg);
    });
    it('ConvertFrom invalid', function() {
        //define some data to compare against
        var errmsg = 'ERR: Unrecognised Pool Length : From';
        //call the function we're testing
        return chai.expect(
            getTime.bind(null, '200 Free', '250m', '50m', '2:37.70')
        ).to.throw(errmsg);
    });
    it('ConvertTo invalid', function() {
        //define some data to compare against
        //var blah = 'ERR';
        var errmsg = 'ERR: Unrecognised Pool Length : To';
        //call the function we're testing
        return chai.expect(
            getTime.bind(null, '200 Free', '25m', '500m', '2:37.70')
        ).to.throw(errmsg);
    });

}());