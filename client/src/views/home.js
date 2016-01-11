define(['jquery',
    'underscore',
    'backbone',
    'text!src/templates/home.html',
    'src/views/search-bar',
    'src/views/graph',
    'src/views/stocks',
    'src/collections/stocks'
], function($, _, Backbone, HomeTemplate, SearchView, GraphView, StocksView, Stocks) {
    var HomeView = Backbone.View.extend({
        template: _.template(HomeTemplate),
        el: '.container',
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template);
            var stocks = new Stocks();
            stocks.fetch()
                .done(function() {
                    var stocksView = new StocksView({
                        collection: stocks
                    });
                    var graphView = new GraphView({
                        initArr: stocks.models
                    });
                    var searchView = new SearchView();
                    return this;
                })
                .fail(function(err) {
                    alert("error fetching the collection");
                });
        }
    });
    return HomeView;
});
