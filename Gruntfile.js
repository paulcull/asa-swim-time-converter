module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      beforeconcat: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.json', 'test/**/*.js'],
      afterconcat: ['build/<%= pkg.name %>.js','build/<%= pkg.name %>.min.js']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint','mochaTest']
    },
    clean: {
      build: {
        src: ['build']
      },
      dist: {
        src: ['build','dist']
      },
      coverage: {
        src: ['coverage']
      }
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate (exclue example)
        src: ['src/**/*.js','!example.js'],
        // the location of the resulting JS file
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'coverage/results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/**/*.js']
      }
    },
    mocha_istanbul: {
      coverage: {
          src: ['test/**/*.js'],
           // a folder works nicely
           options: {
               coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
               check: {
                   lines: 75,
                   statements: 75
               },
               root: './src', // define where the cover task should consider the root of libraries that are covered by tests
               reportFormats: ['lcov']
           }
      },
      coveralls: {
          src: ['test'], // multiple folders also works
          options: {
              coverage:true, // this will make the grunt.event.on('coverage') event listener to be triggered
              check: {
                  lines: 75,
                  statements: 75
              },
              root: './src', // define where the cover task should consider the root of libraries that are covered by tests
              reportFormats: ['lcov']
          }
      }
  },
  istanbul_check_coverage: {
    default: {
      options: {
        coverageFolder: 'coverage', // will check both coverage folders and merge the coverage results
        check: {
          lines: 80,
          statements: 80
        }
      }
    }
  },
  coveralls: {
    // Options relevant to all targets
    options: {
      // When true, grunt-coveralls will only print a warning rather than
      // an error, to prevent CI builds from failing unnecessarily (e.g. if
      // coveralls.io is down). Optional, defaults to false.
      force: false
    },
    your_target: {
      // LCOV coverage file (can be string, glob or array)
      src: 'coverage/*.info',
      options: {
        // Any options for just this target
      }
    },
  },
  uglify: {
  options: {
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    },
    build: {
      src: 'build/<%= pkg.name %>.js',
      dest: 'dist/<%= pkg.name %>.min.js'
    }
  }
  });

  grunt.event.on('coverage', function(lcovFileContents, done){
      // Check below on the section "The coverage event"
      done();
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-coveralls');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('reportCoveralls', ['clean:coverage','mocha_istanbul:coveralls']);
  grunt.registerTask('coverage', ['clean:coverage','mocha_istanbul:coverage']);
  grunt.registerTask('ci-build', ['clean:coverage','clean:dist','jshint','mochaTest','reportCoveralls','concat','uglify']);
  grunt.registerTask('build', ['clean:dist','jshint','mochaTest','concat','uglify']);
  grunt.registerTask('test', ['clean:coverage','jshint','mochaTest','coverage']);
  grunt.registerTask('watch', ['watch']);

  grunt.registerTask('default', ['build']);

};
