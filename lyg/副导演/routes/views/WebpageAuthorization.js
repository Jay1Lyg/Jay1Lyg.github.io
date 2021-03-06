var keystone = require('keystone');
var fs = require('fs');
var async = require('async');
var util = require('../../query/util/util.js');
var MongoDB = require('../../query/save_and_get_data_in_MongoDB/weixin_public_account/search.js');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/DSF_info.json', 'utf-8'));
var getInfo= require('../../query/redis_cache/RedisCache.js');
var User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var  User_Openid=keystone.list('User_Openid');
var is_click = true;
exports = module.exports = function (req, res) {
    console.log('开始拉取授权方管理员的信息');
    //首先获取code
    var index=req.params.index;
    var code = req.query.code;
    var appid = req.query.appid;
    console.log('appid：'+req.query.state);
    
    console.log('code:'+code+ 'appid:'+appid +'index:'+index+'appid：'+req.query.state);
    if(code == undefined || appid == undefined){
        res.render('page_serverError');
    }else{
        async.waterfall([
            function (callback){
                //首先获取comonent_access_token
                getInfo.getComponentToken( function (err, ret){
                    if(err){
                        throw new Error('获取comonent_access_token失败！');
                    }else{
                        if(!ret){
                            //如果comonent_access_token为空，重新获取
                            getInfo.wxauth.getLatestComponentToken( function (err1, ret1){
                                if(err1){
                                    throw new Error('获取comonent_access_token失败！');
                                }else{
                                    console.log('comonent_access_token已过期，重新获取...');
                                    // console.log(typeof ret1);
                                    console.log('comonent_access_token:'+ret1);
                                    callback(null, ret1)
                                }
                            });
                        }else{
                            console.log('comonent_access_token:'+ret);
                            callback(null, ret);
                        }
                        
                    }
                });
            },
            function (arg, callback){
                //通过code换取access_token后存储到MongoDB中
                //判断对象是String类型还是object，如果为String类型，则转化成JSON格式
                var data = {};
                (typeof arg == 'string') ? (data = JSON.parse(arg)) : (data = arg);
                var url1 = 'https://api.weixin.qq.com/sns/oauth2/component/access_token?appid='+appid+'&code='+code+'&grant_type=authorization_code&component_appid='+info.AppID+
                '&component_access_token='+data.component_access_token;
                util.sendGetRequest(url1, function (err1, res1, body1){
                    if(err1){
                        throw new Error(err1);
                    }else{
                        if(res1.statusCode == 200){
                            // 根据获取的用户信息进行对应操作
                             var info = JSON.parse(body1);
                             console.log('根据获取的用户信息进行对应操作:');
                             console.log(info);
                             callback(null, info);
                        }else{
                            throw new Error('请求失败');
                        }
                    }
                });
                
            },
            function (arg, callback){
                //将access_token等信息存入数据中去
                MongoDB.getWeiXinPublicAccountInfo( appid, function (err1, ret1){
                    if(err1){
                        throw new Error(err1);
                    }else{
                        console.log('得到的第三方公众号信息');
                        console.log(ret1);

                        if(!('access_token' in arg) || !('refresh_token' in arg) || arg.access_token == undefined || arg.refresh_token == undefined){
                            res.render('page_serverError');
                        }else{
                            ret1.webpage_access_token = arg.access_token;
                            ret1.webpage_expires_in = (new Date()).getTime()/1000+7000;
                            ret1.webpage_refresh_token = arg.refresh_token;
                            ret1.webpage_expires_date =(new Date()).getTime()/1000+259100;
                            //259100
                            ret1.save( function (err2){
                                if(err2){
                                    throw new Error(err2);
                                }else{
                                    callback(null, arg.openid, arg.access_token);
                                }
                            });
                        }


                        
                        
                    }
                });
            },
            function ( openid, access_token, callback){
                //通过网页授权access_token获取用户基本信息（需授权作用域为snsapi_userinfo）
                var url2 = 'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN';
                console.log('=========================================');
                console.log(openid);
                console.log('========================================='); 
                util.sendGetRequest(url2, function (err2, res2, body2){
                    if(err2){
                        throw new Error(err2);
                    }else{
                        if(res2.statusCode == 200){
                            // 根据获取的用户信息进行对应操作
                             var info2 = JSON.parse(body2);
                             console.log(info2);
                             callback(null, info2);
                        }else{
                            throw new Error('拉取用户信息请求失败！');
                        }
                    }
                });
            },
            function (arg, callback){
                //通过appid查询PublicAccount
                MongoDB.getWeiXinPublicAccountInfo(appid, function (err, ret){
                    if(err){
                        throw new Error(err);
                    }else{
                        callback(null,arg,ret);
                    }
                });
            },
            function (arg1, arg2,callback){
                //关联中间表
                BoundUserAndPublic.model.findOne()
                .where('openID', arg1.openid)
                .where('appid', arg2._id)
                .where('isSub',true)
                .where('AdministratorStatus',1)
                //.where('isOperator',true)
                .exec( function (err, ret){
                    if(err){
                       throw new Error(err);
                    }else{  
                       if(ret == null){
                            BoundUserAndPublic.model.create({
                                openID: arg1.openid,
                                appid: arg2._id,
                                isSub: true,
                                AdministratorStatus:1
                                //isOperator:true
                            },
                            function (err1, ret1){
                                if(err1){
                                    throw new Error(err1);
                                }else{
                                  console.log('创建中间表成功');
                                  //is_click = ret1.isOperator;
                                  if(appid == 'wx1beb5bae19621613'){  //副导演助手 有自己公众号（普通公众号）且授权给我们第三发的人才有发布通告的权限 
                                    User_Openid.model.findOne()
                                    .where('openID', arg1.openid)
                                    .exec( function (err2, ret2){
                                      if(err2){
                                        throw new Error(err2);
                                      }else{
                                        if(ret2 == null || ret2 == {}){
                                          is_click = ret1.isOperator;
                                        }else{
                                          User_Openid.model.find()
                                          .where('userid', ret2.userid)
                                          .exec( function (err3, ret3){
                                            if(err3){
                                              throw new Error(err3);
                                            }else{                            
                                              async.eachSeries(ret3,function (item,next){
                                                BoundUserAndPublic.model.findOne()
                                                .where('openID', item.openID)
                                                .where('isSub',true)
                                                .where('isOperator', true)
                                                .exec( function (err2, ret2){
                                                  if(err2){
                                                    throw new Error(err2)
                                                  }else{
                                                    if(ret2 == null){
                                                      is_click = false;
                                                      next();
                                                    }else{
                                                      is_click = true;
                                                      callback(null,arg1,arg2);
                                                    }
                                                  }
                                                });
                                              }, function (err4){
                                                if(err4){
                                                  throw new Error(err4);
                                                }else{
                                                  callback(null,arg1,arg2);
                                                }
                                              })
                                            }
                                          });
                                        }
                                      }
                                    });
                                  }else{
                                    is_click = ret1.isOperator;
                                     callback(null,arg1,arg2);
                                  }

                                 
                                }
                            });
                        }else{ 
                        
                          if(appid == 'wx1beb5bae19621613'){//副导演助手 有自己公众号（普通公众号）且授权给我们第三发的人才有发布通告的权限
                            User_Openid.model.findOne()
                            .where('openID', arg1.openid)
                            .exec( function (err2, ret2){
                              if(err2){
                                throw new Error(err2);
                              }else{
                                if(ret2 == null || ret2 == {}){
                                  is_click = ret.isOperator;
                                  callback(null,arg1,arg2);
                                }else{
                                  User_Openid.model.find()
                                  .where('userid', ret2.userid)
                                  .exec( function (err3, ret3){
                                    if(err3){
                                      throw new Error(err3);
                                    }else{
                                      async.eachSeries(ret3,function(item,next){
                                        BoundUserAndPublic.model.findOne()
                                        .where('openID', item.openID)
                                        .where('isSub',true)
                                        .where('isOperator', true)
                                        .exec( function (err2, ret4){
                                          if(err2){
                                            throw new Error(err2)
                                          }else{
                                            console.log(ret4);
                                            if(ret4 == null){
                                              is_click = false;
                                              next();
                                            }else{
                                              is_click = true;
                                              callback(null,arg1,arg2);
                                            }
                                          }
                                        });
                                      }, function (err4){
                                        if(err4){
                                          throw new Error(err4);
                                        }else{
                                          callback(null,arg1,arg2);
                                        }
                                      });
                                    }
                                  });
                                }
                              }
                            });

                            
                          }else{
                            is_click = ret.isOperator;
                            callback(null,arg1,arg2);
                          }
                        }
                    }
                }); 
            },function(arg1,arg2,callback){
               User_Openid.model.find()
                .where('openID',arg1.openid)
                .where('Status',true)
                .exec(function(err,ret){
                    if(ret==null||ret.length==0){//表明未注册
                       console.log('step1');
                       callback(null,arg1,ret,arg2); 
                    }else{
                      console.log('ooooooooooooooooooooooooooo');
                      console.log(ret);
                      callback(null,arg1,ret,arg2);
                              
                    }
                   
                })  
            }

        ], function (err,arg1,arg2,arg3){
          console.log(arg2);
            if(err){
                throw new Error(err);
            }else{
                 if(arg2.length==0){//未注册
                    console.log(arg1.openid);
                       // res.render('page_register',{
                       //   openid: arg1.openid,
                       //   index : index,
                       //   appid : appid
                       // })
                       //res.redirect('http://www.baidu.com');
                       res.redirect('/WX/page_register/'+index+'/'+arg1.openid+'/'+arg3.appid);
                    }else{//注册了

                       if(index=='5'){
                         //var url1='/WX/wx_userprofile/'+arg2[0].userid+'/'+arg3.appid;
                         var url1='/WX/page/'+arg2[0].userid+'/'+arg3.appid;
                         res.redirect(url1);
                       }if(index=='1'){
                         if(is_click == true){
                            var url1='/WX/page_productionDetail/'+arg2[0].userid+'/'+arg1.openid+'/'+arg3.appid;
                            res.redirect(url1);
                         }else{
                            var url = '/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid;
                            res.redirect(url);
                         }
                        
                       }if(index=='3'){
                         var url1='/WX/page_actorInfo/'+appid+'/'+arg1.openid+'/'+arg2[0].userid;
                         res.redirect(url1);
                       }if(index=='2'){
                         res.redirect('/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid);
                       }
                       if(index=='4'){
                        console.log('4');
                         //res.redirect('/WX/wx_userprofile/'+arg2[0].userid);
                         if(is_click == true){
                            res.redirect('/WX/page_publishCrews/'+arg2[0].userid);
                         }else{
                            var url = '/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid;
                            res.redirect(url);
                         }
                       }
                       if(index=='6'){
                            //if(is_click == true){
                              var url1='/WX/page_deliveryRecords/'+arg2[0].userid+'/'+arg3.appid;
                              res.redirect(url1);
                            // }else{ 
                            //   var url = '/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid;
                            //   res.redirect(url);
                            // }
                        
                       }if(index=='7'){
                           //if(is_click == true){
                              var url1='/WX/page_Invitedrecord/'+arg2[0].userid+'/'+arg3.appid;
                              res.redirect(url1);
                           // }else{ 
                           //    var url = '/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid;
                           //    res.redirect(url);
                           // }
                       }
                       if(index=='8'){
                          if(is_click == true){
                              var url1='/WX/page_searchpublishCrews/'+arg2[0].userid+'/'+arg1.openid;
                              res.redirect(url1);
                          }else{ 
                              var url = '/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid;
                              res.redirect(url);
                          }                         
                       }
                       if(index=='9'){
                          var url1='/WX/page_PublicAccountsListsUderDirector/'+arg2[0].userid+'/'+arg3.appid;
                          res.redirect(url1);
                       }if(index=='10'){
                          if(is_click == true){
                              var url1='/WX/page_getAllCrewLists/'+arg2[0].userid+'/'+arg3.appid;
                              res.redirect(url1);
                          }else{ 
                              var url = '/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid;
                              res.redirect(url);
                          }  
                       }if(index=='11'){
                          if(is_click == true){
                              var url1='/WX/page_searchCrewsAndProgramme/'+arg2[0].userid+'/'+arg3.appid;
                              res.redirect(url1);
                          }else{ 
                              var url = '/WX/page_allpositions/'+arg2[0].userid+'/'+appid+'/'+arg1.openid;
                              res.redirect(url);
                          }  
                       }
                       
                    }
                }
           //  
        });
    }
}







