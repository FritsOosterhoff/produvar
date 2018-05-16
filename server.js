var http = require('http');

var server = http.createServer(function(request, response){

});

server.listen(1234, function(){
  console.log((new Date()) + ' Server is listening on port 1234');
});


var WebSocketServer = require('websocket').server;

wsocketserver = new WebSocketServer({
  httpServer:server
});

var count = 0;
var clients = {};

wsocketserver.on('request', function(request){

  var connection = request.accept('echo-protocol', request.origin);
  var id = count++;
  clients[id] = connection;

  connection.on('message', function(message) {
    var msgString = message.utf8Data;
    for(var i in clients){
      clients[i].sendUTF(msgString);
    }
  });


  connection.on('close', function(reasonCode, description) {
    delete clients[id];
  });

});
