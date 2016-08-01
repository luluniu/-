//作用:利用express进行web服务器的开启，同时利用它的静态资源中间件来管理静态资源
//静态资源: site.css  jquery.js   .mp3

/*职责：
 1、开启web服务器和实现路由的设定
 2、利用mongoose链接mongdb
*/

'use strict'

//1.0 导入包
const express = require('express');
const mongoose =require('mongoose');
const xtpl = require('xtpl');

//1.0.1 链接mongodb数据库和设定数据库music表的表结构和创建model
//链接数据
let dburl = 'mongodb://127.0.0.1/cz03';
mongoose.connect(dburl);  //链接db

//定义表结构
let schema = new mongoose.Schema({
	title:String,  //用于存放歌曲名称
	file:String    //存放歌曲的文件名称.mp3
});

//创建model来进行数据库的操作
let music_model = mongoose.model('music',schema);

//2.0 开启web服务器并且设定路由
var app = express();

//3.0 开启获取音乐列表的路由，同时逻辑代码交给list.js去实现的
app.get('/index',require('./modules/list.js'));
// app.get('/del',require('./modules/del.js'));
app.get('/del/:id',require('./modules/del.js'));

//4.0 使用静态资源中间件
app.use(express.static('statics'));

//5.0 将xtpl.renderFile方法替换掉res中的render()
app.set('views','./views');  //设置当前项目的所有模板文件夹是views
app.set('view engine','html'); //告诉express 我们的模板后缀是.html结尾的
app.engine('html',xtpl.renderFile);


//5.0 监听
app.listen(8888,()=>{

	console.log('服务器已启动');
});
