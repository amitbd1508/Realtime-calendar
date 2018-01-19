var myApp = angular.module('myApp');

myApp.controller('EventsController', ['$scope', '$http', '$location', '$routeParams','moment', 'calendarConfig', function($scope, $http, $location, $routeParams,moment,  calendarConfig){
    console.log('EventsController loaded...');


    var  socket= io('http://localhost:9000/',{transports: ['websocket'], upgrade: false});

    console.log(socket);
    socket.on('reload', function(msg){
        console.log(msg);
        window.location.href='#/';

    });

    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    var actions = [{
        label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
        onClick: function(args) {
            console.log(args.calendarEvent);
        }
    }, {
        label: '<i class=\'glyphicon glyphicon-remove\'></i>',
        onClick: function(args) {
            //alert.show('Deleted', args.calendarEvent);
            console.log(args.calendarEvent);
        }
    }];

    $scope.cellIsOpen = true;


    $scope.eventClicked = function(event) {
        //alert.show('Clicked', event);
        console.log(event);
    };

    $scope.eventEdited = function(event) {
        //alert.show('Edited', event);
        console.log(event);
    };

    $scope.eventDeleted = function(event) {
        //alert.show('Deleted', event);
        console.log("Delete");
        console.log(event);
    };

    $scope.eventTimesChanged = function(event) {
        //alert.show('Dropped or resized', event);
        console.log(event);
    };

    $scope.toggle = function($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    $scope.timespanClicked = function(date, cell) {

        if ($scope.calendarView === 'month') {
            if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                $scope.cellIsOpen = false;
            } else {
                $scope.cellIsOpen = true;
                $scope.viewDate = date;
            }
        } else if ($scope.calendarView === 'year') {
            if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
                $scope.cellIsOpen = false;
            } else {
                $scope.cellIsOpen = true;
                $scope.viewDate = date;
            }
        }
    }
    console.log(moment());
    //api call for get all events
    $scope.getEvents = function(){

        $http({
            method: 'GET',
            url: '/api/v1/event'
        }).then(function (success){
            var response = success.data;
            console.log(success);
            for (let i = 0; i < response.length; i++) {

                $scope.events.push(
                    {
                        id: response[i]._id,
                        title: response[i].eventTitle,
                        color: calendarConfig.colorTypes.warning,
                        startsAt: moment(response[i].startsAt),
                        endsAt: moment(response[i].endsAt),
                        draggable: true,
                        resizable: true

                    }
                );
            }


        },function (error){
            console.log(error);
        });
    }



    //api call for add an event 
    $scope.addEvent = function(){
        console.log($scope.event);
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: $scope.event,
            url: '/api/v1/event'
        }).then(function (success){
            $scope.events = success.data;
            console.log(success);

            window.location.href='#/';
        },function (error){
            console.log(error);
        });
    }

    //api call for update an event 
    $scope.updateEvent = function(){
        var id = $routeParams.id;
        var newEvent={
            eventTitle: $scope.event.eventTitle,
            eventDescription: $scope.event.eventDescription,
            eventPlace: $scope.event.eventPlace,
            startsAt: new Date($scope.event.startsAt),
            endsAt: new Date($scope.event.endsAt),

        };
        console.log(newEvent);
        $http({
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            data: newEvent,
            url: '/api/v1/event/'+id
        }).then(function (success){
            $scope.events = success.data;
            console.log(success);
            window.location.href='#/';
        },function (error){
            console.log(error);
        });

    }

    $scope.getEvent = function(){
        var id = $routeParams.id;
        console.log(id);
        $http({
            method: 'GET',
            url: '/api/v1/event/'+id
        }).then(function (success){
            $scope.event = success.data;
            $scope.event.startsAt=moment(success.data.startsAt);
            $scope.event.endsAt=moment(success.data.endsAt);
            console.log(success);
        },function (error){
            console.log(error);
        });
    }
    $scope.removeEvent = function(id){
        console.log(id);
        $http({
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            url: '/api/v1/event/'+id
        }).then(function (success){
            $scope.events = success.data;
            console.log(success);
            window.location.href='#/';
        },function (error){
            console.log(error);
        });
    }
}]);