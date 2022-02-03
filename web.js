var queue = require('./contact-request-queue.js');
var http = require('http');

//Create a server 
http.createServer(function (req, res) {
  var requests = new queue("");
  // requests.addContactRequestQueue({"one":"1111"});
  // requests.addContactRequestQueue({"another":"222"});
  let item = requests.dequeueContactRequest();
  if (item == null){
    console.log('dequeued: empty-queue')
  }
  else{
    console.log(`dequeued: ${JSON.stringify(item)}`)
  }
  //requests.addContactRequestQueue({"3333":"333"});
  res.write(`Hello world: ${requests.log("queue!")}`); //write a response to the browser
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080 

console.log('Server started');