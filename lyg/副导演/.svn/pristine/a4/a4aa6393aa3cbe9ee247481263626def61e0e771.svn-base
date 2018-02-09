var keystone = require('keystone'),
	Invitation = keystone.list('Invitation');
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var async = require('async');

exports = module.exports = function(req, res) {
  console.log('=========');
  console.log(req.body);
  console.log('=========');
	var careerincrewid = req.params.careerincrewid || '';
	async.waterfall([
		function(callback){
        CareerInCrew.model.findOne()
		     .where('_id',careerincrewid)
		     .exec(function(err,ret){
		        if(err){
		           throw new Error(err);
		        }else{
		            ret.gender = req.body.select_sex;
		            ret.age = req.body.select_age;
		            ret.men_count = req.body.recruit_number;
		            ret.min_height = req.body.min_height;
                ret.max_height = req.body.max_height;
		            ret.shape = req.body.shape;
                ret.role_paycheck = req.body.role_paycheck;
		            ret.description = req.body.describe;
                ret.workingdays = req.body.workingdays;
                    ret.save(function(err){
                      if(err){
                         throw new Error(err);
                      }else{
                      	 callback(null,ret);
                      }
                    })
		        }
		     })
		},function(arg,callback){
           Role.model.findOne()
            .where('_id',arg.role) 
            .exec(function(err,ret){
               ret.name = req.body.role;
               ret.featureTag = req.body.featureTag;
               ret.skillTag = req.body.skillTag;
               ret.save(function(err){
                 if(err){
                   throw new Error(err);
                 }else{
                 	callback(null);
                 }
               })
            })  
		}
	],function(err){
        if(err){
           throw new Error(err);
        }else{
        	var data={};
        	data.index = true;
        	var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
		         var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
		         res.send(str);
		    } else {
		       	 res.send(JSON.stringify(data));
		    }
        }
	})
    
	
}
