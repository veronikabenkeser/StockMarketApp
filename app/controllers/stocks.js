var request = require("request");
var Stock = require("../models/stock");

module.exports = {
    addStock: function(req, res) {
        var self = this;
        self.getStockData(req)
            .then(function(dataArr) {
                if (!dataArr.length) res.json({});
                var modDataArr = self.formatData(dataArr);
                var obj = {};
                obj.symbol = req.body.stock_name;
                obj.labels = modDataArr[0];
                obj.prices = modDataArr[1];
                return res.json(obj);

            }).catch(function() {
                res.status(500).send({
                    error: "Unknown internal server error"
                });
            });
    },
    formatData: function(dataArr) {
        var labels = [];
        var prices = [];
        for (var i = 0; i < dataArr.length; i++) {
            var month = dataArr[i][0].toString().slice(5, 7);
            var year = dataArr[i][0].toString().slice(0, 4);
            var str = month + "-" + year;
            labels.push(str);
            var price = dataArr[i][1];
            prices.push(parseInt(price, 10));
        }
        return [labels, prices];
    },
    getStockData: function(req) {
        return new Promise(function(resolve, reject) {
            var comp = req.body.stock_name;
            var api_key = process.env.API_KEY;
            var url = 'https://www.quandl.com/api/v3/datasets/WIKI/';
            var fullUrl = url + comp + '/data.json?order=asc&column_index=4&collapse=monthly&start_date=2015-01-01&api_key=' + api_key;
            request({
                url: fullUrl,
                json: true
            }, function(err, response, body) {
                if (err) reject(err);
                if (response.statusCode === 404) {
                    resolve([]);
                }
                else {
                    var data = body;
                    resolve(data.dataset_data.data);
                }
            });
        });
    },
    deleteStock: function(req, res) {
        Stock.findById(req.params.stock_id, function(err, stock) {
            if (err) return res.status(400).json(err);

            Stock.remove({
                _id: req.params.stock_id
            }, function(err, stock) {
                if (err) return res.status(500).json(err);
                res.json({
                    success: true
                });
            });
        });
    },
    getStockById: function(req, res) {
        Stock.findById(req.params.stock_id, function(err, stock) {
            if (err) return res.status(400).json(err);
            res.json(stock);
        });
    },
    getStocks: function(req, res) {
        Stock.find(function(err, stocks) {
            if (err) return res.send(400).json(err);
            res.json(stocks);
        });
    },
    saveStock: function(req, res) {
        var stock = new Stock();
        var obj = JSON.parse(JSON.stringify(req.body));
        stock.symbol = obj.symbol;
        stock.labels = obj.labels;
        stock.prices = obj.prices;
        stock.save(function(err, stock) {
            if (err) return res.status(400).json(err);
            res.json(stock);
        });
    }
}