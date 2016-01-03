// karma configuration

module.exports = function(config) {
  config.set({
      // base path that will be used to resolve all patterns (e.g. files, exlcude)
      basePath: '../',

      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],

      // list of files / patterhsn to load in the browserSync
      files: [
          'bower_components/angular/angular.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-mocks/angular-mocks.js',
          'app/scripts/*.js',
          'test/unit/**/*.js'
      ],

      // list fo files to exclude
      exclude: [
        'test/protractor.conf.js', 'test/e2e/*.js'
      ],

      // preprocess matching files before serving them to the browserSync
      // available preprocessors
      // https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {

      },

      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress'],

      // web server port
      port: 9876,

      // enable / disable colors in the output
      colors: true,

      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
      // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,

      // enable / disable watching file and executive any files changes
      autoWatch: true,

      // start these  browsers
      // available browser launchers:
      // https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome', 'PhantomJS', 'PhantomJS_custom'],

      // you can define custom flags
      customLaunchers: {
          'PhantomJS_custom': {
              base: 'PhantomJS',
              options: {
                  windowName: 'my-window',
                  settings: {
                      webSecurityEnabled: false
                  },
              },
              flags: ['--load-images=true'],
              debug: true
          }
      },

      phantomjsLauncher: {
        // Have phantomjs exit if a ResourceError is encountered
        // (useful if karma exists without killing phantom)
        exitOnResourceError: true
      },

      // Continuous integration mode
      // if true, Karma captures browsers, runs the tests and exist
      singleRun: false,

      // Concurrency level
      // how many browser should be started simultaneously
      concurrency: Infinity


  })
}