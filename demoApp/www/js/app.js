// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

/*.controller('StarterCtrl', function($scope){

	var captureError = function(e) {
		console.log('captureError', e);
	}
	
	var captureSuccess = function(e) {
		console.log('captureSuccess');
		console.dir(e);
		$scope.sound.file = e[0].localURL;
		$scope.sound.filePath = e[0].fullPath;
	}
  
	$scope.record = function() {
		console.log('record called!!');
		
		navigator.device.capture.captureAudio(
			captureSuccess, captureError, {duration:10});
	}
	
	$scope.play = function() {
		alert('play called!!');
		
		if(!$scope.sound.file) {
			navigator.notification.alert("Record a sound first.", null, "Error");
			return;
		}
		var media = new Media($scope.sound.file, function(e) {
			media.release();
		}, function(err) {
        
			console.log("media err", err);
		});
		media.play();
	}
	
	$scope.save = function() {
		alert('save called!!');
	}
})*/

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  
  .config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/home',
		controller: 'HomeCtrl',
		templateUrl: 'templates/home.html'
	})
	.state('new', {
		url: '/new',
		controller: 'RecordCtrl',
		templateUrl: 'templates/new.html'
	});
	
	//if none of the above routes are matches, use this as teh fallback
	$urlRouterProvider.otherwise('/home');
});