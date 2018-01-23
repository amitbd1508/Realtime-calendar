/*
* Model for Event 
* 
* eventTitle
* eventDescription
* eventPlace
* eventTime
* eventCreateDate
* eventModifiedDate
 */

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


    startsAt:{
        type:Date,
        default: Date.now()
    },
    endsAt:{
        type:Date,
        default :Date.now()
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


module.exports.getEventById=function(id,callback){
    Event.findById(id,callback);

}

module.exports.getEvents=function(callback,limit){
    Event.find(callback).limit(limit);

}
module.exports.addEvent=function(event,callback){
    Event.create(event,callback);

}

/*
* @TODO here i need to work with modified date
* */
module.exports.updateEvent = (id, event, options, callback) => {
    var query = {_id: id};
    var update = {
        eventTitle: event.eventTitle,
        eventDescription: event.eventDescription,
        eventPlace: event.eventPlace,
        eventDate: event.eventDate,
        eventCreateDate: event.eventCreateDate,
        startsAt: event.startsAt,
        endsAt: event.endsAt
        
    }
    Event.findOneAndUpdate(query, update, options, callback);
}

module.exports.removeEvent = (id, callback) => {
    var query = {_id: id};
    Event.remove(query, callback);
}
