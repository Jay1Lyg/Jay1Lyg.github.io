/**
     1.查询出平台上所有的通告
     2.查询出平台上所有经纪人及旗下演员
     3.匹配
     4.将匹配结果保存到数据库
     每天凌晨1点执行
**/

var schedule = require("node-schedule");
var keystone = require('keystone'),
    Production = keystone.list('Production');
    CareerInCrew = keystone.list('CareerInCrew');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/position_match/search.js');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');

function schedulePositionsAday(){
	//var rule2     = new schedule.RecurrenceRule();  
	//var times2    = [1,5,9,13,17,21];  
	//rule2.hour  = times2; 
	//schedule.scheduleJob(rule2, function(){  
    schedule.scheduleJob('5 10 10 * * *',function(){
	  Production.model.find()
       .where('isPost',true)
       .where('isCreated',true)
       .exec(function(err,ret){
          if(err){
            throw new Error(err);
          }else{
            async.eachSeries(ret,function(item,next){//遍历production
               CareerInCrew.model.find()
                .where('crews_object',item.production_crews)
                .exec(function(err,ret1){
                   if(err){
                      throw new Error(err);
                   }else{
                      async.eachSeries(ret1,function(item1,next){//遍历职位
                          format_position.formatRoleDetail(item1,function(err,careercrewInfo){//查询角色详情
                            if(err){
                               throw new Error(err);
                            }else{
                               search.searchActorsAccordingToNecessaryConditions(careercrewInfo,function(err,userinfo){//根据性别，年龄段，身高，体型进行匹配，返回符合条件的演员集合
                                   if(err){
                                      throw new Error(err);
                                   }else{
                                      search.positionMatchActor(careercrewInfo,userinfo,function(err,user_result){//返回与该条职位匹配的演员集合及匹配度
                                          if(err){
                                             throw new Error(err);
                                          }else{
                                             next();
                                          }     
                                      })
                                   }
                               });
                            }
                         });   
                      },function(err){
                          if(err){
                              throw new  Error(err);
                          }else{
                              next();
                          }
                      }) 
                   }
                })
            },function(err){
               if(err){
                  throw new Error(err);
               }else{
                  res.send('success');
               }
            })
          }
       })
    })
}

schedulePositionsAday();