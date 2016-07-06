'use strict';
/**
* @ngdoc object
* @description
*/
angular.module('app')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /page1
  $urlRouterProvider.otherwise("/page1");
  //
  // Now set up the states
  $stateProvider
    .state('page1', {
      url: "/page1",
      templateUrl: "page1/page1.html",
      controller: "Page1Controller as controller"
    })    
    .state('page2', {
      url: "/page2",
      templateUrl: "page2/page2.html",
      controller: "Page2Controller as controller"
    })
});


