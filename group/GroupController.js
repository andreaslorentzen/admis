(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('GroupController', function($scope, apiService, $routeParams){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

    		var groupId = $routeParams.groupId;

    		$scope.group = {};

    		function update(){
    			apiService.getComponentGroup(groupId).then(function(group){
					$scope.group = group;
				});
    		}
    		update();


    		$scope.number = "";

    		$scope.createComponent = function(){
    			console.log("hel");
    			apiService.createComponent(groupId,$scope.number).then(function(){
    				$scope.number = "";
    				update();
    			});
    		};

    	})

})();