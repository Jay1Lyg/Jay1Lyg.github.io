var keystone = require('keystone');
User = keystone.list('User');
var async = require('async');
var getInfo = require('../../query/redis_cache/RedisCache.js');
var query1 = require('../../query/get_auth_info/GetGlobalAccessToken.js');
var util = require('../../query/util/util.js');
var fs = require('fs');
var request = require('request');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var info1 = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/WX_ServerrNO_info.json', 'utf-8'));
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
var appid = info.AppID;
var data={};
console.log('从json文件中读取到的appid:'+appid);
async.waterfall([
	   	function(callback){//判断authorizer_access_token是否过期，过期重新获取
	      query.JudgeAuthToken(appid,function(err,ret){
		     if(err){
		       throw new Error(err);
		      }else{
	             callback(null,ret);
		      }
		   });
	   },
	   function(arg,callback){
         
	   	   var url="https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+arg.authorizer_access_token;

	   	   var result={
			   //   "button":[
			   //   {	
			   //        "type":"view",
			   //        "name":"演员",
			   //        "url": 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+info.AppID+'&redirect_uri='+encodeURIComponent('http://kaishi.viphk.ngrok.org/WebpageAuthorization/1')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info1.AppID+'#wechat_redirect' 
			   //    },
			   //    {
				  //      "name":"通告",
				  //      "sub_button":[
			   //         {	
			   //             "type":"view",
			   //             "name":"通告列表",
			   //             "url":'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+info.AppID+'&redirect_uri='+encodeURIComponent('http://kaishi.viphk.ngrok.org/WebpageAuthorization/2')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info1.AppID+'#wechat_redirect'
			   //          },
			   //          {
			   //             "type":"view",
			   //             "name":"发布通告",
			   //             "url":'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+info.AppID+'&redirect_uri='+encodeURIComponent('http://kaishi.viphk.ngrok.org/WebpageAuthorization/3')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info1.AppID+'#wechat_redirect'
			   //          }]
				  // },
			   //    {
			   //         "name":"我的",
			   //         "sub_button":[
			   //         {	
			   //             "type":"view",
			   //             "name":"注册登录",
			   //             "url":'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+info.AppID+'&redirect_uri='+encodeURIComponent('http://kaishi.viphk.ngrok.org/WebpageAuthorization/4')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info1.AppID+'#wechat_redirect'
			   //          },
			   //          {
			   //               "type":"view",
			   //               "name":"简历管理",
			   //               "url":'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+info.AppID+'&redirect_uri='+encodeURIComponent('http://kaishi.viphk.ngrok.org/WebpageAuthorization/5')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info1.AppID+'#wechat_redirect'
			   //           },
			   //          {
			   //             "type":"view",
			   //             "name":"发布管理",
			   //             "url":'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+info.AppID+'&redirect_uri='+encodeURIComponent('http://kaishi.viphk.ngrok.org/WebpageAuthorization/6')+'&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid='+info1.AppID+'#wechat_redirect'
			   //          },{
			   //             "type":"view",
			   //             "name":"一键授权",
			   //             "url": 'http://kaishi.viphk.ngrok.org/WexinAuth'

			   //          }]
			   //     }]

			        "button":[
					     {	
					          "type":"view",
					          "name":"一键授权",
					          "url": config.homeEntry.url+'WexinAuth' 
					      }
					     ]
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