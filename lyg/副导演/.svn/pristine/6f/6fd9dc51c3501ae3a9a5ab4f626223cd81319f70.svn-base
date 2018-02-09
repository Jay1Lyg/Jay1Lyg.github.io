var keystone = require('keystone');
var User = keystone.list('User');
var Skill = keystone.list('Skill');
var RoleTag = keystone.list('RoleTag');
var School = keystone.list('School');
var SkillTag = keystone.list('SkillTag');
var FeatureTag = keystone.list('FeatureTag');
var BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var CaregoryInTarget = keystone.list('CaregoryInTarget');
var Category = keystone.list('Category');
var async = require('async');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');

var getTypeName=function(userid,callback){
   var result=[];
   var data={};
   CaregoryInTarget.model.find()
    .where('user_id',userid)
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(ret);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
         search.getAllCareerType(ret,function(err,ret1){
           if(err){
              throw new Error(err);
           }else{
              callback(null,ret1);
           }
         });
       }
    })
  
}

exports = module.exports = function (req, res) {
  console.log(req.body);
	var userid=req.body.userid;
  var category_id=req.body.category_id;
  var repertoiretypeArray=req.body.repertoireType;
  var data={};
  CaregoryInTarget.model.findOne()
   .where('user_id',userid)
   .where('category',category_id)
   .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
         if(ret==null){//第一次添加
            CaregoryInTarget.model.create({user_id:userid,category:category_id,repertoireType:repertoiretypeArray},function(err,ret2){
                if(err){
                   throw new Error(err);
                }else{
                   getTypeName(userid,function(err,ret1){
                      if(err){
                         throw new Error(err);
                      }else{
                            var params = urllib.parse(req.url,true);
                            console.log('-----------ret1-----------');
                            console.log(ret1);
                            console.log('-----------ret1-----------');
                            if(ret1== null){
                                //console.log('请求1:'+params);
                              if (params.query && params.query.callback) {
                                  //console.log('请求2:'+params.query);
                                  var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
                                res.send(str);
                              } else {
                                res.send(JSON.stringify({}));//普通的json
                              }
                            }else{
                              if (params.query && params.query.callback) {
                                  //console.log('请求2:'+params.query); 
                                   var str =  params.query.callback + '(' + JSON.stringify(ret1.nameSet) + ')';//jsonp
                                   //var str =  params.query.callback + '(' + ret1 + ')';//jsonp
                                   res.send(str);           
                              } 
                          }
                      }
                   });    
                }
             });
         }else{//修改剧目类型
            ret.user_id=userid;
            ret.category=category_id;
            ret.repertoireType=repertoiretypeArray;
            ret.save(function(err){
               if(err){
                 throw new Error(err);
               }else{
                    getTypeName(userid,function(err,ret1){
                      if(err){
                         throw new Error(err);
                      }else{
                            var params = urllib.parse(req.url,true);
                            if(ret1== []){
                                //console.log('请求1:'+params);
                              if (params.query && params.query.callback) {
                                  //console.log('请求2:'+params.query);
                                  var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
                                res.send(str);
                              } else {
                                res.send(JSON.stringify({}));//普通的json
                              }
                            }else{
                              if (params.query && params.query.callback) {
                                  //console.log('请求2:'+params.query); 
                                    var str =  params.query.callback + '(' + JSON.stringify(ret1.nameSet) + ')';//jsonp
                                   //var str =  params.query.callback + '(' + ret1 + ')';//jsonp
                                   res.send(str);            
                              } 
                          }
                      }
                   });    
               }
            });
         }
       }
   })

	 
}
