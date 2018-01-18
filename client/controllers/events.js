var myApp = angular.module('myApp');

myApp.controller('EventsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('EventsController loaded...');

    //api call for get all events
    $scope.getEvents = function(){
        $http.get('/api/v1/event').success(function(response){
            $scope.events = response;
        });
    }

    //api call for get a spacific event
    $scope.getEvent = function(){
        var id = $routeParams.id;
        $http.get('/api/v1/event/'+id).success(function(response){
            $scope.event = response;
        });
    }

    //api call for add an event 
    $scope.addEvent = function(){
        console.log($scope.event);
        $http.post('/api/v1/event/', $scope.event).success(function(response){
            window.location.href='#/';
        });
    }

    //api call for update an event 
    $scope.updateEvent = function(){
        var id = $routeParams.id;
        $http.put('/api/v1/event/'+id, $scope.event).success(function(response){
            window.location.href='#/';
        });
    }

    $scope.removeEvent = function(id){
        $http.delete('/api/v1/event/'+id).success(function(response){
            window.location.href='#/';
        });
    }
}]);