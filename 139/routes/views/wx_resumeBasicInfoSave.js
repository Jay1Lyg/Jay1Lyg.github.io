var keystone = require('keystone');
var User = keystone.list('User');
var Skill = keystone.list('Skill');


exports = module.exports = function (req, res) {
    console.log('step1');
	console.log('---------------');
	console.log(req.body);
	console.log('---------------');
	  if(req.body.userid==undefined){
			User.model.create({
				name:'null',
				password:'null',
				realname:req.body.realname,
				artname:req.body.artname,
				gender:req.body.gender,
				birth:req.body.birth,
				height:req.body.height,
				weight:req.body.weight,
				shortintroduce:req.body.shortintroduce
			},
			function(err,ret){
               if (err) return res.status(500).send(err);
               else{
               	console.log(ret);
               	console.log('新创用户成功！');
                Skill.model.create({
                	user_id:ret._id,
                	name:req.body.skill_name
                },function(err,ret1){
                  if (err) return res.status(500).send(err);
                  else{
                  	 res.redirect('/WX/wx_userprofile/'+ret._id+'/'+req.body.appId);
                  }
                })
               
               }
			})
			
        }else{
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
				    (req.body.agentTelphone==undefined)? console.log('agentTelphone is null'):ret.agentTelphone=req.body.agentTelphone;
				    (req.body.shortintroduce==undefined)? console.log('shortintroduce is null'):ret.shortintroduce=req.body.shortintroduce;
					 ret.save(function (err) {
					    if (err) return res.status(500).send(err);
					    else{
					    	console.log('--------------------skill_id------------------------');
					    	console.log(req.body.skill_id);
					    	console.log('--------------------skill_id------------------------');
					    	if(req.body.skill_id==''){
                               Skill.model.create({
                               	  user_id:ret._id,
                               	  name:req.body.skill_name},
                               function(err,ret1){
                                   if (err) return res.status(500).send(err);
				                   else{
				                   	console.log('/////////////////////////////////////////////////////////////////////////');
				                   	console.log(ret1);
				                   	console.log('/////////////////////////////////////////////////////////////////////////');
				                  	res.redirect('/WX/wx_userprofile/'+req.body.userid+'/'+req.body.appId);
				                    }
                               })
					    	}else{
						    	Skill.model.findOne()
						    	 .where('_id',req.body.skill_id)
						    	 .exec(function(err,ret1){
	                                if(err) return res.status(500).send(err);
	                                else{
	                                	ret1.name=req.body.skill_name;
	                                	ret1.save(function (err) {
                                           res.redirect('/WX/wx_userprofile/'+req.body.userid+'/'+req.body.appId);
	                                	});
	                                	
	                                }
						    	 })
					    	}
					    }
					   
					 });
				}
			});
        }
}
