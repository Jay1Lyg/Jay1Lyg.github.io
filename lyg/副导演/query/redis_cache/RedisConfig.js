/*
*
*        Redis连接配置
*
*
*
*/
var keystone = require('keystone');
var redis = require('redis'),
//client = redis.createClient('6379', '58.87.104.41');//创建连接
client = redis.createClient();//创建连接
client.auth("MoiveEggs_KaiShi");

/*监控连接的情况*/
client.on('ready',function(err){
    console.log('Redis 服务器已经准备好了...');
});
client.on('end',function(err){
	console.log('redis已建立的连接被关闭...');
});
client.on("error", function (err) {
	if(err){
		console.log(err);
	}else{
		console.log('连接redis失败...');
	}
    
});


module.exports = client;