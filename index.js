var queue = require('./contact-request-queue.js');

let requests = new queue("");
console.log("done building")
requests.addContactRequestQueue({"one":"1111"});
//requests.addContactRequestQueue({"3333":"333"});
console.log(`Hello world: ${requests.log("queue!")}`); //write a response to the browser
console.log('Server started');