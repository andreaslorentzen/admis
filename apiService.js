(function () {
    'use strict';

    angular.module('mainApp')
    	.service('apiService', ['$http','$q', function($http,$q){
            var groups = [
                {
                    componentGroupId: 1,
                    name: "RFID Reader",
                    components: [
                        {
                            componentId: 1,
                            barcode: 2321232,
                            group: "RFID Reader",
                            number: "001"
                        },
                        {
                            componentId: 2,
                            barcode: 2321231,
                            group: "RFID Reader",
                            number: "002"
                        },
                        {
                            componentId: 3,
                            barcode: 2321233,
                            group: "RFID Reader",
                            number: "003"
                        },
                        {
                            componentId: 4,
                            barcode: 2328232,
                            group: "RFID Reader",
                            number: "004"
                        },
                        {
                            componentId: 5,
                            barcode: 2561232,
                            group: "RFID Reader",
                            number: "005"
                        },
                        {
                            componentId: 6,
                            barcode: 2323732,
                            group: "RFID Reader",
                            number: "006"
                        },
                        {
                            componentId: 7,
                            barcode: 2329632,
                            group: "RFID Reader",
                            number: "007"
                        },
                        {
                            componentId: 8,
                            barcode: 2303432,
                            group: "RFID Reader",
                            number: "008"
                        }
                    ]
                },
                {
                    componentGroupId: 2,
                    name: "VGA HDMI Adapter",
                    components: []
                },
                {
                    componentGroupId: 3,
                    name: "Zypo board",
                    components: []
                }
            ];
            var students = [
                {
                    studentId: "s144886",
                    name: "Andreas"
                },
                {
                    studentId: "s144880",
                    name: "Thomas"
                }
            ];
    		return {
    			isLoggedIn: function(){
    				return true;
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
                createComponent: function(groupId, number){
                    var deferred = $q.defer();

                    groups[groupId-1].components.push({
                        barcode: parseInt(Math.random()*100000000),
                        number: number
                    });

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
                        components: []
                    });
                    deferred.resolve(groups.length);

                    return deferred.promise;
                },
                getStudents: function(){
                    var deferred = $q.defer();

                    deferred.resolve(
                        angular.copy(students)
                    );

                    return deferred.promise;
                }
    		}
    	}])

})();