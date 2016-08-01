'use strict'

const path = require('url');
const querystring = require('querystring');
const mongoose =require('mongoose');

module.exports = (req,res)=>{
  
  //1.0 获取到浏览器请求上来的id参数值 获取通过:http://127.0.0.1:8888/del?id=232aass
  // let url = req.url;  // del?id=23423423
  // let query = path.parse(url).query;  //id=23423423
  // let queryObj = querystring.parse(query); //{id:2323423}

  // let id = queryObj.id;
  // console.log('url============>'+url);
  // console.log('query============>'+query);

  // console.log(queryObj);

  //1.0.1 通过 http://127.0.0.1:8888/del/234234adfsas 
  let id = req.params.id;
  console.log('id============>'+id);

  //2.0 根据id值删除数据库中的music表数据
  let where = {'_id':id}; //要删除数据的条件对象
  mongoose.model('music').remove(where,(err)=>{
	if(err)
	{
		console.log(err);
		res.end(err.toString());
		return;
	}

	 //3.0 将json字符串响应给ajax异步对象
	 let jsonobj = {status:0 ,message:'数据删除成功'};
	 //将jsonobj转换成json字符串以后响应给异步对象，当异步对象接受的奥以后，就会触发回调函数
	 res.end(JSON.stringify(jsonobj));

  });

 

}