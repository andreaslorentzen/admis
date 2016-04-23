(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('FrontController', ['$scope','apiService', function($scope, apiService){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

    	}])

})();