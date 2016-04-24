(function () {
    'use strict';

    angular.module('admisApp',['ui.bootstrap', 'ngRoute'])
    	.config(function($locationProvider, $routeProvider){
    		$locationProvider
				.html5Mode(true)
				.hashPrefix('!');

    		$routeProvider
			/*	.when('/', {
					templateUrl: 'front/front.html',
					controller: 'FrontController'
				})
			*/	.when('/login', {
					templateUrl: 'login/login.html',
					controller: 'LoginController'
				})
				.when('/components', {
					templateUrl: 'components/components.html',
					controller: 'ComponentsController'
				})
				.when('/components/group/:groupId', {
					templateUrl: 'group/group.html',
					controller: 'GroupController'
				})
				.when('/components/:barcode', {
					templateUrl: 'component/component.html',
					controller: 'ComponentController'
				})
				.when('/loans', {
					templateUrl: 'loans/loans.html',
					controller: 'LoansController'
				})
				.when('/loans/:loanId', {
					templateUrl: 'loan/loan.html',
					controller: 'LoanController'
				})
				.when('/students', {
					templateUrl: 'students/students.html',
					controller: 'StudentsController'
				})
				.when('/students/:studentId', {
					templateUrl: 'student/student.html',
					controller: 'StudentController'
				})
				.otherwise({
					redirectTo: '/components'
				});
    	})
    	.controller('AppController', function($scope, $location){
    		$scope.currentUri = function(){
    			return $location.url();
    		};
    		$scope.alerts = [];
    		$scope.showAlert = function(message, success){
    			$scope.alerts.push({message: message, type: (success ? "success": "danger")});
    		};
    		$scope.closeAlert = function(index){
    			$scope.alerts.splice(index, 1);
    		};
    	})

})();