var keystone = require('keystone');
var fs = require('fs');
var request1 = require('request-json');
var xml2js  = require('xml2js');
var builder = new xml2js.Builder(); 
var parser = new xml2js.Parser();
	crypto = require('crypto');
var async = require('async');
var request = require('request');
var aes_crypto = require('../../query/aes_crypto/AesCrypto.js');
var verify_ticket = require('../../query/redis_cache/RedisCache.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var getInfo= require('../../query/redis_cache/RedisCache.js');
var query = require('../../query/get_auth_info/Getjsapi_ticket.js');
var config = require('../../public/conf/common.js');

exports = module.exports = function (req, res) {
	var data={};
	async.waterfall([
	   function(callback){
          getInfo.getJsapiTicket(function(err,ret){
          	console.log(ret);
              if(err){
                 throw new Error('get JsapiTicket failed!');
              }else{
                if(!ret){
                  //JsapiTicket过期，重新获取
                  console.log('JsapiTicket已过期，重新获取中。。。');
                  query.getJsapi_ticket(function(err,ret1){
                     if(err){
                        throw new Error('get JsapiTicket failed!');
                     }else{
                      console.log('JsapiTicket已重新获取');
                      console.log(ret1);
                      callback(null,ret1);
                     }
                  });
                }else{
                    console.log('JsapiTicket未过期');
                    console.log(ret);
                    callback(null,ret);
                }
              }
           });
	   },
	   function(arg,callback){
      (typeof(arg)=='string')?(data=JSON.parse(arg)):(data=arg);
      var jsapi_ticket = data;
      console.log(jsapi_ticket);
      console.log(data);
			var timestamp = parseInt(new Date().getTime() / 1000) + ''; 
      var url   = 'http://www.kaishiapp.com'+req.url;
      console.log(url); 
			var noncestr  = Math.random().toString(36).substr(2, 15);
      var str = 'jsapi_ticket=' + data + '&noncestr='+ noncestr + '&timestamp=' + timestamp + '&url=' + url;
      console.log(str);
      var signature = crypto.createHash('sha1').update(str).digest('hex');
			console.log(signature);
      var data = { 
                    appId: info.AppID,
                    timestamp: timestamp,
                    nonceStr: noncestr,
                    signature: signature
                 };
			callback(null,data);
	   }
	],function(err,arg){
         if(err){
            res.send(err);
         }else{
         	console.log('-------------arg---------------');
         	console.log(arg);
         	console.log('-------------arg---------------');
            //res.send(arg);
           res.render('image_test',{
            appId: arg.appId,
            timestamp: arg.timestamp,
            nonceStr: arg.nonceStr,
            signature: arg.signature
           });
         }
	});
}

function sha1(str) {
	 var md5sum = crypto.createHash("sha1");
	 md5sum.update(str);
	 str = md5sum.digest("hex");
	 return str;
 }
