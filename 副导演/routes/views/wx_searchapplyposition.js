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
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');


exports = module.exports = function(req, res) {
	var user_id = req.params.user_id || '';
	var currentPage = req.params.currentPage || '';
	var time = req.params.time || '';
	var index = req.params.index || '';
	var appid = req.params.appid || '';
	console.log('用户id:'+user_id+'     当前页：'+currentPage+'   时间戳：'+time+'   index:'+index);
	var data = {};//用来包裹响应的数据
	var results = [];//用来封装data的数组
	var info = {};//中间量
	var more_date = {};
	var array=[];
	//根据用户i对锁定其报名时创建的resume
	//if(index == 1){   //查询全部
		Resume.paginate({
			page: currentPage,
			perPage: 10,
			maxPages: 50
		 })
		.where('user_id', user_id)
		.where('sign_up_create', true)
		.where('is_receive', index)//查询对应状态的报名记录0--未处理，1--同意，2--拒绝
		.exec(function (err, resume_info){
			if(err) throw new Error('find resume_info error');
			console.log('total:'+resume_info.total+'   currentPage:'+resume_info.currentPage+'    totalPages:'+resume_info.totalPages);
			more_date.total = resume_info.total;
			more_date.currentPage = resume_info.currentPage;
			more_date.totalPages = resume_info.totalPages;
			async.waterfall([
				function (callback){
					console.log('1-1');
					var resume_arry = [];
					async.eachSeries(resume_info.results, function (resume_result, next){
						console.log('1-2');
						resume_arry.push(resume_result);
						next();
					}, function (err){
						if(err) throw new Error('find resume_result error!');
						console.log('1-3');
						callback(null, resume_arry);
					});
				},
				function (arg, callback){
					console.log('2-1');
					console.log('----------2-1-----------');
					console.log(arg);
					console.log('----------2-1-----------');
					async.eachSeries(arg, function (resume_results, next){
						//console.log('resume_results:'+resume_results);
						//根据Rusume与CareerInCrews的关联关系找到对应的所有职位条目
						CareerInCrew.model.find()
						.where('_id', resume_results.career_in_crews_id)
						.where('publish_create', true)
						//.where({'createdAt':{$lt:time}})//过滤掉发布时间小于time的职位 
						//.where({'idDelete':{$in:[true,false]}})
						.populate('crews_object role address')
						.exec(function (err, careerincrew_info){
							console.log();
							if(err) throw new Error('find careerincrew_info error');
							//console.log('careerincrew_info:'+careerincrew_info);	
							//检索到相应的见组城市
							console.log('----------2-1-1-----------');
					        console.log(careerincrew_info);
					        console.log('----------2-1-1-----------');
							if(careerincrew_info.length == 0 || careerincrew_info[0].crews_object ==null || careerincrew_info[0].crews_object == 'null'){
								next();
							}else{								
								ProductionCrews.model.findById((careerincrew_info[0].crews_object)._id)
								.populate('production')
								.exec(function(err, productionCrew) {
									console.log('2-3');
									console.log(productionCrew);
									data.resume_id = resume_results._id;
									data.read_date = resume_results.read_date;
									data.is_receive_date = resume_results.is_receive_date;
									data.career_in_crews_id = resume_results.career_in_crews_id;
									data.author_id = careerincrew_info[0].createdBy;
									data.registration_date = resume_results._.createdAt.format('YYYY-MM-DD HH:mm:ss');//报名时间
									data.registration_rtatus = resume_results.registration_rtatus;//报名状态
									data.is_receive = resume_results.is_receive;//是否接受，0表示简历已被查看，强等待结果的状态，1表示简历已被接受，请留意短信、邮件或来电，2表示简历已被拒绝
									data.isQualified = resume_results.isQualified;//是否签约
									data.crews_id = (careerincrew_info[0].crews_object)._id;
									data.crews_name = (careerincrew_info[0].crews_object).name;
									data.role_id = (careerincrew_info[0].role)._id;
									data.role_name = (careerincrew_info[0].role).name;
									data.is_effective = careerincrew_info[0].is_effective;
									data.openid = careerincrew_info[0].openid;
									//data.address_id = address_result[0]._id;
									//data.address_name = address_result[0].name;
									data.isDelete = careerincrew_info[0].isDelete;//true--删除
									//data.category = category.name;
									data.index=index;
									data.openid=careerincrew_info[0].openid;
									//data.location=productionCrew.production.location;
									//data.area_id = (address_result[0].area)._id;
									//data.area_name = (address_result[0].area).name;
									format.formatcategorytags(productionCrew.production._id,function(err,tag){
										if(tag == null){
                                           next();
										}else{
										   data.category = tag.categoryName;
	                                       data.repertoireTpyeArray = tag.repertoireTpyeArray;
	                                       
	                                       Areainfo.model.findOne()
	                                       .where('_id',productionCrew.production.location)
	                                       .exec(function(err,area){
                                              data.location=area.fullname;
                                              info = JSON.stringify(data);	
                                              results.push(JSON.parse(info));	
	                                          next();
	                                       })
										   
										}
                                       
									});
									
								});

							}
						});
					}, function (err){
						if(err) throw new Error('find resume_results error!');
						console.log('2-5');
						more_date.result = results;
						callback(null);
					});
				}
			], function (err){
				if (err) return res.status(500).send(err);
				 else{
				 	console.log('2-6');
				 	console.log(more_date);
				 	var params = urllib.parse(req.url,true);

				 	if (params.query && params.query.callback) {
				 		var str =  params.query.callback + '(' + JSON.stringify(more_date.result) + ')';//jsonp
						console.log('--------------str---------------');
						console.log(str);
						console.log('--------------str---------------');
		        		res.send(str);

				    } else{
				    	var str =  params.query.callback + '(' + JSON.stringify(more_date.result) + ')';//jsonp
			        	res.send(str);

				    }
				 } 
			});
			
		});
	// }else if(index == 2){
	// 	Resume.paginate({
	// 		page: currentPage,
	// 		perPage: 5,
	// 		maxPages: 50
	// 	 })
	// 	.where('user_id', user_id)
	// 	.where('sign_up_create', true)
	// 	.where('is_receive', '1')//查询已被通知面试的报名记录
	// 	.exec(function (err, resume_info){
	// 		if(err) throw new Error('find resume_info error');

	// 		console.log('total:'+resume_info.total+'   currentPage:'+resume_info.currentPage+'    totalPages:'+resume_info.totalPages);
	// 		more_date.total = resume_info.total;
	// 		more_date.currentPage = resume_info.currentPage;
	// 		more_date.totalPages = resume_info.totalPages;
	// 		async.waterfall([
	// 			function (callback){
	// 				console.log('1-1');
	// 				var resume_arry = [];
	// 				async.eachSeries(resume_info.results, function (resume_result, next){
	// 					//console.log("resume_result:"+resume_result);
	// 					console.log('1-2');
	// 					resume_arry.push(resume_result);
	// 					next();
	// 				}, function (err){
	// 					if(err) throw new Error('find resume_result error!');
	// 					//console.log('resume_arry:'+resume_arry);
	// 					console.log('1-3');
	// 					callback(null, resume_arry);
	// 				});
	// 			},
	// 			function (arg, callback){
	// 				console.log('2-1');
	// 				console.log(arg);
	// 				async.eachSeries(arg, function (resume_results, next){
	// 					//console.log('resume_results:'+resume_results);
	// 					//根据Rusume与CareerInCrews的关联关系找到对应的所有职位条目
	// 					CareerInCrew.model.find()
	// 					.where('_id', resume_results.career_in_crews_id)
	// 					.where('publish_create', true)
	// 					//.where({'createdAt':{$lt:time}})//过滤掉发布时间小于time的职位 
	// 					//.where({'idDelete':{$in:[true,false]}})
	// 					.populate('crews_object role address')
	// 					.exec(function (err, careerincrew_info){
	// 						console.log('2-2');
	// 						if(err) throw new Error('find careerincrew_info error');
	// 						//console.log('careerincrew_info:'+careerincrew_info);	
	// 						//检索到相应的见组城市
	// 						console.log('[[[[[[[[[[[[[[[[[[[[[[[[[');
	// 						console.log(careerincrew_info);
	// 						console.log('[[[[[[[[[[[[[[[[[[[[[[[[[');
	// 						  if(careerincrew_info.length!=0){
	// 							ProductionCrews.model.findById((careerincrew_info[0].crews_object)._id)
	// 							.populate('production')
	// 							.exec(function(err, productionCrew) {

	// 									 Category.model.findById(productionCrew.production.category[0])
	// 									 .exec(function(err,category){


	// 											async.eachSeries(careerincrew_info, function (address_info, next){
	// 											  if(careerincrew_info[0].address!=undefined){
	// 												Address.model.find()
	// 												.where('_id', (address_info.address)[0]._id)
	// 												.populate('area')
	// 												.exec(function (err, address_result){
	// 													if(err) throw new Error('find address_result error');
	// 													console.log('2-3');
	// 													data.resume_id = resume_results._id;
	// 													data.read_date = resume_results.read_date;
	// 													data.is_receive_date = resume_results.is_receive_date;
	// 													data.career_in_crews_id = resume_results.career_in_crews_id;
	// 													data.author_id = careerincrew_info[0].createdBy;
	// 													data.registration_date = resume_results._.createdAt.format('YYYY-MM-DD HH:mm:ss');//报名时间
	// 													data.registration_rtatus = resume_results.registration_rtatus;//报名状态
	// 													data.is_receive = resume_results.is_receive;//'0'表示投递成功等待结果状态，'1'表示面试，'2'表示不合适
	// 													data.isQualified = resume_results.isQualified;//是否签约
	// 													data.crews_id = (careerincrew_info[0].crews_object)._id;
	// 													data.crews_name = (careerincrew_info[0].crews_object).name;
	// 													data.role_id = (careerincrew_info[0].role)._id;
	// 													data.role_name = (careerincrew_info[0].role).name;
	// 													data.is_effective = careerincrew_info[0].is_effective;
	// 													data.address_id = address_result[0]._id;
	// 													data.address_name = address_result[0].name;
	// 													data.isDelete = careerincrew_info[0].isDelete;
	// 													data.category = category.name;
	// 													data.openid=careerincrew_info[0].openid;
	// 													data.index=index;
	// 													//data.area_id = (address_result[0].area)._id;
	// 													//data.area_name = (address_result[0].area).name;
	// 													info = JSON.stringify(data);	
	// 													results.push(JSON.parse(info));	
	// 													next();
	// 												});
	// 											 }else{
	// 											 	next();
	// 											 }
	// 											}, function (err){
	// 												if(err) throw new Error('find address_result error!');
	// 												console.log('2-4');
	// 												next();
	// 											});
	// 									});
	// 							});
 //                              }else{
 //                              	 next();
 //                              }


	// 					});
	// 				}, function (err){
	// 					if(err) throw new Error('find resume_results error!');
	// 					console.log('2-5');
	// 					more_date.result = results;
	// 					callback(null);
	// 				});
	// 			}
	// 		], function (err){
	// 			if (err) return res.status(500).send(err);
	// 			 else{
	// 			 	console.log('2-6');
	// 			 	console.log(more_date);
	// 			 	var params = urllib.parse(req.url,true);
				 	

	// 			 	if (params.query && params.query.callback) {
	// 			 		var str =  params.query.callback + '(' + JSON.stringify(more_date.result) + ')';//jsonp
	// 					console.log('------------1------------');
	// 	        		res.send(str);
	//      //                async.eachSeries(more_date.result, function(item, next){
	// 					// 	BoundUserAndPublic.model.findOne()
	// 				 //        .where('openID', item.openid)
	// 				 //        .exec( function (err, ret){
	// 				 //        	if(err){
	// 				 //        		throw new Error(err);
	// 				 //        	}else{
	// 				 //        		if(ret == null){
	// 				 //        			res.send('请关注公众号，并在微信客户端使用！');
	// 				 //        		}else{
	// 				 //        			PublicAccount.model.findOne()
	// 					//         		.where('_id', ret.appid)
	// 					//         		.select('appid')
	// 					//         		.exec( function (err1, ret1){
	// 					//         			if(err1){
	// 					//         				throw new Error(err1);
	// 					//         			}else{
	// 					//         				console.log("appid:"+ret1.appid);

	// 					// 			   	 		if(ret1.appid == appid){
	//      //                                          array.push(item);
	//      //                                          next();
	// 					// 			   	 		}else{
	// 					// 			   	 			next();
	// 					// 			   	 		}
	// 					// 			   	    }
	// 					// 			   	})
	// 					// 			}
	// 					// 	    }
	// 					// 	 })
	// 				 //    },function(err){
	//      //                  if(err) throw new Error(err);
	// 					// 	console.log('data:');
	// 					// 	var str =  params.query.callback + '(' + JSON.stringify(array) + ')';//jsonp
	// 					// 	console.log('------------1------------');
	// 					// 	console.log(array);
	// 		   //      		res.send(str);
	// 				 //    })

	// 			    } else{
	// 			    	var str =  params.query.callback + '(' + JSON.stringify(more_date.result) + ')';//jsonp
	// 					console.log('------------2------------');
	// 	        		res.send(str);

	// 			   //  	 async.eachSeries(more_date.result, function(item, next){
	// 						// BoundUserAndPublic.model.findOne()
	// 				  //       .where('openID', item.openid)
	// 				  //       .exec( function (err, ret){
	// 				  //       	if(err){
	// 				  //       		throw new Error(err);
	// 				  //       	}else{
	// 				  //       		if(ret == null){
	// 				  //       			res.send('请关注公众号，并在微信客户端使用！');
	// 				  //       		}else{
	// 				  //       			PublicAccount.model.findOne()
	// 					 //        		.where('_id', ret.appid)
	// 					 //        		.select('appid')
	// 					 //        		.exec( function (err1, ret1){
	// 					 //        			if(err1){
	// 					 //        				throw new Error(err1);
	// 					 //        			}else{
	// 					 //        				console.log("appid:"+ret1.appid);

	// 						// 		   	 		if(ret1.appid == appid){
	//       //                                         array.push(item);
	//       //                                         next();
	// 						// 		   	 		}
	// 						// 		   	    }
	// 						// 		   	})
	// 						// 		}
	// 						//     }
	// 						//  })
	// 				  //   },function(err){
	//       //                 if(err) throw new Error(err);
	// 						// console.log('data:');
	// 						// var str =  params.query.callback + '(' + JSON.stringify(array) + ')';//jsonp
	// 						// console.log('------------2------------');
	// 						// console.log(array);
	// 		    //     		res.send(str);
	// 				  //   })

	// 			    }
	// 			 } 
	// 		});
			
	// 	});
	// }else if(index == 3){
	// 	Resume.paginate({
	// 		page: currentPage,
	// 		perPage: 5,
	// 		maxPages: 50
	// 	 })
	// 	.where('user_id', user_id)
	// 	.where('sign_up_create', true)
	// 	.where('is_receive', '2')//查询已被拒绝的报名记录
	// 	.exec(function (err, resume_info){
	// 		if(err) throw new Error('find resume_info error');

	// 		console.log('total:'+resume_info.total+'   currentPage:'+resume_info.currentPage+'    totalPages:'+resume_info.totalPages);
	// 		more_date.total = resume_info.total;
	// 		more_date.currentPage = resume_info.currentPage;
	// 		more_date.totalPages = resume_info.totalPages;
	// 		async.waterfall([
	// 			function (callback){
	// 				console.log('1-1');
	// 				var resume_arry = [];
	// 				async.eachSeries(resume_info.results, function (resume_result, next){
	// 					//console.log("resume_result:"+resume_result);
	// 					console.log('1-2');
	// 					resume_arry.push(resume_result);
	// 					next();
	// 				}, function (err){
	// 					if(err) throw new Error('find resume_result error!');
	// 					//console.log('resume_arry:'+resume_arry);
	// 					console.log('1-3');
	// 					callback(null, resume_arry);
	// 				});
	// 			},
	// 			function (arg, callback){
	// 				console.log('2-1');
	// 				console.log(arg);
	// 				async.eachSeries(arg, function (resume_results, next){

	// 					//console.log('resume_results:'+resume_results);
	// 					//根据Rusume与CareerInCrews的关联关系找到对应的所有职位条目
	// 					CareerInCrew.model.find()
	// 					.where('_id', resume_results.career_in_crews_id)
	// 					.where('publish_create', true)
	// 					//.where({'createdAt':{$lt:time}})//过滤掉发布时间小于time的职位 
	// 					//.where({'idDelete':{$in:[true,false]}})
	// 					.populate('crews_object role address')
	// 					.exec(function (err, careerincrew_info){

	// 						console.log('---------------------======-----------------------');
	// 						console.log(careerincrew_info);
	// 						console.log('------------------------======--------------------');
	// 						Production.model.findById(careerincrew_info[0].crews_object.production)
	// 						.populate('category')
	// 						.exec(function(err,production){

	// 										console.log('2-2');
	// 										if(err) throw new Error('find careerincrew_info error');
	// 										//console.log('careerincrew_info:'+careerincrew_info);	
	// 										//检索到相应的见组城市
	// 										async.eachSeries((careerincrew_info), function (address_info, next){
	// 										 if(careerincrew_info[0].address!=undefined){	
	// 											Address.model.find()
	// 											.where('_id', (address_info.address)[0]._id)
	// 											.populate('area')
	// 											.exec(function (err, address_result){
	// 												if(err) throw new Error('find address_result error');
	// 												console.log('2-3');
	// 												data.resume_id = resume_results._id;
	// 												data.read_date = resume_results.read_date;
	// 												data.is_receive_date = resume_results.is_receive_date;
	// 												data.career_in_crews_id = resume_results.career_in_crews_id;
	// 												data.author_id = careerincrew_info[0].createdBy;
	// 												data.registration_date = resume_results._.createdAt.format('YYYY-MM-DD HH:mm:ss');//报名时间
	// 												data.registration_rtatus = resume_results.registration_rtatus;//报名状态
	// 												data.is_receive = resume_results.is_receive;
	// 												data.isQualified = resume_results.isQualified;//是否签约
	// 												data.crews_id = (careerincrew_info[0].crews_object)._id;
	// 												data.crews_name = (careerincrew_info[0].crews_object).name;
	// 												data.role_id = (careerincrew_info[0].role)._id;
	// 												data.role_name = (careerincrew_info[0].role).name;
	// 												data.is_effective = careerincrew_info[0].is_effective;
	// 												data.address_id = address_result[0]._id;
	// 												data.address_name = address_result[0].name;
	// 												data.category = production.category[0].name;
	// 												data.isDelete = careerincrew_info[0].isDelete;
	// 												data.index=index;
	// 												data.openid=careerincrew_info[0].openid;
	// 												//data.area_id = (address_result[0].area)._id;
	// 												//data.area_name = (address_result[0].area).name;
	// 												info = JSON.stringify(data);	
	// 												results.push(JSON.parse(info));	
	// 												next();

	// 											});
	// 										}else{
	// 											next();
	// 										}
	// 										}, function (err){
	// 											if(err) throw new Error('find address_result error!');
	// 											console.log('2-4');
	// 											next();
	// 										});

	// 							});


	// 					});
	// 				}, function (err){
	// 					if(err) throw new Error('find resume_results error!');
	// 					console.log('2-5');
	// 					more_date.result = results;
	// 					callback(null);
	// 				});
	// 			}
	// 		], function (err){
	// 			if (err) return res.status(500).send(err);
	// 			 else{
	// 			 	console.log('2-6');
	// 			 	console.log(more_date);
	// 			 	var params = urllib.parse(req.url,true);

	// 			 	 if (params.query && params.query.callback) {
	// 			 	 	console.log('data:');
	// 					var str =  params.query.callback + '(' + JSON.stringify(more_date.result) + ')';//jsonp
	// 	        		res.send(str);
	//      //                async.eachSeries(more_date.result, function(item, next){
	// 					// 	BoundUserAndPublic.model.findOne()
	// 				 //        .where('openID', item.openid)
	// 				 //        .exec( function (err, ret){
	// 				 //        	if(err){
	// 				 //        		throw new Error(err);
	// 				 //        	}else{
	// 				 //        		if(ret == null){
	// 				 //        			res.send('请关注公众号，并在微信客户端使用！');
	// 				 //        		}else{
	// 				 //        			PublicAccount.model.findOne()
	// 					//         		.where('_id', ret.appid)
	// 					//         		.select('appid')
	// 					//         		.exec( function (err1, ret1){
	// 					//         			if(err1){
	// 					//         				throw new Error(err1);
	// 					//         			}else{
	// 					//         				console.log("appid:"+ret1.appid);

	// 					// 			   	 		if(ret1.appid == appid){
	//      //                                          array.push(item);
	//      //                                          next();
	// 					// 			   	 		}else{
	// 					// 			   	 			next();
	// 					// 			   	 		}
	// 					// 			   	    }
	// 					// 			   	})
	// 					// 			}
	// 					// 	    }
	// 					// 	 })
	// 				 //    },function(err){
	//      //                  if(err) throw new Error(err);
	// 					// 	console.log('data:');
	// 					// 	var str =  params.query.callback + '(' + JSON.stringify(array) + ')';//jsonp
	// 		   //      		res.send(str);
	// 				 //    })

	// 			    } else{
	// 			    	var str =  params.query.callback + '(' + JSON.stringify(more_date.result) + ')';//jsonp
	// 			    	res.send(str);

	// 			   //  	 async.eachSeries(more_date.result, function(item, next){
	// 						// BoundUserAndPublic.model.findOne()
	// 				  //       .where('openID', item.openid)
	// 				  //       .exec( function (err, ret){
	// 				  //       	if(err){
	// 				  //       		throw new Error(err);
	// 				  //       	}else{
	// 				  //       		if(ret == null){
	// 				  //       			res.send('请关注公众号，并在微信客户端使用！');
	// 				  //       		}else{
	// 				  //       			PublicAccount.model.findOne()
	// 					 //        		.where('_id', ret.appid)
	// 					 //        		.select('appid')
	// 					 //        		.exec( function (err1, ret1){
	// 					 //        			if(err1){
	// 					 //        				throw new Error(err1);
	// 					 //        			}else{
	// 					 //        				console.log("appid:"+ret1.appid);

	// 						// 		   	 		if(ret1.appid == appid){
	//       //                                         array.push(item);
	//       //                                         next();
	// 						// 		   	 		}
	// 						// 		   	    }
	// 						// 		   	})
	// 						// 		}
	// 						//     }
	// 						//  })
	// 				  //   },function(err){
	//       //                 if(err) throw new Error(err);
	// 						// console.log('data:');
	// 						// //var str =  params.query.callback + '(' + JSON.stringify(array) + ')';//jsonp
	// 		    //     		res.send(array);
	// 				  //   })

	// 			    }
	// 			 } 
	// 		});
			
	// 	});
	// }
	
}