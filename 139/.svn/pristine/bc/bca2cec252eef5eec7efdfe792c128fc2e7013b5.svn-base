var async = require('async');
var config = require('../../../public/conf/common.js');
var urlModule = require('url');
var keystone = require('keystone'),
	ProductionCrews = keystone.list('ProductionCrews');
    CareerInCrew = keystone.list('CareerInCrew');
var Production = keystone.list('Production');
var search = require('../position/search.js');
var format = require('../position/format.js');

// ******************************** Format Functions **********************************************************
var extractImagesUrlFromImages = function( images, callback ){
	if(images == null) return callback(null, null);

	var results = [];
	async.forEach( images, function(item,next){
		results.push(config.homeEntry.url+ 'productions/' + item.filename);
		next();
	},function(err){
		if(err){
			return callback(err, null);	
		}else{
			return callback(null, results);	
		}
	});	
}

var convertSalaryPaidTypeIdToText = function( id, callback ){ 
	var result = CareerInCrew.fields.salary_paid_by.labels[id];
	if (result == undefined ) callback(null, null);  // should throw an error here
	else return callback(null, result);
}

var extractNamesFromObjectArray = function( objectArray, callback ){
	var results = [];
	if(objectArray.length == 0) return results;

	async.each( objectArray, function(item,next){
		results.push( item.name );
		next();
	},function(err){
		if(err){
			return callback(err, null);	
		}else{
			return callback(null, results);	
		}
	});
}

var extractInformationFromProductionObject = function( production_id, callback ){
	Production.model.findOne({'_id': production_id}).populate('production_companys').exec(function(err, production) {
	    if (err) return callback(err, null);
	    else return callback(null, production);
	});
	
}

