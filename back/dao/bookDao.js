var mongoose = require('mongoose')
var BookSchema = require('../model/book.js');
var BookModel = mongoose.model("book",BookSchema);

var Book = {};

Book.save = async (rawBook)=>{
	console.log(rawBook);
	var BookEntity = new BookModel(rawBook);
	return new Promise((resolve,reject)=>{
		BookEntity.save(function(error,doc){
			if(error){
				console.log("error :" + error);
				reject(error);
			}else{
				resolve(doc)
			}
		});
	})
};

Book.query = async (where)=>{
	console.log(where);
	var query  = BookModel.where(where);
	return new Promise((resolve,reject)=>{
		query.find(function (err, books) {
		  if (err){
		  	return reject(err);
		  }else {
		    // doc may be null if no document matched
		    resolve(books);
		  }
		});
	})
}


module.exports = Book;