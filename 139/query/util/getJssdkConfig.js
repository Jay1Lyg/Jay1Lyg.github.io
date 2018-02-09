var keystone = require('keystone');
var getInfo= require('../redis_cache/RedisCache.js');
var async = require('async');	
var query = require('../get_auth_info/Getjsapi_ticket.js');
var request = require('request');
var fs = require('fs');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var PublicAccount = keystone.list('PublicAccount');

var getJssdkConfig = function(url,appid,callback){
	var data={};
  
	async.waterfall([
	   function(callback){
       var datetime=new Date();
       var data={};
          PublicAccount.model.findOne()
           .where('appid',appid)
           .exec(function(err,ret){
              if(err){
                throw new Error(err);
              }else{
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                console.log(ret);
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                  if(ret.jsapi_ticket==undefined){
                     query.getJsapi_ticket(appid,function(err,ret1){
                         if(err){
                            throw new Error('get JsapiTicket failed!');
                         }else{
                          console.log('JsapiTicket已重新获取');
                          console.log(ret1);
                          callback(null,ret1);
                         }
                      });
                  }else{

                    if(ret.jsapi_ticket_expires_in<datetime){//过期
                       query.getJsapi_ticket(appid,function(err,ret1){
                         if(err){
                            throw new Error('get JsapiTicket failed!');
                         }else{
                          console.log('JsapiTicket已重新获取11');
                          console.log(ret1);
                          callback(null,ret1);
                         }
                      });
                    }else{
                      console.log('JsapiTicket已重新获取22');
                      (typeof ret.jsapi_ticket=='string')?(data=JSON.parse(ret.jsapi_ticket)):(data=ret.jsapi_ticket);
                       callback(null,data);
                    }
                }
              }
           })

	   },
	   function(arg,callback){
	      var jsapi_ticket = arg;
         console.log('ppppppppppppppppppppppppppppppppppppppppppppppppp');
	    
	      console.log(arg);
		    var timestamp = parseInt(new Date().getTime() / 1000) + ''; 
	      console.log(url); 
		    var noncestr  = Math.random().toString(36).substr(2, 15);
	      var str = 'jsapi_ticket=' + arg + '&noncestr='+ noncestr + '&timestamp=' + timestamp + '&url=' + url;
	      console.log(str);
	      var signature = crypto.createHash('sha1').update(str).digest('hex');
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
		    console.log(signature);
        console.log(appid);
	      var data1 = { 
	                    appId: appid,
	                    timestamp: timestamp,
	                    nonceStr: noncestr,
	                    signature: signature
	                 };
        console.log('000000000000000000000000000000000000000000000');
        console.log(jsapi_ticket);
        console.log(url);
        console.log(data1);
		    callback(null,data1);
	   }
  	],function(err,arg){
           if(err){
             callback(err,null);
           }else{
             callback(null,arg);
           }
  	});
}


module.exports = {
	getJssdkConfig:getJssdkConfig
}
