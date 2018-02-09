/**
*
*
*
*      获取到 全局access_tocken 缓存到redis数据库中去
*
*
*
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var request = require('request');
var request1 = require('request-json');
var client = require('../../query/redis_cache/RedisConfig.js');
var redis = require('../../query/redis_cache/RedisCache.js');
var util = require('../../query/util/util.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/WX_ServerrNO_info.json', 'utf-8'));

var getGlobalAccessToken=function(appid,callback){
	//var appid=info.AppID;
    console.log(appid);
    var appSecret=info[1].AppSecret;
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+appSecret;
	util.sendGetRequest(url, function (err, res, body){
		if(err){
			throw new Error(err);
		}else{
			if(res.statusCode == 200){
	             var info = JSON.parse(body);
	             console.log(info);
	             redis.saveAccessToken(info.access_token,function(err){
	             	if(err){
	                   throw new Error(err);
	             	}else{
	             		console.log('++++++++++++++++++++++++++');
	             		console.log(info.access_token);
	             		console.log(typeof(info.access_token));
	             		console.log('++++++++++++++++++++++++++');
	                   callback(null, info.access_token);
	             	}
	             });
	            
			}else{
				throw new Error('get 请求失败！');
			}
		}
	});
}

module.exports = {
  getGlobalAccessToken:getGlobalAccessToken,
}