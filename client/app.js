var myApp = angular.module('myApp',['ngRoute','mwl.calendar']);

myApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
            controller:'EventsController',
            templateUrl: 'views/calendar.html'
         })
        .when('/event/add',{
            controller:'EventsController',
            templateUrl: 'views/add_event.html'
        })
        .when('/event/edit/:id',{
            controller:'EventController',
            templateUrl: 'views/edit_event.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});