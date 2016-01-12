define(['underscore',
    'backbone',
    'src/models/stock'
], function(_, Backbone, Stock) {
    var Stocks = Backbone.Collection.extend({
        model: Stock,
        url: '/api/stocks'
    });
    return Stocks;
});