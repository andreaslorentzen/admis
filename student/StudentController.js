(function () {
	'use strict';

	angular.module('mainApp')
		.controller('StudentController', function($scope, apiService, $uibModal, $location){
			
			if(!apiService.isLoggedIn()){
				$location.url('login');
			}

			var studentId = $routeParams.studentId;

			apiService.getStudent(studentId).then(function(student){
				$scope.student = student;
			});

		})
})();