(function () {
    'use strict';

    angular.module('admisApp')
    	.service('apiService', ['$http','$q','appService', function($http,$q,$scope){
            var apiUrl = "http://54.93.171.44:8080/KomponentMis/api/";
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
                        $scope.showAlert("Du skal være logget ind");
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
                    return requestHandler($http.put(apiUrl+"Components/", {barcode: 0, status: 1, componentGroupId: groupId, componentNumber: number}));
                },
                updateComponent: function(barcode, data){
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
                    return requestHandler($http.post(apiUrl+"Loans/"+loanId, {dueDate: dueDate}));
                }
    		}
    	}])

})();