(function () {
    'use strict';

    angular.module('mainApp')
    	.service('apiService', ['$http','$q', function($http,$q){
            var groups = [
                {
                    name: "RFID Reader",
                    components: [
                        {
                            barcode: 2321232,
                            group: "RFID Reader",
                            number: "001"
                        },
                        {
                            barcode: 2321231,
                            group: "RFID Reader",
                            number: "002"
                        },
                        {
                            barcode: 2321233,
                            group: "RFID Reader",
                            number: "003"
                        },
                        {
                            barcode: 2328232,
                            group: "RFID Reader",
                            number: "004"
                        },
                        {
                            barcode: 2561232,
                            group: "RFID Reader",
                            number: "005"
                        },
                        {
                            barcode: 2323732,
                            group: "RFID Reader",
                            number: "006"
                        },
                        {
                            barcode: 2329632,
                            group: "RFID Reader",
                            number: "007"
                        },
                        {
                            barcode: 2303432,
                            group: "RFID Reader",
                            number: "008"
                        }
                    ]
                },
                {
                    name: "VGA HDMI Adapter",
                },
                {
                    name: "Zypo board",
                }
            ];
    		return {
    			isLoggedIn: function(){
    				return true;
    			},
    			getComponents: function(){
    				var deferred = $q.defer();

                    var components2 = [];

                    angular.extend(components2, groups[0])

    				deferred.resolve(components2);

					return deferred.promise;

    			},
                createComponent: function(groupId, number){
                    var deferred = $q.defer();

                    groups[groupId-1].components.push({
                        barcode: 8372939,
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
                }
    		}
    	}])

})();