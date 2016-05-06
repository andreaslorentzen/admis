(function () {
	'use strict';

	angular.module('admisApp')
		.controller('AppController', function($scope, $location, apiService){
			// Listen url changes, and return to login if not logged in
			$scope.$on('$locationChangeStart', function(event, next, current) {
				if(apiService.isLoggedIn()){
					if($location.url() == "/login" || $location.url() == "/login/"){
						event.preventDefault();
						$location.url("/");
					}
					return;
				}
				if($location.url() != "/login" && $location.url() != "/login/"){
					event.preventDefault();
					$location.url("login");
					$scope.showAlert("Du skal være logget ind for at bruge admis");
				}
			});
			$scope.logout = function(){
				apiService.logout();
			};
			$scope.currentUri = function(){
				return $location.url();
			};
			$scope.alerts = [];
			$scope.showAlert = function(message, success){
				$scope.alerts.push({message: message, type: (success ? "success": "danger")});
			};
			$scope.closeAlert = function(index){
				$scope.alerts.splice(index, 1);
			};
		})

})();