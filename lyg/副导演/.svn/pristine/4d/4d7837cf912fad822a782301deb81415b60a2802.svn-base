var keystone = require('keystone');
var async = require('async');
var getInfo = require('../../query/redis_cache/RedisCache.js');
var query = require('../../query/get_auth_info/GetGlobalAccessToken.js');
var query1 = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var util = require('../../query/util/util.js');
var fs = require('fs');
var request = require('request');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));

exports = module.exports = function(req, res) {
	var data={};
  var mediaId=[];
  var Imageurl=[];
  var appid = info.AppID;
	async.waterfall([
    function(callback){//判断authorizer_access_token是否过期，过期重新获取
      query1.JudgeAuthToken(appid,function(err,ret){
           if(err){
             throw new Error(err);
            }else{
                 callback(null);
            }
       });
     },
      function(callback){     	
         getInfo.getAccessToken(function(err,ret){
              if(err){
                 throw new Error('get access_token failed!');
              }else{
                if(!ret){
                 // if(true){
                  //access_token过期，重新获取
                  console.log('access_token已过期，重新获取中。。。');
                  query.getGlobalAccessToken(function(err,ret1){
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
      },function(callback){//获取mediaid
      	 var url = 'http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token='+data+'&type=image';
         var file=process.cwd()+'/images/image-text/1.jpg';
         var media = fs.createReadStream(file);//读取图片文件
            request.post({
              url: url,
              json: true,
              formData: { media: media}
            }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body);
                mediaId.push(body.media_id);
                //mediaId=body;
                //callback(null);
                 var url1 = 'http://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token='+data;
                 var file=process.cwd()+'/images/image-text/1.jpg';
                 var media = fs.createReadStream(file);//读取图片文件
                    request.post({
                      url: url1,
                      json: true,
                      formData: { media: media}
                    }, function (error, response, body1) {
                      if (!error && response.statusCode == 200) {
                        Imageurl.push(body1.url);
                        console.log(body1);
                        callback(null);
                      } else {
                        throw new Error(err);
                      }
                    });
              } else {
                throw new Error(err);
              }
            });
    
      },function(callback){//获取mediaid
         var url = 'http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token='+data+'&type=image';
         var file=process.cwd()+'/images/image-text/2.jpg';
         var media = fs.createReadStream(file);//读取图片文件
            request.post({
              url: url,
              json: true,
              formData: { media: media}
            }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body);
                mediaId.push(body.media_id);
                //mediaId=body;
                //callback(null);
                 var url1 = 'http://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token='+data;
                 var file=process.cwd()+'/images/image-text/2.jpg';
                 var media = fs.createReadStream(file);//读取图片文件
                    request.post({
                      url: url1,
                      json: true,
                      formData: { media: media}
                    }, function (error, response, body1) {
                      if (!error && response.statusCode == 200) {
                        Imageurl.push(body1.url);
                        console.log(body1);
                        callback(null);
                      } else {
                        throw new Error(err);
                      }
                    });
              } else {
                throw new Error(err);
              }
            });
    
      }
      ,function(callback){//获取mediaid
         var url = 'http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token='+data+'&type=image';
         var file=process.cwd()+'/images/image-text/3.jpg';
         var media = fs.createReadStream(file);//读取图片文件
            request.post({
              url: url,
              json: true,
              formData: { media: media}
            }, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                console.log(body);
                mediaId.push(body.media_id);
                //mediaId=body;
                //callback(null);
                 var url1 = 'http://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token='+data;
                 var file=process.cwd()+'/images/image-text/3.jpg';
                 var media = fs.createReadStream(file);//读取图片文件
                    request.post({
                      url: url1,
                      json: true,
                      formData: { media: media}
                    }, function (error, response, body1) {
                      if (!error && response.statusCode == 200) {
                        Imageurl.push(body1.url);
                        console.log(body1);
                        callback(null);
                      } else {
                        throw new Error(err);
                      }
                    });
              } else {
                throw new Error(err);
              }
            });
    
      }
      ,
      function(callback){//上传素材
          var url='https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token='+data;
          console.log(url);
          var result={
				   "articles": [
						 {
				      "thumb_media_id":mediaId[0],
				      "author":"Carry",
							 "title":"Happy Day",
							 "content":"<h1>测试</h1><br><img src=Imageurl[0]>",
							 "digest":"向前是海洋",
				             "show_cover_pic":1
						 }, {
              "thumb_media_id":mediaId[1],
              "author":"Carry",
               "title":"论一个程序员的个人修养",
               "content":"<h1>程序员</h1><br><img src=Imageurl[1]><br><textarea>在《喜剧之王》中，周星驰扮演的尹天仇，一直梦想成为一名演员，而他不管是在扮演跑龙套，或者在街坊中开设演员训练班，亦或成为主角时，他对待演员的态度，始终是认真，热爱而又投入的。而那一本他随身携带的书--《演员的自我修养》，尽管不知道里面具体写的是什么，但我猜，他对待演员的态度和行为，就是书中内容显示的。</textarea>",
               "digest":"论一个程序员的个人修养",
                     "show_cover_pic":1
             },{
              "thumb_media_id":mediaId[2],
              "author":"Carry",
               "title":"upup",
               "content":"<h1>going up</h1><br><img src=Imageurl[2]>",
               "digest":"好好学习，天天向上",
                     "show_cover_pic":1
             }
				   ]
				}
          util.sendPostRequest(url,result,function(err,ret){
             if(err){
                throw new Error(err);
             }else{
             	console.log(ret);
             	callback(null,ret);
             }
          });
      },
      function(arg,callback){//拉取关注者ID
         var url='https://api.weixin.qq.com/cgi-bin/user/get?access_token='+data+'&next_openid='
         console.log(url);
         util.sendGetRequest(url, function (err1, res1, body1){
    			if(err1){
    				throw new Error(err1);
    			}else{
    				if(res1.statusCode == 200){
               var info = JSON.parse(body1);
               console.log(info);
               callback(null,info,arg);
    				}else{
    					throw new Error('请求失败');
    				}
    			}
    		});
      },
      function(arg1,arg2,callback){//发送图文消息
          var url='https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token='+data;
          console.log(arg1.data.openid);
          console.log(arg2.media_id);
          var result={
				   "touser":arg1.data.openid,
				   "mpnews":{
				      "media_id":arg2.media_id
				   },
				    "msgtype":"mpnews",
				    "send_ignore_reprint":0
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
           res.send('success');
        }
	});
}