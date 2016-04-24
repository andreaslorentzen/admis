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

            var apiUrl = "http://localhost:8080/komponentMis/api/";
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
                    if(response.status == 401){
                        $location.url("/login");
                    }
                    deferred.reject(response);
                });

                return deferred.promise;
            };

    		return {
    			isLoggedIn: function(){
    				return true;
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
                    return requestHandler($http.get(apiUrl+"Components"));
    			},
                getComponent: function(barcode){
                    return requestHandler($http.get(apiUrl+"Components/"+barcode));
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
                    return requestHandler($http.post(apiUrl+"Components/", {groupId: groupId, number: number}));

                },
                updateComponent: function(barcode, data){
                    var deferred = $q.defer();

                    deferred.resolve();

                    return deferred.promise;
                    return requestHandler($http.post(apiUrl+"Components/"+barcode, data));
                },
    			getComponentGroups: function(){
                    return requestHandler($http.get(apiUrl+"ComponentGroups"));

    			},
                getComponentGroup: function(groupId){
                    return requestHandler($http.get(apiUrl+"ComponentGroups/"+groupId));

                },
                createComponentGroup: function(name){
                    return requestHandler($http.put(apiUrl+"ComponentGroups", {
                        componentGroupId: 0,
                        name: name,
                        standardLoanDuration: 100,
                        status: 1
                    }));

                },
                updateComponentGroup: function(groupId, data){
                    var deferred = $q.defer();

                    deferred.resolve(groups.length);

                    return deferred.promise;
                    return requestHandler($http.post(apiUrl+"ComponentGroups/"+groupId, data));
                },
                getStudents: function(){
                    return requestHandler($http.get(apiUrl+"Students"));
                },
                getStudent: function(studentId){
                    return requestHandler($http.get(apiUrl+"Students/"+studentId));
                },
                getLoans: function(){
                    return requestHandler($http.get(apiUrl+"Loans"));
                },
                getLoan: function(loanId){
                    return requestHandler($http.get(apiUrl+"Loans/"+loanId));
                },
                updateLoan: function(loanId, dueDate){
                    var deferred = $q.defer();

                    
                    deferred.resolve();

                    return deferred.promise;
                    return requestHandler($http.post(apiUrl+"Loans/"+loanId, {dueDate: dueDate}));
                }
    		}
    	}])

})();