define(['jquery',
    'underscore',
    'backbone',
    'text!src/templates/graph.html',
    'chart-js',
    'eventBus'
], function($, _, Backbone, GraphTemplate, Chart, EventBus) {
    var GraphView = Backbone.View.extend({
        template: _.template(GraphTemplate),
        el: '#graph',
        initialize: function() {
            this.data = {};
            this.data.labels=[];
            this.data.datasets=[];
            this.bindEvents();
            this.render();
        },
        getRandomColor: function() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        bindEvents: function() {
            var self=this;
            EventBus.on('graph:newData', function(stock){
                self.addStock(stock).then(self.render());
            });
        },
        addStock:function(stock){
            var self=this;
               return new Promise(function(resolve,reject){
                   var obj = {
                        label: stock.symbol,
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: stock.prices
                };
                 self.data.labels=stock.labels;
                 resolve(self.data.datasets.push(obj));
               });
        },
        render:function(){
            var self=this;
            self.$el.html(this.template);
            var ctx = $("#myChart").get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(self.data);
            document.getElementById('js-legend').innerHTML = myLineChart.generateLegend();
            return this;
        }
    });
    return GraphView;
});