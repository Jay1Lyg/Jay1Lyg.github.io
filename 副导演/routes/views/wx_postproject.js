var keystone = require('keystone'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	ProductionCompany = keystone.list('ProductionCompany'),
	Role = keystone.list('Role'),
	Address = keystone.list('Address'),
	Areainfo = keystone.list('Areainfo'),
	RoleCategory = keystone.list('RoleCategory'),
	CareerInCrew = keystone.list('CareerInCrew'),
	Issuer = keystone.list('Issuer'),
	User = keystone.list('User');
var async = require('async');
var extractIdsFromObjectArray = function( objectArray, callback ){
	if(objectArray==null || objectArray.length==null) return results;
	var results=[];
	var results1=[];
	var results2=[];
	async.each(objectArray, function(item,next){
		results1.push(item.id );
		results2.push(item.name);
		results.push(results1);
		results.push(results2);
		next();
	},function(err){
		if(err){
			return callback(err,null);	
		}else{
			return callback(null,results);	
		}
	});
}
exports = module.exports = function(req, res) {
	// If a form was submitted, process the login attempt
	if (req.method === 'POST') {
		var params = req.body;
		var data ={};
		if(params.author==null || params.production.name==null) throw new Error("Empty user id or empty production name");
		console.log('获得项目信息：'+params);
		async.waterfall([
			// function(callback){//Step1: Check for new production companies and create for them
			// 	console.log('1-1');
			// 	var results = [];
			// 	async.each(params.production.productionCompanieswithid, function(item,next){
			// 		if(item.name==null) next('The production company name cannot be null');
			// 		if(item.id==null){
			// 			var companywithid = {name:item.name, id:''};
			// 			ProductionCompany.model.find({'name': item.name})
			// 			.exec(function(err, ret) {
			// 			  	if (err) next("Failed to find production company: " + item.name);
			// 			  	if (ret.length==0){
			// 					ProductionCompany.model.create({ name: item.name}, function (err, ret) {
			// 					  	if (err) throw new Error("failed creating production company:" + err.message);
			// 					  	if(ret!=null){			
			// 					  		companywithid.id = ret._id;
			// 					  		data.production_companys_id = ret._id;								  		
			// 					  		results.push(companywithid);								  		
			// 					  		ret.createdBy = params.author;
			// 							ret.save(function (err) {
			// 								console.log("1-2");
			// 							    if (err) console.log('Saving Production Company failed');
			// 							    next();
			// 							});
			// 					  	} 
			// 					});		
			// 			  	}
			// 			  	else{
			// 			  		ret.save(function (err) {
			// 					    if (err) console.log('Saving Production Company failed');
			// 					    console.log("1-3" );
			// 						companywithid.id = ret[0]._id;
			// 						companywithid.name = ret[0].name;
			// 						data.production_companys_id = ret[0]._id;
			// 						results.push(companywithid);
			// 		    			next();
			// 					});
						  		
			// 			  	}
			// 			});//end of ProductionCompany			
			// 		}
			// 		else{
			// 			data.production_companys_id = item.id;
			// 			results.push(item);
			// 			next();
			// 		}
			// 	},function(err){
			// 		if(err){
			// 			console.log('One of production companies cannot be processed! ' + err);
			// 		} else {
			// 			console.log('1-5');
			// 			console.log(results);
			// 			params.production.productionCompanieswithid = results;
			// 			callback(null);
			// 		}
			// 	});						
			// },
			// function(callback){//Step1: Check for new production companies and create for them
			// 	console.log('2-1');
			// 	var results = [];
			// 	async.each(params.production.issuerswithid, function(item,next){
			// 		console.log(item);
			// 		if(item.name==null) next('The production issuer name cannot be null');
			// 		if(item.id==null){
			// 			var issuerwithid = {name:item.name, id:''};
			// 			Issuer.model.findOne({'name': item.name})
			// 			.exec(function(err, ret) {
			// 			  	if (err) throw new Error("Failed to find issuer: " + item.name);
			// 			  	if (ret == null){
			// 					Issuer.model.create({ name: item.name}, function (err, ret) {
			// 					  	if (err) throw new Error("failed creating issuer:" + err.message);
			// 					  	if(ret!=null){
			// 					  		console.log("step pre2-1");
			// 					  		issuerwithid.id = ret._id;
			// 					  		data.issuer_id = ret._id;
			// 					  		ret.createdBy = params.author;
			// 					  		results.push(issuerwithid);		
			// 					  		ret.save(function(err){	
			// 					  			if(err) throw new Error('Saving issuers  failed');					  		
			// 						   		next();
			// 						   	});
			// 					  	} 
			// 					});		
			// 			  	}
			// 			  	else{
						  		
			// 			  		ret.createdBy = params.author;
			// 			  		console.log(params.author);
			// 			  		console.log(ret.createdBy);
			// 			  		console.log(ret);
			// 			  		ret.save(function(err){
			// 			  			if(err) console.log('Saving issuers  failed');
			// 			  			console.log("2-3" );
			// 						issuerwithid.id = ret._id;
			// 						issuerwithid.name = ret.name;
			// 						data.issuer_id = ret._id;
			// 						results.push(issuerwithid);
			// 					    next();
			// 			  		});
						  		
			// 			  	}
			// 			});//end of ProductionCompany			
			// 		}
			// 		else{
			// 			data.issuer_id = item.id;
				  		
			// 			results.push(item);
			// 			next();
			// 		}
			// 	},function(err){
			// 		if(err){
			// 			console.log('One of issuers cannot be processed! ' + err);
			// 		} else {
			// 			console.log('2-4');
			// 			console.log(results);
			// 			params.production.issuerswithid = results;
			// 			callback(null);
			// 		}
			// 	});						
			// },
			function(callback){//Step1: Check for new production companies and create for them
				console.log('3-1');
				var results = [];
				async.each(params.production.locationwithid, function(item,next){
					if(item.name==null) next('The production Areainfo name cannot be null');
					if(item.id==null){
						var locationwithid = {name:item.name, id:''};
						Areainfo.model.find({'name': item.name})
						.exec(function(err, ret) {
						  	if (err) next("Failed to find Areainfo: " + item.name);
						  	if (ret.length==0){
								Areainfo.model.create({ name: item.name}, function (err, ret) {
								  	if (err) throw new Error("failed creating Areainfo:" + err.message);
								  	if(ret!=null){
								  		console.log("3-2");
								  		locationwithid.id = ret._id;
								  		data.location_id = ret._id;
								  		results.push(locationwithid);								  		
								  		ret.createdBy = params.author;
										ret.save(function (err) {
											console.log("3-3");
										    if (err) console.log('Saving Isslocationwithiduer failed');
										    next();
										});
								  	} 
								});		
						  	}
						  	else{
						  		console.log("3-4" );
						  		ret.save(function(err){
						  			if(err)  throw new Error('Saving Isslocationwithiduer failed'+err);
	 								locationwithid.id = ret[0]._id;
									locationwithid.name = ret[0].name;
									results.push(locationwithid);
								    next();
						  		});

						  	}
						});//end of ProductionCompany			
					}
					else{
						results.push(item);
						next();
					}
				},function(err){
					if(err){
						console.log('One of locationwithid cannot be processed! ' + err);
					} else {
						console.log('3-6');
						console.log(results);
						params.production.locationwithid = results;
						callback(null);
					}
				});				
			},
			function(callback){
				console.log('4-1');
				if(params.production.id==null || params.production.id == '' || params.production.id == 'null'){		
					Production.model.create({ name: params.production.name,production_companys:params.production.productionCompanies,issuer_companies:params.production.issuers,duration:params.production.time, isKeepOnRecord: params.production.isRecord, recordAddress: params.production.provincename, createdBy: params.author}, function (err, ret) {						
						if (err) throw new Error(err);
						if(ret!=null){
							console.log("4-2");
							data.production_id = ret._id;
							data.isKeepOnRecord = params.production.isRecord;
							data.production_name = ret.name;
							data.recordAddress = ret.recordAddress;
							data.duration = ret.duration;
							data.category_name = (params.production.type)[0];
							data.production_companys=ret.production_companys;
							data.issuer_companies=ret.issuer_companies;
							ret.createdBy = params.author;
							extractIdsFromObjectArray(params.production.locationwithid, function(err,ret1){
								if(err){
									throw new Error('Error happened when getting locationwithid!');
								}else{
									console.log(ret1);
									ret.location = ret1[0];
									data.location_id = ret1[0];
									data.location_name = ret1[1];
								}
							});
							extractIdsFromObjectArray(params.production.typewithid, function(err,ret2){
								if(err){
									throw new Error('Error happened when getting typewithid!');
								}else{
									console.log(ret2);
									ret.category = (ret2[0])[0];
									data.category = (ret2[0])[0];
									data.category_name = (params.production.type)[0];
								}
							});	  
							// extractIdsFromObjectArray(params.production.productionCompanieswithid, function(err,ret3){
							// 	if(err){
							// 		throw new Error('Error happened when getting productionCompanieswithid!');
							// 	}else{
							// 		console.log(ret3);
							// 		ret.production_companys = ret3[0];
							// 		data.productionCompany = ret3[1];
							// 	}
							// });	  
							// extractIdsFromObjectArray(params.production.issuerswithid, function(err,ret4){
							// 	if(err){
							// 		throw new Error('Error happened when getting issuerswithid!');
							// 	}else{
							// 		console.log(ret4);
							// 		ret.issuer_companies = ret4[0];
							// 		data.issuer_name = ret4[1];
							// 	}
							// });	  
							ret.investmentAmount = params.production.investAmount;
							data.investmentAmount = params.production.investAmount;
							ret.createdBy = params.author;
							ret.save(function (err) {
								console.log("4-3");
							    if (err) console.log('Saving Production failed' + err);
							    callback(null);
							});			
						} 
					  	else callback(null);
					});
				}
				else{
					//对production中的某些属性可修改
					Production.model.findOne()
					.where('_id',params.production.id)
					.exec(function(err,ret){
						if(err)	throw new Error('Error production id no find!');
						else{
							ret.duration = params.production.time;
							ret.name =params.production.name;
							ret.isKeepOnRecord = params.production.isRecord;
							ret.investmentAmount = params.production.investAmount;
							ret.recordAddress = params.production.provincename;	
							ret.production_companys=params.production.productionCompanies;
							ret.issuer_companies=params.production.issuers;
							data.production_id = params.production.id;
							ret.createdBy = params.author;
							data.investmentAmount = params.production.investAmount;
							data.isKeepOnRecord = params.production.isRecord;
							data.production_name = params.production.name;
							data.recordAddress =  params.production.provincename;
							data.duration =  params.production.time;
							data.category = (params.production.type)[0];
							data.production_companys=params.production.productionCompanies;
							data.issuer_companies=params.production.issuers;
							extractIdsFromObjectArray(params.production.locationwithid, function(err,ret1){
								if(err){
									throw new Error('Error happened when getting locationwithid!');
								}else{
									console.log(ret1);
									// ret.location = ret1[0];
									ret.location = ret1[0];
									data.location_id = ret1[0];
									data.location_name = ret1[1];
								}
							});
							extractIdsFromObjectArray(params.production.typewithid, function(err,ret2){
								if(err){
									throw new Error('Error happened when getting typewithid!');
								}else{
									console.log(ret2);
									ret.category = (ret2[0])[0];
									data.category = (ret2[0])[0];
									data.category_name = (params.production.type)[0];
								}
							});	  
							// extractIdsFromObjectArray(params.production.productionCompanieswithid, function(err,ret3){
							// 	if(err){
							// 		throw new Error('Error happened when getting productionCompanieswithid!');
							// 	}else{
							// 		console.log(ret3);
							// 		ret.production_companys = ret3[0];
							// 		data.productionCompany = ret3[1];
							// 		//data.production_companys = ret3;
							// 	}
							// });	  
							// extractIdsFromObjectArray(params.production.issuerswithid, function(err,ret4){
							// 	if(err){
							// 		throw new Error('Error happened when getting issuerswithid!');
							// 	}else{
							// 		console.log(ret4);
							// 		ret.issuer_companies = ret4[0];
							// 		data.issuer_name = ret4[1];
							// 	}
							// });	
							ret.save(function (err) {
								console.log("step1-3");
							    if (err) console.log('Saving Production failed' + err);
							    callback(null);
							});
						}		
					});
				}			    
			},
			function(callback){
				console.log('5-1');
				ProductionCrews.model.find({'production': data.production_id})
				.where('isRegistered', 'true')
				.exec(function(err, ret) {
				  	if (err) throw new error("Failed to find production crews by production_id");

				  	if (ret.length==0){
						ProductionCrews.model.create({ name: params.production.name}, function (err, ret) {
						  	if (err) throw new Error("failed creating ProductionCrews object:" + err.message);

						  	if(ret!=null){
						  		console.log("5-2");
						  		data.crews_id = ret._id;
						  		data.crews_name = ret.name;
						  		ret.production = data.production_id;
						  		ret.createdBy = params.author;
						  		ret.save(function (err) {
									console.log("5-3");
								    if (err) console.log('Saving Production Crews failed');
								    callback(null,ret._id);
								});
						  	} 
						  	else callback(null, ret._id);
						});		
				  	}
				  	else{
				  		console.log("5-4" );
						data.crews_id = ret._id;
						ret.name = params.production.name;
						ret.save( function (err){
							if(err) throw new Error('save ProductionCrews error!');
							console.log(ret._id);
							callback(null, ret._id);	
						})
						
				  	}
				});					    
			},
			function(arg,callback){
				console.log('6-1');
				Production.model.findOne()
				.where('_id',data.production_id)
				.exec(function(err,ret){
					ret.production_crews = arg;
					ret.save(function(err){
						if(err) throw new Error('save production faill!');
						callback(null, data, 200);
					});
				});
			}
		
		], function (err, result, statId) {
			  console.log(statId);
			  console.log(result);
			  
			  if (err) {
			  	return res.status(500).send(err);
			  }else{
			  	result.iscreate = true;
			  	//return res.status(statId).send(result);
			  	res.redirect('/WX/page_uploadPoster/'+result.production_id+'/'+crews_id+'/'+params.author);
			  } 
		});
	} else {
		throw new Error("Not Accept Get Method of Posting Position Info");
	}
};
