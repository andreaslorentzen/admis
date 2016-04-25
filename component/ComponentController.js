(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('ComponentController', function($scope, apiService, $routeParams, $uibModal, $location){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

    		var barcode = $routeParams.barcode;

    		$scope.component = {};

    		function update(){
    			apiService.getComponent(barcode).then(function(component){
					$scope.component = component;
				});
    		}
    		update();

            $scope.editComponent = function(){
                $uibModal.open({
                    templateUrl: 'component/modal-edit-component.html',
                    size: 'lg',
                    controller: ModalEditComponentController,
                    scope: $scope
                }).result.then(function(){
                    update();
                });
            };

            function ModalEditComponentController($scope, $uibModalInstance){
                $scope.componentUpdate = angular.copy($scope.component);
                $scope.update = function(form){
                    if($scope.componentUpdate.componentNumber == "")
                        return;

                    var updateObj = {};
                    if($scope.componentUpdate.componentNumber != $scope.component.componentNumber){
                        updateObj.componentNumber = $scope.componentUpdate.componentNumber;
                    }
                    if($scope.componentUpdate.status != $scope.component.status){
                        updateObj.status = $scope.componentUpdate.status;
                    }
                    console.log(updateObj);
                    if(angular.equals({}, updateObj))
                        return;

                    apiService.updateComponent(barcode, updateObj).then(function(){
                        $uibModalInstance.close();
                    });
                };
                $scope.cancel = function(){
                    $uibModalInstance.dismiss();
                };
            }
/*
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