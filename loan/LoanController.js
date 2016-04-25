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
			});

			$scope.editDueDate = function(loan){
                $uibModal.open({
                    templateUrl: 'loan/modal-edit-duedate.html',
                    size: 'lg',
                    controller: ModalEditLoanController,
                    scope: $scope
                }).result.then(function(loan){

                });
            };
// <uib-datepicker ng-model="dt" class="well well-sm" datepicker-options="options"></uib-datepicker>
            function ModalEditLoanController($scope, $uibModalInstance){
                $scope.dueDate = Date.parse($scope.loan.dueDate);
                $scope.datePickerOptions = {
                    minDate: new Date(),
                    showWeeks: true
                };

                $scope.edit = function(){
                    if($scope.dueDate == "")
                        return;
                    apiService.updateLoan($scope.loan.loanId, $scope.dueDate).then(function(){
                        $uibModalInstance.close();
                    })
                };
                $scope.cancel = function(){
                    $uibModalInstance.dismiss();
                };
                function getDayClass(data) {
                    var date = data.date,
                      mode = data.mode;
                    if (mode === 'day') {
                      var dayToCheck = new Date(date).setHours(0,0,0,0);

                      for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                          return $scope.events[i].status;
                        }
                      }
                    }

                    return '';
                  }
            };
		})
})();