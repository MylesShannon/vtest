
// Hey:) 
// Your task is to implement the observer (publish/subscribe) pattern in java script.
// Your code is expected to be "production quality", as good as you would expect in a popular JS library.
//  
//
// Note: Class.js, underscore, QUnit and sinon are included. 
//       feel free to use other TDD/BDD libs... oh and u can send us your tests :) 
//
//  


EventDispatcher = Class.extend({
 
    // constructor
    init : function() {
        this.events = {};
    },

    /**
     * 
     * Return all events
     *
     **/
    getEvents : function() {
        return this.events;
    },


    /**
     * 
     * Find and return event by name  
     *
     **/
    findEvent : function(eventName) {
        // Type check
        if(typeof eventName === "string") {
            return this.events[eventName.toLowerCase()] || this.events[eventName.toUpperCase()] || false;
        } else {
            throw Error("findEvent: requires event name")
        }
    },
   
 
    /**
     *  Subscribe to an event identified by eventName (which is a simple string).
     *
     *  Multiple listeners are allowed for a given event name.
     *  event names are not case sensitive ( "myEvent" is the same as "MYEVENT").
     *  
     *  @param {String} name for the event
     *  @param {Function} callback function
     *  @param {Object} optional context for callback (i,e the 'this' of the callback)
     *
     **/
    addListener : function(eventName, callback, context) {
        // Type check, context is optional 
        if(typeof eventName === "string" && typeof callback === "function" && context === undefined ? true : typeof context === "object") {
            // Persistent events are stored with a lower-case event name
            let persistentEventName = eventName.toLowerCase();
            // Check if the event already exists, if not, initialize it with an array
            this.events[persistentEventName] = this.events[persistentEventName] || [];
            // Bind the context to the listener if a context is provided, else just push the listener to the event
            if(context !== undefined) {
                this.events[persistentEventName].push(callback.bind(context));
            } else {
                this.events[persistentEventName].push(callback);
            }
        } else {
            throw Error("addListener: Missing event name and/or callback")
        }
    },
 
 
    /**
     *  Subscribe to an event, once.    
     *
     *  @param {String} name for the event
     *  @param {Function} callback function
     *  @param {Object} optional context for callback
     *
     **/
    addOneTimeListener : function(eventName, callback, context) {
        // Type check
        if(typeof eventName === "string" && typeof callback === "function") {
            // Temporary events are stored with an upper-case event name
            let temporaryEventName = eventName.toUpperCase();
            // Check if the event already exists, if not, initialize it with an array
            this.events[temporaryEventName] = this.events[temporaryEventName] || [];
            // Bind the context to the listener if a context is provided, else just push the listener to the event
            if(context !== undefined) {
                this.events[temporaryEventName].push(callback.bind(context));
            } else {
                this.events[temporaryEventName].push(callback);
            }
        } else {
            throw Error("addOneTimeListener: Missing event name and/or callback")
        }
    },
 
 
 
    /**
     *  Remove event listener(s). If callback is undefined all callbacks for that event will be removed.    
     *  
     *  @param {String} name for the event
     *  @param {Function} callback function, optional.
     *
     *  @throws Error if there are 0 listeners for this eventName.
     *
     **/
    removeListener : function(eventName, callback) {
        // Type check
        if(typeof eventName === "string" && callback === undefined ? true : typeof callback === "function") {
            let persistentEventName = eventName.toLowerCase();
            let temporaryEventName = eventName.toUpperCase();
            let remove = function(eventName) {
                // If a callback argument is provided, remove only that listener from the event, else remove the entire event
                if(callback !== undefined) {
                    for(let i = 0; i < this.events[eventName].length; i++) {
                        if(this.events[eventName][i] === callback) {
                            this.events[eventName].splice(i, 1);
                            break;
                        }
                    }
                } else {
                    delete this.events[eventName];
                }
            };

            // If either a temporary or persistent event exists, remove them both
            if(this.events[temporaryEventName] || this.events[persistentEventName]) {
                if(this.events[persistentEventName]) {
                    remove.call(this, persistentEventName);
                }
                if(this.events[temporaryEventName]) {
                    remove.call(this, temporaryEventName);
                }
                return;
            }

            throw Error("removeListener: No listeners for event");
        } else {
            throw Error("removeListener: Missing event name");
        }
    },
 
 
    /**
     *  call each listener for eventName, with eventName as the first parameter.
     *  Other optional parameters may follow.
     *
     *  @param {String} name for the event
     *  @param {Object} other optional parameters
     *
     *  @throws Error if there are 0 listeners for this eventName
     *
     **/
    triggerEvent : function(eventName, otherParams) {
        // If given more than one otherParam argument, make an array of them
        if(arguments.length > 2) {
            otherParams = [].slice.call(arguments, 1);
        }
        // Type check
        if(typeof eventName === "string") {
            let temporaryEventName = eventName.toUpperCase();
            let persistentEventName = eventName.toLowerCase();
            // If either a temporary or persistent event exists
            if(this.events[persistentEventName] || this.events[temporaryEventName]) {
                // If a persistent event exists, trigger its listeners
                if(this.events[persistentEventName]) {
                    for(let i = 0; i < this.events[persistentEventName].length; i++) {
                        this.events[persistentEventName][i](eventName, otherParams);
                    }
                }
                // If a temporary event exists, trigger its listeners, then remove that event
                if(this.events[temporaryEventName]) {
                    for(let i = 0; i < this.events[temporaryEventName].length; i++) {
                        this.events[temporaryEventName][i](eventName, otherParams);
                    }
                    delete this.events[temporaryEventName];
                }
                return;
            }
            
            throw Error("triggerEvent: No listeners for event");
        } else {
            throw Error("triggerEvent: Missing event name");
        }
    }
});
