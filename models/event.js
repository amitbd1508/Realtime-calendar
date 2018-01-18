var mongoose=require('mongoose');

//event schema
var eventSchema=mongoose.Schema({
    eventTitle:{
        type: String,
        require: true
    },
    eventDescription:{
        type: String,
        require: true
    },
    eventPlace:{
        type:String
    },
    eventTime:{
      type : String,
      require: true
    },
    eventCreateDate:{
        type : Date,
        default : Date.now
    },
    eventModifiedDate:{
        type : Date,
        default : Date.now
    }

});
var Event =module.exports=mongoose.model('Event',eventSchema);

//get genres
module.exports.getEventById=function(id,callback){
    Event.findById(id,callback);

}
module.exports.getEvents=function(callback,limit){
    Event.find(callback).limit(limit);

}
module.exports.addEvent=function(event,callback){
    Event.create(event,callback);

}

module.exports.updateEvent = (id, event, options, callback) => {
    var query = {_id: id};
    var update = {
        eventTitle: event.eventTitle,
        eventDescription: event.eventDescription,
        eventPlace: event.eventPlace,
        eventDate: event.eventDate,
        eventCreateDate: event.eventCreateDate
        
    }
    Event.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeEvent = (id, callback) => {
    var query = {_id: id};
    Event.remove(query, callback);
}
