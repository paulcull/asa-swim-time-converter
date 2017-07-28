var strokes = require('./conversionTables/strokeTable');
var pools = require('./conversionTables/poolTable');

var timeFormatRegex = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$");
var numPlaces = 1;

var isDebugMode = false;


//debug log support
console.debug = function( /* ...args */ ) {
    if (isDebugMode) {
        var vargs = Array.prototype.slice.call(arguments);
        console.log.apply(this, vargs);
    }
};

//based on formula documented
// https://www.swimmingresults.org/downloads/equivalent-time-share/algorithm.php


// Exposed Function

/*
  getTime function to convert Swim times based on ASA table
  getTime(convertFrom, convertTo, stroke, timing)

  inputs
  @stroke = stroke as per the list
  @covertFrom = poolLength
  @convertTo = poolLength
  @timing = time to convert from

  returns
  time per target

  */

function getTime(stroke, convertFrom, convertTo, timing) {
    return new Promise(function(resolve, reject) {
        console.debug("converting " + stroke + " @ " + timing + " from " + convertFrom + " to " + convertTo);

        var poolTable = {};
        var strokeTable = {};
        var timingInSeconds = 0;

        //check stroke is a known one
        if (!strokes[stroke]) {
            reject("ERR: Unrecognised Stroke");
        } else {
            strokeTable = strokes[stroke];
            //console.debug('Read stroke table: ', strokeTable);
        }

        //check that time doesn't contain any odd stuff
        if (!timing.match(/[0-9,:,.]/i)) {
            reject("ERR: Not a Valid Time 1");
        }
        if ((timing.match(/:/g) || []).length > 1) {
            reject("ERR: Not a Valid Time 2");
        }
        if ((timing.match(/\./g) || []).length > 1) {
            reject("ERR: Not a Valid Time 3");
        }
        //handle times - convert to seconds, if not already
        try {
            //check if minutes separator exists
            if (timing.indexOf(':') > 0) {
                var _parts = timing.split(":");
                //assumes no times in hours
                timingInSeconds = (parseFloat(_parts[0]) * 60) + (parseFloat(_parts[1]));
            } else {
                timingInSeconds = parseFloat(timing);
            }
        } catch (err) {
            reject("ERR: Incorrect Time Conversion Error: " + err);
        }

        //check fromPoolLength is a known one
        if (!pools[convertFrom]) {
            reject("ERR: Unrecognised Pool Length : From");
        } else {
            poolTable = pools[convertFrom];
            //console.debug('Read pool table: ', poolTable);
        }
        if (!pools[convertTo]) {
            reject("ERR: Unrecognised Pool Length : To");
        }

        // start compiling the inputs to the calc
        try {

            var PoolMeasure = poolTable.poolMeasureCase;
            console.debug(" - PoolMeasure     :", PoolMeasure);
            var NumTurnPH = poolTable.numTurnPerHundred;
            console.debug(" - NumTurnPH       :", NumTurnPH);
            var Distance = strokeTable.distance;
            console.debug(" - Distance        :", Distance);
            var D1 = Distance;
            console.debug(" - timingInSeconds :", timingInSeconds);
            //special case for 1500 in short pools
            if (Distance === 1500 && poolTable.poolMeasureCase === 3) {
                D1 = 1650;
            }
            console.debug(" - D1             :", D1);
            var NumbTurnFactor = Distance / 100 * (D1 / 100) * (NumTurnPH - 1);
            console.debug(" - NumbTurnFactor :", NumbTurnFactor);
            var TurnFactor = strokeTable.TurnFactor;
            console.debug(" - TurnFactor     :", TurnFactor);

            // The first Step is to get the value for a 50m form
            // TimeTo50 = (swtime + Sqr(swtime * swtime + 4 * PoolMeasure * TurnFactor * NumbTurnFactor)) / (2 * PoolMeasure)
            var T50 = 0;
            if (convertFrom != "50m") {
                T50 = (timingInSeconds +
                    (Math.sqrt(timingInSeconds * timingInSeconds + 4 * PoolMeasure * TurnFactor * NumbTurnFactor))
                ) / (2 * PoolMeasure);
            } else {
                T50 = timingInSeconds;
            }
            console.debug(" - T50            :", T50);

            //The second step – 50m pool length to desired pool length – is expressed as:
            //T50 * PoolMeasure – TurnVal * (NumTurnPH – 1)
            // Where:
            //
            // T50 = Time in a 50m pool
            // PoolMeasure = Event distance factor
            // TurnVal = Time per turn – The time in seconds attributed to execution of a	single turn
            // NumTurnPH = Number of turns per 100 in the required length pool.
            // The Time per turn is determined by the relationship:
            // TurnVal = TurnFactor / T50
            // Where TurnFactor is provided by the LookUp table

            var convertTime = 0;

            var TurnVal = TurnFactor / T50;
            console.debug(" - TurnVal        :", TurnVal);
            if (convertTo != "50m") {
                convertTime = T50 * 1 - TurnVal * 2;
            } else {
                convertTime = T50;
            }

            console.debug(" - Result Time    :", convertTime);
            resolve(convertTime.toFixed(numPlaces).toString());

        } catch (err) {
            reject("ERR: Conversion Error: " + err);
        }

    });
}

module.exports = getTime;