var IoServer = function(options) {
    var self = this;
    self.io = options.io;
    self.io.on('connection', function(client) { 
        client.on('notify-add-stock', function(stock) {
            client.broadcast.emit('notifyOf-add', stock);
        });

        client.on('notify-del-stock', function(stock) {
            client.broadcast.emit('notifyOf-del', stock);
        });
    });
}

module.exports = IoServer;