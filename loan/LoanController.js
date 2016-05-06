(function () {
	'use strict';

	angular.module('admisApp')
		.controller('LoanController', function($scope, apiService, $uibModal, $location, $routeParams, $filter){
			
			var loanId = $routeParams.loanId;
			
            function update(){
                apiService.getLoan(loanId).then(function(loan){
                    $scope.loan = loan;
                }, function(response){
                    switch (response.status){
                        case 404:
                        case 405:
                            $scope.showAlert("Ugyldigt lån");
                            $location.url("/components");
                            break;
                        default: 
                            $scope.showAlert("Kunne ikke hente oplysninger om lån");
                            break;
                    }
                });
            }
			update();

            // Open edit dialog for updateing the due date
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

            // Dialog controller
            function ModalEditLoanController($scope, $uibModalInstance, $filter){
                $scope.dueDate = $filter("dateFromSting")($scope.loan.dueDate);
                // config object for bootstrap datepicker
                $scope.datePickerOptions = {
                    minDate: new Date(),
                    showWeeks: true
                };

                $scope.edit = function(){
                    if($scope.dueDate == "")
                        return;
                    apiService.updateLoan($scope.loan.loanId, $filter('date')($scope.dueDate, "dd/MM/yyyy")).then(function(){
                        $uibModalInstance.close();
                        $scope.showAlert("Afleveringsdato opdateret", 'success');
                    }, function(response){
                        $scope.showAlert("Kunne ikke opdatere afleveringsdato");
                    });
                };
                $scope.cancel = function(){
                    $uibModalInstance.dismiss();
                };
            };
		})
        .filter('dateFromSting', function() {
            // filter for converting the date format from the server to a Date object
            return function(dateString) {
                return Date.parse(dateString.substr(3,3)+dateString.substr(0,3)+dateString.substr(6,4));
            };
        })
})();