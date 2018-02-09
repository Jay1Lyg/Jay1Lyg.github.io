var keystone = require('keystone');
var Casting1 = keystone.list('Casting1');
var search = require('../../query/save_and_get_data_in_MongoDB/actor/search.js');
var urllib = require('url');
var async = require('async');
var search_resume = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var User_Openid=keystone.list('User_Openid');

/**
*
*  通过openid获取到appid
*
*/
exports = module.exports = function(req, res) {
  var page = req.params.page || '';
  var appid = req.params.appid || '';
  var openid = req.params.openid || '';
  var obj = {};
  obj.gender = req.body.gender;
  obj.age = req.body.age;
  obj.min_height = req.body.min_height;
  obj.max_height = req.body.max_height;
  obj.shap = req.body.shap;
  obj.rolepaycheck = req.body.rolepaycheck;
  obj.skillArray = req.body.skillArray;
  obj.featureArray = req.body.featureArray;
  obj.categoryid = req.body.categoryid;
  obj.repertoireArray = req.body.repertoireArray;
  obj.roletypeArray = req.body.roletypeArray;
  console.log('-----------obj--------------');
  console.log(obj);
  console.log('-----------obj--------------');
  var info = [];
  var userArray=[];
  var useridArray=[];
   PublicAccount.model.findOne()
   .where('appid',appid)
   .exec(function(err,public){
      if(err){
        throw new Error(err);
      }else{
          User.model.find()
           .where('allok',true)
           .where('appid',public._id)
           .sort('-createdAt')
           .exec(function(err,ret){
             if(err){
               throw new Error(err);
             }else{
               async.eachSeries(ret,function(item,next){
                  search.searchactordetails(item,obj,function(err,ret1){//查询演员详情
                      if(err){
                         throw new Error(err);
                      }else{
                        if(ret1==null || ret1.iconUrl==''){
                          next();
                        }
                        else{
                          search.matchactordetails(obj,ret1,function(err,result){//匹配
                               if(err){
                                  throw new Error(err);
                               }else{
                                   if(result){
                                      userArray.push(ret1);//匹配结果放入数组
                                      next();
                                   }else{
                                      next();
                                   }
                               }
                          })
                        }
                      }
                  })
               },function(err){
                   if(err){
                      throw new Error(err);
                   }else{
                    if(obj.rolepaycheck==''){//未填片酬-----按简历更新时间排序
                         var params = urllib.parse(req.url,true);
                         if(userArray== null){
                           if (params.query && params.query.callback) {
                              var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
                              res.send(str);
                           }else {
                              res.send(JSON.stringify({}));//普通的json
                           }
                         }else{
                           if (params.query && params.query.callback) {
                                //console.log('请求2:'+params.query); 
                               var str =  params.query.callback + '(' + JSON.stringify(userArray) + ')';//jsonp
                               res.send(str);           
                           } 
                         }
                    }else{
                        search.Sortbyoffset(userArray,function(err,userarray){//将匹配结果按偏移值从大到小排序
                            if(err){
                               throw new Error(err);
                            }else{
                                   var params = urllib.parse(req.url,true);
                                   if(userarray== null){
                                     if (params.query && params.query.callback) {
                                        //console.log('请求2:'+params.query);
                                        var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
                                        res.send(str);
                                     }else {
                                        res.send(JSON.stringify({}));//普通的json
                                     }
                                   }else{
                                     if (params.query && params.query.callback) {
                                          //console.log('请求2:'+params.query); 
                                         var str =  params.query.callback + '(' + JSON.stringify(userarray) + ')';//jsonp
                                         res.send(str);           
                                    } 
                                 }
                            }
                        });
                    }
                   }
               })
             }
        })
      }
    })
  }

