/**
*
*         服务器启动时调用
*
*
*/
//var getComponentAccessTocen = require('../../query/get_component_access_tocken/GetComponentAccessTocen.js');
var keystone = require('keystone');
var fs = require('fs');
var getInfo= require('../../query/redis_cache/RedisCache.js');
var async = require('async');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var config = require('../../public/conf/common.js');

exports = module.exports = function (req, res) {
	/**
	*
	*    使用waterfall分布执行
	*
	*/
	async.waterfall([
		function (callback){
			//首先获取comonent_access_token
			getInfo.getComponentToken( function (err, ret){
				if(err){
					throw new Error('获取comonent_access_token失败！');
				}else{
					console.log(ret);
					if(!ret){
						//如果comonent_access_token为空，重新获取
						getInfo.wxauth.getLatestComponentToken( function (err1, ret1){
							if(err1){
								throw new Error('获取comonent_access_token失败！'+err1);
							}else{
								console.log('comonent_access_token已过期，重新获取...');
								console.log(typeof ret1);
								console.log(ret1);
								callback(null, ret1)
							}
						});
					}else{
						callback(null, ret);
					}
					
				}
			});
		},
		function (arg, callback){
			console.log('************第一步，获取comonent_access_token************');
			//判断对象是String类型还是object，如果为String类型，则转化成JSON格式
			var data = {};
			(typeof arg == 'string') ? (data = JSON.parse(arg)) : (data = arg);
			console.log(data);
			console.log('*********************************************************');
			//获取预授权码
			getInfo.getPreAuthCode(data.component_access_token, function (err, ret){
				if(err){
					throw new Error('获取pre_auth_code失败！');
				}else{
					console.log('************第二步，获取pre_auth_code,重定向到处理authcode的url地址************');
					var pre_auth_code_info = {};
					(typeof ret == 'string') ? (pre_auth_code_info = JSON.parse(ret)) : (pre_auth_code_info = ret);
					console.log(pre_auth_code_info);
					var url = 'https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid='+info.AppID+'&pre_auth_code='+pre_auth_code_info.pre_auth_code+'&redirect_uri='+encodeURIComponent(config.homeEntry.url+'/SolveAuthCode');
					console.log('url:'+url);
					console.log('************@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@************');
					callback(null, url);
				}
			});
		}
	], function (err, arg){
		if(err){
			throw new Error(err);
		}else{
			//res.redirect(arg);
			// res.send("\
   //                              <h1>第三方授权</h1>\
   //                              <a href='"+arg+"''>点击开始授权</a>\
   //                          ");
			res.render('page_Authorization',{
				url: arg
			});
		}
	});
	

}






