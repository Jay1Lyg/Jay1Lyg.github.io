var keystone = require('keystone');
var searchUser = require('../../query/util/getJssdkConfig.js');
var search_resume = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var urllib = require('url');
var async = require('async');
var	User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var	User_Openid=keystone.list('User_Openid');
var config = require('../../public/conf/common.js');
exports = module.exports = function(req, res) {
	var user_id = req.params.user_id ||'';
	var index = req.params.index ||'';
	var actor_info = {};
	search_resume.findProfile( user_id, function (err, profile) {
		if(err){
			res.send(err);
		}else{
          // var url   = 'http://kaishi.viphk.ngrok.org'+req.url;   
          if(index==1){
             var url= config.homeEntry.url+'WX/page_actorDetail/'+user_id;
          }if(index==2){
          	 var url=config.homeEntry.url+'WX/page_deliveryActor/'+user_id;
          }
           User_Openid.model.findOne()
            .where('userid',user_id)
            .exec(function(err,ret2){
               if(err){
                  throw new Error(err);
               }else{

               	   	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
               	   	console.log(ret2);
                     BoundUserAndPublic.model.findOne()
                       .where('openID',ret2.openID)
                       .exec(function(err,ret3){
                           if(err){
                              throw new Error(err);
                          }else{
                          	PublicAccount.model.findOne()
                          	 .where('_id',ret3.appid)
                          	 .exec(function(err,ret4){
                                if(err){
                                   throw new Error(err);
                                }else{
                                	console.log(ret4.appid)
                                    searchUser.getJssdkConfig(url,ret4.appid,function(err,ret){
						                if(err){
						                   res.send(err);
						                }else{
						                	console.log('*******************************************');
                                            console.log(ret);
						                	console.log('*******************************************');
                                            console.log(url);

                                                actor_info.artname = (profile.artname==null)?'':profile.artname;
												actor_info.realname = (profile.realname==null)?'':profile.realname;
												actor_info.birth = (profile.birth==null)?'':profile.birth;
												actor_info.height = (profile.height==null)?'':profile.height;
												actor_info.weight = (profile.weight==null)?'':profile.weight;
												actor_info.shortintroduce = (profile.shortintroduce==null)?'':profile.shortintroduce;
												actor_info.telephone = (profile.telephone==null)?'':profile.telephone;
												actor_info.agentTelphone = (profile.agentTelphone==null)?'':profile.agentTelphone;
												actor_info.email = (profile.email==null)?'':profile.email;
												actor_info.user_address = (profile.user_address==null) ? '' : profile.user_address;
												actor_info.hometown = (profile.hometown==null) ? '' : profile.hometown;
												actor_info.iconUrl = (profile.iconUrl==null) ? '' :  profile.iconUrl;
												actor_info.school = (profile.eduExpArray==null) ? '' : profile.eduExpArray.school;
												actor_info.skill_name = (profile.skill==null) ? '' : profile.skill.name;

												actor_info.appId=ret.appId;
							                    actor_info.timestamp= ret.timestamp;
							                    actor_info.nonceStr= ret.nonceStr;
							                    actor_info.signature= ret.signature;
												
												var resume_arry = [];
												async.each(profile.workExpArray,function(item,next){
									               // console.log(item);
									                var resume_obj1 = {};
									                resume_obj1.productionName = item.detail.productionName;
									                resume_obj1.productionPublishDate = item.detail.productionPublishDate;
									                resume_obj1.role = item.detail.role;
									                resume_obj1.roleCategory = item.detail.roleCategory;
									                resume_obj1.productionType = item.detail.productionType;
									                resume_obj1.image_set = item.image_set;
									                resume_arry.push(resume_obj1);
									                console.log('oooooooooooooooooooooooooooooooooooooooooo');
									                console.log(item);
									              	next();
									            }, function (err){
									            	if(err){
									            		throw new Error(err);
									            	}else{
									            		actor_info.resum_info = resume_arry;

									            	}
									            });

												actor_info.frontimage =  (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimage;
												actor_info.leftimage45 = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.leftimage45;
												actor_info.rightimage45 = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.rightimage45;
												actor_info.artimage = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.artimage;
												actor_info.rightimage90 = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.rightimage90;
												actor_info.leftimage90 = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.leftimage90;
												actor_info.frontimagewaist = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimagewaist;
												actor_info.frontimageall = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimageall;
												actor_info.frontimagehead = (profile. CastingImageUrl==null) ? '' : profile.CastingImageUrl.frontimagehead;
												console.log('###########################################################');
												console.log(actor_info);
												console.log('###########################################################');
												var params = urllib.parse(req.url,true);
												if (params.query && params.query.callback) {
										          	//console.log('请求2:'+params.query);
										          	var str =  params.query.callback + '(' + JSON.stringify(actor_info) + ')';//jsonp
										        	res.send(str);
										      	} else {
										       		res.send(JSON.stringify(actor_info));//普通的json
										      	}
				
						                }
						            })
						        }
						    })
                         }
                      })
                }
            })

        }
     })   
	        
}