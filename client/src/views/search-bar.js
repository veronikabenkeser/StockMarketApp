define(['jquery',
    'underscore',
    'backbone',
    'text!src/templates/search-bar.html',
    'chart-js',
    'eventBus',
    'src/models/stock',
    'src/views/stock',
    'socketIO'
], function($, _, Backbone, SearchTemplate, Chart, EventBus, Stock, StockView, io) {
    var SearchView = Backbone.View.extend({
        template: _.template(SearchTemplate),
        el: '#search-bar',
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template);
            return this;
        },
        events: {
            'click .search': 'searchStock'
        },
        searchStock: function(e) {
            e.preventDefault();
            var self = this;
            var company = $('#stock-name').val();
            $.ajax({
                url: '/api/stocks/check',
                type: 'POST',
                dataType: "json",
                data: {
                    'stock_name': company
                }
            }).done(function(obj) {
                var stock = new Stock(obj);
                stock.save(null, {
                    error: function(model, response, options) {
                        alert('This stock has not been saved.');
                    },
                    success: function(model, response, options) {
                        EventBus.trigger('stock-added', response);
                        EventBus.trigger('graph:newData', response);
                    }
                });
            }).fail(function(err) {
                console.log(err);
            });
        }
    });
    return SearchView;
});