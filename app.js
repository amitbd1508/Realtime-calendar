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

//socket variable
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT||9000;

Event =require('./models/event');

// Connect to Mongoose
mongoose.connect('mongodb://admin:admin@ds223609.mlab.com:23609/my-mongdb');
var db = mongoose.connection;



// allow acces a spacific connection from client
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
app.use(bodyParser.json());
app.use(express.static(__dirname+'/client')); //client dir


//on new connection
io.on('connection', function(socket){
    console.log("connected");

});

//soket initialization
http.listen(port, function(){
    console.log('Socket listening on *:' + port);
});

/*
* @Todo check for missing param in api
* */
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
        res.json({'status':'success'});
        io.emit('reload', 'reload');

    });


});

app.put('/api/v1/event/:_id', (req, res) => {
    var id = req.params._id;
    var event = req.body;

    Event.updateEvent(id, event, {}, (err, event) => {
        if(err){
            throw new Error(err.toLocaleString());
        }

        res.json({'status':'success'});
        io.emit('reload', 'reload');
    });

});

app.delete('/api/v1/event/:_id', (req, res) => {
    var id = req.params._id;
    Event.removeEvent(id, (err, event) => {
        if(err){
            throw err;
        }
        res.json({'status':'success'});
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



console.log("Running on port 8000");

