(function () {
	'use strict';

	angular.module('admisApp')
		.controller('StudentController', function($scope, apiService, $uibModal, $location, $routeParams){
			
			if(!apiService.isLoggedIn()){
				$location.url('login');
			}

			var studentId = $routeParams.studentId;

			apiService.getStudent(studentId).then(function(student){
				$scope.student = student;
			});

		})
})();