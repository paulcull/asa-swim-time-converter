module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      //files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.json', 'test/**/*.js'],
      beforeconcat: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.json', 'test/**/*.js'],
      afterconcat: ['dist/<%= pkg.name %>.js']//,
      // config in .jshintrc now
      // options: {
      //   globals: {
      //     jQuery: true
      //   }
      // }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint','mochaTest']
    },
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['src/conversionTables/*.json','src/index.js'],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/**/*.js']
      }
    },
    uglify: {
    options: {
      banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('build', ['jshint','mochaTest','concat','uglify']);
  grunt.registerTask('test', ['jshint','mochaTest']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('watch', ['watch']);

};
