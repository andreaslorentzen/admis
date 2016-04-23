(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('LoansController', function($scope, apiService, $uibModal, $location){
    		
    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

            apiService.getLoans().then(function(loans){
                $scope.loans = loans;
            });
            $scope.openLoan = function(loan){
                $location.url("loans/"+loan.loanId);
            };

    	})

})();