var myApp = angular.module('myApp');

myApp.controller('EventsController', ['$scope', '$http', '$location', '$routeParams','moment', 'calendarConfig', function($scope, $http, $location, $routeParams,moment,  calendarConfig){
    console.log('EventsController loaded...');

    
    
    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    var actions = [{
        label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
        onClick: function(args) {
            //alert.show('Edited', args.calendarEvent);
        }
    }, {
        label: '<i class=\'glyphicon glyphicon-remove\'></i>',
        onClick: function(args) {
            //alert.show('Deleted', args.calendarEvent);
        }
    }];
    $scope.events = [
        {
            title: 'An event',
            color: calendarConfig.colorTypes.warning,
            startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
            endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
            color: calendarConfig.colorTypes.info,
            startsAt: moment().subtract(1, 'day').toDate(),
            endsAt: moment().add(5, 'days').toDate(),
            draggable: true,
            resizable: true,
            actions: actions
        }, {
            title: 'This is a really long event title that occurs on every year',
            color: calendarConfig.colorTypes.important,
            startsAt: moment().startOf('day').add(7, 'hours').toDate(),
            endsAt: moment().startOf('day').add(19, 'hours').toDate(),
            recursOn: 'year',
            draggable: true,
            resizable: true,
            actions: actions
        }
    ];

    $scope.cellIsOpen = true;

    $scope.addEvent = function() {
        $scope.events.push({
            title: 'New event',
            startsAt: moment().startOf('day').toDate(),
            endsAt: moment().endOf('day').toDate(),
            color: calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
        });
    };

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
    
    //api call for get all events
    $scope.getEvents = function(){

        $http({
            method: 'GET',
            url: '/api/v1/event'
        }).then(function (success){
            $scope.events = success.data;
            console.log(success);
        },function (error){
            console.log(error);
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