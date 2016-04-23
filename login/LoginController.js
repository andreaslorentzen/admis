(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('LoginController', ['$scope','apiService','$location', function($scope, apiService, $location){

    		if(apiService.isLoggedIn()){
    			$location.url('/');
    		}

    	}])

})();