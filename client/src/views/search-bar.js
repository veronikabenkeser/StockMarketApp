define(['jquery',
    'underscore',
    'backbone',
    'text!src/templates/search-bar.html',
    'chart-js',
    'eventBus',
    'src/models/stock',
    'src/views/stock'
], function($, _, Backbone, SearchTemplate, Chart, EventBus, Stock, StockView) {
    var SearchView = Backbone.View.extend({
        template: _.template(SearchTemplate),
        el: '#search-bar',
        initialize: function() {
            this.render();
            this.bindEvents();
        },
        render: function() {
            this.$el.html(this.template);
            return this;
        },
        events: {
            'click .search': 'searchStock'
        },
        bindEvents: function() {
            var self = this;
            EventBus.on('in-history', function(inHist, stock) {
                if (inHist) {
                    $('.search-form .error').text('This stock has already been graphed. Please enter a new stock name.').show();
                }
                else {
                    $('.search-form .error').hide();
                    self.addStock(stock);
                }
            });
        },
        addStock: function(company) {
            $.ajax({
                url: '/api/stocks/check',
                type: 'POST',
                dataType: "json",
                data: {
                    'stock_name': company
                }
            }).done(function(obj) {
                if ($.isEmptyObject(obj)) {
                    $('.search-form .error').text('Please enter a valid stock name.').show();
                    return;
                }
                $('.search-form .error').hide();
                var stock = new Stock(obj);
                stock.save(null, {
                    error: function(model, response, options) {
                        alert('This stock has not been saved.');
                    },
                    success: function(model, response, options) {
                        EventBus.trigger('stock-added', response);
                    }
                });
            }).fail(function(err) {
                console.log(err);
            });
        },
        searchStock: function(e) {
            e.preventDefault();
            var company = $('#stock-name').val().toUpperCase();
            EventBus.trigger('validate:new-stock', company);
            document.getElementById('stock-name').value = '';
        }
    });
    return SearchView;
});