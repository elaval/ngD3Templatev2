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
.controller('Page1Controller', ['DataService', Page1Controller]);

function Page1Controller(dataService) {
    var myself = this;

    this.title = "";
    this.data = [];

    activate();

    function activate() {
        myself.title = "Page 1";

        dataService.getLocalData()
        .then(function(data) {
          myself.data = data;
        })

    }
}

})();
