/*
* App running on 8000 port
* 
* 
* API Description
* GET : /api/v1/event  get all event 
* POST : /api/v1/event  create an event 
* PUT :/api/v1/event/:_id   update an event by id
* DELETE :/api/v1/event/:_id   delete an event by id
* 
* 
* */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

Event =require('./models/event');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/realtime_event_calendar');
var db = mongoose.connection;

var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 9000;

// allow acces a spacific connection from client
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


io.on('connection', function(socket){
    console.log("connected");

});
//soket initialization
http.listen(port, function(){
    console.log('listening on *:' + port);
});



//when  make a bad request
app.get('/', (req, res) => {
    res.send('Please use /api/v1/event');
});
app.get('/api/v1/event', (req, res) => {
    Event.getEvents((err, event) => {
        if(err){
            throw err;
        }
        res.json(event);
    });
});
app.post('/api/v1/event', (req, res) => {
    let event =req.body;
    Event.addEvent(event, (err, event) => {
        if(err){
            throw err;
        }
        res.json(event);
        io.emit('reload', 'reload');

    });


});

app.put('/api/v1/event/:_id', (req, res) => {
    var id = req.params._id;
    var event = req.body;
    console.log(event);
    console.log(id);

    Event.updateEvent(id, event, {}, (err, event) => {
        if(err){
            throw new Error(err.toLocaleString());
        }

        res.json({'status':'sucess'});
        io.emit('reload', 'reload');
    });

});

app.delete('/api/v1/event/:_id', (req, res) => {
    var id = req.params._id;
    Event.removeEvent(id, (err, event) => {
        if(err){
            throw err;
        }
        res.json({'status':'sucess'});
        io.emit('reload', 'reload');
    });
});
app.get('/api/v1/event/:_id', (req, res) => {
    Event.getEventById(req.params._id, (err, event) => {
        if(err){
            throw err;
        }
        res.json(event);
    });
});


app.listen(8000);
console.log("Running on port 8000");

