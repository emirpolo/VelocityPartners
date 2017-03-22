(function () {
    'use strict';
    var SERVER = 'json/';

    angular.module('VelocityApp')
        .factory('VelocityService', VelocityService);

    VelocityService.$inject = ['$http'];

    function VelocityService($http) {
        return {
            getContacts: getContacts,
            getOutlets: getOutlets,
        }

        function getContacts() {
            return $http.get(SERVER + 'Contacts.json');
        }

        function getOutlets() {
            return $http.get(SERVER + 'Outlets.json');
        }
    }

})();