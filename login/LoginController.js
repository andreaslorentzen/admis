(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('LoginController', ['$scope','apiService','$location', function($scope, apiService, $location){

    		if(apiService.isLoggedIn()){
    			$location.url('/');
    		}

    	}])

})();