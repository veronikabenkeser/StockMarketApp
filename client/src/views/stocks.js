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

            EventBus.on('stock-del', function(stockModel) {
                self.notifyUsers('del', stockModel);
            });

            EventBus.on('stocks:addStock', function(stock) {
                self.collection.add(stock);
            });

            EventBus.on('stock:delStock', function(stock) {
                self.collection.fetch({
                    success: function(collection, response, options) {
                        self.$el.empty();

                        collection.forEach(function(model) {
                            self.renderStock(model);
                        });
                    },
                    error: function(collection, response, options) {
                    }
                });
            });
        },
        render: function() {
            var self = this;
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
            EventBus.trigger('graph:newData', item.attributes);
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