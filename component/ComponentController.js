(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('GroupController', function($scope, apiService, $routeParams, $uibModal, $location){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

    		var componentId = $routeParams.componentId;

    		$scope.component = {};

    		function update(){
    			apiService.getComponent(componentId).then(function(component){
					$scope.component = component;
				});
    		}
    		update();

/*
            function ModalEditGroupController($scope, $uibModalInstance){
                $scope.groupUpdate = angular.copy($scope.group);
                $scope.update = function(form){
                    if($scope.groupUpdate.name == "")
                        return;
                    if($scope.groupUpdate.standardLoanTime !== parseInt($scope.groupUpdate.standardLoanTime))
                        return;

                    var updateObj = {};
                    if($scope.groupUpdate.name != $scope.group.name){
                        updateObj.name = $scope.groupUpdate.name;
                    }
                    if($scope.groupUpdate.standardLoanTime != $scope.group.standardLoanTime){
                        updateObj.standardLoanTime = $scope.groupUpdate.standardLoanTime;
                    }
                    if($scope.groupUpdate.status != $scope.group.status){
                        updateObj.status = $scope.groupUpdate.status;
                    }
                    if(updateObj.length == 0)
                        return;

                    apiService.updateComponentGroup(groupId, updateObj).then(function(){
                        $uibModalInstance.close();
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
    			});
    		};

            $scope.openComponent = function(component){
                $location.url("components/"+component.componentId);
            }
*/
    	})

})();