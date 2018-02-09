var keystone = require('keystone');
var async = require('async');
var getInfo = require('../../query/redis_cache/RedisCache.js');
var query1 = require('../../query/get_auth_info/GetGlobalAccessToken.js');
var util = require('../../query/util/util.js');
var query = require('../../query/get_auth_info/AuthTokenRefreshInfo.js');
var fs = require('fs');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var getInfo = require('../../query/redis_cache/RedisCache.js');
var PublicAccount = keystone.list('PublicAccount');
var ProductionCrews = keystone.list('ProductionCrews');
var User_Openid = keystone.list('User_Openid');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
 var data = {};
 //var appid = info.AppID;
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var time=year+'年'+month+'月'+day+'日 '+hour+':'+minute;
var timestamp=new Date().getTime();
var crewName;
var appid=req.params.appid;
var userid=req.params.userid;
var openid=req.params.openid;
var production_crews_id=req.params.production_crews_id;
var otherAppid;

 async.waterfall([
    function(callback){
      ProductionCrews.model.findOne()
       .where('_id',production_crews_id)
       .exec(function(err,ret){
         if(err){
           throw new Error(err);
         } else{
            crewName=ret.name;
            callback(null);
         } 
       })
    },
    function(callback){//判断authorizer_access_token是否过期，过期重新获取
      query.JudgeAuthToken(appid,function(err,ret){
           if(err){
              throw new Error(err);
            }else{
              callback(null,ret);
            }
       });
     },function(arg,callback){
      var url='https://api.weixin.qq.com/cgi-bin/user/get?access_token='+arg.authorizer_access_token+'&next_openid='
         console.log(url);
         util.sendGetRequest(url, function (err1, res1, body1){
          if(err1){
            throw new Error(err1);
          }else{
            if(res1.statusCode == 200){
               var info = JSON.parse(body1);
               console.log(info);
               callback(null,info);
            }else{
              throw new Error('请求失败');
            }
          }
        });
     },function(arg,callback){
        PublicAccount.model.findOne()
         .where('appid',appid)
         .exec(function(err,ret){
            if(err){
              throw new Error(err);
            }else{
              callback(null,arg,ret);
            }
         })
     },  
    function(arg1,arg2,callback){//发送模板
           query.JudgeAuthToken(appid,function(err,ret){
               if(err){
                  throw new Error(err);
                }else{
                  var url='https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+ret.authorizer_access_token;
                 async.each(arg1.data.openid,function(item,next){
                  console.log('&&&&&&&&&&&&&&&&&')
                  console.log(item);
                  console.log('&&&&&&&&&&&&&&&&&')
                     var result=  {
                       "touser":item,
                       "template_id":"OPENTM411480046", 
                       //"url":config.homeEntry.url+"WX/page_allpositions/"+userid+"/"+appid+"/"+openid,      
                       "data":{
                              "first": {
                                "value":"《"+crewName+"》剧组刚刚在《"+arg2.nick_name+"》下发布了通告，赶快去看看吧~~一大波通告即将来袭，敬请关注~"
                               }, 
                               "keyword1": {
                                "value": arg2.nick_name
                               },  
                               "keyword2": {
                                "value":time
                               }, 
                               "remark":{
                                   "value":"祝您生活愉快",
                                   "color":"#173177"
                               }
                        }
                    }
                   // {{productType.DATA}}：{{name.DATA}}\\n购买数量：{{number.DATA}}\\n有效期：{{expDate.DATA}}\\n{{remark.DATA}}
                    util.sendPostRequest(url,result,function(err,ret1){
                       if(err){
                          throw new Error(err);
                       }else{
                        console.log(ret1);
                        next();
                       }
                   });
               },function(err){
                   if(err){
                      throw new Error(err);
                   }else{
                     callback(null);
                   }
                 });
                }
           });
          
           
      }
    ],function(err){
       if(err){
         res.send(err);
       }else{
       	console.log('yes');
       	// res.send('success!');
        console.log('成功');
        res.redirect("/WX/page_allpositions/"+userid+'/'+appid+'/'+openid);
       }
    });
}

// exports = module.exports = function(req, res) {
//  var data = {};
//  //var appid = info.AppID;
// var date = new Date();
// var year = date.getFullYear();
// var month = date.getMonth()+1;
// var day = date.getDate();
// var hour = date.getHours();
// var minute = date.getMinutes();
// var time=year+'年'+month+'月'+day+'日 '+hour+':'+minute;
// var timestamp=new Date().getTime();
// var crewName;
// var appid=req.params.appid;
// var userid=req.params.userid;
// var openid=req.params.openid;
// var production_crews_id=req.params.production_crews_id;
// var otherAppid;
// console.log('^^^^^^^^^^^^^^^^^^^^^^^^^');
// console.log(req.params);
// console.log('^^^^^^^^^^^^^^^^^^^^^^^^^');
//  async.waterfall([
//     function(callback){
//       ProductionCrews.model.findOne()
//        .where('_id',production_crews_id)
//        .exec(function(err,ret){
//          if(err){
//            throw new Error(err);
//          } else{
//             crewName=ret.name;
//             callback(null);
//          } 
//        })
//     },
//     function(callback){//判断authorizer_access_token是否过期，过期重新获取
//       query.JudgeAuthToken(appid,function(err,ret){
//            if(err){
//               throw new Error(err);
//             }else{
//               callback(null,ret);
//             }
//        });
//      },function(arg,callback){//获取关注者openid列表
//       var url='https://api.weixin.qq.com/cgi-bin/user/get?access_token='+arg.authorizer_access_token+'&next_openid='
//          console.log(url);
//          util.sendGetRequest(url, function (err1, res1, body1){
//           if(err1){
//             throw new Error(err1);
//           }else{
//             if(res1.statusCode == 200){
//                var info = JSON.parse(body1);
//                console.log(info);
//                callback(null,info);
//             }else{
//               throw new Error('请求失败');
//             }
//           }
//         });
//      },function(arg,callback){
//         PublicAccount.model.findOne()
//          .where('appid',appid)
//          .exec(function(err,ret){
//             if(err){
//               throw new Error(err);
//             }else{
//               callback(null,arg,ret);
//             }
//          })
//      },  
//     function(arg1,arg2,callback){//发送模板
//            query.JudgeAuthToken(appid,function(err,ret){
//                if(err){
//                   throw new Error(err);
//                 }else{
//                   //var url='https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='+ret.authorizer_access_token;
//                      var url = 'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token='+ret.authorizer_access_token;
//                      var result=  {
//                        "touser": arg1.data.openid,
//                        "msgtype":"text", 
//                        //"url":config.homeEntry.url+"WX/page_allpositions/"+userid+"/"+appid+"/"+openid,      
//                        "text":{'content':"《"+crewName+"》剧组刚刚在《"+arg2.nick_name+"》下发布了通告，赶快去看看吧~~一大波通告即将来袭，敬请关注~"}
//                      }
//                    // {{productType.DATA}}：{{name.DATA}}\\n购买数量：{{number.DATA}}\\n有效期：{{expDate.DATA}}\\n{{remark.DATA}}
//                     util.sendPostRequest(url,result,function(err,ret1){
//                        if(err){
//                           throw new Error(err);
//                        }else{
//                         console.log(ret1);
//                         callback(null);
//                        // next();
//                        }
//                    });
//                }
//            });
          
           
//       }
//     ],function(err){
//        if(err){
//          res.send(err);
//        }else{
//         console.log('yes');
//         // res.send('success!');
//         console.log('成功');
//         res.redirect("/WX/page_allpositions/"+userid+'/'+appid+'/'+openid);
//        }
//     });
// }