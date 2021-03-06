/**
*
*
*
*
*
*             获取auth_code并保存
*
*
*
*
*
*
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var async = require('async');
var getInfo= require('../../query/redis_cache/RedisCache.js');
var get_auth_token = require('../../query/get_auth_info/GetAuthToken.js');
var saveOfficialAccountInfo = require('../../query/save_official_ccount_info/SaveOfficalAccountInfo.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var util = require('../../query/util/util.js');
var MongoDB = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');   // Jing's comment: 不建议使用MongoDB来定义引用的这个js文件。应当使用一目了然的名称来代表这个js文件的功能
var query = require('../../query/get_auth_info/AccessTokenRefresh.js');
var config = require('../../public/conf/common.js');
exports = module.exports = function (req, res) {
	console.log('开始执行授权方法');
	var auth_code =  req.query.auth_code;
	var expires_in =  req.query.expires_in;
	console.log('auth_code:'+auth_code+'  expires_in:'+expires_in);

	async.waterfall([
		function (callback){
			//首先获取comonent_access_token
			getInfo.getComponentToken( function (err, ret){
				if(err){
					throw new Error('获取comonent_access_token失败！');
				}else{
					if(!ret){
						//如果comonent_access_token为空，重新获取
						getInfo.wxauth.getLatestComponentToken( function (err1, ret1){
							if(err1){
								throw new Error('获取comonent_access_token失败！');
							}else{
								console.log('comonent_access_token已过期，重新获取...');
								// console.log(typeof ret1);
								// console.log(ret1);
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
			console.log('******************获取comonent_access_token****************');
			//判断对象是String类型还是object，如果为String类型，则转化成JSON格式
			var data = {};
			(typeof arg == 'string') ? (data = JSON.parse(arg)) : (data = arg);
			console.log(data);
			console.log('***********************************************************');
			get_auth_token.getAuthToken(auth_code, data.component_access_token, function (err, ret){
				if(err){
					throw new Error('获取auth_token失败！');
				}else{
					callback(null, ret, data.component_access_token)
				}
			});
			
		},
		function (arg1, arg2, callback){
			console.log('oooooooooooooooooooooooooooooooooooooooooooo');
			console.log(arg1);			
			console.log('oooooooooooooooooooooooooooooooooooooooooooo');
			saveOfficialAccountInfo.saveInfo(arg1, arg2, function (err, ret){
				if(err){
					throw new Error(err);
				}else{
					callback(null, ret);
				}
			});
		},
		function (arg, callback){
			//将授权方的基本信息保存到数据库中去
			//首先通过appid来检索，查看微信第三方是否授权过，授权过跟新数据即可，否则需要直接添加到数据库中
			
			MongoDB.getWeiXinPublicAccountInfo(arg.authorizer_appid, function (err1, ret1){
				if(err1){
					throw new Error(err);
				}else{
					if( ret1 == null || ret1 == ''){
						MongoDB.saveWeiXinPublicAccountInfo( arg, function (err2, ret2){
							if(err2){
								throw new Error(err);
							}else{
								console.log('保存授权方的基本信息成功！')
								console.log(ret2);
								callback(null, arg.authorizer_appid);
							}
						});
					}else{
						console.log('@@@@@@@@@@@@@@@@55555555');
						ret1.nick_name = arg.nick_name;
						ret1.head_img = arg.head_img;
						ret1.service_type_info = arg.service_type_info;
						ret1.verify_type_info = arg.verify_type_info;
						ret1.user_name = arg.user_name;
						ret1.principal_name = arg.principal_name;
						ret1.alias = arg.alias;
						ret1.open_store = arg.open_store;
						ret1.open_scan = arg.open_scan;
						ret1.open_pay = arg.open_pay;
						ret1.open_card = arg.open_card;
						ret1.open_shake = arg.open_shake;
						ret1.qrcode_url = arg.qrcode_url;
						ret1.authorizer_access_token = arg.authorizer_access_token;
						ret1.expires_in = arg.expires_in;
						ret1.authorizer_refresh_token = arg.authorizer_refresh_token;
						ret1.func_info = arg.func_info;
						ret1.publicAccountAscription = 1;

						ret1.save( function (err3){
							if(err3){
								throw new Error(err3);
							}else{
								console.log('再次进行第三方授权！!!');
								callback(null, ret1.appid);
							}
						});
						
					}
					
				}
			});
			
		},
		function(appid,callback){//
		  var data={};
          MongoDB.getWeiXinPublicAccountInfo(appid, function (err, ret){
    			if(err){
    				throw new Error(err);
    			}else{
    				console.log(appid);
    				if(ret.webpage_access_token==null||ret.webpage_refresh_token==null){
    				  data.index=true;
                      callback(null,appid,data);
    				}else{
                       query.JudgeAccessToken(appid,function(err,ret){
                       	 if(err){
                            throw new Error(err);
                       	 }else{
                       	 	callback(null,appid,ret);
                       	 }
                       });
    				}
    			}
    	  });
		}
	], function (err,authorizer_appid,data){
		if(err){
			throw new Error(err);
		}else{
			//重定向url去拉取授权方管理员在微信上的基本信息=wx5e99118507d2de59
			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+authorizer_appid+'&redirect_uri='+encodeURIComponent(config.homeEntry.url+'/GetWeiXinAdminInfo')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info.AppID+'#wechat_redirect';
			//var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5e99118507d2de59&redirect_uri='+encodeURIComponent('http://www.kaishiapp.com/GetWeiXinAdminInfo')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info.AppID+'#wechat_redirect';
			console.log('appid：'+authorizer_appid);
			console.log('url：'+url);
			//if(data.index==true){
              //res.redirect(url);
              // res.send("\
              //                   <h1>创建自定义菜单</h1>\
              //                   <a href='"+url+"''>点击创建自定义菜单</a>\
              //               ");
			//}else{
				//res.send('access_token未过期，不需要重新授权');
			//}/
			res.render('page_createMenu',{
				url: url
			});
			
		}
	});
	
}
