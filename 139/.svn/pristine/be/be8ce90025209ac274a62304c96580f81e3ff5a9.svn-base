var keystone = require('keystone'),
	ActorBudget = keystone.list('ActorBudget'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
	CareerInCrew = keystone.list('CareerInCrew'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var search_position = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
/*
  查询生成过方案的通告以及通告详情
*/
exports = module.exports = function(req, res) {
  var adderid = req.params.adderid;
  var userid = req.params.userid;
  //var careerincrew_id = req.params.careerincrew_id;
  console.log(req.params);
  var results = [];
  ProgrammeInProduction.model.find()
   .where('user_id',adderid)
   .exec(function(err,programme){
	  if(err){
		 throw new Error(err);
	  }else{
	  	console.log('---------------programme---------------------');
        console.log(programme);
	  	console.log('---------------programme---------------------');
		 async.eachSeries(programme,function(item,next){
			var production_info = {};
			var role_results = [];
		    Production.model.findOne()
		     .where('_id',item.production_id)
		     .where('isCreated',true)
	         .where('isPost',true)
	         .where('createdBy',adderid)
	         .where('isDelete',false)
	         .populate('production_crews category location')
	         .sort("-createdAt")
		     .exec(function(err,production){
		        if(err){
		           throw new Error(err);
		        }else{
		           console.log('---------------production---------------------');
                   console.log(production);
	  	           console.log('---------------production---------------------');
		           production_info.name = production.name;
		           production_info._id = production._id;
                   CareerInCrew.model.find()
                   .where('crews_object',production.production_crews[0]._id)
                   .populate('role')
                   .exec(function(err,career){
                      if(err){
                        throw new Error(err);
                      }else{
                      	async.eachSeries(career,function(item,next){
                      		var data = {};
                      		data.role = item.role.name;
			                data.careerincrew_id = item._id;
			                data.crews_object = item.crews_object;
			                data.roleTag_id = item.role.roleTag;
			                AlternativeActor.model.findOne()
			                 .where('user_id',userid)
			                 .where('careerincrew_id',item._id)
			                 .exec(function(err,ret){
	                            if(err){
	                               throw new Error(err);
	                            }else{
	                            	console.log('------------ret--------------');
	                            	console.log(ret);
	                            	console.log('------------ret--------------');
	                               if(ret == null){
	                               	  data.addstate = 1;
	                               	  role_results.push(data);
	                                  next();
	                               }else{
                                      data.addstate = ret.addstate;
	                            	  role_results.push(data);
	                            	  next();
	                               }
	                            }
			                 })

                      	},function(err){
                           if(err){
                              throw new Error(err);
                           }else{
                               search_position.packProductionInfo(role_results,function(err,pd){
                                  if(err){
                                    throw new Error(err);
                                  }else{
                                    production_info.roleArray = pd;
                                    results.push(production_info);
                                    next();
                                  }
                               });
                           }
                      	});
                      }
                   })
		        }
		    })
		 },function(err){
            if(err){
              throw new Error(err);
            }else{
            	console.log(results);
              var params = urllib.parse(req.url,true);
        	  if (params.query && params.query.callback) {
	          	//console.log('请求2:'+params.query);	
	          	 var str =  params.query.callback + '(' + JSON.stringify(results) + ')';//jsonp
	        	 res.send(str);	          
	      	  }else{
	      	  	 var str = JSON.stringify(results);
	      	  	 res.send(str);
	      	  }	
            }
		 })
	  }
   })
   
}