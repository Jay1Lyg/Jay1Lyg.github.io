var keystone = require('keystone');
var async = require('async');
var getInfo = require('../../query/redis_cache/RedisCache.js');
var query1 = require('../../query/get_auth_info/GetGlobalAccessToken.js');
var util = require('../../query/util/util.js');
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var fs = require('fs');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var getInfo = require('../../query/redis_cache/RedisCache.js');

exports = module.exports = function(req, res) {
   var appid = info.AppID;
   async.waterfall([
	   	function(callback){//判断authorizer_access_token是否过期，过期重新获取
	      query.JudgeAuthToken(appid,function(err,ret){
		     if(err){
		       throw new Error(err);
		      }else{
	             callback(null);
		      }
		   });
	   },function(callback){//获取access_token
	     getInfo.getAccessToken(function(err,ret){
		              if(err){
		                 throw new Error('get access_token failed!');
		              }else{
		                if(!ret){
		                  //access_token过期，重新获取
		                  console.log('access_token已过期，重新获取中。。。');
		                  query1.getGlobalAccessToken(appid,function(err,ret1){
		                     if(err){
		                        throw new Error('get access_token failed!');
		                     }else{
			                      console.log('access_token已重新获取');
			                      console.log(ret1);
			                      console.log(typeof(ret1));
			                      data=ret1;
			                      callback(null);
		                     }
		                  });
		                }else{
		                    console.log('access_token未过期');
		                    console.log(ret);
		                    (typeof ret=='string')?(data=JSON.parse(ret)):(data=ret);
		                    callback(null);
		                }
		              }
		         });
	   },function(callback){
              var url='https://api.weixin.qq.com/datacube/getuserreadhour?access_token='+data;
              var result={
              	"begin_date" : "2017-6-23",
              	 "end_date": "2017-6-23"
              }
              util.sendPostRequest(url,result,function(err,ret){
	             if(err){
	                throw new Error(err);
	             }else{
	             	console.log(ret);
	             	callback(null);
	             }
	          });
	  }
   ],function(err){
	   	if(err){
          res.send(err);
	   	}else{
	   	  res.send('success!');
	   	}
   });
}