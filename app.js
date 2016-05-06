(function () {
	'use strict';

	// module initializing
	angular.module('admisApp',['ui.bootstrap', 'ngRoute'])
		.config(function($locationProvider, $routeProvider){
			$locationProvider
				.html5Mode(true)
				.hashPrefix('!');

			$routeProvider
				.when('/login', {
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
})();