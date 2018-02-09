var keystone = require('keystone'),
	Address = keystone.list('Address'),
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
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var urllib = require('url');

exports = module.exports = function(req, res) {
	var agentid = req.params.agentid;
	var result=[];
	console.log('------------------------');
    console.log(req.params);
    console.log('------------------------');
	BoundProductionAndInvited.model.find()//查询邀请经纪人旗下演员的剧组有哪些
	 .where('agentid',agentid)
	 .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
       	  console.log('------------ret------------');
		  console.log(ret);
		  console.log('------------ret------------');
		async.eachSeries(ret,function(item,next){
            Production.model.findOne()
			 .where('isCreated',true)
			 //.where('isDelete',false)
			 .where('isPost',true)
			 .where('_id',item.production_id)
			 .populate('production_crews category location')
			 .sort("-createdAt")
			 .exec(function(err,ret1){
		       if(err){
		         throw new Error(err);
		       }else{
		       	  console.log('------------ret1------------');
			      console.log(ret1);
			      console.log('------------ret1------------');
		       	  // async.eachSeries(ret1,function(item,next){
		          //   console.log(item);
		          //   console.log(item.production_crews.length);
		          //   console.log(item.production_crews.length!=0);
		            if(ret1!=null){
			           format.formatsingleproduction(ret1,function(err,info){
	                      if(err){
	                         throw new Error(err);
	                      }else{
	                      	 info.number = item.careerobj.length;
	                      	 result.push(info);
			                 next();
	                      }
			           })
			           
		            }else{
		            	next();
		            }
		       }
		   })
	    },function(err){
	         if(err){
	           throw new Error(err);
	         }else{
	         	search.packProductionCrewInfo(result,function(err,pro){
	               if(err){
	                  throw new Error(err);
	               }else{
	                     var params = urllib.parse(req.url,true);
	                     console.log('------------------console.log(pro);----------------');
	                     console.log(pro);
	                     console.log('------------------console.log(pro);----------------');
				       	 if(pro== null){
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
						          	 var str =  params.query.callback + '(' + JSON.stringify(pro) + ')';//jsonp
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