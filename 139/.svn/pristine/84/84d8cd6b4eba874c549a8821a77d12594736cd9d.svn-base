var keystone = require('keystone'),
    User = keystone.list('User'),
    Skill = keystone.list('Skill'),
    EducationExperience = keystone.list('EducationExperience'),
    School = keystone.list('School'),
    SchoolType = keystone.list('SchoolType'),
    Major = keystone.list('Major'),
    SkillType = keystone.list('SkillType'),
    Resume = keystone.list('Resume'),
    Production = keystone.list('Production'),
    ProductionCrews = keystone.list('ProductionCrews'),
    Role = keystone.list('Role'),
    CareerInCrew = keystone.list('CareerInCrew'),
    CareerInResume= keystone.list('CareerInResume'),
    RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	Casting  = keystone.list('Casting'),
	Compress_Casting  = keystone.list('Compress_Casting'),
	FeatureTag  = keystone.list('FeatureTag'),
    UserMedia = keystone.list('UserMedia'),
    CaregoryInTarget = keystone.list('CaregoryInTarget'),
    Category = keystone.list('Category'),
    RepertoireType = keystone.list('RepertoireType');
     
var fs = require('fs');
var request1 = require('request-json');
	crypto = require('crypto');
var async = require('async');
var request = require('request');
var info = JSON.parse(fs.readFileSync('./query/WX_ServerNo_Info/OfficialAccountsInfo.json', 'utf-8'));
var getInfo= require('../../redis_cache/RedisCache.js');
var query = require('../../get_auth_info/Getjsapi_ticket.js');

var _ = require('underscore');
var format = require('./format.js');
var format_position = require('../position/format.js');
var config = require('../../../public/conf/common.js');
var search = require('../careerincrew/search.js');
var format_user = require('../user/format.js');


// ******************************** Query Functions **********************************************************
var findProfile = function(userid, callback){
	// var profile = {}; 

	async.waterfall([
	  function(callback){
  		User.model.findOne({'_id': userid})
		.populate('hometown currentLocation careerInCrewsRelation role_tag skill category feature')
		.exec(function(err, user) {
			if(user!=null){
				format.formatProfileBasicInfo(user, function(err,ret){
					if(err){
						return callback(err, null);
					}else{
						return callback(null, ret);
					}
				});
			}
    		else{
    			return callback(true, 'The user ' + userid + 'cannot be found!');
    		}
		});	
	  },function(arg1,callback){
         CaregoryInTarget.model.find()
          .where('user_id',userid)
          .exec(function(err,category){
             format.formatProfileCategory(category, function(err,ret){
				if(err){
					return callback(err, null);
				}else{
					getAllCareerType(category,function(err,ret1){
                       ret.typename=ret1;
                        _.extend(arg1, ret);
					   return callback(null, arg1);
					});
				
				}
			});
          })
	  },
	  function(arg1,callback){//返回在两个model中返回的参演经历
          format.getCareerByTwomodel(userid,function(err,item){
               if(err) throw new Error(err);
               else{
               	  _.extend(arg1, item);
               	  return callback(null,arg1);
               }
           });
	  },
	  //casting照片返回
	  function(arg1,callback){
	  	Casting.model.findOne()
		.where('user_id', userid)
		.exec( function(err, casting){
	    	format.formatUserCasting(casting,function(err,ret){
				if(err){
					return callback(err, null);
				}else{
					_.extend(arg1, ret);
					return callback(null, arg1);   
				}
			});
		});
	  },function(arg1,callback){
        Compress_Casting.model.findOne()
		.where('user_id', userid)
		.exec( function(err, casting){
	    	format.formatUserCompressCasting(casting,function(err,ret){
				if(err){
					return callback(err, null);
				}else{
					_.extend(arg1, ret);
					return callback(null, arg1);   
				}
			});
		});
	  },
	  function(arg1,callback){
        UserMedia.model.findOne()
         .where('user_id',userid)
         .exec(function(err,ret){
         	var videoset={};
         	videoset.videoset=ret;
         	_.extend(arg1, videoset);
			return callback(null, arg1);   

         })
	  }
	], function (err, result) {
		if(err){
			return callback(err, result);	
		}else{
			console.log('*******************************************');
             console.log(result);
			console.log('*******************************************');
			return callback(null, result);	
		}
	});
}

var findProductionNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	Production.paginate({
		page: 1,
		perPage: 5,
		maxPages: 10
	 })
	.where('name', pattern)
	.where('isOfficial','true')
	.select('name')	
	.exec( function(err, ret){//formatProductionNames
		format.formatPaginateObjNames(ret, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		});    	
	});
}

var findRoleNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	Role.paginate({
		page: 1,
		perPage: 5,
		maxPages: 10
	 })
	.where('name', pattern)
	.where('isOfficial','true')
	.select('name')	
	.exec( function(err, ret){//formatProductionNames
		format.formatPaginateObjNames(ret, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		});    	
	});
}

var findSchoolNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	School.paginate({
		page: 1,
		perPage: 5,
		maxPages: 10
	 })
	.where('name', pattern)
	.where('isOfficial','true')
	.select('name')	
	.exec( function(err, ret){
		format.formatPaginateObjNames(ret, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		});    	
	});
}

var findSchooltypeNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	SchoolType.paginate({
		page: 1,
		perPage: 5,
		maxPages: 10
	 })
	.where('name', pattern)
	// .where('isOfficial','true')
	.select('name')	
	.exec( function(err, ret){
		format.formatPaginateObjNames(ret, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		});    	
	});
}

var findMajorNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	Major.paginate({
		page: 1,
		perPage: 5,
		maxPages: 10
	 })
	.where('name', pattern)
	.where('isOfficial','true')
	.select('name')	
	.exec( function(err, ret){
		format.formatPaginateObjNames(ret, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		});    	
	});
}

var findSkilltypeNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	SkillType.paginate({
		page: 1,
		perPage: 5,
		maxPages: 10
	 })
	.where('name', pattern)
	.where('isOfficial','true')
	.select('name')	
	.exec( function(err, ret){
		format.formatPaginateObjNames(ret, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		});    	
	});
}


