/** 经纪人---通告广场
     1.查询出平台上最近一天的通告
     2.查询出平台上所有经纪人及旗下演员
     3.匹配
     4.将匹配结果保存到数据库
**/

var schedule = require("node-schedule");
var keystone = require('keystone'),
    CareerInCrew = keystone.list('CareerInCrew');
    Actor = keystone.list('Actor');
    Production = keystone.list('Production');
    User = keystone.list('User');
    PublicAccount = keystone.list('PublicAccount');
    BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var async = require('async');
var search = require('../../query/save_and_get_data_in_MongoDB/position_match/search.js');
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position_match/format.js');
function schedulePositionsAday(){
	var rule2     = new schedule.RecurrenceRule();  
	//var times2    = [1,2,9,13,17,21];
  var times2    = [1,23]; 
  rule2.hour  = times2;
  // var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];
  // rule2.minute  = times1;  
  // var times1    = [1,21,31,41,51];  
  // rule2.second  = times1;
	var edate=new Date(); //现在的时间（秒）
	var ndate=new Date()-86400000;//一天前的时间（秒）
  var userArray = [];
	schedule.scheduleJob(rule2, function(){  
    console.log('------------------------经纪人通告推送方法执行了--------------------------');
	  Production.model.find()
	   //.where({'createdAt':{$gt:(ndate)}})
	   //.where({'createdAt':{$lt:(edate)}})
	   .where('isCreated',true)
     .where('isDelete',false)
     .where('isPost',true)
	   .populate('production_crews category location')
	   //.sort("-createdAt")
	   .exec(function(err,ret){
         if(err){
            throw new Error(err);
         }else{
           async.eachSeries(ret,function(item,next){//遍历每一个通告
               CareerInCrew.model.find()
               .where('crews_object',item.production_crews[0]._id)
               .where('isDelete',false)
               .populate('crews_object role address createdBy role.roleCategory')
               .exec(function(err,careerinfo){
                  if(err){
                     throw new Error(err);
                  }else{
                     async.eachSeries(careerinfo,function(item1,next){//遍历通告下的每一条角色
                      console.log('step3333333333333333333333333');
                         format.formatRoleDetail(item1,function(err,careercrewInfo){//查询角色详情
                            if(err){
                               throw new Error(err);
                            }else{
                               PublicAccount.model.find()//查询平台上经纪人的公众号
                                .where('publicAccountAscription',2)
                                .exec(function(err,public){
                                    if(err){
                                       throw new Error(err);
                                    }else{
                                        async.eachSeries(public,function(item2,next){//遍历每一个公众号
                                            BoundAgentAndActor.model.find()//查询每个公众号旗下的演员
                                             .where('allok',true)
                                             .where('appid',item2.appid)
                                             .exec(function(err,agent){
                                                async.eachSeries(agent,function(item3,next){//遍历每一个演员
                                                   User.model.findOne()
                                                    .where('_id',item3.user_id)  
                                                    .exec(function(err,user){
                                                        format_position.formatProfileBasicInfo(user,function(err,userinfo){//查询演员详细信息
                                                            if(err){
                                                               throw new Error(err);
                                                            }else{
                                                               userinfo.agentid = item3.agent_id;
                                                               userArray.push(userinfo);
                                                               next();//下一个演员
                                                            }
                                                        })
                                                    })
                                                },function(err){
                                                   if(err){
                                                      throw new Error(err);
                                                   }else{
                                                      search.positionMatchActorUnderAgent(careercrewInfo,userArray,function(err,user_result){
                                                          if(err){
                                                             throw new Error(err);
                                                          }else{
                                                             next();//下一个公众号
                                                          }
                                                      })
                                                   }
                                                })
                                               
                                             })
                                        },function(err){
                                           if(err){
                                             throw new Error(err);
                                           }else{
                                             next();//下一条角色
                                           }
                                        })
                                    }
                                })
                            }
                         })
                     },function(err){//下一个通告
                         //console.log(err);
                         next();
                     })
                  }
               })
           },function(err){
               console.log('---------------------------经纪人通告推送方法执行完毕--------------------------');
           })
         }
	   })

	}); 
}

schedulePositionsAday();