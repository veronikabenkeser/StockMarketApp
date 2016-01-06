var IoServer = function(options){
    var self=this;
    self.io=options.io;
//server receives a connection
self.io.on('connection', function(client) {  //server receiving the event called 'connection'
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        client.emit('messages', 'Hello from server');
    });
});
}

module.exports = IoServer;