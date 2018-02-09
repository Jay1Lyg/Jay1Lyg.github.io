/*
*
*   保存、更新、获取微信公众号等信息
*
*
*
*
*
*
*
*/
var keystone = require('keystone');
var async = require('async');
var User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');

/*
*
*  根据appid查询授权方的信息
*
*/
function getWeiXinPublicAccountInfo ( authorizer_appid, callback){
	PublicAccount.model.findOne()
	.where('appid', authorizer_appid)
	.exec( function (err, ret){
		if(err){
			return callback(err, null);
		}else{	
			if(!ret){
				return callback(null, "");
			}else{
				return callback(null, ret);
			}
		}
	});
}

/*
*  保存微信授权方的信息--副导演
*
*/
function saveWeiXinPublicAccountInfo ( data, callback){
	PublicAccount.model.create({
		nick_name: data.nick_name,
		head_img: data.head_img,
		service_type_info: data.service_type_info,
		verify_type_info: data.verify_type_info,
		user_name: data.user_name,
		principal_name: data.principal_name,
		alias: data.alias,
		open_store: data.open_store,
		open_scan: data.open_scan,
		open_pay: data.open_pay,
		open_card: data.open_card,
		open_shake: data.open_shake,
		qrcode_url: data.qrcode_url,
		appid: data.authorizer_appid,
		authorizer_access_token: data.authorizer_access_token,
		expires_in: data.expires_in,
		authorizer_refresh_token: data.authorizer_refresh_token,
		func_info: data.func_info,
		publicAccountAscription : 1
	},
	function (err, ret){
		if(err){
			return callback(err, null);
		}else{
			return callback(null, ret);
		}
	});
}
/*
*  保存微信授权方的信息--经纪人
*
*/
function saveWeiXinPublicAccountInfo1 ( data, callback){
	PublicAccount.model.create({
		nick_name: data.nick_name,
		head_img: data.head_img,
		service_type_info: data.service_type_info,
		verify_type_info: data.verify_type_info,
		user_name: data.user_name,
		principal_name: data.principal_name,
		alias: data.alias,
		open_store: data.open_store,
		open_scan: data.open_scan,
		open_pay: data.open_pay,
		open_card: data.open_card,
		open_shake: data.open_shake,
		qrcode_url: data.qrcode_url,
		appid: data.authorizer_appid,
		authorizer_access_token: data.authorizer_access_token,
		expires_in: data.expires_in,
		authorizer_refresh_token: data.authorizer_refresh_token,
		func_info: data.func_info,
		publicAccountAscription : 2
	},
	function (err, ret){
		if(err){
			return callback(err, null);
		}else{
			return callback(null, ret);
		}
	});
}


/*
*
*  通过openid来检索用户
*
*
*
*/
function getUserInfoByOpenid (openid, callback){
	User.model.findOne()
	.where('openID', openid)
	.exec( function (err, ret){
		if(err){
			callback(err, null);
		}else{	
			if(!ret){
				return callback(null, null);
			}else{
				return callback(null, ret);
			}
		}
	});
}
/*
*
*   通过openid来创建新用户
*
*
*/
function createNewUserByOpenid (openid,name,callback){
	User.model.create({
		name: '123456',
		password: '123456',
		openID: openid
	},
	function (err, ret){
		if(err){
			return callback(err, null);
		}else{
			return callback(null, ret);
		}
	});
}

