(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('ComponentsController', function($scope, apiService, $uibModal, $location){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

    		$scope.components = [];
    		$scope.componentGroups = [];
    		$scope.selectedGroup;

    		apiService.getComponents().then(function(components){
                console.log(components);
    			$scope.components = components;
    		});
    		apiService.getComponentGroups().then(function(componentGroups){
    			$scope.componentGroups = componentGroups;
    		});


    		$scope.selectGroup = function(group){
    			if($scope.componentGroups.indexOf(group) == -1)
    				return;

    			if($scope.selectedGroup == group)
    				$scope.selectedGroup = undefined;
    			else
    				$scope.selectedGroup = group;
    		};

            $scope.editGroup = function(group){
                $location.url('components/group/'+group.componentGroupId);
            };

            function ModalCreateGroupController($scope, $uibModalInstance){
                $scope.name = "";

                $scope.create = function(form){
                    if($scope.name == "")
                        return;

                    apiService.createComponentGroup($scope.name).then(function(groupId){
                        $uibModalInstance.close(groupId);

                    })
                };
                $scope.cancel = function(){
                    $uibModalInstance.dismiss();
                };
            }

            $scope.createGroup = function(){
                $uibModal.open({
                    templateUrl: 'components/modal-create-group.html',
                    size: 'lg',
                    controller: ModalCreateGroupController
                }).result.then(function(groupId){
                    $location.url('components/group/'+groupId);

                });
            };

            $scope.openComponent = function(component){
                if($scope.components.indexOf(component) == -1)
                    return;
                $location.url("components/"+component.componentId);
            };

    	})

})();