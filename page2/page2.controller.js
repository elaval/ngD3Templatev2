(function () {

'use strict';
/* jshint undef: true, unused: true */
/* global angular */




/**
 * @ngdoc controller
 * @description
 *
 */
angular.module('app')
.controller('Page2Controller', ['DataService', Page2Controller]);

function Page2Controller(dataService) {
    var myself = this;
    
    this.data = [];

    this.title = "";

    activate();

    function activate() {
        myself.title = "Page 2";
        dataService.getRemoteData()
        .then(function(data) {
            myself.data = data;
        })
    }
}

})();
