(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('LoginController', ['$scope','apiService','$location', function($scope, apiService, $location){

    		if(apiService.isLoggedIn()){
    			$location.url('/');
    		}

    		$scope.username = "";
    		$scope.password = "";

    		$scope.login = function(){
    			apiService.login($scope.username, $scope.password).then(function(){
    				$location.url('/');
    				$scope.showAlert("Du er nu logget ind", true);
    			}, function(response){
    				console.log(response);
    				switch(response.status){
    					case 400:
    						$scope.showAlert("Brugernavn eller adgangskode er forkert");
    						break;
    					case 404:
    						$scope.showAlert("Kunne ikke få forbindelse til serveren");
    						break;
    					case 500:
    						$scope.showAlert("Der skete en fejl på serveren");
    						break;
    				}
    			});
    		};

    	}])

})();