(function() {
    'use strict';

    // var getTime = require('asa-swim-time-converter');
    var getTime = require('./index.js').getTimePromise;

    getTime('50 Free', '25m', '50m', '31.0').then(function(newTime) {
        console.log(newTime);
    });
}());