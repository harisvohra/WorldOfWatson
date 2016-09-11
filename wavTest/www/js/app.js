// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.controller('AppCtrl', function($scope) {
    
    var fileURL;
    var fileName = "output.wav";
    var fileTransfer;
    //var uri = encodeURI("http://smartserveserver.mybluemix.net/output.wav");
    var uri = encodeURI("http://freewavesamples.com/files/Kawai-K3-Brass-C3.wav");
    var myMedia;
            
    $scope.downloadAndPlay = function() {
        fileURL = cordova.file.dataDirectory;
        console.log('fileURL: ' + fileURL);
        downloadAndPlay();
    }
            
    function downloadAndPlay() {
        fileTransfer = new FileTransfer();
        fileTransfer.download(
            uri,
            fileURL + fileName,
            function(entry) {
                console.log("download complete: " + entry.toURL());
                myMedia = new Media(entry.toURL().substring(7), onMediaSuccess, onMediaError);
                myMedia.play();
            },
            function(error) {
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("upload error code" + error.code);
            },
            false
        );
    }
            
    function onMediaSuccess() {
        console.log('success playing media');
            myMedia.release();
    }

    function onMediaError(err){
        console.log('error playing media: ' + JSON.stringify(err));
            myMedia.release();
    }
})

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
