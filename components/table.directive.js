
"use strict";
/* jshint undef: true, unused: true */
/* global angular */

angular.module("app")
.directive("autoTable",["$compile","_",function ($compile,_) {
  return {
    restrict: "A",
    transclude: false,
    templateUrl: 'templates/autoTable.html',
    scope: {
      data: "=myData"
    }
   };
}]);

