(function () {
    'use strict';

    angular.module('admisApp')
    	.service('apiService', ['$http','$q', function($http,$q){
            var groups = [
                {
                    componentGroupId: 1,
                    name: "RFID Reader",
                    status: 0,
                    components: [
                        {
                            componentId: 1,
                            barcode: 2321232,
                            group: "RFID Reader",
                            number: "001",
                            status: 0
                        },
                        {
                            componentId: 2,
                            barcode: 2321231,
                            group: "RFID Reader",
                            number: "002",
                            status: 1,
                            studentId: "s144886"
                        },
                        {
                            componentId: 3,
                            barcode: 2321233,
                            group: "RFID Reader",
                            number: "003",
                            status: 1
                        },
                        {
                            componentId: 4,
                            barcode: 2328232,
                            group: "RFID Reader",
                            number: "004",
                            status: 0
                        },
                        {
                            componentId: 5,
                            barcode: 2561232,
                            group: "RFID Reader",
                            number: "005",
                            status: 0
                        },
                        {
                            componentId: 6,
                            barcode: 2323732,
                            group: "RFID Reader",
                            number: "006",
                            status: 0
                        },
                        {
                            componentId: 7,
                            barcode: 2329632,
                            group: "RFID Reader",
                            number: "007",
                            status: 0
                        },
                        {
                            componentId: 8,
                            barcode: 2303432,
                            group: "RFID Reader",
                            number: "008",
                            status: 0
                        }
                    ]
                },
                {
                    componentGroupId: 2,
                    status: 1,
                    name: "VGA HDMI Adapter",
                    standardLoanTime: 1000,
                    components: []
                },
                {
                    componentGroupId: 3,
                    name: "Zypo board",
                    status: 1,
                    components: []
                }
            ];
            var students = [
                {
                    studentId: "s144886",
                    name: "Andreas",
                    status: 1
                },
                {
                    studentId: "s144880",
                    name: "Thomas"
                }
            ];
            var loans = [
                {
                    loanId: "0",
                    componentId: "0",
                    studentId: "s144886",
                    loanDate: "12",
                    dueDate: "12",
                    deliveryDate: "12",
                    deliveredTo: "12",
                },
                {
                    loanId: "1",
                    componentId: "1",
                    studentId: "s144880",
                    loanDate: "13",
                    dueDate: "13",
                    deliveryDate: "13",
                    deliveredTo: "13",
                }
            ];

            var apiUrl = "http://localhost:8081/sda/api";
            var token;
            if(typeof(Storage) !== "undefined") {
                token = window.localStorage.getItem("token");
            }

            function requestHandler(httpPromise, successFunction){
                var deferred = $q.defer();

                httpPromise.then(function(response){
                    if(response.status == 200){
                        deferred.resolve(successFunction ? successFunction() : response.data);
                    }
                    else{
                        deferred.reject(response);
                    }
                }, function(response){
                    deferred.reject(response);
                });

                return deferred.promise;
            };

    		return {
    			isLoggedIn: function(){
    				return false;
    			},
                login: function(username, password){
                    return requestHandler($http.post(apiUrl+"login", {username: username, password: password}), function(response){
                        token = response.data.token;
                        if(typeof(Storage) !== "undefined") {
                            window.localStorage.setItem("token",token);
                        }
                        return {};
                    });
                },
    			getComponents: function(){
    				var deferred = $q.defer();

                    var components2 = [];

                    for (var g = 0; g < groups.length; g++) {
                        angular.extend(components2, groups[g].components);
                    }

    				deferred.resolve(components2);

					return deferred.promise;

    			},
                getComponent: function(componentId){
                    var deferred = $q.defer();

                    deferred.resolve(groups[0].components[componentId-1]);

                    return deferred.promise;

                },
                createComponent: function(groupId, number){
                    var deferred = $q.defer();

                    groups[groupId-1].components.push({
                        componentId: groups[groupId-1].components.length+1,
                        barcode: parseInt(Math.random()*100000000),
                        number: number,
                        status: 0
                    });

                    deferred.resolve();

                    return deferred.promise;

                },
                updateComponent: function(componentId, data){
                    var deferred = $q.defer();

                    deferred.resolve();

                    return deferred.promise;

                },
    			getComponentGroups: function(){
    				var deferred = $q.defer();

    				deferred.resolve(
    					angular.copy(groups)
    				);

					return deferred.promise;

    			},
                getComponentGroup: function(groupId){
                    var deferred = $q.defer();

                    var group = angular.copy(groups[groupId-1]);
                    deferred.resolve(
                        group
                    );

                    return deferred.promise;

                },
                createComponentGroup: function(name){
                    var deferred = $q.defer();

                    groups.push({
                        name: name,
                        status: 1,
                        components: []
                    });
                    deferred.resolve(groups.length);

                    return deferred.promise;
                },
                updateComponentGroup: function(groupId, data){
                    var deferred = $q.defer();

                    deferred.resolve(groups.length);

                    return deferred.promise;
                },
                getStudents: function(){
                    var deferred = $q.defer();

                    deferred.resolve(
                        angular.copy(students)
                    );

                    return deferred.promise;
                },
                getLoans: function(){
                    var deferred = $q.defer();

                    deferred.resolve(
                        angular.copy(loans)
                    );

                    return deferred.promise;
                },
                getLoan: function(loanId){
                    var deferred = $q.defer();
                    var found = false;
                    for (var i = 0; i < loans.length; i++) {
                        if(loans[i].loanId == loanId){
                            deferred.resolve(
                                angular.copy(loans[i])
                            );
                            found = true;
                            break;
                        }
                    }
                    if(!found)
                        deferred.reject();

                    return deferred.promise;
                },
                updateLoan: function(loanId, dueDate){
                    var deferred = $q.defer();

                    
                    deferred.resolve();

                    return deferred.promise;
                },
                getStudent: function(studentId){
                    var deferred = $q.defer();
                    var found = false;
                    for (var i = 0; i < students.length; i++) {
                        if(students[i].studentId == studentId){
                            deferred.resolve(
                                angular.copy(students[i])
                            );
                            found = true;
                            break;
                        }
                    }
                    if(!found)
                        deferred.reject();

                    return deferred.promise;
                }
    		}
    	}])

})();