(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('StudentsController', function($scope, apiService, $uibModal, $location){
    		
            apiService.getStudents().then(function(students){
                $scope.students = students;
            }, function(response){
                $scope.showAlert("Kunne ikke hente studerende");
            });
            $scope.openStudent = function(student){
                $location.url("students/"+student.studentId);
            };


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


            // used for filtering
            $scope.sort = {
                active: true,
                inactive: false
            };
            $scope.search = "";

            $scope.$watchCollection('sort', function (sort) {
                for(var s in sort){
                    if(sort[s])
                        return;
                }
                sort.active = true;
            });


    	})
        .filter('studentStatus', function() {
            return function(input) {
                return input == 1 ? 'Aktiv' : 'Inaktiv';
            };
        });

})();