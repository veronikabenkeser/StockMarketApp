define(['underscore',
        'backbone'],function(_,Backbone){
    var Stock = Backbone.Model.extend({
       idAttribute: '_id',
        urlRoot: '/api/stocks/',
        defaults: {
             id: ''
        }
    });
   return Stock;         
});

//fetching a single model will not work if have this instead:
//   idAttribute: '_id',
//     urlRoot: '/api/stocks/'
        
        