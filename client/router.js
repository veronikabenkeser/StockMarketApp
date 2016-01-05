//Client-side route map
define(['backbone',
        'src/views/graph',
        'src/views/search-bar'
    ],
    function(Backbone, GraphView, SearchView) {
        var AppRouter = Backbone.Router.extend({
            initialize: function() {
                 var searchView = new SearchView;
                 var graphView = new GraphView();
                 graphView.render();
                 searchView.render();
            }   
        });
    return AppRouter;
});