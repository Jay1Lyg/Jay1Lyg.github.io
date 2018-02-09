
var keystone = require('keystone'),
   User = keystone.list('User');
   ProductionMatchActor = keystone.list('ProductionMatchActor');
   ProgrammeMatchActor = keystone.list('ProgrammeMatchActor');
   Production = keystone.list('Production');
   CareerInCrew = keystone.list('CareerInCrew');
   SliderPaycheck = keystone.list('SliderPaycheck');
   ProgrammeInCareer = keystone.list('ProgrammeInCareer');
   
var search = require('../position_match/search.js');
var search_careerincrew = require('../careerincrew/search.js');
var format_match = require('../position_match/format.js');
var format = require('./format.js');
var format1 = require('../position/format.js');
var search1 = require('../position/search.js');
var format_user = require('../user/format.js');
var async = require('async');
var _ = require('underscore');
var config = require('../../../public/conf/common.js');
//查询平台上的演员详情
var searchUserDetails = function(callback){
  var userArray = [];
    User.model.find()
    .where('allok',true)
    .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
         async.eachSeries(ret,function(item,next){
           format_match.formatProfileBasicInfo(item,function(err,userinfo){
               if(err){
                  throw new Error(err);
               }else{
                  userArray.push(userinfo);
                  next();
               }
           },function(err){
              if(err){
                 throw new Error(err);
              }else{
                 callback(null,userArray);
              }
           });
         });
       }
    })
}

