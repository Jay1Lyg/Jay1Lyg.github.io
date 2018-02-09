var keystone = require('keystone');
var fs = require('fs');
var async = require('async');
var util = require('../../query/util/util.js');
var MongoDB = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var getInfo= require('../../query/redis_cache/RedisCache.js');
var User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function (req, res) {
	console.log('开始拉取授权方管理员的信息');
	//首先获取code
	var code = req.query.code;
	var appid = req.query.appid;
	console.log('code:'+code+ 'appid:'+appid);
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
    		//通过code换取access_token
    		//判断对象是String类型还是object，如果为String类型，则转化成JSON格式
			var data = {};
			(typeof arg == 'string') ? (data = JSON.parse(arg)) : (data = arg);
    		var url1 = 'https://api.weixin.qq.com/sns/oauth2/component/access_token?appid='+appid+'&code='+code+'&grant_type=authorization_code&component_appid='+info.AppID+
    		'&component_access_token='+data.component_access_token;
    		util.sendGetRequest(url1, function (err1, res1, body1){
    			if(err1){
    				throw new Error(err1);
    			}else{
    				if(res1.statusCode == 200){
    					// 根据获取的用户信息进行对应操作
               var info = JSON.parse(body1);
               console.log(info);
               callback(null, info);
    				}else{
    					throw new Error('请求失败');
    				}
    			}
    		});
    		
    	},
    	function ( arg, callback){
    		//通过网页授权access_token获取用户基本信息（需授权作用域为snsapi_userinfo）
    		var url2 = 'https://api.weixin.qq.com/sns/userinfo?access_token='+arg.access_token+'&openid='+arg.openid+'&lang=zh_CN';
    		util.sendGetRequest(url2, function (err2, res2, body2){
    			if(err2){
    				throw new Error(err2);
    			}else{
    				if(res2.statusCode == 200){
    					// 根据获取的用户信息进行对应操作
               var info2 = JSON.parse(body2);
               console.log(info2);
               callback(null, info2);
    				}else{
    					throw new Error('拉取用户信息请求失败！');
    				}
    			}
    		});
    	}, 
    	function (arg, callback){
    		//通过appid查询PublicAccount
    		MongoDB.getWeiXinPublicAccountInfo(appid, function (err, ret){
    			if(err){
    				throw new Error(err);
    			}else{
    				callback(null,arg,ret);
    			}
    		});
    	},
    	function (arg1, arg2,callback){
    		//关联中间表
            BoundUserAndPublic.model.findOne()
            .where('openID', arg1.openid)
            .where('appid', arg2._id)
            .exec( function (err, ret){
                if(err){
                   throw new Error(err);
                }else{  
                   if(ret == null){
                        BoundUserAndPublic.model.create({
                            openID: arg1.openid,
                            appid: arg2._id,
                            isSub: true,
                            isOperator:true,
                            AdministratorStatus:1
                        },
                        function (err, ret){
                            if(err){
                                throw new Error(err);
                            }else{
                                 console.log('创建中间表成功');
                                 callback(null);
                            }
                        });
                    }else{
                        ret.isSub = true;
                        ret.isOperator = true;
                        ret.AdministratorStatus=1;
                        ret.save(function (err1){
                          if(err1){
                            throw new Error('关联中间表失败');
                          }else{
                            callback(null);
                          }
                        });                   
                        
                    }
                }
            });	
    	},
    ], function (err){
    	if(err){
    		throw new Error(err);
    	}else{            
          res.render('page_bindOperatorSuccess.pug');
    	}
    });
}