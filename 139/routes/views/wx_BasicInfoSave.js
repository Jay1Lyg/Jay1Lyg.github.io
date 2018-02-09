var keystone = require('keystone');
var User = keystone.list('User');
var Skill = keystone.list('Skill');
var EducationExperience = keystone.list('EducationExperience');
var School = keystone.list('School');
var SkillTag = keystone.list('SkillTag');
var FeatureTag = keystone.list('FeatureTag');
var BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var async = require('async');
var urllib = require('url');
/*
  副导演---填写简历第一步
*/

exports = module.exports = function (req, res) {

	async.waterfall([
	  function(callback){
		User.model.findOne()
    	 .where('_id',req.body.userid)
	     .exec(function(err,ret){
	     	if(err){
               return res.status(500).send(err);
	     	}else{
	        	(req.body.realname==undefined)? console.log('realname is null'):ret.realname=req.body.realname;
			    (req.body.artname==undefined)? console.log('artname is null'):ret.artname=req.body.artname;
			    (req.body.gender=='')? console.log('gender is null'):ret.gender=req.body.gender;
			    (req.body.birth=='')? console.log('birth is null'):ret.birth=req.body.birth;
			    (req.body.height==undefined)? console.log('height is null'):ret.height=req.body.height;
			    (req.body.weight==undefined)? console.log('weight is null'):ret.weight=req.body.weight;
			    (req.body.bust==undefined)? console.log('bust is null'):ret.bust=req.body.bust;
			    (req.body.waist==undefined)? console.log('waist is null'):ret.waist=req.body.waist;
			    (req.body.hip==undefined)? console.log('hip is null'):ret.hip=req.body.hip;
			    (req.body.schoolname==undefined)? console.log('schoolname is null'):ret.schoolname=req.body.schoolname;
			    (req.body.agentTelphone==undefined)? console.log('agentTelphone is null'):ret.agentTelphone=req.body.agentTelphone;
			    ret.skill=req.body.skillArray;
		        ret.feature=req.body.featureArray;
				 ret.save(function (err) {
				 	if(err){
                       throw new Error(err);
				 	}else{
				 	   callback(null);
		            }
				 });
			}
		});

	  }
	  ],function(err){
         if(err){
           throw new Error(err);
         }else{
         	var data={};
         	data.index=true;
         	var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
		          	//console.log('请求2:'+params.query);
		       var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
		       res.send(str);
		    } else {
		       		res.send(JSON.stringify(data));//普通的json
		    }// console.log(allnames);

	   }
  	 });
}
