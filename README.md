# ASA Swim time converter

This is a javascript implementation of the published and ASA approved Factor Table conversion method.

## Status
[![Build Status](https://travis-ci.org/paulcull/asa-swim-time-converter.svg?branch=master)](https://travis-ci.org/paulcull/asa-swim-time-converter)
[![Coverage Status](https://coveralls.io/repos/github/paulcull/asa-swim-time-converter/badge.svg?branch=master)](https://coveralls.io/github/paulcull/asa-swim-time-converter?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/paulcull/asa-swim-time-converter.svg)](https://greenkeeper.io/)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
[![NPM Version](https://img.shields.io/npm/v/asa-swim-time-converter.svg?style=flat)](https://www.npmjs.com/package/asa-swim-time-converter)
[![NPM Downloads](https://img.shields.io/npm/dm/asa-swim-time-converter.svg?style=flat)](https://www.npmjs.com/package/asa-swim-time-converter)

## Getting Started

Include the library in your project. Pass the Stroke, Pool Length From / To and timing. The single function will return the convert time.

### Prerequisites

What things you need to install the software and how to install them

```
None
```

### Installing

Install the library using npm...

```
npm install --save asa-swim-time-converter
```

...or, take the library directly from githb

```
git clone https://github.com/paulcull/asa-swim-time-converter
```

This library uses supports promises as an option. The getTimePromise function when called returns a promise, allowing you to get on with anything else that you need to.
There are no runtime 3rd party dependencies in this library.

Method 1
```
var getTime = require('asa-swim-time-converter').getTime;

console.log(getTime("50 Free", "25m", "50m", "31.0"))
```


Method 2
```
var getTime = require('asa-swim-time-converter').getTimePromise;

getTime("50 Free", "25m", "50m", "31.0").then(function(newTime){
    console.log(newTime);
})
```
 - Also check the tests and example


Supported Converstion distances
```
50m
33.33m
25m
20m
36.66y
27.5y
33.33y
25y
20y
```


Supported Strokes
```
50 Free
100 Free
200 Free
400 Free
800 Free
1500 Free
50 Breast
100 Breast
200 Breast
50 Fly
100 Fly
200 Fly
50 Back
100 Back
200 Back
200 IM
400 IM
```


## Running the tests

There are a limited number of tests. Several negative tests and a couple of checks on times to convert


```
npm test
```


## Deployment

Not designed to run stand-alone - this should be used as a libray.

## Built With

* [NPM](https://www.npm.org/) - Dependency Management
* [MOCHA](https://www.mochajs.org/) - Test management
* [CHAI](http://chaijs.com/) - BDD / TDD assertion (including with [PROMISES](https://github.com/domenic/chai-as-promised))


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## TODO

These are things that should be done to complete.

 - [X] Reduce / remove external dependancies
 - [X] Add project documentation
 - [X] Add simple example
 - [ ] Extend test cases to all strokes / pool lengths
 - [X] Setup travis-ci
 - [X] Add grunt to manage a min step and create a smaller footprint library
 - [X] Introduce dependency monitoring
 - [X] Publish to npm.org

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/paulcull/asa-swimtime-converter/tags).

## Authors

* **Paul Cullender** - *Initial work* - [paulcull](https://github.com/paulcull)

See also the list of [contributors](https://github.com/paulcull/asa-swimtime-converter/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* The excellent documentation on the method [here](https://www.swimmingresults.org/downloads/equivalent-time-share/algorithm.php) made this all possible
* The very reusable git documents from [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
