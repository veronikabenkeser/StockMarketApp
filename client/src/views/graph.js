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
        initialize: function(initStocksArr) {
            this.opts = initStocksArr;
            this.data = {};
            this.data.labels = [];
            this.data.datasets = [];
            this.bindEvents();
            this.initGraph(this.opts.initArr);
            this.render();
        },
        initGraph: function(arr) {
            var self = this;
            arr.forEach(function(stock) {
                self.addStock(stock.attributes);
            });
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
            var self = this;
            EventBus.on('graph:newData', function(stock) {
                self.addStock(stock).then(self.render());
            });
            EventBus.on('graph:delStock', function(symb) {
                self.removeStock(symb);
            });
        },
        removeStock: function(symb) {
            var self = this;
            for (var i = 0; i < self.data.datasets.length; i++) {
                if (self.data.datasets[i].label === symb) {
                    self.data.datasets.splice(i, 1);
                    self.render();
                    break;
                }
            }
        },
        hideGraph: function() {
            $('.graph-container canvas').hide();
            $('#js-legend').hide();
            $('.graph-container #message').show();
        },
        addStock: function(stock) {
            var self = this;
            var color = self.getRandomColor();
            return new Promise(function(resolve, reject) {
                var obj = {
                    label: stock.symbol,
                    fillColor: "rgba(220,220,220,0)",
                    strokeColor: color,
                    pointColor: color,
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: stock.prices
                };
                self.data.labels = stock.labels;
                resolve(self.data.datasets.push(obj));
            });
        },
        displayGraph: function() {
            var self = this;
            var ctx = $("#myChart").get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(self.data, {
                scaleFontColor: "black",
                legendTemplate: "<%for (var i=0; i<datasets.length; i++){%><%if(datasets[i].label){%><div class=\"title\"><div class=\"color-sample-container\"><div class=\"color-sample\" style=\"background-color:<%=datasets[i].strokeColor%>;border-color:#fff;\"></div></div><div class =\"az\"><%=datasets[i].label%></div></div><%}%><%}%>"
            });
            document.getElementById('js-legend').innerHTML = myLineChart.generateLegend();
        },
        render: function() {
            var self = this;
            self.$el.html(this.template);

            if (!self.data.datasets.length) {
                self.hideGraph();
            }
            else {
                self.displayGraph();
            }
            return this;
        }
    });
    return GraphView;
});