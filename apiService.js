(function () {;
    'use strict'

    /*
     *  This angular service handles calls to the REST api.
     */
    angular.module('admisApp')
    	.service('apiService', ['$http','$q','$location','$rootScope', function($http,$q,$location,$rootScope){
            var apiUrl = "http://54.93.171.44:8080/KomponentMis/api/";
            var scope = $rootScope.$new(true);

            scope.token;
            if(typeof(Storage) !== "undefined")
                scope.token = window.localStorage.getItem("token");
            
            scope.$watch("token", function(token, oldToken){
                if(token){
                    if(typeof(Storage) !== "undefined")
                        window.localStorage.setItem("token",token);
                }
                else{
                    if(typeof(Storage) !== "undefined")
                        window.localStorage.removeItem("token");
                    if($location.url() != "/login/" || $location.url() != "/login")
                        $location.url("login");
                }
            });

            /*
             * Function handling the API call
             *
             */
            function requestHandler(method, uri, requestData, successFunction){
                var config = {
                    headers: {
                        "Access-token": scope.token
                    }
                };
                var httpPromise;
                switch(method.toLowerCase()){
                    case "get":
                        httpPromise = $http.get(apiUrl+uri,config);
                        break;
                    case "put":
                        httpPromise = $http.put(apiUrl+uri, requestData,config);
                        break;
                    case "post":
                        httpPromise = $http.post(apiUrl+uri, requestData,config);
                        break;
                    default:
                        return false;
                }

                var deferred = $q.defer();

                httpPromise.then(function(response){
                    if(response.status == 200){
                        deferred.resolve(successFunction ? successFunction(response) : response.data);
                    }
                    else{
                        deferred.reject(response);
                    }
                }, function(response){
                    if(response.status == 401 && uri != "Login"){
                        scope.token = undefined;
                        $location.url("/login");
                    }
                    deferred.reject(response);
                });

                return deferred.promise;
            };

    		return {
    			isLoggedIn: function(){
    				return scope.token != undefined;
    			},
                login: function(username, password){
                    return requestHandler("post", "Login", {username: username, password: password}, function(response){
                        if(response.status == 200 && response.data.hasOwnProperty("Access-token"))
                            scope.token = response.data['Access-token'];
                        return response;
                    });
                },
                logout: function(){
                    scope.token = undefined;
                    $location.url('login');
                },
    			getComponents: function(){
                    return requestHandler("get", "Components");
    			},
                getComponent: function(barcode){
                    return requestHandler("get", "Components/"+barcode);
                },
                createComponent: function(groupId, number){
                    return requestHandler("put", "Components/", {
                        barcode: 0,
                        status: 1,
                        componentGroupId: groupId,
                        componentNumber: number
                    });
                },
                updateComponent: function(barcode, data){
                    return requestHandler("post", "Components/"+barcode, data);
                },

    			getComponentGroups: function(){
                    return requestHandler("get", "ComponentGroups");
    			},
                getComponentGroup: function(groupId){
                    return requestHandler("get", "ComponentGroups/"+groupId);

                },
                createComponentGroup: function(name, standardLoanDuration){
                    return requestHandler("put", "ComponentGroups", {
                        componentGroupId: 0,
                        name: name,
                        standardLoanDuration: standardLoanDuration,
                        status: 1
                    });
                },
                updateComponentGroup: function(groupId, data){
                    return requestHandler("post", "ComponentGroups/"+groupId, data);
                },

                getStudents: function(){
                    return requestHandler("get", "Students");
                },
                getStudent: function(studentId){
                    return requestHandler("get", "Students/"+studentId);
                },
                getLoans: function(){
                    return requestHandler("get", "Loans");
                },
                getLoan: function(loanId){
                    return requestHandler("get", "Loans/"+loanId);
                },
                updateLoan: function(loanId, dueDate){
                    return requestHandler("post", "Loans/"+loanId, {dueDate: dueDate});
                }
    		}
    	}])

})();