var keystone = require('keystone'),
	ActorBudget = keystone.list('ActorBudget'),
	ProgrammeMatchActor = keystone.list('ProgrammeMatchActor'),
	Programme = keystone.list('Programme'),
	ProgrammeInCareer = keystone.list('ProgrammeInCareer'),
	Production = keystone.list('Production'),
	ProgrammeInProduction = keystone.list('ProgrammeInProduction');
var async = require('async');
var config = require('../../public/conf/common.js');
var search = require('../../query/save_and_get_data_in_MongoDB/programme/search.js');
var urllib = require('url');

exports = module.exports = function(req, res) {
  var production_id = req.params.production_id;
  var actorbudget_id = req.params.actorbudget_id;
  var programme_id = req.params.programme_id;
  var attribute = req.params.attribute;
  var data = {};
  var params = urllib.parse(req.url,true);
  console.log('------------req.params------------------------');
  console.log(req.params);
  console.log('------------req.params------------------------');
  if(attribute==1){//查询滑块详情
	  async.waterfall([
	  	function(callback){//查询各类演员预算滑块值
	  	   ActorBudget.model.findOne()
	  	   .where('_id',actorbudget_id)
	  	   .exec(function(err,ret){
	          if(err){
	             throw new Error(err);
	          }else{
	          	 data.leadingactor_budget_ratio = ret.leadingactor_budget_ratio;
	          	 data.guestactor_budget_ratio = ret.guestactor_budget_ratio;
	          	 data.starringingroup_budget_ratio = ret.starringingroup_budget_ratio;
	          	 data.other_budget_ratio = ret.other_budget_ratio;
	          	 data.actorbudget_id = ret._id;
	          	 callback(null);
	          }  
	  	   })
	  	},function(callback){
	       Production.model.findOne()//查询剧目
	       .where('_id',production_id)
	       .exec(function(err,ret){
	           if(err){
	              throw new Error(err);
	           }else{
	           	  data.production_Name = ret.name;
	           	  data.production_id = ret._id;
	           	  data.productioncrew_id = ret.production_crews;
	           	  callback(null);
	           }
	       })
	  	},function(callback){
          Programme.model.findOne()
          .where('_id',programme_id)
          .exec(function(err,programme){
             if(err){
               throw new Error(err);
             }else{
               data.programme_name = programme.name;
               callback(null);
             }
          })
	  	},
	  	function(callback){
	       search.findSliderProgrammeRoleInfoAndMatchingRoles(data.productioncrew_id,programme_id,actorbudget_id,function(err,result){
	           if(err){
	              throw new Error(err);
	           }else{
	              data.roleInfo = result;
	              callback(null);
	           }
	       })
	  	}
	  ],function(err){
	      if(err){
	         throw new Error(err);
	      }else{
	      	 if(data == null){
		        if (params.query && params.query.callback) {
		            var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
		            res.send(str);
		        } else {
		            res.send(JSON.stringify({}));//普通的json
		        }
		      }else{
		        if (params.query && params.query.callback) {
		            //console.log('请求2:'+params.query); 
		             var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
		             res.send(str);           
		        } 
		      }
	     }
	  })
  }else if(attribute==2){//查询自定义方案详情
     async.waterfall([
	  	function(callback){
	       Production.model.findOne()
	       .where('_id',production_id)
	       .exec(function(err,ret){
	           if(err){
	              throw new Error(err);
	           }else{
	           	  data.production_Name = ret.name;
	           	  data.production_id = ret._id;
	           	  data.productioncrew_id = ret.production_crews;
	           	  callback(null);
	           }
	       })
	  	},function(callback){
          Programme.model.findOne()
          .where('_id',programme_id)
          .exec(function(err,programme){
             if(err){
               throw new Error(err);
             }else{
               data.programme_name = programme.name;
               callback(null);
             }
          })
	  	},
	  	function(callback){
	       search.findHandProgrammeRoleInfoAndMatchingRoles(data.productioncrew_id,programme_id,function(err,result){
	           if(err){
	              throw new Error(err);
	           }else{
	              data.roleInfo = result;
	              callback(null);
	           }
	       })
	  	}
	  ],function(err){
	      if(err){
	         throw new Error(err);
	      }else{
	      	console.log('=======================');
            console.log(data);
	      	console.log('=======================');
	      	 if(data == null){
		        if (params.query && params.query.callback) {
		            var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
		            res.send(str);
		        } else {
		            res.send(JSON.stringify({}));//普通的json
		        }
		      }else{
		        if (params.query && params.query.callback) {
		            //console.log('请求2:'+params.query); 
		             var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
		             res.send(str);           
		        } 
		      }
	     }
	  }) 
  }
}