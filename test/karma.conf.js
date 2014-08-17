module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'libraries/js/angular.js',
      'libraries/js/angular-mocks.js',
      'js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'PhantomJS'],

    plugins : [
    				'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};