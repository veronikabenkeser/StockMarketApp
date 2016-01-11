define(['underscore',
    'backbone'
], function(_, Backbone) {
    var Stock = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/stocks/',
        defaults: {
            id: ''
        }
    });
    return Stock;
});