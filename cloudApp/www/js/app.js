// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

// 将 app.js 的 module 代码修改，如下第一个代码框中的代码，替换成第二个代码
// 框中的代码。 
// 第一个代码框： 
angular.module('starter', ['ionic', 'starter.controllers',
	'starter.services'
])
//module设置开始 
angular.module('starter', ['ionic', 'starter.controllers',
		'starter.services'
	], function($httpProvider) {
		//此方法用于修改$http请求的数据格式，让后台可以按照 ajax，传输数据的方式接收 
		// Use x-www-form-urlencoded Content-Type 
		$httpProvider.defaults.headers.post['Content-Type'] =
			'application/x-www-form-urlencoded;charset=utf-8';
		/** 
* The workhorse; converts an object to x-www-form-urlencoded
serialization. 
* @param {Object} obj
* @return {String}
   */
		var param = function(obj) {
			var query = '',
				name, value, fullSubName, subName, subValue, innerObj,
				i;
			for(name in obj) {
				value = obj[name];
				if(value instanceof Array) {
					for(i = 0; i < value.length; ++i) {
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if(value instanceof Object) {
					for(subName in value) {
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if(value !== undefined && value !== null)
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) +
					'&';
			}
			return query.length ? query.substr(0, query.length - 1) : query;
		};
		// Override $http service's default transformRequest 
		$httpProvider.defaults.transformRequest = [function(data) {
			return angular.isObject(data) && String(data) !== '[object File]' ?
				param(data) : data;
		}];
	})

	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if(window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})

	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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
				cache:false,
				views: {
					'tab-courselist': {
						templateUrl: 'templates/tab-courselist.html',
						controller: 'CourseCtrl'
					}
				}
			})
			

			.state('tab.mycourse', {
				url: '/mycourse',
				cache:false,
				views: {
					'tab-mycourse': {
						templateUrl: 'templates/tab-mycourse.html',
						controller: 'MycourseCtrl'
					}
				}
			})

			.state('tab.usercenter', {
				url: '/usercenter',
				cache:false,
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
			    cache:false,
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