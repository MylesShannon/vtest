QUnit.module("EventDispacher")

QUnit.test("Add a listener and trigger it", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addListener("TestEvent", function(eventName, msg) {
        assert.strictEqual(undefined, msg);
        assert.strictEqual("TestEvent", eventName);
    });
    eventBus.triggerEvent("TestEvent");
    assert.expect(2);
});

QUnit.test("Add a listener and trigger it with an argument", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addListener("TestEvent", function(eventName, msg) {
        assert.strictEqual("TestEvent", eventName);
        assert.strictEqual("This is only a test!", msg);
    });
    eventBus.triggerEvent("TestEvent", "This is only a test!");
    assert.expect(2);
});

QUnit.test("Add a listener and trigger it with multiple arguments", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addListener("TestEvent", function(eventName, msg) {
        assert.strictEqual("This is only a test! This is also only a test!", msg[0]+" "+msg[1]);
        assert.strictEqual("TestEvent", eventName);
    });
    eventBus.triggerEvent("TestEvent", "This is only a test!", "This is also only a test!");
    assert.expect(2);
});

QUnit.test("Add a listener and trigger it with an array", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addListener("TestEvent", function(eventName, msg) {
        assert.strictEqual("This is only a test! This is also only a test!", msg[0]+" "+msg[1]);
        assert.strictEqual("TestEvent", eventName);
    });
    eventBus.triggerEvent("TestEvent", ["This is only a test!", "This is also only a test!"]);
    assert.expect(2);
});

QUnit.test("Add two listener, trigger both, remove one, trigger the last one again", function(assert) {
    var eventBus = new EventDispatcher();
    var greet = function(eventName, msg) {
        assert.step("hello from " + msg);
    };
    var earthToo = function(eventName, msg) {
        assert.step("hello from " + msg + " and Earth");
    };

    eventBus.addListener("GeetEvent", greet);
    eventBus.addListener("GeetEvent", earthToo);
    eventBus.triggerEvent("GeetEvent", "Volicon");
    eventBus.removeListener("GeetEvent", earthToo);
    eventBus.triggerEvent("GeetEvent", "Volicon");

    assert.verifySteps(["hello from Volicon", "hello from Volicon and Earth", "hello from Volicon"]);
});

QUnit.test("Add a listener, trigger it, remove it, add two listeners, trigger them both", function(assert) {
    let eventBus = new EventDispatcher();
    let test = function(eventName, msg) {
        assert.step(msg);
    };
    eventBus.addListener("TestEvent", test);
    eventBus.triggerEvent("TestEvent", "1");
    eventBus.removeListener("TestEvent");
    eventBus.addListener("TestEvent", test);
    eventBus.addListener("TestEvent", test);
    eventBus.triggerEvent("TestEvent", "2");
    assert.verifySteps(["1", "2", "2"]);
});

QUnit.test("Add a one-time listener, trigger it, and check if it still exists", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addOneTimeListener("TestEvent", function(eventName, msg) {
        assert.strictEqual("This is only a test!", msg);
    });
    eventBus.triggerEvent("TestEvent", "This is only a test!");
    assert.notStrictEqual(eventBus.findEvent("TestEvent"));
    assert.expect(2);
});

QUnit.test("Add three one-time listeners, trigger them, and check if they still exist", function(assert) {
    let eventBus = new EventDispatcher();
    let test = function(eventName, msg) {
        assert.strictEqual("This is only a test!", msg);
    };
    eventBus.addOneTimeListener("TestEvent", test);
    eventBus.addOneTimeListener("TestEvent", test);
    eventBus.addOneTimeListener("TestEvent", test);
    eventBus.triggerEvent("TestEvent", "This is only a test!");
    assert.notStrictEqual(eventBus.findEvent("TestEvent"));
    assert.expect(4);
});

QUnit.test("Add two listeners and two one-time listeners, then remove the first two", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addListener("TestEvent", function() {});
    eventBus.addOneTimeListener("TestEvent", function() {});
    eventBus.addListener("AnotherTestEvent", function() {});
    eventBus.addOneTimeListener("AnotherTestEvent", function() {});
    eventBus.removeListener("TestEvent");
    assert.strictEqual(_.size(eventBus.getEvents()), 2);
    assert.expect(1);
});

QUnit.test("Check that event names are not case-sensitive", function(assert) {
    let eventBus = new EventDispatcher();
    let test = function(eventName, msg) {
        assert.strictEqual("This is only a test!", msg);
    };
    eventBus.addListener("TestEvent", test);
    eventBus.addListener("tesTevenT", test);
    eventBus.triggerEvent("TESTEVENT", "This is only a test!");
    eventBus.triggerEvent("testevent", "This is only a test!");
    assert.expect(4);
});

QUnit.test("Add a listener with context and trigger it, check that context persists", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addListener(
        "TestEvent",
        function(eventName, msg) {
            assert.strictEqual("TestEvent", eventName);
            assert.strictEqual("Welcome to Boston!", msg+this.city+"!");
        },
        {
            city: "Boston"
        }
    );
    eventBus.triggerEvent("TestEvent", "Welcome to ");
    assert.expect(2);
});

QUnit.test("Add a one-time listener with context, trigger it, and check if it still exists", function(assert) {
    let eventBus = new EventDispatcher();
    eventBus.addOneTimeListener(
        "TestEvent", 
        function(eventName, msg) {
            assert.strictEqual("TestEvent", eventName);
            assert.strictEqual("Hello, my name is Rick Astley", msg+this.firstName+" "+this.lastName);
        },
        {
            firstName: "Rick",
            lastName: "Astley"
        }
    );
    eventBus.triggerEvent("TestEvent", "Hello, my name is ");
    assert.notStrictEqual(eventBus.findEvent("TestEvent"));
    assert.expect(3);
});

QUnit.test("Add a listener and a one-time listener to an event, trigger them both twice, check that one remains", function(assert) {
    let eventBus = new EventDispatcher();
    let test = function(eventName, msg) {
        assert.step(msg);
    };
    eventBus.addListener("TestEvent", test);
    eventBus.addOneTimeListener("TestEvent", test);
    eventBus.triggerEvent("TestEvent", "1");
    eventBus.triggerEvent("TestEvent", "2");
    
    assert.strictEqual(_.size(eventBus.getEvents()), 1);
    assert.verifySteps(["1", "1", "2"]);
    assert.expect(5);
});

QUnit.test("Malformed event name", function(assert) {
    let eventBus = new EventDispatcher();
    let test = function() {
        eventBus.addListener(
            1234,
            function() {}
        );
    };
    assert.throws(test);
    assert.expect(1);
});

QUnit.test("Malformed callback", function(assert) {
    let eventBus = new EventDispatcher();
    let test = function() {
        eventBus.addListener(
            "TestEvent", 
            1234
        );
    };
    assert.throws(test);
    assert.expect(1);
});

QUnit.test("Malformed context", function(assert) {
    let eventBus = new EventDispatcher();
    let test = function() {
        eventBus.addListener(
            "TestEvent", 
            function() {},
            1234
        );
    };
    assert.throws(test);
    assert.expect(1);
});
