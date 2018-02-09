var async = require('async');
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var keystone = require('keystone');
var searchUser = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var config = require('../../public/conf/common.js');
//var config = require('../../public/conf/common.js');
exports = module.exports = function(req, res) {
    var userid=req.params.userid;
    var careerInResume_id=req.params.careerInResume_id;
    var workexp={};
   format.getCareerByTwomodel(userid,function(err,ret){
               if(err) throw new Error(err);
               else{
                async.each(ret.workExpArray,function(item,next){
                  if(item.careerInResume_id==careerInResume_id){
                     workexp=item;
                     next();
                  }
                });             
                  var url = config.homeEntry.url+req.url;
                 searchUser.getJssdkConfig(url,function(err,ret1){
                       if(err){
                          res.send(err);
                        }else{
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
                        }
                  });      
                  
               }
   });
}