/*
*
*  通过appid和openid锁定中间表
*
*
*/
function findBoundUserAndPublicInfo (appid, openid, callback){
	BoundUserAndPublic.model.findOne()
	.where('openID', openid)
	.where('appid', appid)
	.exec( function (err, ret){
		if(err){
			return callback(err, null);
		}else{	
			if(!ret){
				return callback(null, null);
			}else{
				return callback(null, ret);
			}
		}
	});
}
/*
*
* 通过appid和openid创建中间表
* 
*
*
*
*/
function createBoundUserAndPublic (appid, openid, callback){
	BoundUserAndPublic.create({
		openID: openid,
		appid: appid
	},
	function (err, ret){
		if(err){
			return callback(err, null);
		}else{
			return callback(null, ret);
		}
	});
}
/*
*
*   粉丝关注表关系建立
*
*
*/
var buildRelationshipOfFans=function(appid,openid,callback){
   getWeiXinPublicAccountInfo(appid, function (err, ret){
		if(err){
			throw new Error(err);
		}else{
	       BoundUserAndPublic.model.findOne()
            .where('openID', openid)
            .where('appid', ret._id)
            .exec( function (err, ret1){
                if(err){
                   throw new Error(err);
                }else{  
                   if(ret1 == null){
                   	    console.log('查询BoundUserAndPublic model的结果为空');
                        BoundUserAndPublic.model.create({
                            openID: openid,
                            appid: ret._id
                        },
                        function (err2, ret2){
                        	ret2.isSub = true;
                        	ret2.save( function(err3){
                        		if(err3){
	                                throw new Error(err3);
	                            }else{
	                                 console.log('关联粉丝成功');
	                                 return callback(null);
	                            }
                        	});
                            
                        });
                    }else{   
                    	ret1.isSub = true;
                    	ret1.save( function (err){
                    		if(err){
                    			throw new Error(err);
                    		}else{
                    			return callback(null);
                    		}
                    	});             
                        
                    }
                }
            });	
		}
  });
}
/*
*
*   粉丝取消关注表关系解除
*
*
*/
var removeRelationshipOfFans=function(appid,openid,callback){
     getWeiXinPublicAccountInfo(appid, function (err, ret){
		if(err){
			throw new Error(err);
		}else{
			BoundUserAndPublic.model.findOne()
			.where('appid', ret._id)
			.where('openID', openid)
			.exec(function(err,ret1){
              if(err){
                   throw new Error(err);
              }if(ret1==null){
                 return callback(null);
              }
              else{
            	ret1.isSub=false;
            	ret1.save(function(err){
                  if(err){
                     return callback(err);
                  }else{
                  	 console.log('解除粉丝关系成功');
                  	 return callback(null);
                  }
            	})
              }
			})
		}
	 });
}

/*
*
* 查询公众号详情
*
*/
var PublicAccountDetailinfo = function(array,callback){
   var results = [];
   async.eachSeries(array,function(item,next){
     var data ={};
     data.nick_name=item.nick_name;
	 data.head_img= item.head_img;
	 data.service_type_info= item.service_type_info;
	 data.verify_type_info= item.verify_type_info;
	 data.user_name= item.user_name;
	 data.principal_name= item.principal_name;
	 data.alias= item.alias;
	// data.open_store= item.open_store;
	// data.open_scan=item.open_scan;
	// data.open_pay= item.open_pay;
	// data.open_card= item.open_card;
	// data.open_shake= item.open_shake;
	 data.qrcode_url= item.qrcode_url;
	 data.appid= item.appid;
	 //data.authorizer_access_token= item.authorizer_access_token;
	 //data.expires_in= item.expires_in;
	// data.authorizer_refresh_token= item.authorizer_refresh_token;
	// data.func_info= item.func_info;
	 data.publicAccountAscription = 2;
	 results.push(data);
	 next();
   },function(err){
      if(err){
        throw new Error(err);
      }else{
      	 callback(null,results);
      }
   })
}
module.exports = {
	getWeiXinPublicAccountInfo: getWeiXinPublicAccountInfo,
	saveWeiXinPublicAccountInfo: saveWeiXinPublicAccountInfo,
	getUserInfoByOpenid: getUserInfoByOpenid,
	createNewUserByOpenid: createNewUserByOpenid, 
	findBoundUserAndPublicInfo: findBoundUserAndPublicInfo,
	createBoundUserAndPublic: createBoundUserAndPublic,
	removeRelationshipOfFans:removeRelationshipOfFans,
	buildRelationshipOfFans:buildRelationshipOfFans,
	saveWeiXinPublicAccountInfo1:saveWeiXinPublicAccountInfo1,
	PublicAccountDetailinfo : PublicAccountDetailinfo
}