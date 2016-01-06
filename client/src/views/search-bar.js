define(['jquery',
    'underscore',
    'backbone',
    'text!src/templates/search-bar.html',
    'chart-js',
    'eventBus',
    'src/models/stock',
    'src/views/stock',
    'socketIo'
], function($, _, Backbone, SearchTemplate,Chart,EventBus,Stock,StockView,socketIo) {
    var SearchView = Backbone.View.extend({
            template: _.template(SearchTemplate),
            el:'#search-bar',
            render: function(){
                this.$el.html(this.template);
                return this;
            },
            events:{
                  'click .search': 'searchStock'
            },
            searchStock:function(e){
                e.preventDefault();
                var self = this;
                var company =  $('#stock-name').val();
                $.ajax({
                    url:'/api/stocks',
                    type: 'POST',
                    dataType:"json",
                    data:{'stock_name':company}
                }).done(function(result){
                    var stockView = new StockView({model: result});
                    self.notifyUsers();
                 
                    // self.updateData(response);
                }).fail(function(err){
                    console.log(err);
                });
            },
            updateData:function(data){
                EventBus.trigger('graph:newData', data);
            },
            notifyUsers:function(){
            }
            
        });
    return SearchView;
});