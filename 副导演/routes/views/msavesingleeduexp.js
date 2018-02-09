var keystone = require('keystone'),
	School = keystone.list('School'),
	Major = keystone.list('Major'),
	EducationExperience = keystone.list('EducationExperience'),
	SchoolType = keystone.list('SchoolType');
var async = require('async');


exports = module.exports = function(req, res) {
	
	if (req.method === 'POST') {
		var params = req.body;
		var data ={};
		var isNewEducationExperience = false;
        
		console.log(params);
		// Only school_id & major_id can be null
		// params.school==null 和params.major ==null的情况被禁止
		// params.schooltype!=null && params.schooltype_id==null的情况必须被禁止，现在还未进行限制，须以后进行
		if (params.school==null || params.major==null){ 
			throw new Error("Empty school or major is not allowed!");
		}
		data.school = params.school;
		data.major = params.major;
		async.waterfall([
			function(callback){
				if(params.school_id==''){
						School.model.create({ name: params.school, createdBy: params.userid}, function (err, ret) {
						console.log("step1-1");
						if (err) callback(new Error("failed creating school object:" + err.message));
					  	data.school_id = ret._id;
					  	callback(null);	
					});
				}
				else{
					console.log("step1-2");
					School.model.findOne()
					.where('_id',params.school_id)
					.exec( function (err, ret){
						if(err) callback(new Error("failed production object:" + err.message), null);
						else{
							ret.name = params.school;
							data.school_id = ret._id;
							ret.save(function (err){
								if(err) throw new Error('save production object error!');
								callback(null);
							});
						}
						
					});
											
				}			    
			},
			function(callback){
				if(params.major_id==''){
						Major.model.create({ name: params.major, createdBy: params.userid}, function (err, ret) {
						console.log("step2-1");
						if (err) callback(new Error("failed creating school object:" + err.message));
					  	data.major_id = ret._id;
					  	callback(null);	
					});
				}
				else{
					console.log("step2-2");
					
					Major.model.findOne()
					.where('_id',params.major_id)
					.exec( function (err, ret){
						if(err) callback(new Error("failed production object:" + err.message), null);
						else{
							ret.name = params.major;
							data.major_id = params.major_id;
							ret.save(function (err){
								if(err) throw new Error('save production object error!');
								callback(null);
							});
						}
						
					});					
				}						    
			},
			function(callback){
				if(params.eduExp_id==''){
					if(params.userid == '') {
						console.log("step4-2");
						throw new Error("Undefined operator_id");
					}
					else{
						EducationExperience.model.create({ user_id: params.userid, 
														   createdBy: params.userid,
														   duration: params.duration,
														   school: data.school_id,
														   major: data.major_id,
														   certificate: params.certificate,
														   
														}, function (err, ret) {
						  	if (err) callback(err, null);
						  	callback(null, ret);
						})
					}
					
				}
				else{
					console.log("step4-4");
						EducationExperience.model.findOne({'_id': params.eduExp_id})
						.exec(function(err, ret) {			    
							if (err) callback(err, null);	
							console.log("step4-6");
							ret.major = data.major_id;
							ret.school = data.school_id;
							ret.certificate = params.certificate;
							ret.duration = params.duration;
							console.log("ret.duration:"+ret.duration);
							ret.save(function (err) {
								console.log("step4-7");
							    if (err) console.log('Saving Education Experience failed');
							    callback(null, ret);
							});							
						});
					}							  	
			}
		], function (err, result) {
			  console.log(result);
			  if (err) return res.status(500).send(err);
			  else return res.redirect('/WX/wx_userprofile/'+params.userid);
		});
	} else {
		throw new Error("Not Accept Get Method of Saving EduExp Info");
	}
};