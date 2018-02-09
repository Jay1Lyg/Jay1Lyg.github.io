/*
*
*
*   判断authorizer_refresh_token是否失效，失效后重新请求刷新
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
    PublicAccount = keystone.list('PublicAccount');


var  getParameter=function(appid,callback){
  PublicAccount.model.findOne()
  .where('appid',appid)
  .exec(function(err,ret){
     if(err){
         callback(err,null);
     }else{
         callback(null,ret);
     }
  })
}
/*
*
* 刷新authorizer_access_token
*
*/
  var getAuthTokenInfo=function(appid,callback){
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
            //在数据库获取authorizer_appid && authorizer_refresh_token
            getParameter(appid,function(err,ret){
               if(err){
                  throw new Error('get Parameters failed!');
               }
               if(ret==null){
                  throw new Error('the data below appid is empty!');
               }else{
                  console.log('authorizer_access_token:'+ret.authorizer_access_token+'/authorizer_refresh_token:'+ret.authorizer_refresh_token);
                  callback(null,ret);
               }
            });
        },
        function(arg,callback){
          console.log(data.component_access_token);
            var url='https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token='+data.component_access_token;
            var post_info={
              "component_appid":info.AppID,
              "authorizer_appid":arg.appid,
              "authorizer_refresh_token":arg.authorizer_refresh_token,
            } 
            util.sendPostRequest(url, post_info, function (err1, ret1){
                if(err1){
                  console.log(err1);
                }else{ 
                  callback(null,ret1);
                }
            });
        }
	   ],function(err,arg){
	      if(err){
	         return callback(err,null);
	      }else{
	        result=arg;
          console.log('打印刷新后的结果');
          console.log(result);
          console.log('打印刷新后的结果');
	        return callback(null,result);
	      }
	   });

}
/*
*
* 判断authorizer_access_token是否过期
*
*/
var JudgeAuthToken=function(appid,callback){
  var data={};
	var datetime=new Date().getTime()/1000;
  console.log('=====================================================');
  console.log(appid);
	 PublicAccount.model.findOne()
	 .where('appid',appid)
	 .exec(function(err,ret){
	    if(err){
	      callback(err,null);
	    }else{ 
         if(ret == null)  throw new Error('PublicAccount is null');
        console.log('oooooooooo');
        console.log(ret); 
	         if(ret.expires_in<datetime){//过期，需要重新获取authorizer_access_token,将新的authorizer_access_token,expires_in,authorizer_refresh_token保存到数据库
	           console.log('authorizer_access_token过期了,重新获取。。。');
             getAuthTokenInfo(appid,function(err,ret1){
	                PublicAccount.model.findOne()
	                 .where('appid',appid)
	                 .exec(function(err,ret2){
	                    if(err){
	                       throw new Error('err');
	                    }else{
	                      ret2.authorizer_access_token=ret1.authorizer_access_token;
	                      ret2.expires_in=datetime+7000;//计算出下次过期的时间
	                      ret2.authorizer_refresh_token=ret1.authorizer_refresh_token;
                        data.authorizer_access_token=ret1.authorizer_access_token;
                        data.expires_in=datetime+7000;
                        data.authorizer_refresh_token=ret1.authorizer_refresh_token;
	                      ret2.save(function (err) {
	                        if (err) return callback(err,null);
                          console.log('------------获取成功，打印结果-------------');
                          console.log(data);
                          console.log('------------获取成功，打印结果-------------');
	                        return callback(null,data);
	                      });
	                    }
	                 });
	            });
	         } else{
                console.log('没有过期。。。。。。');
                console.log(ret);
	              return callback(null,ret);
	         }
	    }
	 })
}
module.exports = {
  getParameter:getParameter,
	JudgeAuthToken:JudgeAuthToken,
  getAuthTokenInfo:getAuthTokenInfo
}