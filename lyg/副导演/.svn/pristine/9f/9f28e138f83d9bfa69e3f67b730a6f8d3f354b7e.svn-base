var keystone = require('keystone'),
	Address = keystone.list('Address'),
	Areainfo = keystone.list('Areainfo'),
	Category = keystone.list('Category'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	ProductionCompany = keystone.list('ProductionCompany'),
	Issuer = keystone.list('Issuer'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
  Category = keystone.list('Category'); 
  Invitation = keystone.list('Invitation'); 
  Resume = keystone.list('Resume'); 
  SkillTag = keystone.list('SkillTag');
  RoleTag = keystone.list('RoleTag');
  FeatureTag = keystone.list('FeatureTag');
  BoundProductionAndInvited = keystone.list('BoundProductionAndInvited');
  SkillTag = keystone.list('SkillTag');
  FeatureTag = keystone.list('FeatureTag');
  RepertoireType = keystone.list('RepertoireType');
  ProductionMatchActor = keystone.list('ProductionMatchActor');
  MatchProduction = keystone.list('MatchProduction');
  MatchActor = keystone.list('MatchActor');
    
var async = require('async');
var _ = require('underscore');
var format = require('./format.js');
//var search = require('../production/search.js');
var config = require('../../../public/conf/common.js');
var search = require('../careerincrew/search.js');

//
var abstractMatchUser = function(users,careerinfo,callback){
  var user_result = [];
  async.eachSeries(users,function(item,next){
     format.formatProfileBasicInfo(item,function(err,user){//查询演员信息
        if(err){
           throw new Error(err);
        }else{
           format.matchAccordingToNecessaryConditions(user,careerinfo,function(err,result){//按性别，年龄段，身高，体型进行匹配
             if(err){
                throw new Error(err);
             }else{
                console.log(result);
                if(result == false){
                  next();
                }else{
                  user_result.push(user);
                  next();
                }               
             }
           });
        }
     })
  },function(err){
     if(err){
        throw new Error(err);
     }else{
        callback(null,user_result);
     }
  }); 


}
//根据硬性条件筛选出演员---用于一键筛选
var searchActorsAccordingToNecessaryConditions = function(careerinfo,callback){
   if(careerinfo.gender==3){//性别不限
      User.model.find()
      .where('allok',true)
      .exec(function(err,ret){
        if(err){
          throw new Error(err);
        }else{
          abstractMatchUser(ret,careerinfo,function(err,userarray){
             if(err){
                throw new Error(err);
             }else{
                callback(null,userarray);
             }
          });

        }
    })
   }else{
      User.model.find()
      .where('gender',careerinfo.gender)
      .where('allok',true)
      .exec(function(err,ret){
        if(err){
          throw new Error(err);
        }else{
          abstractMatchUser(ret,careerinfo,function(err,userarray){
             if(err){
                throw new Error(err);
             }else{
                callback(null,userarray);
             }
          });
        }
      })
  }
}
//一键筛选--匹配演员
var positionMatchActor = function(careerinfo,userArray,callback){
   //var userArray = [];
   var result = [];
   var basicMatchingDegree;
   var featureMatchingDegree ;
   var offsetMatchingDegree ;
   var scheduleMatchingDegree ;
   var totalMatchingDegree;
   var SalaryoffsetValue;
   console.log('----------userArray-------------');
   console.log(careerinfo);
   //console.log(userArray);
   console.log('----------userArray-------------');
   async.eachSeries(userArray,function(item,next){
      var userdata = {};
      async.waterfall([
         // function(callback){//匹配基本信息35
         //   format.matchBasicInfo(careerinfo,item,function(err,basicDegree){
         //      if(err){
         //         throw new Error(err);
         //      }else{
         //         console.log(basicDegree);
         //         basicMatchingDegree = Math.round((basicDegree*100))/100;
         //         console.log('basicMatchingDegree:'+basicMatchingDegree);
         //         callback(null);
         //      }
         //   });   
         // },function(callback){//角色特征20
         //    format.matchFeature(careerinfo,item,function(err,featureDegree){
         //       if(err){
         //          throw new Error(err);
         //       }else{
         //       	  featureMatchingDegree = Math.round((featureDegree*100))/100;
         //          callback(null);
         //          console.log('featureMatchingDegree:'+featureMatchingDegree);
         //       }
         //    })
         // },function(callback){//片酬需求30
         // 	  format.matchoffset(careerinfo,item,function(err,offsetDegree){
         //       if(err){
         //          throw new Error(err);
         //       }else{
         //          offsetMatchingDegree = Math.round((offsetDegree*100))/100;
         //          console.log('offsetMatchingDegree:'+offsetMatchingDegree);
         //          callback(null);
         //       }
         //    });

         // },function(callback){//档期匹配15
         //    format.matchschedule(careerinfo,item,function(err,scheduleDegree){
         //       if(err){
         //          throw new Error(err);
         //       }else{
         //          scheduleMatchingDegree = Math.round((scheduleDegree*100))/100;
         //          console.log('scheduleMatchingDegree:'+scheduleMatchingDegree);
         //          callback(null);
         //       }
         //    });
         // },function(callback){//计算总匹配度
         //    totalMatchingDegree = basicMatchingDegree*0.35+featureMatchingDegree*0.2+offsetMatchingDegree*0.3+scheduleMatchingDegree*0.15;
         //    console.log('totalMatchingDegree:'+totalMatchingDegree);
         //    callback(null);
         function(callback){//匹配基本信息35
           format.matchBasicInfo(careerinfo,item,function(err,basicDegree){
              if(err){
                 throw new Error(err);
              }else{
                 console.log(basicDegree);
                 basicMatchingDegree = Math.round((basicDegree*100))/100;//四舍五入                                                                                                              
                 console.log('basicMatchingDegree:'+basicMatchingDegree);
                 callback(null);
              }
           });   
         },function(callback){//角色特征20
            format.matchFeature(careerinfo,item,function(err,featureDegree){
               if(err){
                  throw new Error(err);
               }else{
                  featureMatchingDegree = Math.round((featureDegree*100))/100;
                  callback(null);
                  console.log('featureMatchingDegree:'+featureMatchingDegree);
               }
            })
         },function(callback){//片酬需求30------

              var Salaryoffset = (item.paycheck - careerinfo.role_paycheck)/careerinfo.role_paycheck;//片酬偏移值
              SalaryoffsetValue = Math.round((Salaryoffset*100))/100;
              console.log('---------------片酬需求-----------------');
              console.log(item.paycheck);
              console.log(careerinfo.role_paycheck);
              console.log(Salaryoffset);
              console.log(SalaryoffsetValue);
              console.log('---------------片酬需求-----------------');
              if(SalaryoffsetValue>-0.3 && SalaryoffsetValue<0.5){//偏移值在-30%——50%之间
                 offsetDegree = 1-100/80*(Math.abs(SalaryoffsetValue-0.5));
                 offsetMatchingDegree = Math.round((offsetDegree*100))/100;//片酬匹配度
                 callback(null);
              }else if(SalaryoffsetValue>0.5 && SalaryoffsetValue<2){//偏移值在50%——200%之间
                 offsetDegree = 1-100/150*(Math.abs(SalaryoffsetValue-0.5));
                 offsetMatchingDegree = Math.round((offsetDegree*100))/100;//片酬匹配度
                 callback(null);
              }else{//偏移值不在-100%——200%之间，片酬匹配度为0
                 offsetDegree = 0;
                 offsetMatchingDegree = Math.round((offsetDegree*100))/100;//片酬匹配度
                 callback(null);
              }
              
         },function(callback){//档期匹配15
            format.matchschedule(careerinfo,item,function(err,scheduleDegree){
               if(err){
                  throw new Error(err);
               }else{
                  scheduleMatchingDegree = Math.round((scheduleDegree*100))/100;
                  console.log('scheduleMatchingDegree:'+scheduleMatchingDegree);
                  callback(null);
               }
            });
         },function(callback){//计算总匹配度
            var totalDegree = basicMatchingDegree*0.35+featureMatchingDegree*0.2+offsetMatchingDegree*0.3+scheduleMatchingDegree*0.15;
            totalMatchingDegree = Math.round((totalDegree*100))/100;
            console.log('--------totalDegree---------');
            console.log(totalDegree);
            console.log('--------totalDegree---------');
            console.log('totalMatchingDegree:'+totalMatchingDegree);
            callback(null);
         },function(callback){
            userdata.realname = item.realname;
            userdata._id = item.id;
            userdata.image = item.image;
            userdata.basicMatchingDegree = basicMatchingDegree;
            userdata.featureMatchingDegree = featureMatchingDegree;
            userdata.offsetMatchingDegree = offsetMatchingDegree;
            userdata.scheduleMatchingDegree = scheduleMatchingDegree;
            userdata.totalMatchingDegree = totalMatchingDegree;
            result.push(userdata);
            callback(null);
         },function(callback){//将匹配结果保存到数据库
            ProductionMatchActor.model.findOne()
            .where('careerincrew_id',careerinfo.careerincrew_id)
            .where('user_id',item.id)
            .exec(function(err,ret){
              if(err){
                throw new Error(err);
              }else{
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                console.log(careerinfo.careerincrew_id);
                console.log(item.id);
                console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                console.log('*************************ret**************************');
                console.log(ret);
                console.log('*************************ret**************************');
                if(ret==null){
                   ProductionMatchActor.model.create({
                      careerincrew_id: careerinfo.careerincrew_id,
                      user_id: item.id,
                      realname : item.realname, 
                      SalaryoffsetValue : SalaryoffsetValue,
                      basicInfo_degree: basicMatchingDegree,
                      feature_degree: featureMatchingDegree,
                      paycheck_degree: offsetMatchingDegree,
                      schedule_degree: scheduleMatchingDegree,
                      total_degree: totalMatchingDegree,
                   },function(err,ret1){
                      if(err){
                         throw new Error(err);
                      }else{
                         callback(null);
                      }
                   })
                }else{
                   ret.realname = item.realname;
                   ret.SalaryoffsetValue = SalaryoffsetValue;
                   ret.basicInfo_degree = basicMatchingDegree;
                   ret.feature_degree = featureMatchingDegree;
                   ret.paycheck_degree = offsetMatchingDegree;
                   ret.schedule_degree = scheduleMatchingDegree;
                   ret.total_degree = totalMatchingDegree;
                   ret.save(function(err){
                      if(err){
                         throw new Error(err);
                      }else{
                         callback(null);
                      }
                   })
                }
              }
            })
         }
      ],function(err){
          if(err){
             throw new Error(err);
          }else{
             next();
          }
      })
   },function(err){//按照匹配度高低排序
      if(err){
         throw new Error(err);
      }else{
        console.log('!!!!');
        console.log(result);
         format.SortbymatchinDegree(result,function(err,user_result){
            if(err){
              throw new Error(err);
            }else{
              console.log('---');
              console.log(user_result);
              console.log('---');
               callback(null,user_result);
            }
         });
      }
   });

}
//将匹配成功的演员保存到数据库
var saveMatchingActors = function(production_id,agentid,callback){
   MatchProduction.model.findOne()
   .where('prodction_id',production_id)
   .where('agent_id',agentid)
   .exec(function(err,ret){
      if(err){
         throw new Error(err);
      }else{
         if(ret==null){
            MatchProduction.model.create({
              prodction_id:production_id,
              agent_id:agentid
            },function(err,ret1){
               callback(null,ret1);                
            })
         }else{
            callback(null,ret);
         }
      }
   })
}
//匹配经纪人旗下演员，将匹配结果保存到数据库
var positionMatchActorUnderAgent = function(careerinfo,userArray,callback){
  var results = [];
   async.eachSeries(userArray,function(item,next){
      var userdata = {};
      search.abstractMatchDetails(careerinfo,item,function(err,match_result){//匹配结果
          if(match_result.totalMatchingDegree>=0.5){
               results.push(match_result);
               saveMatchingActors(careerinfo.production_id,item.agentid,function(err,productioninfo){
                  if(err){
                    throw new Error(err);
                  }else{
                   MatchActor.model.findOne()
                   .where('user_id',item.id)
                   .where('careerincrew_id',careerinfo.careerincrew_id)
                   .where('matchProduction',productioninfo._id)
                   .exec(function(err,ret){
                      if(err){
                         throw new Error(err);
                      }else{
                         if(ret==null){
                           MatchActor.model.create({
                              user_id: match_result._id,
                              careerincrew_id : careerinfo.careerincrew_id,
                              matchProduction : productioninfo._id,
                              basicInfo_degree: match_result.basicMatchingDegree,
                              feature_degree: match_result.featureMatchingDegree,
                              paycheck_degree: match_result.offsetMatchingDegree,
                              schedule_degree: match_result.scheduleMatchingDegree,
                              total_degree: match_result.totalMatchingDegree,
                           },function(err,ret1){
                             if(err){
                                console.log(err);
                             }else{
                                next();
                             }
                          })
                         }else{
                             ret.user_id = match_result._id;
                             ret.careerincrew_id = careerinfo.careerincrew_id;
                             ret.basicInfo_degree = match_result.basicMatchingDegree;
                             ret.matchProduction = productioninfo._id;
                             ret.feature_degree = match_result.featureMatchingDegree;
                             ret.paycheck_degree = match_result.offsetMatchingDegree;
                             ret.schedule_degree = match_result.scheduleMatchingDegree;
                             ret.total_degree = match_result.totalMatchingDegree;
                             ret.save(function(err){
                                if(err){
                                  throw new Error(err);
                                }else{
                                  next();
                                }
                             })
                         }
                      }
                    })
                  }
               });
          }else{
              next();
          } 
      });
   },function(err){
        if(err){
           throw new Error(err);
        }else{
           return callback(null,results);
        }
   })
}
module.exports = {
  searchActorsAccordingToNecessaryConditions: searchActorsAccordingToNecessaryConditions,
  positionMatchActor : positionMatchActor,
  positionMatchActorUnderAgent : positionMatchActorUnderAgent
}
