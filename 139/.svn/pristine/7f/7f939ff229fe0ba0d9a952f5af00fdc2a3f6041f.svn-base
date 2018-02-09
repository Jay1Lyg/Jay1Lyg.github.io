var async = require('async');
var _ = require('underscore');
var format = require('../../query/save_and_get_data_in_MongoDB/resume/format.js');
var keystone = require('keystone'),
    User = keystone.list('User'),
    Skill=keystone.list('Skill');

//var config = require('../../public/conf/common.js');
exports = module.exports = function(req, res) {
	var userid=req.params.userid;
	console.log(userid);
    Skill.model.findOne()
		.where('user_id', userid)
		.select('name')	
		.exec( function(err, ski){
	    	format.formatSkillInformation(ski, function(err,ret){	    		
				if(err){
					return callback(err, null);
				}else{
					console.log(ret);
					console.log(ret.skill.name);
					console.log(ret==null);
					console.log(ret.length);
                    res.render('page_skill_edit',{
                        userid:userid,
                        skill_id : (ret==null) ? '' : ret.skill.id,
                        skill_name : (ret==null) ? '' : ret.skill.name,
                        
                     })
				}
			});
	}); 

}