//根据滑块值匹配全平台演员
var matchActorByActorBudgetRetio = function(productionid,budgetinfo,callback){
    console.log('----------------productionid----------------');
     console.log(productionid);
     console.log('----------------productionid----------------');
     Production.model.findOne()
     .where('_id',productionid)
	   .where('isCreated',true)
     //.where('isDelete',false)
     .where('isPost',true)
	   .populate('production_crews category location')
	   .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
         console.log(ret);
   	      CareerInCrew.model.find()
           .where('crews_object',ret.production_crews[0]._id)
           //.where('isDelete',false)
           .populate('crews_object role address createdBy role.roleCategory')
           .exec(function(err,careerinfo){
              if(err){
                 throw new Error(err);
              }else{
                  format.searchActorNumberUderRoletype(careerinfo,function(err,actornum){//查询每种角色下有几个演员
                     if(err){
                        throw new Error(err);
                     }else{
                        console.log('***********actornum************');
                        console.log(actornum);
                        console.log('***********actornum************');
                        format.getActorPaycheckByactorBudgetRetio(ret.actorBudget,careerinfo,budgetinfo,actornum,function(err,actorpaychek){//通过滑块计算每个角色的日薪水
                          console.log('***********************');
                          console.log(actorpaychek);
                          console.log('***********************');
                           async.eachSeries(careerinfo,function(item1,next){//遍历通告下的每一条角色
    		                     format1.formatRoleDetail(item1,function(err,careercrewInfo){//查询角色详情
    		                        if(err){
    		                           throw new Error(err);
    		                        }else{ 
                                      async.eachSeries(actorpaychek,function(item2,next){
                                          // console.log('--------------------');
                                          // console.log(careercrewInfo.careerincrew_id);
                                          // console.log(item2.careerincrew_id);
                                          // console.log(careercrewInfo.careerincrew_id==item2.careerincrew_id);
                                          // console.log('--------------------');
                                          if(careercrewInfo.careerincrew_id==item2.careerincrew_id){
                                             careercrewInfo.role_paycheck = item2.day_pacheck;
                                             // console.log('??????????????????????');
                                             // console.log(item2.day_pacheck);
                                             // console.log( careercrewInfo);
                                             // console.log('??????????????????????');
                                             next();
                                          }else{
                                          	 next();
                                          }
                                       },function(err){
                                           if(err){
                                               throw new Error(err);
                                           }else{
                                                search.searchActorsAccordingToNecessaryConditions(careercrewInfo,function(err,userinfo){//根据性别，年龄段，身高，体型进行匹配，返回符合条件的演员集合
                                                   if(err){
                                                      throw new Error(err);
                                                   }else{
                  							                   	  format.positionMatchActorForProgramme(careercrewInfo,userinfo,budgetinfo._id,function(err){//匹配
                  							                   	      if(err){
                  							                             throw new Error(err);
                  							                   	      }else{
                                                             next();
                  							                   	      }
                  							                   	  })
    							                               	 }
    							                             })
                                           }
                                       });
    		                        }
    		                     })
                        },function(err){
                             if(err){
                                throw new Error(err);
                             }else{
                              callback(null);
                             }
                        });
                      })
                     }
                  });

              }
           })
        }
    })
}
//查询系统匹配出的三个演员--使用滑块
var searchThreeActorsForSliderProgramme = function(production_id,actorbudget_id,programme_id,callback){
    Production.model.findOne()
     .where('_id',production_id)
     .where('isCreated',true)
     .where('isDelete',false)
     .where('isPost',true)
     .populate('production_crews category location')
     .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
          CareerInCrew.model.find()
           .where('crews_object',ret.production_crews[0]._id)
           .where('isDelete',false)
           .populate('crews_object role address createdBy role.roleCategory')
           .exec(function(err,careerinfo){
              if(err){
                 throw new Error(err);
              }else{
                 async.eachSeries(careerinfo,function(item,next){
                   ProgrammeMatchActor.model.find()
                   .where('careerincrew_id',item._id)
                   .where('actorbudget_id',actorbudget_id)
                   .sort('createdAt')
                   .where({'SalaryoffsetValue':{$gte:(0.5)}})//偏移值大于50%的
                   .where({'SalaryoffsetValue':{$lt:(0.8)}})//偏移值大于50%的
                   .limit(3)//查出三个
                   .exec(function(err,programme){
                      if(err){
                         throw new Error(err);
                      }else{
                        console.log('------------programme-----------');
                        console.log(programme);
                         console.log('------------programme-----------');
                         async.eachSeries(programme,function(item1,next){
                            ProgrammeInCareer.model.create({
                              user_id : item1.user_id,
                              careerincrew_id : item._id,
                              programme : programme_id,
                              programmestate : 2//表示已经添加到方案
                            },function(err,programme_user){
                               if(err){
                                  throw new Error(err);
                               }else{
                                  programme_user.basicInfo_degree = item1.basicInfo_degree;
                                  programme_user.feature_degree = item1.feature_degree;
                                  programme_user.paycheck_degree = item1.paycheck_degree;
                                  programme_user.schedule_degree = item1.schedule_degree;
                                  programme_user.total_degree = item1.total_degree;
                                  programme_user.SalaryoffsetValue = item1.SalaryoffsetValue;
                                  programme_user.realname = item1.realname;
                                  programme_user.save(function(err){
                                     if(err){
                                        throw new Error(err);
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
                               next();
                             }
                         });
                      }
                   })              
                 },function(err){
                     if(err){
                       throw new Error(err);
                     }else{
                       callback(null);
                     }
                 });
              }
          })
        }
      })
}
//查询系统匹配出的三个演员--未使用滑块
var searchThreeActorsForHandProgramme = function(production_id,programme_id,callback){
    console.log('----------1-----------');
    console.log(production_id);
    console.log(programme_id);
    console.log('----------1-----------');
    Production.model.findOne()
     .where('_id',production_id)
     .where('isCreated',true)
     .where('isDelete',false)
     .where('isPost',true)
     .populate('production_crews category location')
     .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
        console.log('-------------ret------------');
        console.log(ret);
        console.log('-------------ret------------');
          CareerInCrew.model.find()
           .where('crews_object',ret.production_crews[0]._id)
           .where('isDelete',false)
           .populate('crews_object role address createdBy role.roleCategory')
           .exec(function(err,careerinfo){
              if(err){
                 throw new Error(err);
              }else{
                 console.log('-------------careerinfo------------');
                 console.log(careerinfo);
                 console.log('-------------careerinfo------------');
                 async.eachSeries(careerinfo,function(item,next){
                   ProductionMatchActor.model.find()
                   .where('careerincrew_id',item._id)
                   .sort('createdAt')
                   .where({'SalaryoffsetValue':{$gte:(0.5)}})//偏移值大于50%的
                   .limit(3)//查出三个
                   .exec(function(err,programme){
                      if(err){
                         throw new Error(err);
                      }else{
                        console.log('------------programme-----------');
                        console.log(programme);
                         console.log('------------programme-----------');
                         async.eachSeries(programme,function(item1,next){
                            ProgrammeInCareer.model.create({
                              user_id : item1.user_id,
                              careerincrew_id : item._id,
                              programme : programme_id,
                              programmestate : 2//表示已经添加到方案
                            },function(err,programme_user){
                               if(err){
                                  throw new Error(err);
                               }else{
                                  programme_user.basicInfo_degree = item1.basicInfo_degree;
                                  programme_user.feature_degree = item1.feature_degree;
                                  programme_user.paycheck_degree = item1.paycheck_degree;
                                  programme_user.schedule_degree = item1.schedule_degree;
                                  programme_user.total_degree = item1.total_degree;
                                  programme_user.SalaryoffsetValue = item1.SalaryoffsetValue;
                                  programme_user.realname = item1.realname;
                                  programme_user.save(function(err){
                                     if(err){
                                        throw new Error(err);
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
                               next();
                             }
                         });
                      }
                   })              
                 },function(err){
                     if(err){
                       throw new Error(err);
                     }else{
                       callback(null);
                     }
                 });
              }
          })
        }
      })
}

//查询滑块方案详情--方案角色信息以及每个角色下面匹配出的演员
var findSliderProgrammeRoleInfoAndMatchingRoles = function(productionCrew_id,programme_id,actorbudget_id, callback){
  console.log(productionCrew_id);
  var results = [];
  var data = {};
  CareerInCrew.model.find()
  .where('crews_object', productionCrew_id)
  .populate('crews_object role address createdBy role.roleCategory')
  .exec(function(err, careerincrew_info){
    if(err) throw new Error('find careerincrew_info error');
    // console.log('*********************');
    // console.log(careerincrew_info);
    // console.log('*********************');
    if(careerincrew_info.length == 0){
      console.log('careerincrew_result is null');
    }else{
      console.log(careerincrew_info);
      async.eachSeries(careerincrew_info, function(careerincrew_result, next){
         format1.formatRoleDetail(careerincrew_result,function(err,pd){
                  if(err){
                     throw new Error(err);
                  }else{
                      format.formatMatchingSliderProgrammeRoles(careerincrew_result._id,programme_id,actorbudget_id,function(err,userArray){//
                        console.log('--------------userArray--------------');
                        console.log(userArray);
                        console.log('--------------userArray--------------');
                        pd.userArray=userArray;  
                        results.push(pd);
                        next();                      
                      });           
                  }
                });
      }, function(err){
        if(err) callback(err, null);
        search1.packProductionInfo(results,function(err,pack){
             if(err){
                throw new Error(err);
             }else{
                callback(null,pack);
             }
         })               
      });
    }
  });
}
//查询自定义方案详情--方案角色信息以及每个角色下面匹配出的演员
var findHandProgrammeRoleInfoAndMatchingRoles = function(productionCrew_id,programme_id,callback){
  console.log(productionCrew_id);
  var results = [];
  var data = {};
  CareerInCrew.model.find()
  .where('crews_object', productionCrew_id)
  .populate('crews_object role address createdBy role.roleCategory')
  .exec(function(err, careerincrew_info){
    if(err) throw new Error('find careerincrew_info error');
    console.log('*********************');
    console.log(careerincrew_info);
    console.log('*********************');
    if(careerincrew_info.length == 0){
      console.log('careerincrew_result is null');
    }else{
      console.log(careerincrew_info);
      async.eachSeries(careerincrew_info, function(careerincrew_result, next){
         format1.formatRoleDetail(careerincrew_result,function(err,pd){
                  if(err){
                     throw new Error(err);
                  }else{
                      format.formatMatchingHandProgrammeRoles(careerincrew_result._id,programme_id,function(err,userArray){//
                        pd.userArray=userArray;  
                        results.push(pd);
                        next();                      
                      });           
                  }
                });
      }, function(err){
        if(err) callback(err, null);
        search1.packProductionInfo(results,function(err,pack){
             if(err){
                throw new Error(err);
             }else{
                callback(null,pack);
             }
         })               
      });
    }
  });
}
//查询每个演员的匹配结果
var searchActorMatchResults = function(array,callback){
   var userArray = [] ;
   async.eachSeries(array,function(item,next){
     var userinfo = {};
      userinfo.user_id = item.user_id;
      userinfo.realname = item.realname;
      userinfo.careerincrew_id = item.careerincrew_id;
      userinfo.actorbudget_id = item.actorbudget_id;
      userinfo.basicInfo_degree = item.basicInfo_degree;
      userinfo.feature_degree = item.feature_degree;
      userinfo.paycheck_degree = item.paycheck_degree;
      userinfo.schedule_degree = item.schedule_degree;
      userinfo.SalaryoffsetValue = item.SalaryoffsetValue;
      userinfo.total_degree = item.total_degree;
      format_user.formatCasting(item.user_id,function(err,url){
         if(err){
            throw new Error(err);
         }else{
            userinfo.artimage = url.iconUrl;
            userinfo.compress_artimage = url.compress_iconUrl;
            userArray.push(userinfo);
            next();
         }
      });
      // Casting.model.findOne()
      // .where('user_id', item.user_id)
      // .exec( function(err, casting){
      //   if(err){
      //      throw new Error(err);
      //   }else{
      //      (casting.artimage.length>0) ? (userinfo.artimage = config.homeEntry.url+'/WX/casting/artimage/'+ casting.artimage[casting.artimage.length-1].filename) : (userinfo.artimage="") ;
      //      userArray.push(userinfo);
      //      next();
      //   }
      // })
   },function(err){
       if(err){
         throw new Error(err);
       }else{
         callback(null,userArray);
       }
   });
}
// //查询申请我的并且我同意的演员，查询我邀请的演员，并把他们保存到备选库中
// var searchAlternativeActorSource = function(careerincrew_id,callback){
//   async.waterfall([
//     function(callback){//查询申请我的演员
//         CareerInCrew.model.findOne()
//         .where('_id',careerincrew_id)
//         .populate('crews_object role address createdBy role.roleCategory')
//         .exec( function (err, careerincrew){
//           if(err) throw new Error('find careerincrew_info error');
//           if(careerincrew==null){
//             return callback(null, results);  
//           }else{
//             async.eachSeries(results.candidates,function(item,next){
//               Resume.model.findOne()
//               .where('_id',item)
//               .where('sign_up_create', true)
//               .where('career_in_crews_id',careerincrew_id)
//               .where('is_receive', '1')//查询已被通知面试的报名记录
//               .exec(function (err, resume_info){
//                 if(err) throw new Error('find resume_info error!');
//                 if(resume_info==null){
//                   next();
//                 }else{
                   
//                 } 
//               });
//             });
//           }
//         })
//     }

//   ])
// }
//匹配单个人与单个角色的匹配度（滑块）
 var matchActorAndCareerwithSlider = function(careerincrew_id,actorbudget_id,user_id,callback){
   SliderPaycheck.model.findOne()//查询该角色滑块对应的值
    .where('careerincrew_id',careerincrew_id)
    .where('actorbudget_id',actorbudget_id)
    .exec(function(err,actor){
      if(err){
         throw new Error(err);
      }else{
         CareerInCrew.model.findOne()
          .where('_id',careerincrew_id)
          .populate('crews_object role address createdBy role.roleCategory')
          .exec(function(err,ret){
             if(err){
                throw new Error(err);
             }else{
                format1.formatRoleDetail(ret,function(err,careercrewInfo){//查询角色信息详情
                    if(err){
                       throw new Error(err);
                    }else{
                        User.model.findOne()
                         .where('_id',user_id)
                         .exec(function(err,userinfo){
                            if(err){
                              throw new Error(err);
                            }else{
                              format_match.formatProfileBasicInfo(userinfo,function(err,user){//查询演员信息
                                if(err){
                                   throw new Error(err);
                                }else{
                                    format.abstractProgrammeMatchDetails(careercrewInfo,user,function(err,match_results){
                                        if(err){
                                          throw new Error(err);             
                                        } else{
                                          callback(null,match_results);
                                        } 
                                    })
                                }
                              })
                            }
                        })
                    }
                })
             }
         })

      }
  })
}

//匹配单个人与单个角色的匹配度（手动）
 var matchActorAndCareerwithHand = function(careerincrew_id,user_id,callback){
   CareerInCrew.model.findOne()
    .where('_id',careerincrew_id)
    .populate('crews_object role address createdBy role.roleCategory')
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
          format1.formatRoleDetail(ret,function(err,careercrewInfo){//查询角色信息详情
              if(err){
                 throw new Error(err);
              }else{
                  User.model.findOne()
                   .where('_id',user_id)
                   .exec(function(err,userinfo){
                      if(err){
                        throw new Error(err);
                      }else{
                        format_match.formatProfileBasicInfo(userinfo,function(err,user){//查询演员信息
                          if(err){
                             throw new Error(err);
                          }else{
                              search_careerincrew.abstractMatchDetails(careercrewInfo,user,function(err,match_results){
                                  if(err){
                                    throw new Error(err);             
                                  } else{
                                    callback(null,match_results);
                                  } 
                              })
                          }
                        })
                      }
                  })
              }
          })
       }
   })
}

module.exports = {
  matchActorByActorBudgetRetio: matchActorByActorBudgetRetio,
  searchThreeActorsForSliderProgramme : searchThreeActorsForSliderProgramme,
  searchThreeActorsForHandProgramme : searchThreeActorsForHandProgramme,
  findSliderProgrammeRoleInfoAndMatchingRoles : findSliderProgrammeRoleInfoAndMatchingRoles,
  findHandProgrammeRoleInfoAndMatchingRoles : findHandProgrammeRoleInfoAndMatchingRoles,
  searchActorMatchResults : searchActorMatchResults,
  matchActorAndCareerwithSlider : matchActorAndCareerwithSlider,
  matchActorAndCareerwithHand : matchActorAndCareerwithHand
}