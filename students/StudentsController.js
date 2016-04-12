(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('StudentsController', function($scope, apiService, $uibModal, $location){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

            apiService.getStudents().then(function(students){
                $scope.students = students;
            });

    	})

})();