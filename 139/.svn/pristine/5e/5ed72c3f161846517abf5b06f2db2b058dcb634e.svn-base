var keystone = require('keystone'),
	Invitation = keystone.list('Invitation'),
	Category = keystone.list('Category'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
    Category = keystone.list('Category');
    BoundProductionAndInvited = keystone.list('BoundProductionAndInvited');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/position_match/search.js');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var urllib = require('url');
var _ = require('underscore');

exports = module.exports = function(req, res) {
  var careerincrewsid = req.params.careerincrewsid;
  CareerInCrew.model.findOne()
  .where('_id',careerincrewsid)
  .populate('crews_object role address createdBy role.roleCategory')
  .exec(function(err,ret){
     if(err){
        throw new Error(err);
     }else{
        format_position.formatRoleDetail(ret,function(err,careercrewInfo){//查询角色详情
            if(err){
               throw new Error(err);
            }else{
               search.searchActorsAccordingToNecessaryConditions(careercrewInfo,function(err,userinfo){//根据性别，年龄段，身高，体型进行匹配，返回符合条件的演员集合(硬件匹配)
                   if(err){
                      throw new Error(err);
                   }else{
                   	  search.positionMatchActor(careercrewInfo,userinfo,function(err,user_result){
                   	      if(err){
                             throw new Error(err);
                   	      }else{
                             var params = urllib.parse(req.url,true);
                             console.log('------------22222---------------');
                             console.log(user_result);
                             console.log('------------22222---------------');
                            // res.send(user_result);
                   	      	 if(user_result== null){
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
            						          	 var str =  params.query.callback + '(' + JSON.stringify(user_result) + ')';//jsonp
            						        	   res.send(str);	          
            						      	} 
            						      }
                   	      }  	
                   	  })
                   }
               });
            }
        });
     }
  })
}