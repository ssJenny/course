// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {


	
	
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.courselist', {
      url: '/courselist',
      views: {
        'tab-courselist': {
          templateUrl: 'templates/tab-courselist.html',
          controller: 'CourseCtrl'
        }
      }
    })
    .state('tab.course-detail', {
      url: '/course/:chatId',
      views: {
        'course-detail': {
          templateUrl: 'templates/course-detail.html',
          controller: 'CourseDetailCtrl'
        }
      }
    })

  .state('tab.mycourse', {
    url: '/mycourse',
    views: {
      'tab-mycourse': {
        templateUrl: 'templates/tab-mycourse.html',
        controller: 'MycourseCtrl'
      }
    }
  })

  .state('tab.usercenter', {
    url: '/usercenter',
    views: {
      'tab-usercenter': {
        templateUrl: 'templates/tab-usercenter.html',
        controller: 'UserCenterCtrl'
      }
    }
  })

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-usercenter': {
        templateUrl: 'templates/tab-usercenter.html',
        controller: 'UserCenterCtrl'
      }
    }
  })
  
  .state('tab.information', {
    url: '/information',
    views: {
      'tab-usercenter': {
        templateUrl: 'templates/information.html',
        controller: 'InformationCtrl'
      }
    }
  })
  
  .state('tab.study', {
    url: '/study/:courseid',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-study.html',
        controller: 'StudyCtrl'
      }
    }
  })
  
  .state('tab.register', {
    url: '/register',
    views: {
      'tab-usercenter': {
        templateUrl: 'templates/tab-register.html',
        controller: 'RegisterCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
