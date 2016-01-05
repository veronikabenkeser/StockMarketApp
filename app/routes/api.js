
var stocks  = require("../controllers/stocks");

//Passing app and express from the server.js file
module.exports = function(app, express) {
    var apiRouter = express.Router();
   
    apiRouter.route('/stocks')
        .post(function(req,res){
            stocks.getStock(req,res);
        });
        
            apiRouter.route('/hello')
        .get(function(req,res){
            console.log('trying to post hello');
            stocks.getStock(req,res);
        });
        
    return apiRouter;
};