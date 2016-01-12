var IoServer = function(options) {
    var self = this;
    self.io = options.io;
    //server receives a connection
    self.io.on('connection', function(client) { //server receiving the event called 'connection'
        //server receives browsers 'notify-add-stock' message
        client.on('notify-add-stock', function(stock) {
            //server responds back with a message to the client
            client.broadcast.emit('notifyOf-add', stock);
        });

        client.on('notify-del-stock', function(stock) {
            //server responds back with a message to the client
            client.broadcast.emit('notifyOf-del', stock);
        });

    });
}

module.exports = IoServer;