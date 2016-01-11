require.config({
    paths: {
        'jquery': 'libs/jquery/dist/jquery',
        'bootstrap-js': 'libs/bootstrap/dist/js/bootstrap',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'text': 'libs/text/text',
        'chart-js': 'libs/Chart.js/Chart.min',
        'socketIO': "socket.io/socket.io"
    },
    shim: {
        'underscore': {
            exports: '_' 
        },
        'bootstrap-js': {
            deps: ['jquery'],
            exports: 'bootstrap_js'
        },
        'chart-js': {
            exports: 'Chart'
        },
        'socketIO': {
            exports: 'io'
        }
    }
});

require(['jquery', 'bootstrap-js', 'underscore', 'backbone', 'chart-js', 'socketIO', 'eventBus', 'src/views/home'], function($, bootstrap_js, _, Backbone, Chart, io, EventBus, HomeView) {
    $(function() {
        var socket = io.connect('https://stocks-app-autumncat.c9users.io/');
        socket.on('connect', function(data) {

            EventBus.on('add-notify', function(stock) {
                socket.emit('notify-add-stock', stock);
            });

            EventBus.on('del-notify', function(stock) {
                console.log('socket is emitting noti-del-stock');
                socket.emit('notify-del-stock', stock);
            });

            socket.on('notifyOf-add', function(stock) { //received a message from server
                EventBus.trigger('stocks:addStock', stock);
            });

            socket.on('notifyOf-del', function(stock) {
                EventBus.trigger('stocks:delStock', stock);
            });
        });
        var homeView = new HomeView();
    });
});