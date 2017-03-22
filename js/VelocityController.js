(function () {
    'use strict';

    angular.module('VelocityApp')
        .controller('VelocityController', VelocityController);

    VelocityController.$inject = ['VelocityService', '$scope'];

    function VelocityController(VelocityService, $scope) {
        var vm = this;
        vm.data = {};

        /******* INIT *******/
        init();

        /*** FUNCTIONS ***/
        function init() {
            VelocityService.getContacts().then(function (res) {
                vm.data.contacts = res.data;
            });
            VelocityService.getOutlets().then(function (res) {
                vm.data.outlets = {};
                res.data.forEach(function (item) {
                    vm.data.outlets[item.id] = item.name;
                });
            });
        }

    }


})();