//author@zheng revise@luodongjia 检索候选人简历的个人基本信息,index=1表示全部，2表示面试邀约，3表示暂不合适 
var findCandidatesInfo = function (careerincrew_id, currentPage,  index,callback){
	var data = {};//用来封装候选人简历的个人基本信息
	var results = [];//用来包裹data
	var info = {};//中间量
	var users = {};
	CareerInCrew.model.findOne()
	.where('_id',careerincrew_id)
	.populate('crews_object role address createdBy role.roleCategory')
	.exec( function (err, careerincrew){
		if(err) throw new Error('find careerincrew_info error');
		//console.log('careerincrew_info:'+careerincrew_info);
		console.log('----------------------careerincrew_info_candidates--------------');
		console.log(careerincrew);
		console.log('----------------careerincrew_info_candidates-----------------');
		if(careerincrew==null){
           return callback(null, results);	
		}else{
			format_position.formatRoleDetail(careerincrew,function(err,careerincrew_info){
                if(err){
                   throw new Error(err);
                }else{
					async.waterfall([
						function (callback){
							var resume_result = [];//用来包裹查询到的简历信息
							async.eachSeries(careerincrew_info.candidates, function (candidates_arry, next){
								//console.log('candidates:'+candidates_arry);
								//检索到候选人的简历后，通过候选人的简历找到其对应的简历信息
								if(index==1){
									Resume.paginate({
										page: currentPage,
										perPage: 10,
										maxPages: 20
									 })
									.where('_id',candidates_arry)
									.where('sign_up_create', true)
									.where('is_receive', '0')//查询未处理的报名记录
									.exec(function (err, resume_info){
										users.currentPage = resume_info.currentPage;
		                                users.totalPages = resume_info.totalPages;
										if(err) throw new Error('find resume_info error!');
										console.log('resume_info:'+resume_info);
										resume_result.push(resume_info);
										next();
									});
							    }else if(index==2){
			                        Resume.paginate({
										page: currentPage,
										perPage: 20,
										maxPages: 20
									 })
									.where('_id',candidates_arry)
									.where('sign_up_create', true)
									.where('is_receive', '1')//查询已被通知面试的报名记录
									.exec(function (err, resume_info){
										users.currentPage = resume_info.currentPage;
		                                users.totalPages = resume_info.totalPages;
										if(err) throw new Error('find resume_info error!');
										console.log('resume_info:'+resume_info);
										resume_result.push(resume_info);
										next();
									});
							    }else if(index==3){
			                        Resume.paginate({
										page: currentPage,
										perPage: 20,
										maxPages: 20
									 })
									.where('_id',candidates_arry)
									.where('sign_up_create', true)
									.where('is_receive', '2')//查询不合适的报名记录
									.exec(function (err, resume_info){
										users.currentPage = resume_info.currentPage;
		                                users.totalPages = resume_info.totalPages;
										if(err) throw new Error('find resume_info error!');
										console.log('resume_info:'+resume_info);
										resume_result.push(resume_info);
										next();
									});
							    }

								
							}, function (err){
								if(err) throw new Error("find careerincrew_info error!");
								callback(null, resume_result);
							});
						},
						function (arg, callback){
							var user_id_arry = [];//用来包裹检索到的报名的用户的id
							var infos = {};
							var arry = {};
							async.eachSeries(arg, function (resume_infos, next){
								async.eachSeries(resume_infos.results, function (resume_results, next){
									console.log(resume_results);
									arry.id = resume_results.user_id;
									arry.sign_up_date = resume_results._.createdAt.format('YYYY-MM-DD HH:mm:ss');
									arry.registration_rtatus = resume_results.registration_rtatus;
									arry.is_receive = resume_results.is_receive;
									arry.index = index;
									arry.authorid= careerincrew_info.createdBy;
									infos = JSON.stringify(arry);
									user_id_arry.push(JSON.parse(infos));
									next();
								}, function (err){
									if(err) throw new Error('find resume_results error!');
									next();
								});		
							}, function (err){
								if(err) throw new Error('find resume_infos error!');
								callback(null, user_id_arry);
							});
						},
						function (arg, callback){
							console.log('arg:'+arg);
							//检索候选人的个人基本信息
							async.eachSeries(arg, function (user_id_info, next){
								console.log('user_id_info:'+user_id_info.id);
								User.model.findOne()
								.where('_id', user_id_info.id)
								.exec(function (err, user_info){
									if(err) throw new Error('find user_info error!');
									console.log('user_info:'+user_info);
									search.formatProfileBasicInfoforApplicant(user_info,user_id_info,function(err,item){
			                            if(err) throw new Error('find RoleCategoryname error!');
			                            info = JSON.stringify(item);	
										results.push(JSON.parse(info));	
										next();
			                            //data.roleNames=item.roleTags;	                            
								    });							
								});

							}, function (err){
								if(err) throw new Error('find user_id_info error!'); 
								callback(null);
							});
						},function(callback){//匹配
		                     search.positionMatchActorApplicant(careerincrew_info,results,function(err,user_result){
                                if(err){
                                   throw new Error(err);
                                }else{
                                	callback(null,user_result);
                                }
		                     })
						}	
					], function (err,arg){
						if(err){
							return callback(err, null);	
						}else{
							console.log(arg);
							users.results = arg;
							return callback(null, users);	
						}

					});
                }
			});
        }
	});
}

