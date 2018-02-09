var searchUser = require('../../query/util/getJssdkConfig.js');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var async = require('async');
var keystone = require('keystone');
var	User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var	User_Openid=keystone.list('User_Openid');
var config = require('../../public/conf/common.js');

exports = module.exports = function(req, res) {
	var uid = req.params.userid || '';


	search.findProfile( uid, function(err, profile) {
		var careerArray=[];
		if(err) {	
			// if err, the profile contains err message. pointing which userid not found
			res.send(err);
		}else{
			var url = config.homeEntry.url+req.url;
              
             
                    searchUser.getJssdkConfig(url,req.params.appid,function(err,ret){
		                if(err){
		                   res.send(err);
		                }else{
		                    async.each(profile.workExpArray,function(item,next){
		                      careerArray.push(item.careerInResume_id);
		                      next();
		                    });
		                    
		                	console.log('````````````````````````profile```````````````````````````````');
		                	console.log(ret);
		                	console.log(profile);
		                	console.log('````````````````````````profile```````````````````````````````');
			                res.render('page_basicinfo_edit',{
							 	userid : (profile.id==null)?'':profile.id,
						    	artname : (profile.artname==null)?'':profile.artname,
						    	realname : (profile.realname==null)?'':profile.realname,
						    	gender : (profile.gender==null)?'':profile.gender,
						    	height : (profile.height==null)?'':profile.height,
						    	weight : (profile.weight==null)?'':profile.weight,
						    	birth : (profile.birth==null)?'':profile.birth,
						    	shortintroduce : (profile.shortintroduce==null)?'':profile.shortintroduce,
								telephone : (profile.telephone==null)?'':profile.telephone,
								agentTelphone:(profile.agentTelphone==null)?'':profile.agentTelphone,
								email : (profile.email==null)?'':profile.email,
								id_number : (profile.id_number==null)?'':profile.id_number,
								user_address : (profile.user_address==null) ? '' : profile.user_address,
								hometownid : (profile.hometownid==null) ? '' : profile.hometownid,
								hometown : (profile.hometown==null) ? '' : profile.hometown,
								iconUrl : (profile.iconUrl==null) ? '' :  profile.iconUrl,

								edu_id : (profile.eduExpArray==null) ? '' : profile.eduExpArray._id,
								certificate : (profile.eduExpArray==null) ? '' : profile.eduExpArray.certificate,
								duration : (profile.eduExpArray==null) ? '' : profile.eduExpArray.certificate,
								isPublic : (profile.eduExpArray==null) ? '' : profile.eduExpArray.isPublic,
								major : (profile.eduExpArray==null) ? '' : profile.eduExpArray.major,
								major_id : (profile.eduExpArray==null) ? '' : profile.eduExpArray.major_id,
								school : (profile.eduExpArray==null) ? '' : profile.eduExpArray.school,
								school_id : (profile.eduExpArray==null) ? '' : profile.eduExpArray.school_id,

								skill_id : (profile.skill==null) ? '' : profile.skill.id,
								skill_name : (profile.skill==null) ? '' : profile.skill.name,

								careerInResume_id : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].careerInResume_id,
								role_id : (profile.workExpArray.length==0) ? '' : profile.workExpArray.role_id,
								productionName : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.productionName,
								production_id : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.production_id,
								productionPublishDate : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.productionPublishDate,
								role : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.role,
								roleCategory_id : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.roleCategory_id,
								roleCategory : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.roleCategory,
								productionType_id : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.productionType_id,
								productionType : (profile.workExpArray.length==0) ? '' : profile.workExpArray[0].detail.productionType,
		                        
		                        workExpArray : (profile.workExpArray.length==0) ? '' : profile.workExpArray,
		                        careerArray : (careerArray.length==0) ? '' : careerArray,

								rolecategoryTags : (profile.rolecategoryTags.length==0) ? '' : profile.rolecategoryTags,
								roleTags : (profile.roleTags.length==0) ? '' : profile.roleTags,

								appId: ret.appId,
			                    timestamp: ret.timestamp,
			                    nonceStr: ret.nonceStr,
			                    signature: ret.signature,
		                       
			                    frontimage : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimage,
			                    leftimage45 : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.leftimage45,
			                    rightimage45 : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.rightimage45,
			                    artimage : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.artimage,
			                    rightimage90 : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.rightimage90,
			                    leftimage90 : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.leftimage90,
			                    frontimagewaist : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimagewaist,
			                   frontimageall : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimageall,
			                   frontimagehead : (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimagehead,
					     }) ;	
		                }
					});			 
        }
	});
}