/**
	author@zheng  revise@luodongjia
	通过用户id检索到其报过名的所有职位条目（详情/历史）,其中index的取值分别是1,2,3（1表示全部，2表示面试邀约，3表示暂不合适）

*/
var keystone = require('keystone'),
	Address = keystone.list('Address'),
	Areainfo = keystone.list('Areainfo'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
	Resume = keystone.list('Resume')
	ProductionCrews = keystone.list('ProductionCrews');
	Category = keystone.list('Category');
	Production = keystone.list('Production');
	BoundUserAndPublic = keystone.list('BoundUserAndPublic');
	PublicAccount = keystone.list('PublicAccount');
var async = require('async');
var urllib = require('url');
var format_position = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var search = require('../../query/save_and_get_data_in_MongoDB/careerincrew/search.js');

exports = module.exports = function(req, res) {
	var agentid = req.params.agentid || '';
	var currentPage = req.params.currentPage || '';
	var index = req.params.index || '';
	var careerincrewid = req.params.careerincrewid;
	var users = {};
	var results = [];
	CareerInCrew.model.findOne()
	.where('_id',careerincrewid)
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
								if(index==1){
									Resume.paginate({
										page: currentPage,
										perPage: 10,
										maxPages: 20
									 })
									.where('agentid',agentid)
									.where('career_in_crews_id',careerincrewid)
									.where('sign_up_create', true)
									.where('is_receive', '0')//查询未处理的报名记录
									.exec(function (err, resume_info){
										users.currentPage = resume_info.currentPage;
		                                users.totalPages = resume_info.totalPages;
										if(err) throw new Error('find resume_info error!');
										console.log('resume_info:'+resume_info);
										callback(null,resume_info);
									});
							    }else if(index==2){
			                        Resume.paginate({
										page: currentPage,
										perPage: 10,
										maxPages: 20
									 })
									.where('agentid',agentid)
									.where('career_in_crews_id',careerincrewid)
									.where('sign_up_create', true)
									.where('is_receive', '1')//查询已被通知面试的报名记录
									.exec(function (err, resume_info){
										users.currentPage = resume_info.currentPage;
		                                users.totalPages = resume_info.totalPages;
										if(err) throw new Error('find resume_info error!');
										console.log('resume_info:'+resume_info);
										callback(null,resume_info);
									});
							    }else if(index==3){
			                        Resume.paginate({
										page: currentPage,
										perPage: 10,
										maxPages: 20
									 })
									.where('agentid',agentid)
									.where('career_in_crews_id',careerincrewid)
									.where('sign_up_create', true)
									.where('is_receive', '2')//查询不合适的报名记录
									.exec(function (err, resume_info){
										users.currentPage = resume_info.currentPage;
		                                users.totalPages = resume_info.totalPages;
										if(err) throw new Error('find resume_info error!');
										console.log('resume_info:'+resume_info);
										callback(null,resume_info);
									});
							    }

						},
						function (arg, callback){
							var user_id_arry = [];//用来包裹检索到的报名的用户的id
							var infos = {};
							var arry = {};
							async.eachSeries(arg.results, function (resume_results, next){
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
								callback(null,user_id_arry);
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
							var params = urllib.parse(req.url,true);
						 	if (params.query && params.query.callback) {
  						 		var str =  params.query.callback + '(' + JSON.stringify(users) + ')';//jsonp
  								console.log('--------------str---------------');
  								console.log(str);
  								console.log('--------------str---------------');
  				                res.send(str);

						    } else{
						    	var str =  params.query.callback + '(' + JSON.stringify(users) + ')';//jsonp
					        	res.send(str);
						    }

						}

					});
                }
			});
        }
	});
	
}