//当前时间格式化的方法
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//author@zheng  revise@luodongjia 根据候选者id检索候选人更详细的个人基本信息,并改动报名状态（已查看状态 状态码：‘2’）
var findCandidatesMoreInfo = function (user_id, careerincrew_id,callback){
	var data = {};//用来封装候选人简历的个人基本信息
	var date = new Date().Format("yyyy-MM-dd HH:mm:ss");//查看简历的时间	
	//查询候选者的详细信息
	async.waterfall([
		function (callback){
			User.model.findOne()
			.where('_id', user_id)
			.exec(function (err, user_info){
				if(err) throw new Error('find user_info error!');
				//console.log('user_info:'+user_info);
				data.user_id = user_info._id;
				data.gender = user_info.gender;
				data.birth = user_info._.birth.format('YYYY-MM-DD');
				data.height = user_info.height;
				data.weight = user_info.weight;
				data.name = user_info.name;
				data.realname = user_info.realname;
				data.artname = user_info.artname;
				data.read_date = date;
				console.log(data.date);
				callback(null);
			});
		},
		function (callback){
			//改动报名状态（已查看状态 状态码：‘2’）
			Resume.model.findOne()
			.where('user_id', user_id)
			.where('career_in_crews_id', careerincrew_id)
			.where('sign_up_create', true)
			.exec( function (err, resume_info){
				if(err) throw new Error('find resume_info error!');
				console.log('resume_info:'+resume_info);
				resume_info.registration_rtatus = '2';
				resume_info.read_date = date;
				resume_info.save( function (err){
					if(err) throw new Error('save resume_info failed!');
					else{
						console.log('已经查看了该候选人的简历！');
						data.registration_rtatus = resume_info.registration_rtatus;
						data.is_receive = resume_info.is_receive;
						callback(null);
					}
				});
			});
		}
	],function (err){
		if(err){
			return callback(err, null);	
		}else{
			return callback(null, data);	
		}
	});
	
}
//author@zheng JavaScript移除数组内重复元素的方法
function unique(arr){
	var project_datas = {};
	var infos = {};
	var result = [];
    var tmp1 = new Array();
    var tmp2 = new Array();
    for(var m in arr){
      tmp1[arr[m].project_name]=1;
      tmp2[arr[m].production_id]=1;
    }
    //再把键和值的位置再次调换
    var tmparr1 = new Array();
    var tmparr2 = new Array();
    for(var n in tmp1){
	    tmparr1.push(n);
    }
    for(var n in tmp2){
	    tmparr2.push(n);
    }
    for(var i in tmparr1){
    	project_datas.project_name = tmparr1[i];
		project_datas.production_id = tmparr2[i];
		infos = JSON.stringify(project_datas);	
		result.push(JSON.parse(infos));
    }
   return result;
 }
//author@zheng 发布职位模块的项目名称的搜索 首先通过用户id检索到该用户所发布的所有的职位，然后找到关联吗的剧组名称即可
var findProjectNameRetreveById = function (projectname, user_id, callback){
	console.log('项目名：'+projectname +'    当前用户id:'+user_id);
	var name = new RegExp(projectname); 
	console.log(name);
	var project_data = {};//用来封装查询出来的项目名和production id 
	var data = [];
	var info = {};
	var results = [];
	//当前输入的值
	Production.model.find()
	.where('name', name)
	.where('createdBy',user_id)
	.exec(function (err, ret){
		if(err){
		   throw new Error(err);
		}else{
			if(ret.length != 0){
				project_data.project_name = ret[0].name;
				project_data.production_id = ret[0]._id;
				info = JSON.stringify(project_data);	
				results.push(JSON.parse(info));
			}else{
				project_data.project_name = projectname;
				project_data.production_id = [];
				info = JSON.stringify(project_data);	
				results.push(JSON.parse(info));
			}
		}
	});
	CareerInCrew.model.find()
	.where('createdBy', user_id)
	.sort("-createdAt")	//@zheng 按照发布时间降序排序
	.populate('crews_object')
	.exec(function (err, careerincrew_info){
		if(err) throw new Error('find careerincrew_info error');
		if(careerincrew_info.length == 0 ){
			console.log('careerincrew_info is null');
			callback(err, null);
		}else{
			async.waterfall([
				function (callback){
					async.eachSeries(careerincrew_info, function (careerincrew_result, next){
						if(careerincrew_result.publish_create == true &&　careerincrew_result.crews_object != null){
							//找到所有的剧组，以及项目的id，进行封装发给前台
							if(((careerincrew_result.crews_object.name).indexOf(projectname)) > -1 ){
								console.log(careerincrew_result.crews_object.name+'      id:'+careerincrew_result.crews_object.production);
								project_data.project_name = careerincrew_result.crews_object.name ;
								project_data.production_id = careerincrew_result.crews_object.production;
								info = JSON.stringify(project_data);	
								results.push(JSON.parse(info));	
							}else if(projectname == 'null' || projectname == '' || projectname == null){
								results = [];
							}
						}
						next();
					}, function (err){
						if(err) throw new Error('find careerincrew_info error!');
						callback(null);
					})
				},
				function (callback){
					data = unique(results);
					callback(null);
				}
			], function (err){
				if(err){
					return callback(err, []);
				}else{
				
					return callback(null, data);
				}
			})
			
		}
	});
}

