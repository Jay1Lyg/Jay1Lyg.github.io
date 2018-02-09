/** 滑块
     1.查询出平台上最近一天的通告
     2.查询出平台上所有演员
     3.匹配
     4.将匹配结果保存到数据库
**/

var schedule = require("node-schedule");
var keystone = require('keystone'),
    CareerInCrew = keystone.list('CareerInCrew');
    Actor = keystone.list('Actor');
    ActorBudget = keystone.list('ActorBudget');
    Programme = keystone.list('Programme');
    ProgrammeInProduction = keystone.list('ProgrammeInProduction');
    BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/position_match/search.js');
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var format1 = require('../../query/save_and_get_data_in_MongoDB/programme/format.js');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position_match/format.js');


var getidArray = function(id,callback){
  var id_Array = [];
  id.forEach(function(value) {
     id_Array.push(value);
  })
  return callback(null, id_Array); 
};

function schedulePositionsAday1(){
	var rule2     = new schedule.RecurrenceRule();  
	//var times2    = [1,2,9,13,17,21];
  var times2    = [1,23]; 
	rule2.hour  = times2;
  // var times1 = [1,6,11,16,21,26,31,36,41,46,51,56];
  // rule2.minute  = times1;  
  // var times1    = [1,21,31,41,51];  
  // rule2.second  = times1;
	var edate=new Date(); //现在的时间（秒）
	var ndate=new Date()-86400000;//一天前的时间（秒）
  var userArray = [];
  var programmeInproductionid_array=new Set();
	schedule.scheduleJob(rule2, function(){  
    console.log('------------------------根据滑块推荐演员数据库更新方法执行--------------------------');
    ActorBudget.model.find()//查询所有的预算方案
    .exec(function(err,actorbudget){
       if(err){
         throw new Error(err);
       }else{
         async.eachSeries(actorbudget,function(item,next){
           Programme.model.find()//同一种预算方案下，生成了多少方案
           .where('actorbudget_id',item._id)
           .where('attribute',1)
           .exec(function(err,programme){
             if(err){
               throw new Error(err);
             }else{
                async.eachSeries(programme,function(item1,next){//遍历每种方案，ActorBudgetid和programmeInproduction_id相同的要去重
                   programmeInproductionid_array.add(item1.programmeinproduction);//同一种预算方案下有多少项目生成了方案
                   next();
                },function(err){
                   if(err){
                      throw new Error(err);
                   }else{
                     getidArray(programmeInproductionid_array,function(err,id_Array){
                        if(err){
                           throw new Error(err);
                        }else{
                           async.eachSeries(id_Array,function(item2,next){
                              ProgrammeInProduction.model.findOne()
                              .where('_id',item2)
                              .populate('production_id')
                              .exec(function(err,production){
                                 if(err){
                                   throw new Error(err);
                                 }else{
                                   CareerInCrew.model.find()//查询所有角色信息
                                   .where('crews_object',production.production_crews)
                                   .where('isDelete',false)
                                   .populate('crews_object role address createdBy role.roleCategory')
                                   .exec(function(err,careerinfo){
                                      if(err){
                                         throw new Error(err);
                                      }else{
                                         async.eachSeries(careerinfo,function(item3,next){
                                            format.formatRoleDetail(item1,function(err,careercrewInfo){//查询角色详情
                                              if(err){
                                                 throw new Error(err);
                                              }else{ 
                                                 SliderPaycheck.model.findOne()
                                                 .where('actorbudget_id',item._id)
                                                 .where('careerincrew_id',item3._id)
                                                 .exec(function(err,paycheck){
                                                     if(err){
                                                       throw new Error(err);
                                                     }else{
                                                       careercrewInfo.role_paycheck =  paycheck.slider_paycheck;
                                                       search.searchActorsAccordingToNecessaryConditions(careercrewInfo,function(err,userinfo){//根据性别，年龄段，身高，体型进行匹配，返回符合条件的演员集合
                                                           if(err){
                                                              throw new Error(err);
                                                           }else{
                                                              format1.positionMatchActorForProgramme(careercrewInfo,userinfo,item._id,function(err,user_result){//匹配
                                                                  if(err){
                                                                     throw new Error(err);
                                                                  }else{
                                                                     next();
                                                                  }
                                                              })

                                                           }
                                                       })
                                                     }
                                                 })
                                              }
                                            })
                                         },function(err){
                                            if(err){
                                               throw new Error(err);
                                            }else{
                                               next();
                                            }
                                         });
                                      }
                                   })
                                 }
                              })
                           },function(err){
                              if(err){
                                 throw new Error(err);
                              }else{
                                 next();
                              }
                           });
                        }
                     });
                   }
                },function(err){
                  if(err){
                     throw new Error(err);
                  }else{
                     next();
                  }
                });
             }
           })
         },function(err){
           console.log('------------------------根据滑块推荐演员数据库更新方法执行完毕--------------------------'); 
         });
       }
    })

	}); 
}

schedulePositionsAday1();