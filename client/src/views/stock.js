define(['jquery',
    'underscore',
    'backbone',
    'text!src/templates/stock.html',
    'eventBus'
], function($, _, Backbone, StockTemplate, EventBus) {
    var StockView = Backbone.View.extend({
        template: _.template(StockTemplate),
        initialize: function() {
            this.render();
            this.model.on('destroy', this.remove, this);
        },
        events: {
            'click .close-button': 'deleteStock'
        },
        clearStock: function(stock) {
            this.remove();
        },
        deleteStock: function() {
            var self = this;
            self.model.destroy({
                success: function(model, response, options) {
                    EventBus.trigger('stock-deleted', model);
                },
                error: function(model, response, options) {
                    console.log('error deleting the model');
                }
            });
        },
        render: function() {
            this.$el.html(this.template({
                stock: this.model.toJSON()
            }));
            return this;
        }
    });
    return StockView;
});