var findpohoto=function(userid,callback){
  UserMedia.paginate({
			page:1,
			perPage: 20,
			maxPages: 10000
		 })
		.where('user_id',userid)
		.exec( function(err, ret){

          format.formatUserMedia(ret, function(err,usermedia){
			if(err){
				return callback(err, usermedia);	
			}
            if(usermedia==null){return callback(null, null);}
			else{
				return callback(null, usermedia);	
			}
		  });	
		});   
	

}

//经纪人-------封装演员简略信息
var packedSimpleActorInfo = function(userinfo,callback){
   var detail={};
   detail.name=userinfo.realname;
   detail.gender=userinfo.gender;
   detail.schedule=userinfo.schedule;
   detail.userid=userinfo._id;
   format_user.formatCasting(userinfo._id,function(err,img){
       if(err){
          throw new Error(err);
       }else{
         detail.iconUrl = img.iconUrl;
         detail.compress_iconUrl = img.compress_iconUrl;
         var str="";
         async.each(userinfo.feature,function(item1,next){
           FeatureTag.model.findOne()
            .where('_id',item1)
            .exec(function(err,ret1){
               if(err){
                 throw new Error(err);
               }else{
                  str+='  '+ret1.name;
                  detail.feature=str;
                  next();
               }
           })
         },function(err){
           if(err){
             throw new Error(err);
           }else{
           	 callback(null,detail);
           }
         })
       }
    });
   // Casting.model.findOne()
   //  .where('user_id',userinfo._id)
   //  .exec(function(err,img){
   //     if(err){
   //       throw new Error(err);
   //     }else{
   //       if(img!=null){
   //         (img.artimage.length>0) ? (detail.iconUrl = config.homeEntry.url+'WX/casting/artimage/' + img.artimage[img.artimage.length-1].filename) : (detail.iconUrl="") ;
   //       }else{
   //         detail.iconUrl="";
   //       }
   //       var str="";
   //       async.each(userinfo.feature,function(item1,next){
   //         FeatureTag.model.findOne()
   //          .where('_id',item1)
   //          .exec(function(err,ret1){
   //             if(err){
   //               throw new Error(err);
   //             }else{
   //                str+='  '+ret1.name;
   //                detail.feature=str;
   //                next();
   //             }
   //         })
   //       },function(err){
   //         if(err){
   //           throw new Error(err);
   //         }else{
   //         	 callback(null,detail);
   //         }
   //       })
   //     }
   //  })
}

