var mongoose = require('mongoose');
var config = require('../config/config.js');

module.exports=function(){
	var db = mongoose.connect(config.mongodb);
	return db;
}