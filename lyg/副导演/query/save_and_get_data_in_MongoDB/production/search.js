var keystone = require('keystone'),
	Address = keystone.list('Address'),
	Areainfo = keystone.list('Areainfo'),
	Category = keystone.list('Category'),
	Production = keystone.list('Production'),
	ProductionCrews = keystone.list('ProductionCrews'),
	ProductionCompany = keystone.list('ProductionCompany'),
	Issuer = keystone.list('Issuer'),
	RoleCategory = keystone.list('RoleCategory'),
	Role = keystone.list('Role'),
	User = keystone.list('User'),
	CareerInCrew = keystone.list('CareerInCrew'),
    Category = keystone.list('Category'); 
    Invitation = keystone.list('Invitation'); 
    BoundUserAndPublic = keystone.list('BoundUserAndPublic');
    PublicAccount = keystone.list('PublicAccount');
var async = require('async');
var mongoose = require('mongoose');
var format = require('./format.js');
var config = require('../../../public/conf/common.js');
/*
*author@zheng
*根据名称判断出品公司是否存在的方法,如果存在则返回id和name ,
*如果不存在，则新创条目并返回id和name
*/
var searchProductionCompany = function (name , callback){
	var data = {};
	ProductionCompany.model.findOne()
	.where('name', name)
	.exec( function (err, ret){
		if(err){
			throw new Error(err);
		}else{
			if(ret == {} || ret == null){
				format.formatProductionCompanyInfo(name, function (err, ret1){
					if(err){
						callback(err, {});
					}else{
						callback(null, ret1);
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
*author@zheng
*根据名称判断承制公司是否存在的方法,如果存在则返回id和name ,
*如果不存在，则新创条目并返回id和name
*/
var searchIssuer = function (name, callback){
	var data = {};
	Issuer.model.findOne()
	.where('name', name)
	.exec( function (err, ret){
		if(err){
			throw new Error(err);
		}else{
			if(ret == {} || ret == null){
				format.formatIssuserCompanyInfo(name, function (err, ret1){
					if(err){
						callback(err, {});
					}else{
						callback(null, ret1);
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
*   author@zheng
*根据前台传入的areaCode值找到相应地址的id和name,并进行封装
*
*/
var searchAreaInfo = function (code, areaCode, callback){
	console.log('---------------code-----------------');
    console.log(code);
	console.log('----------------code----------------');
	var data = {};
	Areainfo.model.findOne()
	.where('areacode', code)
	.exec( function (err, ret){
		if(err){
			callback(err, {});
		}else{
			if(ret == {} || ret == null){
				//检测到区为空的情况进行拿到现有的属性字段添加到areaInfo中
				//首先对地址进行处理格式化
				var areaCode_result = areaCode.replace(/ /g,'-');//fullname
				var areaNameArr = areaCode_result.split("-");
				var areaName = areaNameArr[areaNameArr.length-1];
				var paren_code = code.substr(0,(code.length)-2)+'00'
				Areainfo.model.create({
					areacode: code,
					name: areaName,
					parencode: paren_code,
					level: '001',
					fullname: areaCode_result
				}, function (err1, ret1){
					if(err1){
						callback(err1, null);
					}else{
						data.id = ret1._id;
						data.name = ret1.name;
						console.log('检索到改地址是数据库不存在的，正在添加。。。。。。。。。。'+ret1);
						callback(null, data);
					}
				});
				
			}else{
				var areaCode_result = areaCode.replace(/ /g,'-');//fullname
				ret.fullname = areaCode_result;
				ret.save(function(err){
                   if(err){
                      throw new Error(err);
                   }else{
					 data.id = ret._id;
					 data.name = ret.name;
					 callback(null, data);
                   }
				})
			}
		}
	});
}
/*
*  
*根据前台传入的见组地址找到相应地址的id和name,并进行封装
*
*/
var searchOrCreateAddress =function (name, callback){
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
*author@zheng
*根据前台传入的影片类型值找到相应地址的id和name,并进行封装
*
*/
var searchProductionCategory = function (category, callback){
	var data = {};
	Category.model.findOne()
	.where('name', category)
	.exec( function (err, ret){
		if(err){
			throw new Error(err);
		}else{
			if(ret == {} || ret == null){
				format.formatCategoryInfo(category, function (err, ret1){
					if(err){
						callback(err, null);
					}else{
						callback(null, ret1);
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
*  通过影片名判定是否要创建Production条目
*
*
*/ 
function isCreateProduction(obj, user_id, callback){
	console.log('-------------obj--------------');
	console.log(obj);
	console.log('--------------obj-------------');
	Production.model.findOne()
	.where('name', obj.production_name)
	//.where('category', obj.production_category_obj.id)
	.where('location', obj.areainfo_obj.id)
	.where('production_companys', obj.productionCompany)
	.where('issuer_companies',  obj.issuserCompany)
	.where('investmentAmount', obj.account)
	.where('duration', obj.date)
	.where('createdBy', user_id)
	.where('actorBudget',obj.actorBudget)
	//.where('starring_ratio', obj.starring_ratio)
	//.where('starring_team_ratio', obj.starring_team_ratio)
	//.where('guestplayer_ratio', obj.guestplayer_ratio)
	//.where('otherRole_ratio', obj.otherRole_ratio)
	.exec( function (err, ret){
		if(err){
			callback(err, null);
		}else{
			console.log('*************************');
			console.log(ret);
			console.log(obj);
			if(ret == {} || ret == null){
				callback(null, true, null);
			}else{
				// if((ret.category)[0] == obj.production_category_obj.id){
				// 	if((ret.location)[0] == obj.areainfo_obj.id){
				// 		if((ret.production_companys) == obj.production_company_obj.name){
				// 			if((ret.issuer_companies) == obj.issuer_obj.name){
				// 				if(ret.investmentAmount.toString() == obj.account){
				// 					if(ret.duration == obj.date){
				// 						callback(null, false);
				// 					}else{
				// 						callback(null, true);
				// 					}
				// 				}else{
				// 					callback(null, true);
				// 				}
				// 			}else{
				// 				callback(null, true);
				// 			}
				// 		}else{
				// 			callback(null, true);
				// 		}
				// 	}else{
				// 		callback(null, true);
				// 	}
				// }else{
				// 	callback(null, true);
				// }
				callback(null, false, ret);
			}
		}
	});
}
/**
*
*  author@zheng 
*  通过openid获取到appid
*
*/
function getAppidInfoByOpenid (openid, callback){
	console.log('&&&&&&&&&&&&&&&&');
	console.log(openid);
	BoundUserAndPublic.model.findOne()
	.where('openID', openid)
	.exec( function (err1, ret1){
		if(err1){
			callback(err1, null);
		}else{
			console.log('^^^^^^^^^^^^^^^^^^^^^^^^');
			console.log(ret1);
			console.log('^^^^^^^^^^^^^^^^^^^^^^^^');
			if(ret1 == null || ret1 == {}){
				callback(null, null)
			}else{
				PublicAccount.model.findOne()
				.where('_id', ret1.appid)
				.select('appid')
				.exec( function (err2, ret2){
					if(err2){
						callback(err2, null);
					}else{
						if(ret2 == null || ret2 == {}){
							callback(null ,null);
						}else{
							callback(null, ret2);
						}
					}
				});
			}
		}
	});
}

/*
*
*   author@zheng 
*创建production的方法，最后返回name和id值  
*
*/
var dealWithProduction = function (obj, user_id, callback){

	isCreateProduction(obj, user_id, function (err, is_create, ret){
		if(err){
			callback(err, null);
		}else{
			if(is_create){ 
				console.log('开始新创项目');
				console.log(obj);
				getAppidInfoByOpenid(obj.openid, function (err1, ret1){
					if(err1){
						throw new Error(err1);
					}else{
						if(ret1 == null){
							throw new Error("错误数据！");
						}else{

							Production.model.create({
								name: obj.production_name,
								//category: obj.production_category_obj.id,
								location: obj.areainfo_obj.id,
								production_companys: obj.productionCompany,
								issuer_companies: obj.issuserCompany,
								investmentAmount: obj.account,
								duration: obj.date,
								createdBy: user_id,
								appid: ret1.appid,
								actorBudget: obj.actorBudget,
								expired_date:obj.expired_date,
								address:obj.production_address_obj,

							}, function (err1, ret1){
								if(err){
									callback(err1, null);
								}else{
									var data = {};
									data.id = ret1._id;
									data.name = obj.production_name;
									callback(null, data);
								}
							});
						}
					}
				});
			}else{
				console.log('项目已存在，不需要新创项目');
				var data = {};
				data.id = ret._id;
				data.name = ret.name;
				callback(null, data);
			}
		}
	});
}

/**
*  author@zheng
*查询剧组，关联production
*
*/
var searchProductionCrews = function (obj, callback){
	console.log('-----------obj-----------');
	console.log(obj);
	console.log('-----------obj-----------');
	var data = {};
	ProductionCrews.model.findOne()
	.where('name', obj.name)
	.exec( function (err, ret){
		if(err){
			callback(err, null);
		}else{
			console.log('-----------------ret-----------------');
			console.log(ret);
			console.log('-----------------ret-----------------');
			if(ret == {}|| ret == null){
				ProductionCrews.model.create({name: obj.name, production: [obj.id]}, function (err1, ret1){
					if(err1){
						callback(err1, null);
					}else{
						data.id = ret1._id;
						data.name = ret1.name;
						Production.model.findOne()
						.where('_id', obj.id)
						.exec(function (err2, ret2){
							if(err2){
								throw new Error(err2);
							}else{
								ret2.production_crews = data.id;
								ret2.save( function (err3){
									if(err3){
										throw new Error (err3);
									}else{
										callback(null, data);
									}
								});
							}
						});
						
					}
				});
			}else{
				console.log(ret.production == obj.id);
				console.log(ret.production);
				console.log(obj.id);
				console.log(typeof(ret.production));
				console.log(typeof(obj.id));
				//console.log(obj.id.equals(ret.production));
				if(ret.production == obj.id || obj.id.equals(ret.production)){
					console.log('step1');
					data.id = ret._id;
					data.name = ret.name;
					Production.model.findOne()
						.where('_id', obj.id)
						.exec(function (err2, ret2){
							if(err2){
								throw new Error(err2);
							}else{
								ret2.production_crews = data.id;
								ret2.save( function (err3){
									if(err3){
										throw new Error (err3);
									}else{
										callback(null, data);
									}
								});
							}
						});
				}else{
					console.log('step2');
					ProductionCrews.model.create({name: obj.name, production: [obj.id]}, function (err1, ret1){
						if(err1){
							callback(err1, null);
						}else{
							data.id = ret1._id;
							data.name = ret1.name;
							Production.model.findOne()
							.where('_id', obj.id)
							.exec(function (err2, ret2){
								if(err2){
									throw new Error(err2);
								}else{
									ret2.production_crews = data.id;
									ret2.save( function (err3){
										if(err3){
											throw new Error (err3);
										}else{
											callback(null, data);
										}
									});
								}
							});
						}
					});
				}
			}
		}
	});
}
//修改剧组名称
var changeProductionCrews = function(obj, callback){
	var data = {};
	ProductionCrews.model.findOne()
	.where('production',obj.id)
	.exec(function(err,crews){
       if(err){
          throw new Error(err);
       }else{
       	  crews.name = obj.name;
       	  crews.save(function(err){
            if(err){
              throw new Error(err);
            }else{
              data.id = crews._id;
			  data.name = obj.name;
			  callback(null,data);
            }
       	  })
       }
	})
}
module.exports = {
	searchProductionCompany: searchProductionCompany,
	searchIssuer: searchIssuer,
	searchAreaInfo: searchAreaInfo,
	searchProductionCategory: searchProductionCategory,
	dealWithProduction: dealWithProduction,
	getAppidInfoByOpenid: getAppidInfoByOpenid,
	searchProductionCrews: searchProductionCrews,
	searchOrCreateAddress: searchOrCreateAddress,
	changeProductionCrews : changeProductionCrews
}

