var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StockSchema = new Schema({
    symbol:String,
    labels:[String],
    prices:[Number]
});

module.exports = mongoose.model('Stock', StockSchema);