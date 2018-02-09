var keystone = require('keystone'),
  Invitation = keystone.list('Invitation');
  BoundProductionAndInvited = keystone.list('BoundProductionAndInvited');
  BoundAgentAndActor = keystone.list('BoundAgentAndActor');
  AlternativeActor = keystone.list('AlternativeActor');
var async = require('async');
var urllib = require('url');
exports = module.exports = function(req, res) {
  var inviter_id = req.body.inviter_id;
  var invited_id = req.body.invited_id;
  var careerincrew_id = req.body.careerincrew_id;
  var production_id = req.body.production_id
  console.log(req.body);
  //if(req.method == 'POST'){
    var data = {};
    var ndate = new Date();
      async.waterfall([
        function(callback){//平台上演员有两种：1.散户 2.有经纪人的演员（经纪人有自己的公众号）-----先判断是否有经纪人
          BoundAgentAndActor.model.findOne()
           .where('user_id',invited_id) 
           .exec(function(err,ret){
              if(err){
                 throw new Error(err);
              }else{
                console.log('------ret------');
                console.log(ret);
                console.log('------ret------');
                callback(null,ret);
              }
           })
        },function(arg,callback){
           if(arg==null){//散户，直接用之前的逻辑
            // callback(null);

              async.eachSeries(careerincrew_id, function(item,next){
                Invitation.model.create({   
                  career_in_crews: item,
                  inviter: inviter_id,
                  invited: invited_id,
                  invite_date:ndate
                        
                }, function (err, ret) {
                  if (err) callback(new Error("failed creating Invitation object:" + err.message));
                  AlternativeActor.model.create({
                     user_id : invited_id,
                     careerincrew_id : item,
                     addstate : 2,
                     source : 2
                   },function(err,alternative_actor){
                      if(err){
                         throw new Error(err);
                      }else{
                         next();
                      }
                   })
                });                 
              },function(err){
                  if (err) {console.log('err')};
                  callback(null);
              });
           }else{//经纪人
             async.eachSeries(careerincrew_id, function(item,next){
               Invitation.model.create({  
                  career_in_crews: item,
                  inviter: inviter_id,
                  invited: invited_id,
                  agentid: arg.agent_id,
                  invite_date:ndate
                }, function (err, ret) {
                  if (err) callback(new Error("failed creating Invitation object:" + err.message));
                   AlternativeActor.model.create({//我邀请的演员自动加入备选
                     user_id : invited_id,
                     careerincrew_id : item,
                     addstate : 2,
                     source : 2
                   },function(err,alternative_actor){
                      if(err){
                         throw new Error(err);
                      }else{
                        BoundProductionAndInvited.model.findOne()//判断该剧组是否邀请过该经纪人旗下的演员
                         .where('agentid',arg.agent_id)
                         .where('production_id',production_id)
                         .exec(function(err,ret1){
                             if(err){
                               throw new Error(err);
                             }else{
                                console.log('------ret1------');
                                console.log(ret1);
                                console.log('------ret1------');
                                if(ret1==null){//没邀请过，要新创，建立经纪人，剧组和职位的关系，同一个剧组下关联多个职位
                                  BoundProductionAndInvited.model.create({
                                    agentid:arg.agent_id,
                                    production_id:production_id,
                                    careerobj:ret._id
                                  },function(err,ret2){
                                     if(err){
                                        throw new Error(err);
                                     }else{
                                       next();
                                     }
                                  })

                                }else{//邀请过，直接将职位关联到剧组下
                                  //ret1.production_id=production_id;
                                  ret1.careerobj.push(ret._id);
                                  ret1.save(function(err){
                                    if(err){
                                       throw new Error(err);
                                    }else{
                                      next();
                                    }
                                    
                                  });
                                }
                             }
                         })
                      }
                   })                  
               });
            },function(err){
              if(err){
                throw new Error(err);
              }else{
                callback(null);
              }
            })
           }
        }
      ],function(err){
         if(err){
           throw new Error(err);
         }else{

            data.index=true;
            var params = urllib.parse(req.url,true);
        if (params.query && params.query.callback) {
                //console.log('请求2:'+params.query);
                var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
              res.send(str);
          } else {
              res.send(JSON.stringify(data));//普通的json
          }

         }
      }); 
};



// var keystone = require('keystone'),
// 	Invitation = keystone.list('Invitation');
// 	BoundProductionAndInvited = keystone.list('BoundProductionAndInvited');
// 	BoundAgentAndActor = keystone.list('BoundAgentAndActor');
// var async = require('async');
// var urllib = require('url');
// var search = require('../../query/save_and_get_data_in_MongoDB/careerincrew/search.js');
// var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
// exports = module.exports = function(req, res) {
// 	var inviter_id = req.body.inviter_id;
// 	var invited_id = req.body.invited_id;
// 	var careerincrew_id = req.body.careerincrew_id;
// 	var production_id = req.body.production_id
//   var userinfo = {};
// 	console.log(req.body);
// 	//if(req.method == 'POST'){
//     var data = {};
//     var ndate = new Date();
//       async.waterfall([
//         function(callback){//查询被邀请者的详细信息
//           User.model.findOne()
//           .where('_id',invited_id)
//           .exec(function(err,ret){
//              if(err){
//                 throw new Error(err);
//              }else{
//                 search.formatProfileBasicInfo(ret,function(err,user){//查询演员信息
//                     if(err){
//                        throw new Error(err);
//                     }else{
//                        userinfo = user;
//                        callback(null);
//                     }
//                 });
//              }
//           })
//         },
//       	function(callback){//平台上演员有两种：1.散户 2.有经纪人的演员（经纪人有自己的公众号）-----先判断是否有经纪人
//           BoundAgentAndActor.model.findOne()
//            .where('user_id',invited_id) 
//            .exec(function(err,ret){
//               if(err){
//                  throw new Error(err);
//               }else{
//               	callback(null,ret);
//               }
//            })
//         },function(arg,callback){
//            if(arg==null){//散户，直接用之前的逻辑
//             // callback(null);