// format the search result of productions. Make it simpler to fit the needs of frontend requests.
var formatPositionResult = function( positionArray, callback ){
	var pageinfo_and_results = {};
	pageinfo_and_results.total = positionArray.total;
	pageinfo_and_results.currentPage = positionArray.currentPage;
	pageinfo_and_results.totalPages = positionArray.totalPages;
	pageinfo_and_results.pages = positionArray.pages;
	pageinfo_and_results.previous = positionArray.previous;
	pageinfo_and_results.next = positionArray.next;
	pageinfo_and_results.first = positionArray.first;
	pageinfo_and_results.last = positionArray.last;

	var results = [];
	if(positionArray.length == 0) return results;
	async.forEach( positionArray.results, function(item,next){
		var itemFormated = {};
		async.waterfall([
		    function(callback) {
				extractInformationFromProductionObject( item.crews_object.production, function(err,ret){
					if(err){
						callback(err);
					}else{
						extractNamesFromObjectArray(ret.production_companys, function(err,ret_pcompanyname){
							if(err){
								itemFormated.production_companys = [];
								callback(null);
							}else{
								itemFormated.production_companys = ret_pcompanyname;		
								callback(null, ret);						
							}
						});					

					}
				});				        
		    },
		    function(arg, callback) {
		        extractImagesUrlFromImages(arg.images, function(err,ret){
					if(err){
						itemFormated.logo = [];
					}else{
						itemFormated.logo = ret;
						
					}
				});

				itemFormated.id = item._id;
				itemFormated.name = item.name;
				itemFormated.payment = item.salary_amount;
				itemFormated.publishTime  = item._.createdAt.format('YYYY-MM-DD HH:mm:ss'); //Do MMMM YYYY 
				itemFormated.expireTime  = item._.expired_date.format('YYYY-MM-DD HH:mm:ss');
				itemFormated.production_crews  = item.crews_object.name;

				convertSalaryPaidTypeIdToText(item.salary_paid_by, function(err, ret){
					if(err){
						itemFormated.payType = null;				
					}else{
						itemFormated.payType = ret;
					}
				});

				extractNamesFromObjectArray(item.benifit_tags, function(err,ret){
					if(err){
						itemFormated.tag = [];
					}else{
						itemFormated.tag = ret;
					}
				});		

				extractNamesFromObjectArray(item.requirement_tags, function(err,ret){
					if(err){
						itemFormated.requirements = [];
					}else{
						itemFormated.requirements = ret;
					}
				});	

				callback(null, 'done');
		    }
		], function (err, result) {
			results.push(itemFormated);
		    next();
		});  // end async waterfall
	},function(err){
		if(err){
			return callback(err, null);	
		}else{
			pageinfo_and_results.results = results;
			return callback(null, pageinfo_and_results);	
		}
	});	
};
//auther@cincan 对用户的邀请信息进行格式化格式化邀请的信息把role和production的id转换为名称
var formatInvitation = function( ret , callback ){
	if (ret == null) return callback(null, []);

	var results = [];
	var invitationsList = ret.results;
	
	async.eachSeries(invitationsList, function(item,next){
		var invitationItem={};
		async.waterfall([
			function(callback){
				invitationItem.invitation_id = item._id;
				invitationItem.createdAt = item.createdAt.toLocaleDateString();//邀请时间
				invitationItem.invitestate = item.invitestate;
				//invitationItem.career_in_crews_id = item.career_in_crews;
				callback(null);
	      },
	      function(callback){
				CareerInCrew.model.findById(item.career_in_crews)
				.populate('candidates')
				.where('publish_create',true)
				.exec(function(err, career_in_crews) {
					invitationItem.crews_id = career_in_crews.crews_object;
					invitationItem.expired_date = career_in_crews.expired_date.toLocaleDateString();//截止日期
					invitationItem.men_count = career_in_crews.men_count;//招的人数
					invitationItem.address = career_in_crews.address;//报名地址
					//invitationItem.candidatescount = career_in_crews.candidates.length;//报名人数

					//查询角色
					Role.model.findById(career_in_crews.role)
					.populate('roleCategory RoleTag FeatureTag SkillTag')
					.exec(function(err, role) {
				   		invitationItem.role_id = role._id;
				   		invitationItem.role_name = role.name;
				   		invitationItem.roleCategory = role.roleCategory.name;
				   		invitationItem.roleTag = role.roleTag.name;
				   		var str1='';
				   		var str2='';
				   		async.each(role.featureTag,function(item,next){
                           str1 +=' '+item.name;
                           next();
				   		});
				  		async.each(role.skillTag,function(item,next){
                           str2 +=' '+item.name;
                           next();
				   		});
				   		invitationItem.featureTag = str1;
				   		invitationItem.skillTag = str2;

					});
					//查询剧组
				   ProductionCrews.model.findById(career_in_crews.crews_object).exec(function(err, productioncrew) {
				   		invitationItem.productioncrew_id = productioncrew._id;
				   		invitationItem.productioncrew_name = productioncrew.name;
				   		//查询项目类型
					   		 Production.model.findById(productioncrew.production)
					   		 .populate('category')
					   		 .exec(function(err, production) {
							 	invitationItem.production_category = production.category[0].name;

					   		
					  		 	callback(null);
							});

					});
				});
	      },
	   //    function(callback){
	   //    		User.model.findById(item.invited).exec(function(err, user) {
				//    invitationItem.invited_id = user._id;
				//    invitationItem.invited_realname = user.realname;
				//    invitationItem.isCertificate = user.isCertificate;
				//    (user.images.length>0) ? (invitationItem.invited_iconUrl = config.homeEntry.url+ 'WX/users/' + user.images[user.images.length-1].filename) : (invitationItem.invited_iconUrl="") ;
				//    callback(null);
				// });
	    
	   //    }
	    ], function (err) {
	      	results.push(invitationItem);
	      next();
	    });


	
	},function(err){
		if(err){
			return callback(err,[]);	
		}else{
			search.packProductionInfo(results,function(err,careerlist){
               if(err){
                  throw new Error(err);
               }else{
               	  return callback(null,careerlist);	
               }
			});
		}
	});
}
//auther@cincan 对被用户被邀请的信息进行格式化，将role和production的id转换为名称
var formatBeInvitedInfo = function( ret ,appid, callback ){
	if (ret == null) return callback(null, []);

	var results = [];
	var invitationsList = ret.results;
	
	async.eachSeries(invitationsList, function(item,next){
		var invitationItem={};
		async.waterfall([
			function(callback){
				invitationItem.careerincrewid = item.career_in_crews;
				invitationItem.invition_id = item._id;
				invitationItem.invitation_id = item._id;
				invitationItem.invited_id = item.invited;
				invitationItem.createdAt = item.createdAt.toLocaleDateString();
				invitationItem.invitestate = item.invitestate;
				callback(null);
	      },
	      function(callback){
	      	    console.log('==========item===========');
					console.log(item);
					console.log('==========item===========');
				CareerInCrew.model.findById(item.career_in_crews).populate('address').exec(function(err, career_in_crews) {
					//查询职位
					console.log('=====================');
					console.log(career_in_crews);
					console.log('=====================');
					//invitationItem.address = career_in_crews.address[0].name;//面试地址
					invitationItem.crews_id = career_in_crews.crews_object;
					invitationItem.isDelete = career_in_crews.isDelete;
						Role.model.findById(career_in_crews.role).exec(function(err, role) {
					   		invitationItem.role_id = role._id;
					   		invitationItem.role_name = role.name;

					
						});
					//查询剧组
					   ProductionCrews.model.findById(career_in_crews.crews_object).exec(function(err, productioncrew) {
                            console.log('=========productioncrew========');
					   	    console.log(productioncrew);
					   	    console.log('=========productioncrew========');
					   		invitationItem.productioncrew_id = productioncrew._id;
					   		invitationItem.productioncrew_name = productioncrew.name;
					   			//查询项目类型
						   		 Production.model.findById(productioncrew.production)
						   		 .where('appid',appid)
						   		 .populate('category location')
						   		 .exec(function(err, production) {
						   		 	console.log('--------------production-----------------');
                                    console.log(production);
						   		 	console.log('--------------production-----------------');
								 	//invitationItem.production_category = production.category[0].name;//项目类型
								 	if(production==null){
                                       callback(null);
								 	}else{
	                                    invitationItem.address = production.address;//面试地址
	                                    invitationItem.expired_date = production.expired_date.toLocaleDateString();//截止日期
	                                    format.formatcategorytags(production._id,function(err,category){
	                                        if(err){
	                                           throw new Error(err);
	                                        }else{
	                                        	invitationItem.production_category = category.categoryName;//项目类别
	                                            invitationItem.production_repertoireType = category.repertoireTpyeArray;//剧目类型
	                                            invitationItem.location = production.location;//拍摄地
	                                            User.model.findById(item.inviter).exec(function(err, user) {
												   invitationItem.inviter_id = user._id;
												   invitationItem.inviter_name = user.name;
												   (user.images.length>0) ? (invitationItem.inviter_iconUrl = config.homeEntry.url+ 'WX/image/users/' + user.images[user.images.length-1].filename) : (invitationItem.inviter_iconUrl="") ;
												   (user.compress_images.length>0) ? (invitationItem.compress_inviter_iconUrl = config.homeEntry.url+ 'WX/image/compress_users/' + user.compress_images[user.compress_images.length-1].filename) : (invitationItem.compress_inviter_iconUrl="") ;
												   callback(null);
												});
	                                        }
	                                    });
                                    }
						  		 	
								});
				
						});
				});
	      }
	    ], function (err) {
	    	if(invitationItem==null){
               next();
	    	}else{
               results.push(invitationItem);
	           next();
	    	}
	    });


	
	},function(err){
		if(err){
			return callback(err,[]);	
		}else{
			return callback(null,results);	
		}
	});

}


module.exports = {
	formatPositionResult: formatPositionResult, 
	formatInvitation: formatInvitation,
	formatBeInvitedInfo: formatBeInvitedInfo,
}
