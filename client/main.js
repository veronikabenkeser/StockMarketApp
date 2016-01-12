require.config({
    paths: {
        'jquery': 'libs/jquery/dist/jquery',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'text': 'libs/text/text',
        'chart-js': 'libs/Chart.js/Chart.min',
        'socket.io': "socket.io/socket.io"
    },
    shim: {
        'underscore': {
            exports: '_' 
        },
        'chart-js': {
            exports: 'Chart'
        },
        'socket.io': {
            exports: 'io'
        }
    }
});

require(['jquery', 'underscore', 'backbone', 'chart-js', 'socket.io', 'eventBus', 'src/views/home'], function($, _, Backbone, Chart, io, EventBus, HomeView) {
    $(function() {
        var socket = io.connect('https://stocks-app-autumncat.c9users.io/');
        socket.on('connect', function(data) {
            
            EventBus.on('add-notify', function(stock) {
                socket.emit('notify-add-stock', stock);
            });

            EventBus.on('del-notify', function(stock) {
                socket.emit('notify-del-stock', stock);
            });

            socket.on('notifyOf-add', function(stock) {
                EventBus.trigger('stocks:addStock', stock);
            });

            socket.on('notifyOf-del', function(stock) {
                EventBus.trigger('stocks:delStock', stock);
            });
        });
        var homeView = new HomeView();
    });
});