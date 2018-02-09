/**
*
*
*
*      获取到 component_access_tocken 缓存到redis数据库中去
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
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));


//获取component_access_tocken
function getAndSaveComponentAcceessTocken (){
	console.log('获取component_access_tocken方法执行中...');
	//向微信服务端请求的url
	var url = 'https://api.weixin.qq.com/cgi-bin/component/api_component_token';
	
	//首先获取奥component_verify_ticket
	redis.getInfo('component_verify_ticket', function (err,ret){
		if(err){
			console.log(err);
		}else{
			if(ret != null){
				//component_verify_ticket不过期的情况
				//通过post方式请求到componnet_access_tocken,
				var data = {
					'component_appid': info.AppID,
					'component_appsecret': info.AppSecret,
					'component_verify_ticket': ret
				};
				util.sendPostRequest(url, data, function (err1, ret1){
					if(err1){
						console.log(err1);
					}else{
						console.log('请求得到的componet_access_tocken：');
						console.log(ret1.component_access_token);
						//将component_access_token缓存到redis服务器中去,并设置过期时间为7000秒
						redis.saveComponentToken(ret1.component_access_token, function (err, data){
							if(err){
								console.log(err);
							}else{
								console.log('保存component_access_tocken成功！');
							}
						});
					}
				});
			}else{
				//component_verify_ticet过期的的情况
				//如果redis缓存中componet_verify_ticket过期了，应该重新获取，这里的componet_verify_ticket是
				//从入口进行获取的，过期的是键与获取的时间是一致的，所以不会存在过期的情况
				console.log('component_verify_ticet过期了！,等待微信服务端发送component_verify_ticet');
			}
		}
	});
}


module.exports = {
	getAndSaveComponentAcceessTocken: getAndSaveComponentAcceessTocken
}