(function () {
	'use strict';

	angular.module('admisApp')
		.controller('LoanController', function($scope, apiService, $uibModal, $location, $routeParams){
			
			if(!apiService.isLoggedIn()){
				$location.url('login');
			}

			var loanId = $routeParams.loanId;
			
			apiService.getLoan(loanId).then(function(loan){
				$scope.loan = loan;
				console.log(loan);
				apiService.getStudent(loan.studentId).then(function(student){
					$scope.student = student;
					console.log(student);
				});
			});

			$scope.editDueDate = function(loan){
                console.log(loan);
                $uibModal.open({
                    templateUrl: 'loan/modal-edit-duedate.html',
                    size: 'lg',
                    controller: ModalEditDueDateController
                }).result.then(function(loan){

                });
            };
// <uib-datepicker ng-model="dt" class="well well-sm" datepicker-options="options"></uib-datepicker>
            function ModalEditDueDateController($scope, $uibModalInstance){
                $scope.name = "";

                $scope.edit = function(){
                    if($scope.name == "")
                        return;

                    apiService.updateLoan($scope.loan.loanId, $scope.loan.dueDate).then(function(groupId){
                        $uibModalInstance.close(groupId);

                    })
                };
                $scope.cancel = function(){
                	console.log("HEJEHJEHEJEHEJHEHJHEJEHJEHJEJH");
                    $uibModalInstance.dismiss();
                };
            };
		})
})();