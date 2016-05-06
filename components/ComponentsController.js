(function () {
	'use strict';

	angular.module('admisApp')
		.controller('ComponentsController', function($scope, apiService, $uibModal, $location){

			$scope.components;
			$scope.componentGroups;
			$scope.selectedGroup;
			var groupNameMap = [];
			var componentsCount = [];
			var availableCount = []

			apiService.getComponents().then(function(components){
				$scope.components = components;
				addComponentGroupNames();
			}, function(response){
				$scope.showAlert("Kunne ikke hente komponenter");
			});
			apiService.getComponentGroups().then(function(componentGroups){
				for (var i = 0; i < componentGroups.length; i++) {
					groupNameMap[componentGroups[i].componentGroupId] = componentGroups[i].name;
					componentsCount[componentGroups[i].componentGroupId] = 0;
					availableCount[componentGroups[i].componentGroupId] = 0;
				}
				$scope.componentGroups = componentGroups;
				addComponentGroupNames();
			}, function(response){
				$scope.showAlert("Kunne ikke hente komponentgrupper");
			});


			function addComponentGroupNames(){
				if($scope.components == undefined || $scope.componentGroups == undefined)
					return;

				$scope.components.forEach(function(component){
					component.componentGroupName = groupNameMap[component.componentGroupId];
					componentsCount[component.componentGroupId]++;
					if(component.status == 1 && component.studentId == "")
						availableCount[component.componentGroupId]++;
				});
				$scope.componentGroups.forEach(function(componentGroup){
					componentGroup.componentsCount = componentsCount[componentGroup.componentGroupId];
					componentGroup.availableCount = availableCount[componentGroup.componentGroupId];
				});
			}


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
				inactive: false,
				loaned: 0
			};
			$scope.$watchCollection('componentSort', function (componentSort) {
				if(componentSort.active && componentSort.inactive)
					return;
				componentSort.active = true;
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
				$scope.standardLoanDuration = "";

				$scope.create = function(form){
					if($scope.name == "")
						return;
					if($scope.standardLoanDuration != ""+parseInt($scope.standardLoanDuration))
						return;

					apiService.createComponentGroup($scope.name, $scope.standardLoanDuration).then(function(data){
						$scope.showAlert("Komponentgruppe tilføjet!", "success");
						$uibModalInstance.close(data.componentGroupId);
					}, function(response){
						$scope.showAlert("Kunne ikke tilføje komponentgruppe");
					});
				};
				$scope.cancel = function(){
					$uibModalInstance.dismiss();
				};
			}

			$scope.createGroup = function(){
				$uibModal.open({
					templateUrl: 'components/modal-create-group.html',
					size: 'lg',
					controller: ModalCreateGroupController,
					scope: $scope
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
		.filter('componentSort', function() {
			return function(items, sortObj) {
				var filtered = [];
				angular.forEach(items, function(item) {
				  if(
						(sortObj.loaned==0 ||(sortObj.loaned==1 && item.studentId != "") ||
						(sortObj.loaned==2 && item.studentId == "")) &&
						((sortObj.active == true && item.status == 1) ||
					 (sortObj.inactive == true && item.status != 1))


					
					 
					) {
					filtered.push(item);
				  }
				});
				return filtered;
			};
		})
		/*

		*/
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