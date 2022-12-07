var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//var mongoDB = "mongodb://localhost:27017/NoSQLBoosterSamples"
var mongoDB = "mongodb+srv://tung17:tung17012000@cluster0.evpzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//var mongoDB = "mongodb+srv://tung17:tung170120002@cluster0.q7wzbzy.mongodb.net/test"
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;

const ProductSchema = new Schema({
    name : {type:String, required:true},
    price: {type:Number},
    picURL: {type:String},
    weight: {type:Number}

})

module.exports = mongoose.model('Product', ProductSchema);