//经纪人--演员列表基本信息
var getActorDetail=function(actorArray,callback){
  var data=[];  
  async.each(actorArray,function(item,next){
    var detail={};
     User.model.findOne()
     .where('_id',item.user_id)
     .where('allok',true)
     .exec(function(err,ret){
	    if(ret!=null){
          async.waterfall([
          	function(callback){
              detail.name=ret.realname;
              detail.gender=ret.gender;
              detail.schedule=ret.schedule;
              detail.userid=ret._id;
              var str="";
              async.each(ret.feature,function(item1,next){
                 FeatureTag.model.findOne()
                  .where('_id',item1)
                  .exec(function(err,ret1){
                     if(err){
                       throw new Error(err);
                     }else{
                        str+=' '+ret1.name;
                        detail.feature=str;
                        next();
                     }
                  })
               },function(err){
                  if(err){
                     throw new Error(err);
                   }else{
                      callback(null);
                   }
               });
          	},function(callback){//查询生活照
          		format_user.formatCasting(item.user_id,function(err,url){
		           if(err){
		              throw new Error(err);
		           }else{
		              detail.image = url.iconUrl;
		              detail.compress_image = url.compress_iconUrl;
		              callback(null); 
		           }
		        });
           //   Casting.model.findOne()
	          // .where('user_id',item.user_id)
	          // .exec(function(err,img){
	          //    if(err){
	          //      throw new Error(err);
	          //    }else{
	          //      if(img!=null){
	          //        (img.artimage.length>0) ? (detail.iconUrl = config.homeEntry.url+'/WX/casting/artimage/' + img.artimage[img.artimage.length-1].filename) : (detail.iconUrl="") ;
	          //        callback(null);
	          //      }else{
	          //        detail.iconUrl="";
	          //        callback(null);
	          //      }
	          //   }
	          // })
          	},function(callback){//将第一条参演经历作为代表作
              CareerInResume.model.findOne()
	          .where('user_id',item.user_id)
	          .populate('pro_object')
	          .exec(function(err,ret){
	             if(err){
	                throw new Error(err);
	             }else{
	               if(ret==null){
                     detail.Representativework='no';
                     callback(null);
	               }else{
		               console.log('------------ret-------------');
	                   console.log(ret);
		               console.log('------------ret-------------');
		               detail.Representativework=ret.pro_object.name;
		               callback(null);
		           }
	             }
	          })
          	}
          ],function(err){
            if(err){
              throw new Error(err);
            }else{
            	data.push(detail);
            	next();
            }
          })
	    }else{
	      next();
	    }
	 })
  },function(err){
     if(err){
       throw new Error(err);
     }else{
     	callback(null,data);
     }
  })
}

var getAllCareerType=function(Array,callback){//经纪人---添加演员资料---查询剧目类别和剧目类型名称
  console.log('----------------------');
  console.log(Array);
  console.log('----------------------');
  var result=[];
  var data1={};
  async.each(Array,function(item,next){
  	var repertoireTypeArray = [];
  	var data={};
  	if(item.category==undefined){
       next();
  	}else{
	    Category.model.findOne()
	    .where('_id',item.category)
	    .exec(function(err,ret){
	       data.categoryName=ret.name;
	       data.categoryid=item.category;
	       async.eachSeries(item.repertoireType,function(item1,next){
	         var data2={};
	         RepertoireType.model.findOne()
	         .where('_id',item1)
	         .exec(function(err,ret1){
	  	        data2.repertoireTypeName=ret1.name;
	  	        data2.repertoireTypeid=ret1._id;
	            repertoireTypeArray.push(data2);
	           next();
	         })
	       },function(err){
	          if(err){
	             throw new Error(err);
	          }else{
	          	data.repertoireTypeArray=repertoireTypeArray;
	          	result.push(data);
	          	next();
	          }
	       });
	    })
	}
  },function(err){
     if(err){
       throw new Error(err);
     }else{
     	data1.nameSet=result;
     	console.log('-----------data1-----------');
     	console.log(data1);
  	    console.log('-----------data1-----------');
        callback(null,data1);
     }
  });
}
module.exports = {
	findProfile: findProfile, 
	findProductionNames: findProductionNames,
	findRoleNames: findRoleNames,
	findSchoolNames: findSchoolNames,
	findMajorNames: findMajorNames,
	findSchooltypeNames: findSchooltypeNames,
	findSkilltypeNames: findSkilltypeNames,
	findCandidatesInfo: findCandidatesInfo,
	findCandidatesMoreInfo: findCandidatesMoreInfo,
	findProjectNameRetreveById: findProjectNameRetreveById,
	findpohoto: findpohoto,
	packedSimpleActorInfo : packedSimpleActorInfo,
	getActorDetail : getActorDetail,
	getAllCareerType : getAllCareerType
}

