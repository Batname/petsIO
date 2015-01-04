module.exports = function(config) {
  config.set({

    basePath: '../',

    files: [
      '../bower_components/angular/angular.js',
      '../bower_components/angular-route/angular-route.js',
      '../bower_components/angular-resource/angular-resource.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../bower_components/angular-animate/angular-animate.js',
      '../bower_components/angular-messages/angular-messages.js',
      '../bower_components/angular-strap/dist/angular-strap.js',
      '../bower_components/angular-strap/dist/angular-strap.tpl.js',
      'lib/javascripts/moment.min.js',
      'javascripts/app.js',
      'test/unit/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
    singleRun: true
  });
};