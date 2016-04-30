(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('LoansController', function($scope, apiService, $uibModal, $location){

            var groupNameMap = [];
            apiService.getLoans().then(function(loans){
                $scope.loans = loans;

                addComponentGroupNames();
            });
            apiService.getComponentGroups().then(function(componentGroups){
                console.log(componentGroups);

                for (var i = 0; i < componentGroups.length; i++) {
                    groupNameMap[componentGroups[i].componentGroupId] = componentGroups[i].name;
                }
                addComponentGroupNames();
            });


            function addComponentGroupNames(){
                if($scope.loans == undefined || groupNameMap.length == 0)
                    return;

                $scope.loans.forEach(function(loan){
                    loan.componentGroupName = groupNameMap[loan.componentGroupId];
                    loan.status = loan.deliveryDate == "" ? 1 : 0;
                });
            }

            $scope.loanSort = {
                active: true,
                inactive: false
            };
            $scope.$watchCollection('loanSort', function (sort) {
                for(var s in sort){
                    if(sort[s])
                        return;
                }
                sort.active = true;
            });


            $scope.openLoan = function(loan){
                $location.url("loans/"+loan.loanId);
            };



    	})

})();