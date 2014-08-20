'use strict';
var deps = [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
];

angular.module('ppoApp', deps)
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    
        $locationProvider.html5Mode(true).hashPrefix('!');
    });
