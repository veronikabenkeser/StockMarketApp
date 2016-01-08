
var stocks  = require("../controllers/stocks");

//Passing app and express from the server.js file
module.exports = function(app, express) {
    var apiRouter = express.Router();
   
    apiRouter.route('/stocks')
        .post(function(req,res){
            // stocks.addStock(req,res);
            stocks.saveStock(req,res);
        })
        .get(function(req,res){
            stocks.getStocks(req,res);
        });
        
        
         apiRouter.route('/stocks/check')
        .post(function(req,res){
            stocks.addStock(req,res);
        });
        
        
    apiRouter.route('/stocks/:stock_id')
        .delete(function(req,res){
            stocks.deleteStock(req,res);
        })
        .get(function(req,res){
            console.log('request here');
            stocks.getStockById(req,res);
        });
        
    return apiRouter;
};