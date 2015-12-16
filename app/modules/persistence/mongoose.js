module.exports = function(config) {
    var Event;
    var mongoose = require('mongoose');
    mongoose.connect(config.connection);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        var schema = mongoose.Schema({
            title: String,
            description: String,
            start: Date,
            end: Date,
            contact: {
                email: String
            }
        });
        if (!schema.options.toObject) schema.options.toObject = {};
        schema.options.toObject.transform = function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
        Event = mongoose.model('Event', schema);
    });
    var that = {};
    
    that.find = function() {
      var promise = new Promise(function(resolve, reject) {
          Event.find({}, function(error, events) {
              if(!events || error) {
                  reject(error);
                  return;
              }
              resolve(events.map(function(event) {
                  return event.toObject();
              }));  
          });
      });
      return promise;
    };
    
    that.retrieve = function(id) {
        var promise = new Promise(function(resolve, reject) {
            Event.findById(id, function(error, event) {
                if(!event || error) {
                    reject(error);
                    return;
                }
                resolve(event.toObject());
            });
        });
        return promise;
    };
    
    that.delete = function(id) {
        var promise = new Promise(function(resolve, reject) {
            Event.findByIdAndRemove(id, function(error, event) {
                if(!event || error) {
                    reject(error);
                    return;
                }
                resolve(event.toObject());
            });
        });
        return promise;
    };
    
    that.save = function(event) {
        var create = function(event, resolve, reject) {
            var createdEvent = new Event(event);
            createdEvent.save(function(error, savedEvent) {
                if(error) {
                    reject(error);
                    return;
                }
                resolve(savedEvent.toObject());
            });
            return createdEvent;
        };
        var promise = new Promise(function(resolve, reject) {
            if(!event._id) {
                create(event, resolve, reject);
                return;
            }
            Event.findByIdAndUpdate(event._id, {$set: event}, function(error, previous) {
               if(!previous || error) {
                   create(event, resolve);
                   return;
               }
               resolve(event);
            });
        });
        return promise;        
    };
    
    return that;
};