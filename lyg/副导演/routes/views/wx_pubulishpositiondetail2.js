var keystone = require('keystone'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	Address = keystone.list('Address'),
	CareerInCrew = keystone.list('CareerInCrew'),
	Production = keystone.list('Production'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
    Category = keystone.list('Category'); 
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var async = require('async');
var config = require('../../public/conf/common.js');

/*
*   根据name值查询部门，并将id和name值进行包装
*
*
*/
function searchRoleCategoryByName (name, callback){
	var data = {};
	RoleCategory.model.findOne()
	.where('name', name)
	.exec( function (err, ret){
		if(err){
			callback(err, data);
		}else{
			if(ret == null || ret == {}){
				//新创建一条部门
				RoleCategory.model.create({name: name}, function (err1, ret1){
					if(err1){
						callback(err1, data);
					}else{
						ret1.save( function (err2){
							if(err2){
								callback(err2, data);
							}else{
								data.id = ret1._id;
								data.name = ret1.name;
								callback(null, data);
							}
						});
					}
				});
			}else{
				data.id = ret._id;
				data.name = ret.name;
				callback(null, data);
			}
		}
	});
}
/*
*根据输入的职位的值来创建Role(进行判断去重)
*
*/
function searchOrCreateRole (name, roleCategory, callback){
	var data = {};
	Role.model.findOne()
	.where('name', name)
	.exec( function (err, ret){
		if(err){
			callback(err, data);
		}else{
			if(ret == null || ret == {}){
				Role.model.create({name: name}, function (err1, ret1){
					if(err1){
						callback(err1, data);
					}else{
						ret1.roleCategory = roleCategory.id;
						ret1.save( function (err3){
							if(err3){
								callback(err3);
							}else{
								data.id = ret1._id;
								data.name = ret1.name;
								callback(null, data);
							}
						});
						
					}
				});
			}else{
				if(ret.roleCategory == roleCategory.id){
					data.id = ret._id;
					data.name = ret.name;
					callback(null, data);
				}else{
					Role.model.create({name: name}, function (err1, ret1){
						if(err1){
							callback(err1, data);
						}else{
							ret1.roleCategory = roleCategory.id;
							ret1.save( function (err3){
								if(err3){
									callback(err3);
								}else{
									data.id = ret1._id;
									data.name = ret1.name;
									callback(null, data);
								}
							});
							
						}
					});
				}
				
			}
		}
	});
}

/*
*
*根据输入的见组地址的值来创建Address(进行判断去重)
*
*/
function searchOrCreateAddress (name, callback){
	var data = {};
	Address.model.findOne()
	.where('name', name)
	.exec( function (err, ret){
		if(err){
			callback(err, data);
		}else{
			if(ret == null || ret == {}){
				Address.model.create({name: name}, function (err1, ret1){
					if(err1){
						callback(err1, null);
					}else{
						data.id = ret1._id;
						data.name = ret1.name;
						callback(null, data);
					}
				});
			}else{
				data.id = ret._id;
				data.name = ret.name;
				callback(null, data);
			}
		}
	});
}

/*
*
*判断是否创建职位的方法
*
*/
function isCreateCareerInCrews (obj1, obj2, obj3, production_crews_id, openid, callback){
	CareerInCrew.model.findOne()
	.where('crews_object', production_crews_id)
	.where('role', obj2.id)
	.where('men_count', obj1.recruit_number)
	.where('description', obj1.describe)
	.where('gender', obj1.select_sex)
	.where('age', obj1.select_age)
	.where('expired_date', obj1.time_end)
	.where('address', obj3.id)
	.where('openid', openid)
	.exec( function (err, ret){
		if(err){
			callback(err, null);
		}else{
			if(ret == null || ret == {}){
				callback(null, true, null);
			}else{
				callback(null, false, ret);
			}
		}
	});

}
/*
* author@zheng
*创建职位（去重）
*
*/
function createCareeInCrew (obj1, obj2, obj3, production_crews_id, user_id, openid, callback){
	isCreateCareerInCrews(obj1, obj2, obj3, production_crews_id, openid, function (err, ret, crews){
		if(err){
			callback(err, null, null);
		}else{
			if(ret){
				CareerInCrew.model.create({
					crews_object: production_crews_id,
					role: obj2.id,
					men_count: obj1.recruit_number,
					description:  obj1.describe,
					gender: obj1.select_sex,
					age: obj1.select_age,
					expired_date: obj1.time_end,
					address: obj3.id
				}, 
				function (err1, ret1){
					if(err1){
						callback(err1, null);
					}else{
						ret1.createdBy = user_id;
						ret1.openid = openid;
						ret1.save( function (err2){
							if(err2){
								callback(err2, null);
							}else{
								ProductionCrews.model.findOne()
								 .where('_id',production_crews_id)
								 .exec(function(err,ret2){
                                    Production.model.findOne()
                                     .where('_id',ret2.production)
                                     .exec(function(err,ret3){
                                       ret3.createdAt=ret1.createdAt;
                                       ret3.save(function(err){
                                          callback(null, ret1);
                                       })
                                     })
								 })
								
							}
						});	
					}
				});
			}else{
               ProductionCrews.model.findOne()
				 .where('_id',production_crews_id)
				 .exec(function(err,ret2){
	                Production.model.findOne()
	                 .where('_id',ret2.production)
	                 .exec(function(err,ret3){
	                   ret3.createdAt=new Date();
	                   ret3.save(function(err){
	                      callback(null, crews);
	                   })
	                 })
				 })
				
			}
		}
	});
}
exports = module.exports = function (req, res) { 
	var params = req.body;
	console.log('收到前端的form表单数据：'+JSON.stringify(params));    
	var user_id = req.params.user_id;
	var production_crews_id = req.params.production_crews_id;
	var openid = req.params.openid;
	var firstCreate = params.firstCreate;
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	console.log('openid:'+openid);
	console.log(production_crews_id);
	console.log(firstCreate);
	console.log('PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
	// var age = params.select_age;
	// var gender = params.select_sex;
	// var men_count = params.recruit_number;
	// var expired_date = params.time_end;
	// var description = params.describe;
	console.log('user_id:'+user_id+ 'production_crews_id:'+production_crews_id);
	
	var role_category_obj = {};//用来包装部门的id和name
	var role_obj = {};//用来包装职位的id和name
	var address_obj = {};//用来包装见组地址的id和name
	var crews_id = "";
	async.waterfall([
		function (callback){
			//根据rolecategory的值进行查询
			searchRoleCategoryByName(params.department, function (err, ret){
				if(err){
					throw new Error(err);
				}else{
					role_category_obj = ret;
					callback(null);
				}
			});
		},
		function (callback){
			//根据输入的职位的值来创建Role(进行判断去重)
			searchOrCreateRole(params.position, role_category_obj, function (err, ret){
				if(err){
					throw new Error(err);
				}else{
					role_obj = ret;
					callback(null);
				}
			});
		},
		function (callback){
			//根据输入的见组地址的值来创建Address(进行判断去重)
			searchOrCreateAddress(params.recruit_adress, function (err, ret){
				if(err){
					throw new Error(err);
				}else{
					address_obj = ret;
					callback(null);
				}
			});
		},function(callback){
           ProductionCrews.model.findOne()
            .where('_id',production_crews_id)
            .exec(function(err,ret){
              if(err){
                 throw new Error(err);
              }else{
              	console.log('____________________________');
              	console.log(ret);
              	Production.model.findOne()
              	 .where('_id',ret.production)
              	 .exec(function(err,ret1){
                   if(err){
                     throw new Error(err);
                   }else{
                   	  ret1.isCreated=true;
                   	  ret1.save(function(err){
                        callback(null);
                   	  })
                   }
              	 })
              }
            })

		}, 
		function (callback){
			//创建职位(要去重)
			createCareeInCrew(params, role_obj, address_obj, production_crews_id, user_id, openid, function (err, ret){
				if(err){
					throw new Error(err);
				}else{
					if(ret){
						console.log('新建职位成功');
						crews_id = ret._id;
						callback(null, ret.createdBy);
					}else{
						console.log('职位已经存在，无需新建');
						crews_id = ret._id;
						callback(null, ret.createdBy);
					}
				}
			});
		},
		function (arg, callback){
		    BoundUserAndPublic.model.findOne()
	        .where('openID', openid)
	        .select('appid')
	        .exec( function (err, ret){
	        	if(err){
	        		throw new Error(err);
	        	}else{
	        		if(ret == null){
	        			res.send('请关注公众号，并在微信客户端使用！');
	        		}else{
	        			PublicAccount.model.findOne()
		        		.where('_id', ret.appid)
		        		.select('appid')
		        		.exec( function (err1, ret1){
		        			if(err1){
		        				throw new Error(err1);
		        			}else{
		        				console.log("appid:"+ret1.appid);
		        				callback(null, ret1.appid);
		        			}
		        		});


	        		}
	        		
	        		
	        	}
	        });
		}
	], function (err, arg){
		if(err){
			res.send(err);
		}else{
			//res.send({"isOK": true,"url":"http://kaishi.viphk.ngrok.org/WX/page_allpositions/"+user_id+'/'+arg+'/'+openid}); 
			//if(firstCreate=='true'){
			   res.send({"isOK": true,"url":config.homeEntry.url+"/WX/wx_publishCrews/"+user_id});
		   // }else{
		      // res.send({"isOK": true,"url":config.homeEntry.url+"WX/page_allpositions/"+user_id+'/'+arg+'/'+openid}); 
		   // }
			//res.send({"isOK": true,"url":"http://www.kaishiapp.com/WX/testReadCount"});
		}
	});
	
		  

};