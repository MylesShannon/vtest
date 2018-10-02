function printMyThisAndArgs() {
    console.log(this, arguments);
}
 
function proxyCall(func) {
    func();
}
 
var obj = {};
 

 
// Inplement a bind function similar to ( $.proxy and _.bind),
function bind(func, obj) {
    throw Error("Not Implemented!");
}
 
// so that:                            
proxyCall(bind(printMyThisAndArgs, obj)); // obj  []                                              
bind(printMyThisAndArgs, obj)(1,2,3); // obj [1,2,3]
