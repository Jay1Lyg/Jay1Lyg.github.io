var keystone = require('keystone');
var async = require('async');
var getInfo = require('../../query/redis_cache/RedisCache.js');
var query1 = require('../../query/get_auth_info/GetGlobalAccessToken.js');
var util = require('../../query/util/util.js');
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var fs = require('fs');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var getInfo = require('../../query/redis_cache/RedisCache.js');
var http = require("http");
var path = require("path");

function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            console.log('存在');
            callback(null);
        } else {
            console.log(dirname);
            fs.mkdir(dirname);
            console.log('不存在，要新建');
            callback(null);
        }
    });
}

exports = module.exports = function(req, res) {
 var data = {};
 var appid = info.AppID;
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
          var url='https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token='+arg.authorizer_access_token;
          var result={
          	    "action_name": "QR_LIMIT_SCENE", 
          	    "action_info": {"scene": {"scene_str":"1000"}}}
	       util.sendPostRequest(url,result,function(err,ret){
	             if(err){
	                throw new Error(err);
	             }else{
	             	console.log(ret);
	             	callback(null,ret);
	             }
	       });
     },function(arg,callback){//通过ticket换取二维码
        var url = 'http://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+encodeURI(arg.ticket);
        console.log('-------url-------');
        console.log(url);
        console.log('-------url-------');
         http.get(url, function(res){
              var imgData = "";
              res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
              res.on("data", function(chunk){
                  imgData+=chunk;
              });
              res.on("end", function(){
                      mkdirs(process.cwd()+'/images/QR_code/',function(err){
                          mkdirs(process.cwd()+'/images/QR_code/',function(err){
                              if(err){
                                throw new Error(err);
                              }else{
                                 fs.writeFile(process.cwd()+'/images/QR_code/1.jpg', imgData, "binary", function(err){
                                    if(err){
                                      throw new Error(err);
                                        console.log("down fail");
                                    }else{
                                        console.log("down success");
                                        callback(null);
                                    }
                                 });
                              }
                          });
                      });
              });
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