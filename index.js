
// let inspect = require('eyes').inspector({maxLength: false})
// let _ = require('underscore');
let moment = require('moment');
let strokes = require('./conversionTables/strokeTable');
let pools = require('./conversionTables/poolTable');



function getStroke(stroke) {
  var result = strokes.filter(function( obj ) {
    return obj[stroke] ;
  });
}
//based on formula documented
// https://www.swimmingresults.org/downloads/equivalent-time-share/algorithm.php


// Exposed Function

/*
  getTime function to convert Swim times based on ASA table
  getTime(convertFrom, convertTo, stroke, timing)

  inputs
  @covertFrom = poolLength
  @convertTo = poolLength
  @stroke = stroke as per the list
  @timing = time to convert from

  returns
  time per target

  */

function getTime(convertFrom, convertTo, stroke, timing) {
    return new Promise(function(resolve, reject) {
      console.log("converting " + stroke + " @ " + timing + " from " + convertFrom + " to " +  convertTo);
      console.log("~~~",strokes);

      console.log(getStroke(stroke));

      console.log("---",strokes[stroke]);
      //check stroke is a known one
      if(!strokes[stroke]){
        reject("ERR: Unrecognised Stroke");
      }

      //check fromPoolLength is a known one
      if(!pools[convertFrom]){
        reject("ERR: Unrecognised Pool Length : From");
      }
      if(!pools[convertTo]){
        reject("ERR: Unrecognised Pool Length : To");
      }



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
