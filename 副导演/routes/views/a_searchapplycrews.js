var keystone = require('keystone'),
	Resume = keystone.list('Resume'),
	Areainfo = keystone.list('Areainfo'),
	Category = keystone.list('Category'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	ProductionCompany = keystone.list('ProductionCompany'),
	Issuer = keystone.list('Issuer'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
    Category = keystone.list('Category');
    BoundProductionAndInvited = keystone.list('BoundProductionAndInvited');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
exports = module.exports = function(req, res) {
	var agentid = req.params.agentid;
	var result=[];
	var productionArray = [];
    Resume.model.find()
     .where('agentid',agentid)
     .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
       	  search.removeSameCrews(ret,function(err,crews_ID){//剧组id去重
            
             if(err){
               throw new Error(err);
             }else{
             	async.eachSeries(crews_ID,function(item,next){
                Production.model.findOne()
             	  .where('production_crews',item)
             	  .where('isPost',true)
             	  .where('isCreated',true)
                .populate('location')
             	  .exec(function(err,production){
                     if(err){
                        throw new Error(err);
                     }else{
                        format.formatsingleproductionforagent(production,production.appid,function(err,production_info){
                           if(err){
                              throw new Error(err);
                           }else{
                           	  Resume.model.find()
                           	  .where('agentid',agentid)
                           	  .where('productioncrew_id',item)
                           	  .exec(function(err,actor_num){
                                 if(err){
                                   throw new Error(err);
                                 }else{
                                 	production_info.actor_num = actor_num.length;
                                 	productionArray.push(production_info);
                                    next();
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
                      search.packProductionCrewInfo(productionArray,function(err,pd){
                         if(err){
                            throw new Error(err);
                         }else{
                         	var params = urllib.parse(req.url,true);
            						 	if (params.query && params.query.callback) {
              						 		var str =  params.query.callback + '(' + JSON.stringify(pd) + ')';//jsonp
              								console.log('--------------str---------------');
              								console.log(str);
              								console.log('--------------str---------------');
              				        res.send(str);

            						    } else{
            						    	var str =  params.query.callback + '(' + JSON.stringify(pd) + ')';//jsonp
            					        	res.send(str);
            						    }
                         }
                      });
                   }
             	});
             	
             }
       	  });
       }
     })

	

}


// search.packProductionCrewInfo(result,function(err,pro){
//                        if(err){
//                           throw new Error(err);
//                        }else{
//                              var params = urllib.parse(req.url,true);
// 					       	 if(pro== null){
// 						        	//console.log('请求1:'+params);
// 							        if (params.query && params.query.callback) {
// 							          	//console.log('请求2:'+params.query);
// 							          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
// 							        	res.send(str);
// 							      	} else {
// 							       		res.send(JSON.stringify({}));//普通的json
// 							      	}
// 						        }else{
// 						        	if (params.query && params.query.callback) {
// 							          	//console.log('请求2:'+params.query);	
// 							          	 var str =  params.query.callback + '(' + JSON.stringify(pro) + ')';//jsonp
// 							        	 res.send(str);	          
// 							      	} 
// 							    }
//                        }
// 	             	});