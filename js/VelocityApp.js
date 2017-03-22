(function(){
    'use strict';

    var app = angular.module('VelocityApp', ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'VelocityController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

})();

