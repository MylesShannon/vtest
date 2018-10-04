function printMyThisAndArgs() {
    console.log(this, arguments);
}
 
function proxyCall(func) {
    func();
}
 
var obj = {};
 


// Inplement a bind function similar to ( $.proxy and _.bind),
function bind(func, obj) {
    let prevArgs = [].slice.call(arguments, 2);
    return function() {
        let args = [].slice.call(arguments);
        return func.apply(obj, [].concat(prevArgs, args));
    }
};
 
// so that:                            
proxyCall(bind(printMyThisAndArgs, obj)); // obj  []                                              
bind(printMyThisAndArgs, obj)(1,2,3); // obj [1,2,3]
bind(printMyThisAndArgs, obj, 0)(1,2,3); // obj [0,1,2,3]