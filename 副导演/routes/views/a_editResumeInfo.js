var keystone = require('keystone');
var User = keystone.list('User');
var Skill = keystone.list('Skill');
var EducationExperience = keystone.list('EducationExperience');
var School = keystone.list('School');
var SkillTag = keystone.list('SkillTag');
var FeatureTag = keystone.list('FeatureTag');
var BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var UserMedia = keystone.list('UserMedia');

var async = require('async');
var urllib = require('url');


exports = module.exports = function (req, res) {
    var userid=req.body.userid;
    var agentid=req.body.agentid;
    console.log(req.body);
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
			    //(req.body.shortintroduce==undefined)? console.log('shortintroduce is null'):ret.shortintroduce=req.body.shortintroduce;
			    ret.skill=req.body.skillArray;
		        ret.feature=req.body.featureArray;
		        ret.category=req.body.category;
		        ret.role_tag=req.body.role_tag;
		        ret.paycheck=req.body.paycheck;
		        ret.schedule=req.body.schedule; 
		        ret.createdAt = new Date();   
				ret.save(function (err) {
				 	if(err){
                       throw new Error(err);
				 	}else{
				 	   console.log('=============================');
                        console.log(ret);
                        console.log(ret.createdAt);
				 		console.log('=============================');
	                   callback(null);
		            }
				});
			}
		});

	  },function(callback){
	  	if(agentid==undefined){
            callback(null);
	  	}else{
          BoundAgentAndActor.model.findOne()
          .where('agent_id',agentid)
          .where('user_id',userid)
          .exec(function(err,ret){  
        	ret.gender=req.body.gender;
        	ret.save(function(err){
               callback(null);
            })
            	
          })
        }
	  },
	  function(callback){
        UserMedia.model.findOne()
         .where('user_id',userid)
         .exec(function(err,ret){
            if(err){
              throw new Error(err);
            }else{
              ret.videos=req.body.videourl;
              ret.save(function(err){
                if(err){
                  throw new Error(err);
                }else{
                	callback(null);
                }
              })
            }
         })
       
	  }
	  ],function(err,arg){
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
