var keystone = require('keystone'),
  Invitation = keystone.list('Invitation'),
  Category = keystone.list('Category'),
  Production = keystone.list('Production'),
  User = keystone.list('User'),
  CareerInCrew = keystone.list('CareerInCrew'),
  Category = keystone.list('Category');
  BoundProductionAndInvited = keystone.list('BoundProductionAndInvited');
var async = require('async');
var config = require('../../public/conf/common.js');
var urllib = require('url');
var search = require('../../query/save_and_get_data_in_MongoDB/position_match/search.js');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var search1 = require('../../query/save_and_get_data_in_MongoDB/careerincrew/search.js');
var _ = require('underscore');

exports = module.exports = function(req, res) {
  var page = req.params.page;
  var careerincrew_id = req.params.careerincrew_id;
  var index =req.params.index;
  var agentid = req.params.agentid;
  var positioninfo = {};
  var result=[];
  console.log('------------------------');
  console.log(req.params);
  console.log('------------------------');
   CareerInCrew.model.findOne()
    .where('_id',careerincrew_id)
    .populate('crews_object role address createdBy role.roleCategory')
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
          format_position.formatRoleDetail(ret,function(err,careercrewInfo){//查询角色详情
            if(err){
               throw new Error(err);
            }else{
               Invitation.paginate({
                  page: page,
                  perPage: 6,
                  maxPages: 10
                })
               .where('career_in_crews',careerincrew_id)
               .where('invitestate',index)
               .where('agentid',agentid)
               .sort('-createAt')
               .exec(function(err,ret1){
                 if(err){
                    throw new Error(err);
                 }else{
                    positioninfo.currentPage = ret1.currentPage;
                    positioninfo.totalPages = ret1.totalPages;
                    async.each(ret1.results,function(item,next){
                      var detail={};
                      async.waterfall([
                         function(callback){
                            detail.invitestate=item.invitestate;
                            detail.invited=item.invited;
                            detail.invitationid=item._id;
                            detail.invite_date=item.invite_date;
                            detail.agree_or_refuse_date=item.agree_or_refuse_date;
                            callback(null);
                         },
                         function(callback){//查询演员基本信息
                             User.model.findOne()
                              .where('_id',item.invited)
                              .exec(function(err,ret){
                                 if(err){
                                    throw new Error(err);
                                 }else{
                                    search1.formatProfileBasicInfo(ret,detail,function(err,user){//查询演员信息
                                        if(err){
                                           throw new Error(err);
                                        }else{
                                            result.push(user);
                                            callback(null);
                                        }
                                    });
                                 }
                              })
                         }
                      ],function(err){
                         if(err){
                           throw new Error(err);
                         }else{                          
                           next();
                         }
                          
                      });
                      
                    },function(err){
                        if(err){
                           throw new Error(err);
                        }else{
                            search1.positionMatchActorforInvitedperson(careercrewInfo,result,function(err,user_result){
                              if(err){
                                 throw new Error(err);
                              }else{  
                                  positioninfo.results = user_result;
                                  var params = urllib.parse(req.url,true);
                                  // if(user_result.length == 0){
                                  //     //console.log('请求1:'+params);
                                  //   if (params.query && params.query.callback) {
                                  //       //console.log('请求2:'+params.query);
                                  //       var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
                                  //       res.send(str);
                                  //   } else {
                                  //       res.send(JSON.stringify({}));//普通的json
                                  //   }
                                  // }else{
                                    if (params.query && params.query.callback) {
                                        //console.log('请求2:'+params.query); 
                                         var str =  params.query.callback + '(' + JSON.stringify(positioninfo) + ')';//jsonp
                                         res.send(str);           
                                    } 
                                 // }

                              }
                           })
                        }
                    });
                 }
               })

               
            }
          })
       }
  })  

}