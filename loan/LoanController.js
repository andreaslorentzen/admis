(function () {
	'use strict';

	angular.module('admisApp')
		.controller('LoanController', function($scope, apiService, $uibModal, $location, $routeParams, $filter){
			
			var loanId = $routeParams.loanId;
			
            function update(){
                apiService.getLoan(loanId).then(function(loan){
                    $scope.loan = loan;
                });
            }
			update();

			$scope.editDueDate = function(loan){
                $uibModal.open({
                    templateUrl: 'loan/modal-edit-duedate.html',
                    size: 'lg',
                    controller: ModalEditLoanController,
                    scope: $scope
                }).result.then(function(loan){
                    update();
                });
            };
// <uib-datepicker ng-model="dt" class="well well-sm" datepicker-options="options"></uib-datepicker>
            function ModalEditLoanController($scope, $uibModalInstance, $filter){
                $scope.dueDate = $filter("dateFromSting")($scope.loan.dueDate);
                $scope.datePickerOptions = {
                    minDate: new Date(),
                    showWeeks: true
                };

                $scope.edit = function(){
                    if($scope.dueDate == "")
                        return;
                    apiService.updateLoan($scope.loan.loanId, $filter('date')($scope.dueDate, "dd/MM/yyyy")).then(function(){
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
        .filter('dateFromSting', function() {
            return function(dateString) {
                return Date.parse(dateString.substr(3,3)+dateString.substr(0,3)+dateString.substr(6,4));
            };
        })
})();