// 	            async.eachSeries(careerincrew_id, function(item,next){
//       					Invitation.model.create({ 	
//       						career_in_crews: item,
//       						inviter: inviter_id,
//       						invited: invited_id,
//                   invite_date:ndate
      									
//       					}, function (err, ret) {
//       						if (err) callback(new Error("failed creating Invitation object:" + err.message));
//       						else{
//                      CareerInCrew.model.findOne()
//                       .where('_id',item)
//                       .populate('crews_object role address createdBy role.roleCategory')
//                       .exec(function(err,ret1){
//                          if(err){
//                             throw new Error(err);
//                          }else{
//                             format_position.formatRoleDetail(ret1,function(err,careercrewInfo){//查询角色详情
//                               if(err){
//                                  throw new Error(err);
//                               }else{
//                                   search.positionMatchActor(careercrewInfo,userinfo,function(err,user_result){//匹配演员和通告
//                                      if(err){
//                                         throw new Error(err);
//                                      }else{
//                                         ret.basicInfo_degree = user_result.basicMatchingDegree;
//                                         ret.feature_degree = user_result.featureMatchingDegree;
//                                         ret.paycheck_degree = user_result.offsetMatchingDegree;
//                                         ret.schedule_degree = user_result.scheduleMatchingDegree;
//                                         ret.total_degree = user_result.totalMatchingDegree;
//                                         ret.save(function(err){
//                                            if(err){
//                                               throw new Error(err);
//                                            }else{
//                                               next();
//                                            }
//                                         })
//                                      }
//                                   })
//                               }
//                             })

//                          }
//                       })
//                   }
//       					});
//         			},function(err){
//         					if (err) {console.log('err')};
//         					callback(null);
//         			});
//            }else{//经纪人
//               async.eachSeries(careerincrew_id, function(item,next){
//                Invitation.model.create({ 	
//       						career_in_crews: item,
//       						inviter: inviter_id,
//       						invited: invited_id,
//       						agentid: arg.agent_id,
//                   invite_date:ndate
//       					}, function (err, ret) {
//       						if (err) callback(new Error("failed creating Invitation object:" + err.message));
//                     CareerInCrew.model.findOne()
//                       .where('_id',item)
//                       .populate('crews_object role address createdBy role.roleCategory')
//                       .exec(function(err,ret1){
//                          if(err){
//                             throw new Error(err);
//                          }else{
//                             format_position.formatRoleDetail(ret1,function(err,careercrewInfo){//查询角色详情
//                               if(err){
//                                  throw new Error(err);
//                               }else{
//                                   search.positionMatchActor(careercrewInfo,userinfo,function(err,user_result){//匹配演员和通告
//                                      if(err){
//                                         throw new Error(err);
//                                      }else{
//                                         ret.basicInfo_degree = user_result.basicMatchingDegree;
//                                         ret.feature_degree = user_result.featureMatchingDegree;
//                                         ret.paycheck_degree = user_result.offsetMatchingDegree;
//                                         ret.schedule_degree = user_result.scheduleMatchingDegree;
//                                         ret.total_degree = user_result.totalMatchingDegree;
//                                         ret.save(function(err){
//                                            if(err){
//                                               throw new Error(err);
//                                            }else{
//                                               BoundProductionAndInvited.model.findOne()//判断该剧组是否邀请过该经纪人旗下的演员
//                                                .where('agentid',arg.agent_id)
//                                                .where('prodction_id',production_id)
//                                                .exec(function(err,ret1){
//                                                    if(err){
//                                                      throw new Error(err);
//                                                    }else{
//                                                       if(ret1==null){//没邀请过，要新创，建立经纪人，剧组和职位的关系，同一个剧组下关联多个职位
//                                                         BoundProductionAndInvited.model.create({
//                                                           agentid:arg.agent_id,
//                                                           prodction_id:production_id,
//                                                           careerobj:ret._id
//                                                         },function(err,ret2){
//                                                            if(err){
//                                                               throw new Error(err);
//                                                            }else{
//                                                              next();
//                                                            }
//                                                         })

//                                                       }else{//邀请过，直接将职位关联到剧组下
//                                                         ret1.careerobj.push(ret._id);
//                                                         ret1.save(function(err){
//                                                             if(err){
//                                                                throw new Error(err);
//                                                             }else{
//                                                               next();
//                                                             }                                                         
//                                                         });
//                                                       }
//                                                    }
//                                                })
//                                            }
//                                         })
//                                      }
//                                   })
//                               }
//                             })

//                          }
//                      })
      					
//       			   });
//              },function(err){
//                 if(err){
//                   throw new Error(err);
//                 }else{
//                   callback(null);
//                 }
//              })
//            }
//         }
//       ],function(err){
//          if(err){
//            throw new Error(err);
//          }else{
//             data.index=true;
// 	         	var params = urllib.parse(req.url,true);
// 				if (params.query && params.query.callback) {
// 		          	//console.log('请求2:'+params.query);
// 		          	var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
// 		        	res.send(str);
// 			    } else {
// 			       	res.send(JSON.stringify(data));//普通的json
// 			    }

//          }
//       });	
// };