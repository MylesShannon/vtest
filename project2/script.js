
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

    }
 
 
});




function exampleUsage() {

    var eventBus = new EventDispatcher();
    var greetToConsole = function(eventName, msg) { console.log("hello from " + msg); };
    var greetToAlert = function(eventName, msg) { alert("hello from " + msg); };
 

    eventBus.addListener("GeetEvent", greetToConsole);
    eventBus.addListener("GeetEvent", greetToAlert);

    eventBus.triggerEvent("GeetEvent", "volicon"); // will alert and print to console "hello from volicon"    
    eventBus.removeListener("GeetEvent", greetToAlert);
    eventBus.triggerEvent("GeetEvent", "your console"); // will only print to console...

}


exampleUsage();
