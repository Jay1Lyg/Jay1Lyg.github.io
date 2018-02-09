/*
*
*
*
*     author@zheng 上传微信图片素材
*     使用第三方api接口
*     详情可参考：https://www.npmjs.com/package/co-open-wechat-api
*
*
*/
//var OpenWechatAPI = require('co-open-wechat-api');
var async = require('async');
var fs = require('fs'); 
var query1 = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var getInfo= require('../../query/redis_cache/RedisCache.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
/**
*
*   获取第三方api接口
*   
*
*/
function  getOpenWechatAPI (authorizer_appid, callback){
	var infos = {};
	async.waterfall([
		function (callback){
			query1.JudgeAuthToken(authorizer_appid, function (err,ret){
	           if(err){
	                throw new Error(err);
	            }else{
	                callback(null, ret);
	            }
	       });
		},
		function (arg, callback){
			getInfo.getVerifyTicket( function (err, ret){
				if(err){
					throw new Error('获取VerifyTicket失败！');
				}else{
					console.log(ret);
					if(!ret){
						//如果comonent_access_token为空，重新获取
						callback(null, null, arg);
					}else{
						callback(null, ret, arg);
					}
					
				}
			});
		},
		function (arg1, arg2, callback){
			if(arg1 == null){
				throw new Error('获取VerifyTicket失败！VerifyTicket已经过期了');
			}else{
				infos.authorizer_refresh_token = arg2.authorizer_refresh_token;
				infos.componentVerifyTicket = arg1;
				infos.AppID = info.AppID;
				infos.AppSecret = info.AppSecret;
				infos.authorizer_appid = authorizer_appid;
				callback(null);
			}

		}
	], function (err){
		if(err){
			throw new Error(err);
		}else{
			return callback(null, infos);
		}
	});
}


module.exports =  {
	getOpenWechatAPI: getOpenWechatAPI
};