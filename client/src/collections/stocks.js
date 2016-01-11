define(['underscore',
    'backbone',
    'src/models/stock',
    'socketIO'
], function(_, Backbone, Stock, io) {
    var Stocks = Backbone.Collection.extend({
        model: Stock,
        url: '/api/stocks'
    });
    return Stocks;
});