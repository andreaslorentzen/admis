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

/*
            function ModalCreateComponentsController($scope, $uibModalInstance){
                

                $scope.create = function(form){
                    if($scope.name == "")
                        return;

                    apiService.createComponents($scope.name).then(function(){
                        $uibModalInstance.close();
                    })
                };
                $scope.cancel = function(){
                    $uibModalInstance.dismiss();
                };
            }

            $scope.createComponents = function(){
                $uibModal.open({
                    templateUrl: 'components/modal-create-components.html',
                    size: 'lg',
                    controller: ModalCreateComponentsController,
                    scope: $scope
                }).result.then(function(){

                });
            };
            */


    	})

})();