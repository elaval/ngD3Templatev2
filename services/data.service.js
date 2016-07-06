'use strict';
/* jshint undef: true, unused: true */
/* global angular */

/**
 * @ngdoc service
 * @description
 *
 */
angular.module('app')
.service('DataService',['$http','$q','d3',function($http, $q, d3) {
  var myself = this;
  var dataUrl = "./data/sample_data.txt";

  myself.getRemoteData = getRemoteData;
  myself.getLocalData = getLocalData;

  var localData, remoteData;

  function getLocalData() {
    // deferred - use of promises to deal with async results
    var deferred = $q.defer();

    if (localData) {
      deferred.resolve(localData)
    } else {
      d3.csv(dataUrl, function(err,_data) {
        if (err) {
          deferred.reject(err)
        } else {
          localData = _data;
          deferred.resolve(localData)
        }
      })      
    }
    return deferred.promise;
  }


  function getRemoteData() {
    var deferred = $q.defer();

    if (remoteData) {
      deferred.resolve(remoteData)
    } else {
      $http.jsonp("http://api.worldbank.org/countries?format=jsonP&prefix=JSON_CALLBACK")
      .then(function(res) {
        remoteData = res.data[1];
        deferred.resolve(remoteData)
      })    
    }

    return deferred.promise;
  }


}])




