var config = require("../../config");
var request = require("request");
var Stock = require("../models/stock");

module.exports = {
   
    addStock: function(req,res){
        var self=this;
        self.getStockData(req) 
          .then(function(dataArr){
                var modDataArr=self.formatData(dataArr);
                return self.createStock(modDataArr,req.body.stock_name);
          })
          .then(function(savedStock){
             return res.json(savedStock);
          }).catch(function(){
            res.status(500).send({ error: "Unknown internal server error" });
          });
        
    },
    formatData:function(dataArr){
        var labels = [];
        var prices = [];
           for (var i = 0; i < dataArr.length; i++) {
                    var month = dataArr[i][0].toString().slice(5,7);
                    var year= dataArr[i][0].toString().slice(0,4);
                    var str = month+"-"+year;
                    labels.push(str);
                    var price = dataArr[i][1];
                    prices.push(parseInt(price,10));
                }
                return [labels,prices];
    },
    createStock:function(dataArr,stockSym){
        return new Promise(function(resolve,reject){
        var stock = new Stock();
        stock.symbol=stockSym;
        stock.labels=dataArr[0];
        stock.prices=dataArr[1];
        stock.save(function(err, stock) {
                if (err) reject(err);
                    resolve(stock);
            });
        });
    },
    getStockData:function(req){
        return new Promise(function(resolve, reject) {
            var comp = req.body.stock_name;
             var api_key = config.api_key;
                    var url= 'https://www.quandl.com/api/v3/datasets/WIKI/';
                    var fullUrl = url+comp+'/data.json?order=asc&column_index=4&collapse=monthly&start_date=2015-01-01&api_key='+api_key;
            request({
                url:fullUrl,
                json:true
            }, function(err,response, body){
                if(err)reject(err);
                var data =body;
                resolve(data.dataset_data.data);
            });
        });
    },
    deleteStock:function(req,res){
        Stock.findById(req.params.stock_id, function(err, stock) {
            if (err) return res.status(400).json(err);

            Stock.remove({
                _id: req.params.stock_id
            }, function(err, stock) {
                if (err) return res.status(500).json(err);
                return res.json({success:true});
            });
        });
    }
}