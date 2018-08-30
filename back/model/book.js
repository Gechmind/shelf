var mongoose = require('mongoose')
var BookSchema = new mongoose.Schema({
	uid:Number,
	title:String,
	subtilte:String,
	isbn:String,
	author:String,
	traslator:String,
	publisher:String,
	pubdate:Date,
	binding:String,
	pages:Number,
	price:String,
	image:String
});

module.exports = BookSchema;
