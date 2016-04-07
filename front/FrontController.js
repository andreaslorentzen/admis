(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('FrontController', ['$scope','apiService', function($scope, apiService){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

    	}])

})();