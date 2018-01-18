const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Event =require('./models/event');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/realtime_event_calendar');
var db = mongoose.connection;


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
    });
});

app.put('/api/v1/event:_id', (req, res) => {
    var id = req.params._id;
    var event = req.body;
    console.log(event);
    console.log(id);
    Event.updateEvent(id, event, {}, (err, event) => {
        if(err){
            throw new Error(err.toLocaleString());
        }
        res.json(event);
    });
});

app.delete('/api/v1/event:_id', (req, res) => {
    var id = req.params._id;
    Event.removeEvent(id, (err, event) => {
        if(err){
            throw err;
        }
        res.json(event);
    });
});
/*@Todo: commanting and varivy body
*
* */
app.listen(3000);
console.log("Running on port 3000");
