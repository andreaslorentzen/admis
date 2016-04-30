(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('GroupController', function($scope, apiService, $routeParams, $uibModal, $location){
    		
    		var groupId = $routeParams.groupId;

    		$scope.group;

    		function update(){
    			apiService.getComponentGroup(groupId).then(function(group){
					$scope.group = group;
				});
    		}
    		update();

            function ModalEditGroupController($scope, $uibModalInstance){
                $scope.groupUpdate = angular.copy($scope.group);
                $scope.update = function(form){
                    if($scope.groupUpdate.name == "")
                        return;
                    if($scope.groupUpdate.standardLoanDuration != ""+parseInt($scope.groupUpdate.standardLoanDuration))
                        return;

                    var updateObj = {};
                    if($scope.groupUpdate.name != $scope.group.name){
                        updateObj.name = $scope.groupUpdate.name;
                    }
                    if($scope.groupUpdate.standardLoanDuration != $scope.group.standardLoanDuration){
                        updateObj.standardLoanDuration = $scope.groupUpdate.standardLoanDuration;
                    }
                    if($scope.groupUpdate.status != $scope.group.status){
                        updateObj.status = $scope.groupUpdate.status;
                    }

                    if(updateObj.length == 0)
                        return;

                    apiService.updateComponentGroup(groupId, updateObj).then(function(){
                        $uibModalInstance.close();
                        $scope.showAlert("Komponentgruppe gemt", "success");
                    }, function(){
                        $scope.showAlert("Kunne ikke gemme Komponentgruppe");
                    });
                };
                $scope.cancel = function(){
                    $uibModalInstance.dismiss();
                };
            }

            $scope.editGroup = function(){
                $uibModal.open({
                    templateUrl: 'group/modal-edit-group.html',
                    size: 'lg',
                    controller: ModalEditGroupController,
                    scope: $scope
                }).result.then(function(){
                    update();
                });
            };


    		$scope.number = "";

    		$scope.createComponent = function(){
    			apiService.createComponent(groupId,$scope.number).then(function(){
    				$scope.number = "";
    				update();
                        $scope.showAlert("Komponent tilføjet", "success");
                    }, function(){
                        $scope.showAlert("Kunne ikke oprette komponent");
                    });
    		};

            $scope.openComponent = function(component){
                $location.url("components/"+component.componentId);
            }

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