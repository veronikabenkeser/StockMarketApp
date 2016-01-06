define(['jquery',
    'underscore',
    'backbone',
    'text!src/templates/stock.html',
    'eventBus'
], function($, _, Backbone, StockTemplate,EventBus) {
    var StockView = Backbone.View.extend({
        el:'#stock-list',
        template: _.template(StockTemplate),
        initialize:function(){
            this.listenTo(this.model, 'destroy', this.remove); 
            this.render();
        },
        events:{
            'click .close-button': 'deleteStock'
        },
        deleteStock:function(){
            var self =this;
            //delete from collection and server
            self.model.destroy({
                success: function(model, response) {
                    console.log('model deleted');
            },
                error:function(err){
                    console.log('error deleting the model');
                }
            });
        },
        render:function(){
            console.log('model here'+this.model);
            this.$el.html(this.template({stock:this.model}));
            return this;
        }
    });
    return StockView;
});