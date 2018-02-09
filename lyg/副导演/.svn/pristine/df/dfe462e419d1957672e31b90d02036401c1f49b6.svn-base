var format=require('../position_match/format.js');
var keystone = require('keystone'),
    ProgrammeMatchActor = keystone.list('ProgrammeMatchActor');
    ProductionMatchActor = keystone.list('ProductionMatchActor');
    Casting = keystone.list('Casting');
    ProgrammeInCareer = keystone.list('ProgrammeInCareer');
    SliderPaycheck = keystone.list('SliderPaycheck');
var async = require('async');
var config = require('../../../public/conf/common.js');
var format_user = require('../user/format.js');
//查询各角色类型下角色的个数，以及每个角色的片酬
var searchActorNumberUderRoletype = function(careerinfo,callback){
  var result={};
  var obj1=[];
  var obj2=[];
  var obj3=[];
  var obj4=[];
  var obj5=[];
   async.eachSeries(careerinfo,function(item,next){
       var data = {};
       if(item.role.roleTag == '59acc5e625d3453c2a50bbfa'){//领衔
           data.roleTag = item.role.roleTag;
           data.role_paycheck = item.role_paycheck;
           data.workingdays = item.workingdays;
           data.careerincrew_id = item._id;
           data.men_count = item.men_count;
           obj1.push(data);
           result.obj1=obj1;
           next();
       }if(item.role.roleTag == '59acc5f825d3453c2a50bbfb'){//主要演员
           data.roleTag = item.role.roleTag;
           data.role_paycheck = item.role_paycheck;
           data.workingdays = item.workingdays;
           data.careerincrew_id = item._id;
           data.men_count = item.men_count;
           obj2.push(data);
           result.obj2=obj2;
           next();

       }if(item.role.roleTag == '59acc60e25d3453c2a50bbfc'){//客串演员
           data.roleTag = item.role.roleTag;
           data.role_paycheck = item.role_paycheck;
           data.workingdays = item.workingdays;
           data.careerincrew_id = item._id;
           data.men_count = item.men_count;
           obj3.push(data);
           result.obj3=obj3;
           next();

       }if(item.role.roleTag == '59acc62225d3453c2a50bbfd'){//其他演员
           data.roleTag = item.role.roleTag;
           data.role_paycheck = item.role_paycheck;
           data.workingdays = item.workingdays;
           data.careerincrew_id = item._id;
           data.men_count = item.men_count;
           obj4.push(data);
           result.obj4=obj4;
           next();
       }
   },function(err){
       if(err){
           throw new Error(err);
       }else{
           callback(null,result);
       }
   });
}
//根据滑块算出每个角色的预算/日
var getDayPaycheck=function(obj,role_budget,paycheck_totalratio,actorbudget_id,callback){
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    console.log(role_budget);
    console.log(paycheck_totalratio);
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
    pay_results = [];
    async.eachSeries(obj,function(item,next){
       var data = {};
       //role_budget---领衔主演总预算  paycheck_totalratio---领衔演员薪水总份数
       var day_pacheck = role_budget/paycheck_totalratio*item.role_paycheck;
       //var day_pacheck = role_budget/paycheck_totalratio*item.role_paycheck/2000;
       console.log('---11---');
       console.log(day_pacheck);
       console.log('---11---');        
       SliderPaycheck.model.findOne()//将每个角色根据滑块算出的值保存到数据库
       .where('actorbudget_id',actorbudget_id)
       .where('careerincrew_id',item.careerincrew_id)
       .exec(function(err,paycheck){
          if(err){
             throw new Error(err);
          }else{
             if(paycheck == null){
                SliderPaycheck.model.create({
                  actorbudget_id : actorbudget_id,
                  careerincrew_id : item.careerincrew_id,
                  slider_paycheck : day_pacheck
                },function(err,paycheck1){
                   if(err){
                     throw new Error(err);
                   }else{
                     data.careerincrew_id = item.careerincrew_id;
                     data.day_pacheck = day_pacheck;
                     pay_results.push(data);
                     next();
                   }
                })
             }else{
                paycheck.slider_paycheck = day_pacheck;
                paycheck.save(function(err){
                   if(err){
                     throw new Error(err);
                   }else{
                     data.careerincrew_id = item.careerincrew_id;
                     data.day_pacheck = day_pacheck;
                     pay_results.push(data);
                     next();
                   }
                })
             }
          }
       })
    },function(err){
       if(err){
          throw new Error(err);
       }else{
          callback(null,pay_results);
       }
    });
}
//根据滑块计算每种角色下每个角色的预算/日
var getActorPaycheckByactorBudgetRetio = function(totalActorBudget,careerinfo,budgetRatioinfo,actornum,callback){
    var results = [];
    //  console.log('&&&&&&&&&&&&&&&&&&actornumactornum&&&&&&&&&&&&&&&&&');
    // // console.log(totalActorBudget);
    // // console.log(budgetRatioinfo);
    //  console.log(actornum);
    //  console.log('&&&&&&&&&&&&&&&&&&actornumactornum&&&&&&&&&&&&&&&&&');
    async.waterfall([
      function(callback){
         if(actornum.obj1!=undefined){
             var leadingactor_budget = totalActorBudget*budgetRatioinfo.leadingactor_budget_ratio;//领衔主演总预算
             var paycheck_ratio = 0;
             async.eachSeries(actornum.obj1,function(item,next){
                 paycheck_ratio = paycheck_ratio+item.role_paycheck*item.workingdays*item.men_count;//领衔演员薪水总份数
                 next();
             },function(err){
                 if(err){
                    throw new Error(err);
                 }else{
                    getDayPaycheck(actornum.obj1,leadingactor_budget,paycheck_ratio,budgetRatioinfo._id,function(err,pay_results){//根据滑块算出每个角色的预算/日
                        if(err){
                            throw new Error(err);
                        }else{
                            async.eachSeries(pay_results,function(item1,next){
                               results.push(item1);
                               next();
                            },function(err){
                               callback(null);
                            })  
                        }
                    });
                    
                 }
             }) 
          }else{
              callback(null);
          }
      },function(callback){
         if(actornum.obj2!=undefined){
             var starringingroup_budget_ratio = totalActorBudget*budgetRatioinfo.starringingroup_budget_ratio;//跟组主演总预算
             var paycheck_ratio = 0;
             async.eachSeries(actornum.obj2,function(item,next){
                 paycheck_totalratio = paycheck_ratio+item.role_paycheck*item.workingdays*item.men_count;//主要演员薪水总份数
                 next();
             },function(err){
                 if(err){
                    throw new Error(err);
                 }else{
                    getDayPaycheck(actornum.obj2,starringingroup_budget_ratio,paycheck_totalratio,budgetRatioinfo._id,function(err,pay_results){
                        if(err){
                            throw new Error(err);
                        }else{
                            async.eachSeries(pay_results,function(item1,next){
                               results.push(item1);
                               next();
                            },function(err){
                               callback(null);
                            })  
                        }
                    });
                    
                 }
             }) 
          }else{
              callback(null);
          }
      },function(callback){
         if(actornum.obj3!=undefined){
             var guestactor_budget_ratio = totalActorBudget*budgetRatioinfo.guestactor_budget_ratio;//客串主演总预算
             var paycheck_ratio = 0;
             async.eachSeries(actornum.obj3,function(item,next){
                 paycheck_totalratio = paycheck_ratio+item.role_paycheck*item.workingdays*item.men_count;//客串演员薪水总份数
                 next();
             },function(err){
                 if(err){
                    throw new Error(err);
                 }else{
                    getDayPaycheck(actornum.obj3,guestactor_budget_ratio,paycheck_totalratio,budgetRatioinfo._id,function(err,pay_results){
                        if(err){
                            throw new Error(err);
                        }else{
                            async.eachSeries(pay_results,function(item1,next){
                               results.push(item1);
                               next();
                            },function(err){
                               callback(null);
                            })  
                        }
                    });
                    
                 }
             }) 
          }else{
              callback(null);
          }
      },function(callback){
         if(actornum.obj4!=undefined){
             var other_budget_ratio = totalActorBudget*budgetRatioinfo.other_budget_ratio;//客串主演总预算
             var paycheck_ratio = 0;
             async.eachSeries(actornum.obj4,function(item,next){
                 paycheck_totalratio = paycheck_ratio+item.role_paycheck*item.workingdays*item.men_count;//客串演员薪水总份数
                 next();
             },function(err){
                 if(err){
                    throw new Error(err);
                 }else{
                    getDayPaycheck(actornum.obj4,other_budget_ratio,paycheck_totalratio,budgetRatioinfo._id,function(err,pay_results){
                        if(err){
                            throw new Error(err);
                        }else{
                            async.eachSeries(pay_results,function(item1,next){
                               results.push(item1);
                               next();
                            },function(err){
                               callback(null);
                            })  
                        }
                    });
                    
                 }
             }) 
          }else{
              callback(null);
          }
      }
    ],function(err){
        if(err){
           throw new Error(err);
        }else{
           callback(null,results);
        }
    })

}
var abstractProgrammeMatchDetails = function(careerinfo,userinfo,callback){
   var userdata = {};
   var basicMatchingDegree;
   var featureMatchingDegree ;
   var offsetMatchingDegree ;
   var scheduleMatchingDegree ;
   var totalMatchingDegree;
   var SalaryoffsetValue;//偏移值
  async.waterfall([
     function(callback){//匹配基本信息35
       format.matchBasicInfo(careerinfo,userinfo,function(err,basicDegree){
          if(err){
             throw new Error(err);
          }else{
            // console.log(basicDegree);
             basicMatchingDegree = Math.round((basicDegree*100))/100;
             //console.log('basicMatchingDegree:'+basicMatchingDegree);
             callback(null);
          }
       });   
     },function(callback){//角色特征20
        format.matchFeature(careerinfo,userinfo,function(err,featureDegree){
           if(err){
              throw new Error(err);
           }else{
              featureMatchingDegree = Math.round((featureDegree*100))/100;
              callback(null);
             // console.log('featureMatchingDegree:'+featureMatchingDegree);
           }
        })
     },function(callback){//片酬需求30------
          var Salaryoffset = (userinfo.paycheck - careerinfo.role_paycheck)/careerinfo.role_paycheck;//片酬偏移值
          SalaryoffsetValue = Math.round((Salaryoffset*100))/100;
          console.log('------------------SalaryoffsetValue------------------');
          console.log('userinfo.paycheck:'+userinfo.paycheck);
          console.log('careerinfo.role_paycheck:'+careerinfo.role_paycheck);
          //console.log('careerinfo.role_paycheck:'+careerinfo.role_paycheck);
          console.log('SalaryoffsetValue:'+SalaryoffsetValue);
          console.log('------------------SalaryoffsetValue------------------');
          if(SalaryoffsetValue>-0.3 && SalaryoffsetValue<0.5){//偏移值在-30%——50%之间
             offsetDegree = 1-100/80*(Math.abs(SalaryoffsetValue-0.5));
             offsetMatchingDegree = Math.round((offsetDegree*100))/100;//片酬匹配度
             callback(null);
          }else if(SalaryoffsetValue>0.5 && SalaryoffsetValue<2){
             offsetDegree = 1-100/150*(Math.abs(SalaryoffsetValue-0.5));
             offsetMatchingDegree = Math.round((offsetDegree*100))/100;//片酬匹配度
             callback(null);
          }else{//偏移值不在-100%——200%之间，片酬匹配度为0
             offsetDegree = 0;
             offsetMatchingDegree = Math.round((offsetDegree*100))/100;//片酬匹配度
             callback(null);
          }
          
     },function(callback){//档期匹配15
        format.matchschedule(careerinfo,userinfo,function(err,scheduleDegree){
           if(err){
              throw new Error(err);
           }else{
              scheduleMatchingDegree = Math.round((scheduleDegree*100))/100;
              //console.log('scheduleMatchingDegree:'+scheduleMatchingDegree);
              callback(null);
           }
        });
     },function(callback){//计算总匹配度
        totalMatchingDegree = basicMatchingDegree*0.35+featureMatchingDegree*0.2+offsetMatchingDegree*0.3+scheduleMatchingDegree*0.15;
        //console.log('totalMatchingDegree:'+totalMatchingDegree);
        callback(null);
     },function(callback){
        userdata.realname = userinfo.realname;
        userdata._id = userinfo.id;
        userdata.image = userinfo.image;
        userdata.compress_image = userinfo.compress_image;
        userdata.basicMatchingDegree = basicMatchingDegree;
        userdata.featureMatchingDegree = featureMatchingDegree;
        userdata.offsetMatchingDegree = offsetMatchingDegree;
        userdata.scheduleMatchingDegree = scheduleMatchingDegree;
        userdata.SalaryoffsetValue = SalaryoffsetValue;
        userdata.totalMatchingDegree = totalMatchingDegree;
        userdata.careerincrew_id = careerinfo.careerincrew_id;
        callback(null);
     }],function(err){
         if(err){
           throw new Error(err);
         }else{
           callback(null,userdata);
         }
     })
}
//根据方案匹配演员------将所有演员的信息保存到数据库
var positionMatchActorForProgramme = function(careerinfo,userArray,actorbudget_id,callback){
   //var userArray = [];
   var result = [];
   // console.log('----------userArray-------------');
   // console.log(careerinfo);
   // console.log(userArray);
   // console.log('----------userArray-------------');
   async.eachSeries(userArray,function(item,next){
      abstractProgrammeMatchDetails(careerinfo,item,function(err,userinfo){//匹配
        console.log('*****************userinfo****************');
        console.log(userinfo);
        console.log('*****************userinfo****************');
         //将匹配结果保存到数据库
            ProgrammeMatchActor.model.findOne()
            .where('careerincrew_id',careerinfo.careerincrew_id)
            .where('user_id',item.id)
            .where('actorbudget_id',actorbudget_id)
            .exec(function(err,ret){
              if(err){
                throw new Error(err);
              }else{
                if(ret==null){
                   ProgrammeMatchActor.model.create({
                      careerincrew_id: careerinfo.careerincrew_id,
                      user_id: item.id,
                      //programme:programmeid,
                      realname : item.realname, 
                      actorbudget_id : actorbudget_id,
                      SalaryoffsetValue : userinfo.SalaryoffsetValue,
                      basicInfo_degree: userinfo.basicMatchingDegree,
                      feature_degree: userinfo.featureMatchingDegree,
                      paycheck_degree: userinfo.offsetMatchingDegree,
                      schedule_degree: userinfo.scheduleMatchingDegree,
                      total_degree: userinfo.totalMatchingDegree,
                      slider_paycheck : careerinfo.role_paycheck
                   },function(err,ret1){
                      if(err){
                         throw new Error(err);
                      }else{
                         next();
                      }
                   })
                }else{
                   ret.realname = item.realname;
                   ret.basicInfo_degree = userinfo.basicMatchingDegree;
                   ret.feature_degree = userinfo.featureMatchingDegree;
                   ret.paycheck_degree = userinfo.offsetMatchingDegree;
                   ret.schedule_degree = userinfo.scheduleMatchingDegree;
                   ret.total_degree = userinfo.totalMatchingDegree;
                   ret.actorbudget_id = actorbudget_id;
                   ret.slider_paycheck = careerinfo.role_paycheck;
                   //ret.gender = item.gender;
                   ret.SalaryoffsetValue = userinfo.SalaryoffsetValue;
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
      })
    },function(err){
      if(err){
         throw new Error(err);
      }else{
         callback(null);
      //   console.log('!!!!');
      //   console.log(result);
      //    format.SortbymatchinDegree(result,function(err,user_result){
      //       if(err){
      //         throw new Error(err);
      //       }else{
      //         console.log('---');
      //         console.log(user_result);
      //         console.log('---');
      //         callback(null,user_result);
      //       }
      //    });
       }
   });

}
//查询每条方案匹配出的三个演员(滑块)
var formatMatchingSliderProgrammeRoles = function(careerincrew_id,programme_id,actorbudget_id,callback){
  var userArray = [];
  ProgrammeInCareer.model.find()
  .where('careerincrew_id',careerincrew_id)
  .where('programme',programme_id)
  .exec(function(err,ret){
     if(err){
        throw new Error(err);
     }else{
       async.eachSeries(ret,function(item,next){
          var userinfo = {};
          userinfo.user_id = item.user_id;
          userinfo.realname = item.realname;
          userinfo.careerincrew_id = item.careerincrew_id;
          userinfo.basicInfo_degree = item.basicInfo_degree;
          userinfo.feature_degree = item.feature_degree;
          userinfo.paycheck_degree = item.paycheck_degree;
          userinfo.schedule_degree = item.schedule_degree;
          userinfo.total_degree = item.total_degree;
          userinfo.SalaryoffsetValue = item.SalaryoffsetValue;
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
  })
}

//查询每条方案匹配出的三个演员(自定义)
var formatMatchingHandProgrammeRoles = function(careerincrew_id,programme_id,callback){
   var userArray = [];
   ProgrammeInCareer.model.find()
   .where('careerincrew_id',careerincrew_id)
   .where('programme',programme_id)
   .exec(function(err,ret){
    console.log('----------ret---------');
    console.log(ret);
    console.log('----------ret---------');
     if(err){
        throw new Error(err);
     }else{
        async.eachSeries(ret,function(item,next){
          var userinfo = {};
          userinfo.user_id = item.user_id;
          userinfo.realname = item.realname;
          userinfo.careerincrew_id = item.careerincrew_id;
          //userinfo.actorbudget_id = user.actorbudget_id;
          userinfo.basicInfo_degree = item.basicInfo_degree;
          userinfo.feature_degree = item.feature_degree;
          userinfo.paycheck_degree = item.paycheck_degree;
          userinfo.schedule_degree = item.schedule_degree;
          userinfo.total_degree = item.total_degree;
          userinfo.SalaryoffsetValue = item.SalaryoffsetValue;
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
          //      console.log(casting);
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
        })
     }
   })
}
//判断当前演员是否在备选中，么有要创建，有的话更新
var addActorToAlternativeModel = function(){
  
}
module.exports = {
  searchActorNumberUderRoletype: searchActorNumberUderRoletype,
  getActorPaycheckByactorBudgetRetio: getActorPaycheckByactorBudgetRetio,
  getDayPaycheck: getDayPaycheck,
  positionMatchActorForProgramme : positionMatchActorForProgramme,
  formatMatchingSliderProgrammeRoles : formatMatchingSliderProgrammeRoles,
  formatMatchingHandProgrammeRoles : formatMatchingHandProgrammeRoles,
  abstractProgrammeMatchDetails : abstractProgrammeMatchDetails
}



