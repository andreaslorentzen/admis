(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('ComponentsController', function($scope, apiService, $uibModal, $location){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

    		$scope.components = [];
    		$scope.componentGroups = [];
    		$scope.selectedGroup;

    		apiService.getComponents().then(function(components){
    			$scope.components = components;
    		});
    		apiService.getComponentGroups().then(function(componentGroups){
    			$scope.componentGroups = componentGroups;
    		});



            $scope.groupSort = {
                active: true,
                inactive: false
            };
            $scope.$watchCollection('groupSort', function (sort) {
                for(var s in sort){
                    if(sort[s])
                        return;
                }
                sort.active = true;
            });
            $scope.componentSort = {
                active: true,
                inactive: false
            };
            $scope.$watchCollection('componentSort', function (sort) {
                for(var s in sort){
                    if(sort[s])
                        return;
                }
                sort.active = true;
            });

            $scope.numberOfActive = function(items){
                var count = 0;
                angular.forEach(items, function(item) {
                  if(item.status == 1)
                    count++;
                });
                return count;
            };
            $scope.numberOfInactive = function(items){
                var count = 0;
                angular.forEach(items, function(item) {
                  if(item.status != 1)
                    count++;
                });
                return count;
            };



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
                $location.url("components/"+component.barcode);
            };

    	})
        .filter('statusSort', function() {
            return function(items, sortObj) {
                var filtered = [];
                angular.forEach(items, function(item) {
                  if((sortObj.active == true && item.status == 1) ||
                       (sortObj.inactive == true && item.status != 1)) {
                    filtered.push(item);
                  }
                });
                return filtered;
            };
        });
})();