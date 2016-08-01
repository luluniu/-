
//职责：从mongdb的music表中获取到数据将index.html渲染后响应给浏览器

'use strict'

const mongoose =require('mongoose');

module.exports = (req,res)=>{

  //1.0 获取music表中的所有数据 data
  mongoose.model('music').find({},(err,data)=>{

 	console.log(data); //	Query{}


  //2.0 调用xtemplate将index.html渲染后响应
  res.render('index.html',{arr:data},(err,content)=>{
	if(err)
	{
		console.log(err);
		res.end('./modules/list.js res.render() error');
		return;
	}

	//将content响应回浏览器
	res.end(content);
  });

 	}); //从db中获取表music中的所有数据


}