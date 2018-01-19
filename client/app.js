var myApp = angular.module('myApp',['ngRoute','mwl.calendar','moment-picker']);

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
            controller:'EventsController',
            templateUrl: 'views/edit_event.html'
        })
        .when('/event/update/:id',{
            controller:'EventsController',
            templateUrl: 'views/event_update.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});