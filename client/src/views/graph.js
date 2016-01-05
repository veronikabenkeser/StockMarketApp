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
        // initialize: function(opts) {
        //     this.opts=opts;
        //      _.bindAll(this, 'render');
        //     // this.render();
        //     this.bindEvents();
        // },
        initialize: function(opts) {
            this.bindEvents();
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
            EventBus.on('graph:newData', this.addData);
        },
        addData: function(data) {
            var self = this;
            console.log('data');
            var labelArr = [];
            var obj = {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            };

            obj.data = [];
            var dataArr = data.dataset_data.data;
            for (var i = 0; i < dataArr.length; i++) {
                labelArr.push(dataArr[0]);
                obj.data.push(dataArr[1]);
            }
            this.render(labelArr, obj);
        },
        render: function(labelArr, obj) {
            this.$el.html(this.template);
            if (!labelArr && !obj) {
                console.log('nine');
                var data = {
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: [{
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }]
                };
            }
            else {



                // var self =this;
                // var data=[];

                // self.model.toJSON().options.forEach(function(option){ 

                //         var obj = {
                //             value: parseInt(option.votes,10),
                //             color: self.getRandomColor(),
                //             highlight: "#FF5A5E", 
                //             label: option.text
                //         };
                //         data.push(obj);
                //     });
                //      self.$el.html(this.template(self.model.toJSON()));

                // self.$el.html(this.template(self.model.toJSON()));


                var data = {
                    labels: labelArr,
                    datasets: [
                        obj
                    ]
                };

            }
            var ctx = $("#myChart").get(0).getContext("2d");
            var myLineChart = new Chart(ctx).Line(data);
            document.getElementById('js-legend').innerHTML = myLineChart.generateLegend();
            return this;
        }
    });
    return GraphView;
});