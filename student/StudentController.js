(function () {
	'use strict';

	angular.module('admisApp')
		.controller('StudentController', function($scope, apiService, $uibModal, $location, $routeParams){

			var studentId = $routeParams.studentId;

			apiService.getStudent(studentId).then(function(student){
				$scope.student = student;
			}, function(response){
				switch (response.status){
					case 404:
					case 405:
						$scope.showAlert("Ugyldig studerende");
						$location.url("/students");
						break;
					default: 
						$scope.showAlert("Kunne ikke hente oplysninger om den studerende");
						break;
				}
			});

		})
})();