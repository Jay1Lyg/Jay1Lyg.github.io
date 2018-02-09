
var keystone = require('keystone'),
	AlternativeActor = keystone.list('AlternativeActor'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
  ProductionMatchActor = keystone.list('ProductionMatchActor'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var format1 = require('../../query/save_and_get_data_in_MongoDB/position_match/format.js');
var search_careerincrew = require('../../query/save_and_get_data_in_MongoDB/careerincrew/search.js');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var format_user = require('../../query/save_and_get_data_in_MongoDB/user/format.js');
var urllib = require('url');
//查询备选演员（手动方案）
exports = module.exports = function(req, res) {
   var careerincrew_id = req.params.careerincrew_id;//角色信息id
   var page = req.params.page;
   var users = {};
   var userArray = [];
   console.log('---------```--------');
   console.log(req.params);
   console.log('---------```--------');
   CareerInCrew.model.findOne()
    .where('_id',careerincrew_id)
    .populate('crews_object role address createdBy role.roleCategory')
    .exec(function(err,ret0){
       if(err){
          throw new Error(err);
       }else{
       	  format_position.formatRoleDetail(ret0,function(err,careercrewInfo){//查询角色信息详情
            if(err){
               throw new Error(err);
            }else{
               AlternativeActor.paginate({
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
                    console.log('-------------ret------------');
                    console.log(ret);
                    console.log('-------------ret------------');
      			       	 users.currentPage = ret.currentPage;
      		           users.totalPages = ret.totalPages;
      			       	 async.eachSeries(ret.results,function(item,next){
                      ProductionMatchActor.model.findOne()
                      .where('careerincrew_id',careerincrew_id)
                      .exec(function(err,matchactor){
                         if(err){
                           throw new Error(err);
                         }else{
                           if(matchactor == null){
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
                                          console.log('-------------user------------');
                                          console.log(user);
                                          console.log('-------------user------------');
                                          search_careerincrew.abstractMatchDetails(careercrewInfo,user,function(err,match_results){
                                             if(err){
                                                throw new Error(err);
                                             }else{
                                                console.log('-------------match_results------------');
                                                console.log(match_results);
                                                console.log('-------------match_results------------');
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
                           }else{
                               console.log('----------------------在已经匹配的库中查找------------------------');
                               var data = {} ;
                               data.basicMatchingDegree = matchactor.basicInfo_degree;
                               data.featureMatchingDegree = matchactor.feature_degree;
                               data.offsetMatchingDegree = matchactor.paycheck_degree;
                               data.scheduleMatchingDegree = matchactor.schedule_degree;
                               data.totalMatchingDegree = matchactor.total_degree;
                               data.realname = matchactor.realname;
                               data.careerincrew_id = careerincrew_id;
                               data._id = matchactor.user_id;
                               format_user.formatCasting(matchactor.user_id,function(err,url){
                                 if(err){
                                    throw new Error(err);
                                 }else{
                                    data.image = url.iconUrl;
                                    data.compress_image = url.compress_iconUrl;
                                    data.addstate = item.addstate;
                                    data.source = item.source;
                                    data.isDelete = item.isDelete;
                                    userArray.push(data);
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
                                 console.log('-------------userArray------------');
                                        console.log(userArray);
                                        console.log('-------------userArray------------');
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


    