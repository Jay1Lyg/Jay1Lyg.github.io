
var async = require('async');
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var  User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');

//var config = require('../../public/conf/common.js');
exports = module.exports = function(req, res) {
    var userid=req.params.userid;
    var careerInResume_id1=req.params.careerInResume_id;
    var careerInResume_id2=JSON.stringify(careerInResume_id1);
    var careerInResume_id=JSON.parse(careerInResume_id2);
    var workexp={};
    console.log(req.params);
   format.getCareerByTwomodel(userid,function(err,ret){
               if(err) throw new Error(err);
               else{ 
                    console.log('step-1');
                    async.waterfall([
                      function(callback){
                         console.log('step1');
                         console.log(ret.workExpArray.length);
                         console.log(ret.workExpArray);
                         for(var i=0;i<ret.workExpArray.length;i++){
                            console.log(ret.workExpArray[i].careerInResume_id);
                            console.log(typeof(ret.workExpArray[i].careerInResume_id));
                            console.log(careerInResume_id);
                            console.log(typeof(careerInResume_id));
                            console.log(ret.workExpArray[i].careerInResume_id==careerInResume_id);
                             if(ret.workExpArray[i].careerInResume_id==careerInResume_id){
                              console.log('1:'+ret.workExpArray[i].careerInResume_id);
                               workexp=ret.workExpArray[i];
                               callback(null);
                            }
                         }
                        
                      },
                      function(callback){
                           var url = 'http://www.kaishiapp.com'+req.url;
                             searchUser.getJssdkConfig(url,req.params.appid,function(err,ret1){
                                   if(err){
                                      console.log(err);
                                    }else{
                                      callback(null,ret1);
                                    }
                              });      
                      }
                    ],function(err,ret1){
                      console.log('**************************ret1ret1ret1********************************');
                      //console.log(workexp.image_set.imagesURLArray);
                      console.log(ret1);
                      console.log('**************************ret1ret1ret1********************************');
                        res.render('page_work_edit',{
                                         appId: ret1.appId,
                                         timestamp: ret1.timestamp,
                                         nonceStr: ret1.nonceStr,
                                         signature: ret1.signature,
                                          
                                          userid : userid,
                                          production_name : (workexp==null) ? '' : (workexp.detail.productionName),
                                          production_id : (workexp==null) ? '' : workexp.detail.production_id,
                                          workexp_roleName : (workexp==null) ? '' : workexp.detail.role,
                                          workexp_roleId : (workexp==null) ? '' : workexp.detail.role_id,
                                          productionPublishDate : (workexp==null) ? '' : workexp.detail.productionPublishDate,
                                          workexp_roleCategoryName : (workexp==null) ? '' : workexp.detail.roleCategory,
                                          careerInResume_id : (workexp==null) ? '' : workexp.careerInResume_id,
                                          workexp_productionType : (workexp==null) ? '' : workexp.detail.productionType,
                                          
                                          careerImage : (workexp==null||workexp.image_set.imagesURLArray.length==0) ? '' : workexp.image_set.imagesURLArray

                                      }) ; 
                    });
                        
                  
                  
               }
   });
}


