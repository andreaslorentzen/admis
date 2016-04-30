(function () {
	'use strict';

	angular.module('admisApp')
		.controller('StudentController', function($scope, apiService, $uibModal, $location, $routeParams){

			var studentId = $routeParams.studentId;

			apiService.getStudent(studentId).then(function(student){
				$scope.student = student;
			});

		})
})();