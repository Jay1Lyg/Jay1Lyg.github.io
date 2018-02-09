/*
*
*
*   代公众号发起网页授权，判断access_token是否失效,失效后重新请求并刷新
*
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var request = require('request');
var request1 = require('request-json');
var getInfo= require('../../query/redis_cache/RedisCache.js');
var async = require('async');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var redis = require('../../query/redis_cache/RedisCache.js');
var util = require('../../query/util/util.js');
var MongoDB = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');
    PublicAccount = keystone.list('PublicAccount');


/*
* 代公众号发起网页授权
*    刷新accesstoken
*/
var getAccesstoken=function(appid,callback){
   var data={};
   var result={};
   async.waterfall([
     function(callback){
      //获取comonent_access_token
           getInfo.getComponentToken(function(err,ret){
              if(err){
                 throw new Error('get comonent_access_token failed!');
              }else{
              	if(!ret){
                  //comonent_access_token过期，重新获取
                  console.log('comonent_access_token已过期，重新获取中。。。');
                  getInfo.wxauth.getLatestComponentToken(function(err,ret1){
                     if(err){
                        throw new Error('get comonent_access_token failed!');
                     }else{
                      console.log('comonent_access_token已重新获取');
                      console.log(ret1);
                     	callback(null,ret1);
                     }
                  });
              	}else{
                  console.log('comonent_access_token未过期');
              		callback(null,ret);
              	}
              }
           });
     },
     function(arg,callback){
         (typeof arg=='string')?(data=JSON.parse(arg)):(data=arg);
         callback(null);
     },
     function(callback){
       //在数据库获取refresh_token
        PublicAccount.model.findOne()
  		  .where('appid',appid)
  		  .exec(function(err,ret){
  		     if(err){
  		         callback(err,null);
  		     }else{
  		         callback(null,ret);
  		     }
  	  	})
     },
     function(arg,callback){
     	var url = 'https://api.weixin.qq.com/sns/oauth2/component/refresh_token?appid='+appid+'&grant_type=refresh_token&component_appid='+info.AppID+'&component_access_token='+data.component_access_token+'&refresh_token='+arg. webpage_refresh_token;
       
        util.sendGetRequest(url,function (err,res,ret){
            if(err){
              console.log(err);
            }else{ 
              callback(null,ret);
            }
        });
     }],function(err,arg){
        if(err){
          return callback(err,null);
        }else{
           (typeof arg=='string')?(result=JSON.parse(arg)):(result=arg);
           console.log('-------------------access_token重新获取到，打印结果----------------------');
           console.log(result);
           console.log('-------------------access_token重新获取到，打印结果----------------------');
          return callback(null,result);
        }
     });
}

var JudgeAccessToken=function(appid,callback){
  var data={};
	var datetime=new Date().getTime()/1000;
 // var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+encodeURIComponent('http://kaishi.viphk.ngrok.org/WebpageAuthorization')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info.AppID+'#wechat_redirect';
  PublicAccount.model.findOne()
	 .where('appid',appid)
	 .exec(function(err,ret){
	    if(err){
	      callback(err,null);
	    }else{ 
	      //判断access_token是否过期
	       if(ret.webpage_expires_in<datetime){//过期
	       	//判断refresh_token是否过期
              if(ret.webpage_expires_date>datetime){//没过期
                console.log(ret.webpage_expires_in);
                console.log(ret.webpage_expires_date);
                console.log(datetime);
                console.log('access_token过期，refresh_token没过期。。');
                getAccesstoken(appid,function(err,ret1){//将刷新后的access_token保存到数据库
                   if(err){
                       console.log(err);
                   }else{
                     MongoDB.getWeiXinPublicAccountInfo( appid, function (err1, ret2){
                        if(err1){
                          throw new Error(err1);
                        }else{
                          //console.log(ret1);
                          ret2.webpage_access_token = ret1.access_token;
                          ret2.webpage_expires_in = datetime+7000;
                          ret2.webpage_refresh_token = ret1.refresh_token;
                          ret2.webpage_expires_date = datetime+259100;
                          data.webpage_access_token = ret1.access_token;
                          data.webpage_expires_in = datetime+7000;
                          data.webpage_refresh_token = ret1.refresh_token;
                          data.webpage_expires_date = datetime+259100;
                          data.index=false;
                          ret2.save( function (err2){
                            if(err2){
                              throw new Error(err2);
                            }else{
                              callback(null,data);
                            }
                          });
            
                        }
                     });
                   } 
                });

              }else{//refresh_token过期了，需要重新授权 
                 console.log('access_token过期，refresh_token过期。。');
                 //data.url=url;
                 data.index=true;
                 console.log(data);
                 callback(null,data);                
              }
	       }else{//access_token没过期
             if(ret.webpage_expires_date>datetime){//refresh_token没过期
               console.log('access_token没过期，refresh_token没过期。。');
               data.webpage_access_token = ret.webpage_access_token;
               data.webpage_expires_in = datetime+7000;
               data.webpage_refresh_token = ret.webpage_refresh_token;
               data.webpage_expires_date = datetime+259100;
               data.index=false;
               callback(null,data);
             }else{//refresh_token过期了，需要重新授权
              console.log('access_token没过期，refresh_token过期。。');
               //data.url=url;
               data.index=true;
               console.log(data);
               callback(null,data);  
             }
         }
	    } 
	  })
}

module.exports = {
  JudgeAccessToken:JudgeAccessToken,
}