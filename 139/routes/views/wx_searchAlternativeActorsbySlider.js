var keystone = require('keystone'),
	AlternativeActor = keystone.list('AlternativeActor'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
  SliderPaycheck = keystone.list('SliderPaycheck');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var format1 = require('../../query/save_and_get_data_in_MongoDB/position_match/format.js');
var search_careerincrew = require('../../query/save_and_get_data_in_MongoDB/careerincrew/format.js');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var format = require('../../query/save_and_get_data_in_MongoDB/programme/format.js');
var format_user = require('../../query/save_and_get_data_in_MongoDB/user/format.js');
var urllib = require('url');
//查询备选演员（滑块方案）
exports = module.exports = function(req, res) {
   var careerincrew_id = req.params.careerincrew_id;//角色信息id
   var actorbudget_id = req.params.actorbudget_id;
   var page = req.params.page;
   var users = {};
   var userArray = [];
   CareerInCrew.model.findOne()
    .where('_id',careerincrew_id)
    .populate('crews_object role address createdBy role.roleCategory')
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
       	  format_position.formatRoleDetail(ret,function(err,careercrewInfo){//查询角色信息详情
            if(err){
               throw new Error(err);
            }else{
                SliderPaycheck.model.findOne()//查询该角色滑块对应的值
                .where('careerincrew_id',careerincrew_id)
                .where('actorbudget_id',actorbudget_id)
                .exec(function(err,actor){
                  if(err){
                     throw new Error(err);
                  }else{
                      careercrewInfo.role_paycheck = actor.slider_paycheck;//根据滑块值进行匹配
                      AlternativeActor.paginate({//查询备选演员
                        page: page,
                        perPage: 10,
                        maxPages: 10
                       })
                       .where('careerincrew_id', careerincrew_id)
                       .where('isDelete',false)
                       .where('addstate',2)
                       .sort('-createdAt')
                       .exec(function(err,ret){
                         if(err){
                           throw new Error(err);
                         }else{
                           users.currentPage = ret.currentPage;
                           users.totalPages = ret.totalPages;
                           async.eachSeries(ret.results,function(item,next){
                            ProgrammeMatchActor.model.findOne()
                             .where('user_id',item.user_id)
                             .where('careerincrew_id',careerincrew_id)
                             .where('actorbudget_id',actorbudget_id)
                             .exec(function(err,matchactor){//已经匹配的演员库中是否有该演员，有的话直接在数据库读取，没有需要重新匹配
                                if(err){
                                  throw new Error(err);
                                }else{
                                  if(matchactor == null){//无
                                    User.model.findOne()
                                    .where('_id',item.user_id)
                                    .exec(function(err,userinfo){
                                       if(err){
                                          throw new Error(err);
                                       }else{
                                          format1.formatProfileBasicInfo(userinfo,function(err,user){//查询演员信息
                                            if(err){
                                               throw new Error(err);
                                            }else{
                                                format.abstractProgrammeMatchDetails(careercrewInfo,user,function(err,match_results){
                                                   if(err){
                                                      throw new Error(err);
                                                   }else{
                                                       match_results.addstate = item.addstate;
                                                       match_results.source = item.source;
                                                       match_results.isDelete = item.isDelete;
                                                       userArray.push(match_results);
                                                       next();
                                                   }
                                                });                                
                                            }
                                        });
                                       }
                                    })
                                  }else{//有
                                      console.log('----------------------在已经匹配的库中查找------------------------');
                                      var userdata = {};
                                      userdata.realname = matchactor.realname;
                                      userdata._id = matchactor.user_id;
                                      //userdata.image = matchactor.image;
                                      userdata.basicMatchingDegree = matchactor.basicInfo_degree;
                                      userdata.featureMatchingDegree = matchactor.feature_degree;
                                      userdata.offsetMatchingDegree = matchactor.paycheck_degree;
                                      userdata.scheduleMatchingDegree = matchactor.schedule_degree;
                                      userdata.SalaryoffsetValue = matchactor.SalaryoffsetValue;
                                      userdata.totalMatchingDegree = matchactor.total_degree;
                                      userdata.careerincrew_id = careerincrew_id;
                                      format_user.formatCasting(matchactor.user_id,function(err,url){
                                         if(err){
                                            throw new Error(err);
                                         }else{
                                            userdata.image = url.iconUrl;
                                            userdata.compress_image = url.compress_iconUrl;
                                            userdata.addstate = item.addstate;
                                            userdata.source = item.source;
                                            userdata.isDelete = item.isDelete;
                                            userArray.push(userdata);
                                            next(); 
                                         }
                                      });


                                  }
                                }
                             })
                           
                           },function(err){
                                    if(err){
                                       throw new Error(err);
                                    }else{
                                       users.results = userArray;
                                       var params = urllib.parse(req.url,true);
                                      if(users == null){
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
                                             var str =  params.query.callback + '(' + JSON.stringify(users) + ')';//jsonp
                                             res.send(str);           
                                        } 
                                      }
                                    }
                           });
                         }
                    })
                  }
                })

            }
          })
       }
    })
   
}



