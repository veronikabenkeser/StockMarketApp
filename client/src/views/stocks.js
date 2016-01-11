define(['jquery',
    'underscore',
    'backbone',
    'eventBus',
    'src/views/stock'
], function($, _, Backbone, EventBus, StockView) {
    var StocksView = Backbone.View.extend({
        el: '#stock-list',
        initialize: function() {
            var self = this;

            self.collection.on('add', function(model) {
                self.renderStock(model);
                EventBus.trigger('graph:newData', model.attributes);
            });

            self.collection.on('remove', function(stock) {
                EventBus.trigger('graph:delStock', stock.attributes.symbol);
                self.render();
            });

            self.render();
            self.bindEvents();
        },
        bindEvents: function() {
            var self = this;

            EventBus.on('stock-added', function(stockModel) {
                self.collection.add(stockModel);
                self.notifyUsers('add', stockModel);
            });

            EventBus.on('stock-deleted', function(stockModel) {
                //deleted its collection automatically when the model was destroyed in  stock.js
                self.collection.trigger('remove', stockModel);
                self.notifyUsers('del', stockModel);
            });

            EventBus.on('stocks:addStock', function(stock) {
                self.collection.add(stock);

            });

            EventBus.on('stocks:delStock', function(stock) {
                self.collection.remove(stock);
            });
        },
        render: function() {
            var self = this;
            self.$el.empty();
            self.collection.forEach(function(stock) {
                self.renderStock(stock);
            });
            return self;
        },
        renderStock: function(item) {
            var self = this;
            var stockView = new StockView({
                model: item
            });
            self.$el.append(stockView.render().el);
        },
        notifyUsers: function(operation, stockModel) {
            if (operation === 'add') {
                EventBus.trigger('add-notify', stockModel);
            }
            else if (operation === "del") {
                EventBus.trigger('del-notify', stockModel);
            }
        }
    });
    return StocksView;
});