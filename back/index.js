const Koa = require('koa');
const app = new Koa();
const http = require('http');
const Router = require('koa-router');
const request = require("async-request");
var req = require('request');
var router = new Router();

const config = require('./config/config.js');
const xmlParse = require("./utils/xml2json.js")
const mongo = require('./db/mongo.js');
const bookDao = require("./dao/bookDao.js");

var douban = config.doubanIsbnUrl;
//连接mongo
mongo();

//配置路由
router.get("/",async(ctx,next)=>{
	    	ctx.body = "Home"
        })
        .get("/isbn/:code",async(ctx,next)=>{
        	//新扫描图书
			let isbn = ctx.params.code;
			var response = await request(douban + isbn);
			var rawBook = xmlParse.parse(response.body);
			var doc = await bookDao.save(rawBook);
			console.log()
			ctx.body = doc;
		})
        .get("/books",async(ctx,next)=>{
        	//查询所有图书
        	var books = await bookDao.query({});
        	ctx.body = books;
         })
        .get("/image/:code",async(ctx,next)=>{
        	//获取图片
        	let isbn = ctx.params.code;
        	var books = await bookDao.query({isbn:isbn});
        	if(books){
        		ctx.type = "image/jpg";
        		ctx.set('Content-disposition','inline;filename='+'name.jpg');
        		ctx.body = req(books[0].image);
         		// ctx.type = 
        	}
        })
        .get("/pick/:code",async(ctx,next)=>{

        });

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(8080);
