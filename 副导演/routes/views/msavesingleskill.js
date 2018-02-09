var keystone = require('keystone'),
	Skill = keystone.list('Skill'),
	SkillType = keystone.list('SkillType');
var async = require('async');


exports = module.exports = function(req, res) {
	if (req.method === 'POST') {
		var params = req.body;
		var data ={};
		console.log(params);
		if (params.skill_name==null || params.userid==null) 
			throw new Error("Empty skillname or operator_id is not allowed!");
				console.log('skill-step1-1');
				if(params.skill_id==''){
						Skill.model.create({ user_id:params.userid,name: params.skill_name, createdBy: params.userid}, function (err, ret) {
						console.log("step1-1");
						if (err) throw new Error("failed creating skilltype object:" + err.message);
					  	console.log(ret.name);
					  	return res.redirect('/WX/wx_userprofile/'+params.userid);				  	
					});
				}
				else{
					console.log("skill-step1-2");		
					Skill.model.findOne()
					.where('_id',params.skill_id)
					.exec(function(err,ret){
						if(err){
                           throw new Error(err);
						}else{
							ret.name = params.skill_name;
							ret.save(function (err){
								if(err) throw new Error('save production object error!');
								return res.redirect('/WX/wx_userprofile/'+params.userid);
							});
						}

					})						
				}			    
	} else {
		throw new Error("Not Accept Get Method of Saving EduExp Info");
	}
};

		
