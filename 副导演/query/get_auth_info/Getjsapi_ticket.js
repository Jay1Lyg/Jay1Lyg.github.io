/**
*
*
*
*      获取到 jsapi_tiket,并缓存
*
*
*
*
*
*
*/
var keystone = require('keystone');
var fs = require('fs');
var getInfo= require('../../query/redis_cache/RedisCache.js');
var async = require('async');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
//var query = require('../../query/get_auth_info/GetGlobalAccessToken.js');
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var util = require('../../query/util/util.js');
var PublicAccount = keystone.list('PublicAccount');

var getJsapi_ticket=function(appid,callback){
  var data={};
   async.waterfall([
    //获取access token
     function(callback){
      query.JudgeAuthToken(appid,function(err,ret){
         if(err){
           throw new Error(err);
          }else{
               callback(null,ret);
          }
       });
    },
     //     getInfo.getAccessToken(function(err,ret){
     //          if(err){
     //             throw new Error('get access_token failed!');
     //          }else{
     //            if(!ret){
     //              //comonent_access_token过期，重新获取
     //              console.log('access_token已过期，重新获取中。。。');
     //              query.getGlobalAccessToken(function(err,ret1){
     //                 if(err){
     //                    throw new Error('get access_token failed!');
     //                 }else{
     //                  console.log('access_token已重新获取');
     //                  console.log(ret1);
     //                  console.log(typeof(ret1));
     //                  data=ret1;
     //                  //(typeof(ret1)=='string')?(data=JSON.parse(ret1)):(data=ret1);
     //                  callback(null);
     //                 }
     //              });
     //            }else{
     //                console.log('access_token未过期');
     //                console.log(ret);
     //               (typeof ret=='string')?(data=JSON.parse(ret)):(data=ret);
     //               callback(null);
     //            }
     //          }
     //       });
     // },
     // function(arg,callback){
     //      console.log(typeof arg=='string');
     //      (typeof arg=='string')?(data=JSON.parse(arg)):(data=arg);
     //      callback(null);
     // },
     function(arg,callback){//根据accesstoken获取jsapi_ticket
        console.log('**************');
        console.log(arg);
        var datetime=new Date().getTime()/1000;
        var url='https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+arg.authorizer_access_token+'&type=jsapi';
        util.sendGetRequest(url, function (err, res, body){
          if(err){
            throw new Error(err);
          }else{
            if(res.statusCode == 200){
                 var info = JSON.parse(body);
                 console.log(info);
                 // getInfo.saveJsapi_ticket(info.ticket,function(err){//将ticket保存到redis中
                 //    if(err){
                 //         throw new Error(err);
                 //    }else{
                 //         callback(null, info.ticket);
                 //    }
                 // });
                 PublicAccount.model.findOne()
                  .where('appid',appid)
                  .exec(function(err,ret){
                    if(err){
                      throw new Error(err);
                    }else{
                      ret.jsapi_ticket=info.ticket;
                      ret.jsapi_ticket_expires_in = datetime+7000;
                      ret.save(function(err){
                         if(err){
                           throw new Error(err);
                         }else{
                          callback(null, info.ticket);
                         }
                      })
                    }
                  })
                    
            }else{
              throw new Error('get 请求失败！');
            }
          }
        });
     }

    ],function(err,ticket){
        if(err){
           callback(err,null);
        }else{
           callback(null,ticket);
        }
    });
}
  
module.exports = {
  getJsapi_ticket:getJsapi_ticket,
}