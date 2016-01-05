var config = require("../../config");
var request = require("request");

module.exports = {
    getStock: function(req,res){
        var comp = req.body.stock_name;
        console.log(comp);
         var api_key = config.api_key;
                var url= 'https://www.quandl.com/api/v3/datasets/WIKI/';
                var fullUrl = url+comp+'/data.json?column_index=4&collapse=monthly&start_date=2013-01-01&api_key='+api_key;
        request({
            url:fullUrl,
            json:true
        }, function(err,response, body){
            if (err) return res.send(err);
            var data =body;
            console.log(data);
            res.json(data);
        });
    }
}