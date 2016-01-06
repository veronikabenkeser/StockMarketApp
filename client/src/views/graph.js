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
            EventBus.on('graph:newData', this.render,this);
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
            if(data){
                var dataArr = data.dataset_data.data;
                for (var i = 0; i < dataArr.length; i++) {
                    var month = dataArr[i][0].toString().slice(5,7);
                    var year= dataArr[i][0].toString().slice(0,4);
                    var str = month+"-"+year;
                    labelArr.push(str);
                    console.log(dataArr[i][1]);
                    var price = dataArr[i][1];
                    obj.data.push(parseInt(price,10));
                }
            }
            return [labelArr,obj];
        },
        render: function(data) {
            
            var resultsArr = this.addData(data)
            var labelArr= resultsArr[0];
            console.log('labelArr');
            console.log(!labelArr)
            var obj = resultsArr[1];
            
            this.$el.html(this.template);
            console.log(labelArr);
            console.log(obj);
            if (!labelArr) {
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
            } else  if (labelArr.length===0) {
                var data = {
                    labels: [null],
                    datasets: [{
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [null]
                    }]
                };
            }
            else {
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