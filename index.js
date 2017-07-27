// let inspect = require('eyes').inspector({maxLength: false})
// let _ = require('underscore');
var moment = require('moment');
var strokes = require('./conversionTables/strokeTable');
var pools = require('./conversionTables/poolTable');
require("moment-duration-format");

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
        console.log("converting " + stroke + " @ " + timing + " from " + convertFrom + " to " + convertTo);

        var poolTable = {};
        var strokeTable = {};

        //check stroke is a known one
        if (!strokes[stroke]) {
            reject("ERR: Unrecognised Stroke");
        } else {
            strokeTable = strokes[stroke];
            console.log('Read stroke table: ', strokeTable);
        }

        //check fromPoolLength is a known one
        if (!pools[convertFrom]) {
            reject("ERR: Unrecognised Pool Length : From");
        } else {
            poolTable = pools[convertFrom];
            console.log('Read pool table: ', poolTable);
        }
        if (!pools[convertTo]) {
            reject("ERR: Unrecognised Pool Length : To");
        }


        // start compiling the inputs to the calc

        var PoolLength = poolTable.poolMeasureCase;
        var NumTurnPH = poolTable.numTurnPerHundred;
        var strokeLength = strokeTable.distance;
        var swimSeconds = moment.duration(timing).asSeconds();

        console.log(timing);
        console.log(moment(timing, "mm:ss.SS").format('HH:mm:ss.SSS'));
        console.log(moment(timing, "mm:ss.SS").as('seconds'));
        console.log(moment(timing, "mm:ss.SS"));

        console.log(moment.duradtion(timing, 'mm:ss.SS').format('ss.SS'));

        console.log("^^^^^^^^^^^^", swimSeconds);


        convertTime = 0;
        resolve(convertTime);

    });
}

module.exports = getTime;


// request(url, function(err, response, body) {
//     if(err) reject(err);
//     if(response.statusCode !== 200) {
//         reject('Invalid status code: '+response.statusCode);
//     }
//     let $ = cheerio.load(body);
//     let swimLists = $('table#rankTable');
//     //console.log("****",channelList);
//
//     let swims=[];
//
//     for(let i=0;i<swimLists.length;i++) {
//         // get the table
//         let t = swimLists.get(i);
//
//         // convert table to array
//         ctp($)
//         let data = $(t).parsetable(true,true,true);
//
//         // manipulate array
//         for(let j=0;j<data[0].length;j++) {
//
//           if(j>0){
//           var swim = {
//             course:i===0? 'LC':'SC',
//             stroke:data[0][j],
//             timeDate:moment(data[3][j],'DD/MM/YY').toDate(),
//             timeString:data[1][j],
//             dateAndTime:moment(data[3][j]+'-'+data[1][j],'DD/MM/YY-mm:ss.SSS').toObject(),
//             finaPts:data[2][j],
//             meet:data[4][j],
//             venue:data[5][j],
//             license:data[6][j],
//             level:data[7][j],
//             dateCollected: new Date()
//             }
//           swims.push(swim);
//           }
//         }
//     }
//     resolve(swims);
// });