define(['underscore',
        'backbone'],function(_,Backbone){
    var Stock = Backbone.Model.extend({
        idAttribute: '_id'
    });
   return Stock;         
});