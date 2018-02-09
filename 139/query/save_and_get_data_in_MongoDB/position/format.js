

var async = require('async');
// var urlModule = require('url');
//var config = require('../../public/conf/common.js');
var keystone = require('keystone'),
    CareerInCrew = keystone.list('CareerInCrew'),
    RoleCategory = keystone.list('RoleCategory'),
    School = keystone.list('School'),
    Invitation = keystone.list('Invitation'),
    Areainfo = keystone.list('Areainfo'),
    PublicAccount = keystone.list('PublicAccount'),
    Role = keystone.list('Role'),
    ProductionCrews = keystone.list('ProductionCrews'),
	Production = keystone.list('Production');
	Resume = keystone.list('Resume');
	CaregoryInTarget = keystone.list('CaregoryInTarget');
	Invitation = keystone.list('Invitation');
var config = require('../../../public/conf/common.js');
var _ = require('underscore');
var search = require('../position/search.js');

// ******************************** Format Functions **********************************************************
// extrace name from object arrays
var extractNamesFromObjectArray = function( objectArray, callback ){
	if(objectArray==null || objectArray.length==null) return results;

	var results=[];
	async.each(objectArray, function(item,next){
		results.push(item.name );
		next();
	},function(err){
		if(err){
			return callback(err,null);	
		}else{
			return callback(null,results);	
		}
	});
}

var extractNamesAndIdFromObjectArray = function( objectArray, callback ){
	var results=[];
	if(objectArray==null || objectArray.length==0) return results;

	async.eachSeries(objectArray, function(item,next){
		var name_id = {
			name: item.name,
			id: item._id
		};
		
		results.push(name_id );
		next();
	},function(err){
		if(err){
			return callback(err,null);	
		}else{
			return callback(null,results);	
		}
	});
}

//auther@cincan  extracIdAndFullNamesObjectArray

var extracIdAndFullNamesObjectArray = function( objectArray, callback ){
	var results=[];
	if(objectArray==null || objectArray.length==0) return results;

	async.eachSeries(objectArray, function(item,next){
		var fullname_id = {
			id: item._id,
			fullname: item.fullname
		};
		
		results.push(fullname_id );
		next();
	},function(err){
		if(err){
			return callback(err,null);	
		}else{
			return callback(null,results);	
		}
	});
}


var formatPaginateObjNames = function( pagenateObject, callback ){//object is a paginate object
	//console.log(pagenateObject);
	var result = {};
	result.total= pagenateObject.total;
	result.currentPage = pagenateObject.currentPage;
	result.totalPages = pagenateObject.totalPages;

	if (pagenateObject.results.length==0) {
		result.nameset = [];
		return callback(null, result);
	}
	// result.eduExpTotal = pagenateObject.total;

	extractNamesAndIdFromObjectArray(pagenateObject.results, function(err,ret){
		if(err){
			result.nameset = null;
			return callback(null, result);
		}else{
			result.nameset = ret;
			return callback(null, result);
		}
	});
}

//auther@cincan   format localtionfullnames
var formatLocationFullNames = function( pagenateObject, callback ){//object is a paginate object
	console.log(pagenateObject);
	/*var result = {};
	result.total= pagenateObject.total;
	result.currentPage = pagenateObject.currentPage;
	result.totalPages = pagenateObject.totalPages;

	if (pagenateObject.results.length==0) {
		result.nameset = [];
		return callback(null, result);
	}
	// result.eduExpTotal = pagenateObject.total;

	extracIdAndFullNamesObjectArray(pagenateObject.results, function(err,ret){
		if(err){
			result.nameset = null;
			return callback(null, result);
		}else{
			result.nameset = ret;
			return callback(null, result);
		}
	});
}*/
}



var getAreaById = function(id, callback){
	if(id==null) return callback(null, null);

	Areainfo.model.find({'_id': id})
	.exec(function(err, ret) {
		if(err) return callback(err, null);
		else return callback(null, ret);
	});
}

var getProductionById = function(id, callback){
	if(id==null) return callback(null, null);

	Production.model.find({'_id': id})
	.populate('category')
	.exec(function(err, ret) {
		if(err) return callback(err, null);
		else{
			//console.log('production:'+ret[0]._id+"~~~"+ret[0].category);
			return callback(null, ret);	
		}
	});
}

var isProductionTypeMatch = function(type_id, type_array){
	console.log('---------type_id---------');
	console.log(type_id);
	console.log(type_array);
	console.log('---------type_id---------');
	var flag=false;
	if(type_id==null || type_array==null || type_array.length==0) throw new Error('empty type_id or type_array!'); //Ã‚Â¹ÃƒÂ½Ãƒâ€šÃƒâ€¹ÃƒÅ’ÃƒÂµÃ‚Â¼ÃƒÂ¾ÃƒÅ½ÃƒÅ¾ÃƒÂÃ‚Â?
	for(var cat in type_array) {
		if(type_array[cat].id==type_id) flag=true;
	}
	
	return flag;
}

var isRepertoireTypeMatch = function(type_id, type_array){
	console.log('---------type_id---------');
	console.log(type_id);
	console.log(type_array);
	console.log('---------type_id---------');
	var flag=false;
	if(type_id==null || type_array==null || type_array.length==0) throw new Error('empty type_id or type_array!'); //Ã‚Â¹ÃƒÂ½Ãƒâ€šÃƒâ€¹ÃƒÅ’ÃƒÂµÃ‚Â¼ÃƒÂ¾ÃƒÅ½ÃƒÅ¾ÃƒÂÃ‚Â?
	for(var cat in type_array) {
		if(type_array[cat].repertoireTpyeid==type_id) flag=true;
	}
	
	return flag;
}

var formatPositionObjects = function( positionArray, productiontype_id, rolecategory_id, area_id, currentPage, name, callback ){ //object is a paginate object
	if(positionArray==null || positionArray.length==0) return callback(null,[]);
	var results=[];
	async.eachSeries(positionArray, function(item,next){
		// role, roleCategory, crews_object, addressÂ±Ã˜ÃÃ«Â·Ã‡Â¿Ã•
		var posItem = {};
		var flag = true;
		var now_date = new Date();
		async.waterfall([
	      function(callback){
	      	//console.log(item);
	      	console.log('step1');
	      	if(item.createdBy!=null){//åŽæ¥æµ‹è¯•æœ‰é”™è¯¯æ•°æ®ï¼Œé’ˆå¯¹æ€§çš„æ·»åŠ äº†è¿™ä¸ªæ¡ä»?
	      		posItem.id = item._id;
				posItem.role_id = item.role.id;
				posItem.role_name = item.role.name;
				posItem.role_category_id = item.role.roleCategory;
				posItem.crews_id = item.crews_object._id;
				posItem.crews_name = item.crews_object.name;
				posItem.crews_production_id = item.crews_object.production;
				console.log(item.crews_object.production);
				posItem.men_count = item.men_count;
				posItem.expired_date = item._.expired_date.format('YYYY-MM-DD');
				posItem.remaining_days = Math.floor( (item.expired_date.getTime() - now_date.getTime())/3600000/24 );
				posItem.address_id = (item.address[0]!=null) ? item.address[0]._id : null;
				posItem.address_name = (item.address[0]!=null) ? item.address[0].name : null;
				posItem.address_area_id = (item.address[0]!=null) ? item.address[0].area : null;  //address_areaÂ²Â»Ã”ÃŠÃÃ­ÃŽÂªmultipleÂ£Â¬ÂµÂ«Ã’Ã²Â¸ÃƒÂ¶Ã”ÃÃ³ÃŠÃ‡Ã’Ã”ÃŠÃ½Ã—Ã©ÃÃŽÃŠÂ½Â´Ã¦ÂµÃ„Â£Â¬Ã’Ã²Â´Ã‹Ã’Ã”ÃŠÃ½Ã—Ã©Ã€Â´Â¶Ã”Â´Ã½
				posItem.candidates = item.candidates;
				posItem.author_id = item.createdBy._id;
				posItem.author_name = item.createdBy.name;
				posItem.is_effective = item.is_effective;
				posItem.isRegistered = item.isRegistered;
				posItem.openid = item.openid;
				Production.model.findById(posItem.crews_production_id)
				.populate('category')
				.exec(function(err, production) {
					posItem.production_category = production.category[0].name;
				   
				});
			}
		        callback(null);
	      	
    		
	      },
	      function(callback){
	      	console.log('step1-2');
	      	//author@cincan send production_image to position tab
	      	posItem.production_id = item.crews_object.production;
	      	Production.model.findById(posItem.production_id).exec(function(err, production) {
   				//(production.mediaid!=null || production.mediaid!=undefined) ? (posItem.production_image = 'http://kaishi.viphk.ngrok.org/WX/poster/production/' +  item.crews_object.production+'/'+production.mediaid+'.jpg') : (posItem.production_image="") ;
				(production.images.length>0) ? (posItem.production_image = config.homeEntry.url+'/WX/poster/production/' + posItem.production_id+'/'+(production.images)[production.images.length-1].originalname) : (posItem.production_image="") ;
				(production.compress_images.length>0) ? (posItem.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + posItem.production_id+'/'+(production.compress_images)[production.compress_images.length-1].originalname) : (posItem.compress_production_image="") ;
				console.log(posItem.production_image);
			});
			
	      	callback(null);
	      },
	  
	      function(callback){
	      	console.log('step2');
	      	extractNamesFromObjectArray(item.requirement_tags, function(err,ret){
				if(err){
					throw new Error('Error happened when getting requirment tags!');
				}else{
					posItem.requirement_tags = ret;
					callback(null);
				}
			});	        
	      },
	  
	      function(callback){	   
	      	console.log('step3');   	
			// Â»Ã±ÂµÃƒÂ¾Ã§Ã„Â¿Ã€Ã Â±Ã°ÂµÃ„ÃŠÃ½Ã—Ã©
			getProductionById(item.crews_object.production, function(err,ret){
				if(err){
					posItem.crews_production_categories = null;
					throw new Error('Error happened when getting production object by ID!');
				}else{
					// Â´Ã‹Â´Â¦ret Ã’Â²ÃŠÃ‡Ã’Â»Â¸Ã¶ÃŠÃ½Ã—Ã©
					extractNamesAndIdFromObjectArray( (ret!=null)?ret[0].category:null, function(err,ret1){
						posItem.crews_production_categories = ret1;
						
						callback(null);
					});
				}
			});
	      },

	      function(callback){
	      	console.log('step4');
	        // Â»Ã±ÂµÃƒÂ¼Ã»Ã—Ã©ÂµÃ˜Ã–Â·Â¼Â´Â±Â¨ÃƒÃ»ÂµÃ˜Ã–Â·ÂµÃ„Â³Ã‡ÃŠÃÃƒÃ»Â³Ã†
	        var area_id = (item.address[0]!=null) ? item.address[0].area : null;
			getAreaById(area_id, function(err,ret){
				if(err){
					posItem.address_area_name = null;
				}else{
					posItem.address_area_name = (ret!=null) ? ret[0].name: null;
			        callback(null);
				}	
			});
	      },
	      function(callback){
	      	console.log('step5');
			if(area_id!=null ){
				if(area_id!=item.address[0].area){
					console.log('5-1');
					flag=false;
					callback(null, false);
				}else{
					callback(null, true);
				}
			}
			else{
				callback(null, true);
			}
	      },
	      function(arg1, callback){
	      	console.log('step6');
	      	if(arg1==false) callback(null, false);
	      	else{
	      		if(rolecategory_id== null||rolecategory_id=="583fe8c87b46370016d46b04"){
                    callback(null, true);
	      		}else if(rolecategory_id!= null){
	        		if(rolecategory_id!=item.role.roleCategory ){
	        			console.log('6-1');
						flag=false;
						callback(null, false);
					}else{
						callback(null, true);

					}
	        	}
	        	
	      	}
	      },
	      function(arg1, callback){
	      	console.log('step7');
	      	if(arg1==false) callback(null, false);
	      	else{
	      		if(productiontype_id==null||productiontype_id=="583fe7847b46370016d46b03") {
	      			console.log('7-3');
	      			callback(null, true);
	      		}
	      		else{
	      			if(isProductionTypeMatch(productiontype_id, posItem.crews_production_categories)){
	      				console.log('7-1');
		      			callback(null, true);
		      		}
		      		else{
		      			console.log('7-2');
		      			callback(null, false);
		      		}
	      		}	      		
	      	}
	      }
	    ], function (err, isPush) {
	      if(isPush){
	      	results.push(posItem);
	      }
	      next();
	    });

	},function(err){
		if(err){
			return callback(err,[]);	
		}else{
			return callback(null,results);	
		}
	});
}
//-------------------é€šå‘Šåˆ—è¡¨--é€šå‘Šè¿‡æ»¤-----------------------
var formatmatchPosition = function( positionArray,categoryid, repertoiretypeid,callback ){ //object is a paginate object
	console.log('888888888888888');
    console.log(categoryid);
    console.log(repertoiretypeid);
	console.log('888888888888888');
	if(positionArray==null || positionArray.length==0) return callback(null,[]);
	var results=[];
	async.eachSeries(positionArray, function(item,next){
		// role, roleCategory, crews_object, addressÂ±Ã˜ÃÃ«Â·Ã‡Â¿Ã•
		var posItem = {};
		var flag = true;
		var now_date = new Date();
		async.waterfall([
	      function(callback){
	      	    console.log('step1');
	      	    console.log(item);
	      		posItem.id = item._id;
	      		posItem.name = item.name;
				posItem.introduction = item.introduction;
				posItem.actorBudget = item.actorBudget;
				posItem.duration = item.duration;
				posItem.investmentAmount = item.investmentAmount;
				posItem.location = item.location;
				posItem.locationname = item.location[0].name;
				//posItem.expired_date = item._.expired_date.format('YYYY-MM-DD');
				posItem.remaining_days = Math.floor( (item.expired_date.getTime() - now_date.getTime())/3600000/24 );
				posItem.address = item.address;
				posItem.isRegistered = item.isRegistered;				
				posItem.production_companys = item.production_companys;
				posItem.issuer_companies = item.issuer_companies;
				posItem.author_name = item.createdBy.name;
				posItem.appid = item.appid;
				posItem.repertoireTpyeArray=item.repertoireTpyeArray;
				posItem.categoryName=item.categoryName;
				posItem.production_crews = item.production_crews;
				posItem.categoryid=item.categoryid;
				(item.images.length>0) ? (posItem.production_image = config.homeEntry.url+'/WX/poster/production/' + item._id+'/'+(item.images)[item.images.length-1].originalname) : (posItem.production_image="") ;
				(item.compress_images.length>0) ? (posItem.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + item._id+'/'+(item.compress_images)[item.compress_images.length-1].originalname) : (posItem.compress_production_image="") ;
				callback(null);
	      },
	      function(callback){
	      	console.log('step6');
      		if(categoryid== null||categoryid== 'null'||categoryid== '59aa2930d1caefb01b1f6e44'){
                callback(null, true);
      		}else if(categoryid!= null){
        		if(categoryid!=item.categoryid ){
        			console.log('6-1');
					flag=false;
					callback(null, false);
				}else{
					callback(null, true);

				}
        	}
	      },
	      function(arg1, callback){
	      	console.log('step7');
	      	if(arg1==false) callback(null, false);
	      	else{
	      		if(repertoiretypeid==null||repertoiretypeid=='null'||repertoiretypeid=='59aa2b24d1caefb01b1f6e45') {
	      			console.log('7-3');
	      			callback(null, true);
	      		}
	      		else{
	      			if(isRepertoireTypeMatch(repertoiretypeid, posItem.repertoireTpyeArray)){
	      				console.log('7-1');
		      			callback(null, true);
		      		}
		      		else{
		      			console.log('7-2');
		      			callback(null, false);
		      		}
	      		}	      		
	      	}
	      }
	    ], function (err, isPush) {
	      if(isPush){
	      	results.push(posItem);
	      }
	      next();
	    });

	},function(err){
		if(err){
			return callback(err,[]);	
		}else{
			return callback(null,results);	
		}
	});
}
//auther@cincan å¯¹é‚€è¯·ç•Œé¢æŸ¥å¤„çš„èŒä½ä¿¡æ¯è¿›è¡Œæ ¼å¼åŒ?
var formatUserCareerInCrews = function( CareerInCrew , callback ){//auther@cincan æ ¼å¼åŒ–UserCareerInCrews

	
	if (CareerInCrew.length==0) return callback(null, {});

	var careerInCrew_isRegister=[];
	var careerInCrew_result = {};
	
	async.eachSeries(CareerInCrew, function(item,next){
		var isRegisteredRole = {};
			isRegisteredRole.careerincrew_id = item._id;
			isRegisteredRole.role = item.role;
			isRegisteredRole.crews_object = item.crews_object;
			careerInCrew_isRegister.push(isRegisteredRole);
		    next();
	
	},function(err){
		if(err){
			return callback(err,[]);	
		}else{
			careerInCrew_result.careerInCrew_isRegister = careerInCrew_isRegister;
			return callback(null,careerInCrew_result);	
		}
	});

}
//æ ¹æ®productioncrewid,æŸ¥è¯¢èŒä½ä¿¡æ¯
var searchCareerIncrewsInfo = function(production_crews,production,inviter_id,invited_id,callback){
	var result = [];
	var crewinfo={};
    CareerInCrew.model.find()
     .where('crews_object',production_crews[0]._id)
     .populate('role')
     .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
		   async.eachSeries(ret,function(item,next){
		   	  var data = {};
              data.role = item.role.name;
		      data.careerincrew_id = item._id;
		      data.crews_object = item.crews_object;
		      data.roleTag_id = item.role.roleTag;
		      Invitation.model.find()
				.where('inviter', inviter_id)
				.where('invited', invited_id)
				.where('career_in_crews', item._id)
			    .exec(function(err, careerincrews) {
					if(err){
						return callback(err, careerincrews);	
					}else{
						if(careerincrews.length == 0){
							data.invitestate = true;
							result.push(data);
							next();
						}else{
							data.invitestate = false;
							result.push(data);
							next();
						}
					
					}
						
			    });
		   },function(err){
               if(err){
                  throw new Error(err);
               }else{              	 
               	  crewinfo.productionName=production.name;
               	  crewinfo.productionid=production._id;
                  packProductionInfo(result,function(err,pd){
                      if(err){
                        throw new Error(err);
                      }else{
                      	 crewinfo.rolearray=pd;
                      	 callback(null,crewinfo);
                      }
                  });
               }
		   });
	   }

     })
}
//æ ¹æ®productionæŸ¥è¯¢é€šå‘Šä¸‹é¢çš„èŒä½?
var formatUserCrews = function(array,inviter_id,invited_id,callback){
    if (array.length==0) return callback(null, {});
    var careerInCrew_isRegister=[];
	var careerInCrew_result = {};
    async.eachSeries(array,function(item,next){
       //careerInCrew_result.productionName = item.name;
       searchCareerIncrewsInfo(item.production_crews,item,inviter_id,invited_id,function(err,ret){
          if(err){
             throw new Error(err);
          }else{
             careerInCrew_isRegister.push(ret);
          	 next();
          }
       });
    },function(err){
       if(err){
          throw new Error(err);
       }else{
       	  callback(null,careerInCrew_isRegister);
       }
    });
}
//auther@cincan Ã¥Â°â€ role Ã¥â€?productionCrew Ã§Å¡â€žid Ã¨Â½Â¬Ã¦ÂÂ¢Ã¤Â¸ÂºÃ¥ÂÂÃ¥Â­?
var convertIdToName = function( CareerInCrew , callback ){//auther@cincan Ã¦Å Å roleÃ¥â€™Å’productionÃ§Å¡â€židÃ¨Â½Â¬Ã¦ÂÂ¢Ã¤Â¸ÂºÃ¥ÂÂÃ§Â§?
	console.log('%%%%%%%%%%2222%%%%%%%%%%');
    console.log(CareerInCrew);
    console.log('%%%%%%%%%22222%%%%%%%%%%%');

	if (CareerInCrew.length==0) return callback(null, {});

	var results = [];
	
	async.eachSeries(CareerInCrew, function(item,next){
		var CareerInCrewItem={};
		async.waterfall([
			function(callback){
				CareerInCrewItem.careerincrew_id = item.careerincrew_id;
				CareerInCrewItem.roleid = item.role;
				CareerInCrewItem.productionid = item.crews_object;

				callback(null);
	      },
	      function(callback){
				Role.model.findById(item.role).exec(function(err, role) {
				   CareerInCrewItem.roleName = role.name;
				   callback(null);
				});
	      },
	      function(callback){
	      		ProductionCrews.model.findById(item.crews_object).exec(function(err, productioncrews) {
				   CareerInCrewItem.productionName = productioncrews.name;
				   callback(null);
				});
	    
	      }
	    ], function (err) {
	    	//console.log(CareerInCrewItem);
	      	results.push(CareerInCrewItem);
	        next();
	    });


	
	},function(err){
		if(err){
			return callback(err,[]);	
		}else{
			
			return callback(null,results);	
		}
	});

}

//æŠ½è±¡å‡ºè§’è‰²ä¿¡æ?
var formatRoleDetail=function(careerincrew_result,callback){
    var data = {};
    // console.log('---------------careerincrew_result---------------');
    // console.log(careerincrew_result);
    // console.log('---------------careerincrew_result---------------');
	async.waterfall([
		function(callback){
			data.careerincrew_id = careerincrew_result._id;
			data.is_effective = careerincrew_result.is_effective;
			data.crews_id = careerincrew_result.crews_object._id;
			data.crews_name = careerincrew_result.crews_object.name;
			data.production_id = careerincrew_result.crews_object.production;
			data.author = careerincrew_result.createdBy;
			data.gender = careerincrew_result.gender;//auther@ciancna æ€§åˆ«
			data.age = careerincrew_result.age;//auther@cincan å¹´é¾„
			data.min_height = careerincrew_result.min_height;
			data.max_height = careerincrew_result.max_height;
			//(careerincrew_result.createdBy.images.length>0) ? (data.iconUrl = config.homeEntry.url+'/users/' + careerincrew_result.createdBy.images[careerincrew_result.createdBy.images.length-1].filename) : (data.iconUrl="") ;
			data.release_date = careerincrew_result._.createdAt.format('YYYY-MM-DD');
			data.description = careerincrew_result.description;
			//data.expired_date = careerincrew_result._.expired_date.format('YYYY-MM-DD');
			data.men_count = careerincrew_result.men_count;
			data.role_id = careerincrew_result.role._id;
			data.role = careerincrew_result.role.name;
			data.shape = careerincrew_result.shape;
			data.FeatureTagid = careerincrew_result.role.featureTag;
			data.SkillTagid = careerincrew_result.role.skillTag;
			data.role_paycheck = careerincrew_result.role_paycheck;
			data.candidates = careerincrew_result.candidates;
			data.candidates_num = careerincrew_result.candidates.length;
			data.workingdays = careerincrew_result.workingdays;
			data.createdBy = careerincrew_result.createdBy;
			data.isDelete = careerincrew_result.isDelete;
			//data.roleTag = careerincrew_result.roleTag;
			//data.role_name = careerincrew_result.role.name;
			//data.address_id = careerincrew_result.address[0]._id;
			//data.address_name = careerincrew_result.address[0].name;
			//data.area_id = careerincrew_result.address[0].area;
	        callback(null);						
		},
		function(callback){
	       RoleTag.model.findById(careerincrew_result.role.roleTag).exec(function(err, roleTag) {
	       	       if(roleTag==null){
                       throw new Error('roleTag is null');
        //                data.roleTag = '';
					   // data.roleTag_id = '';
	       	       }else{
	       	       	   data.roleTag = roleTag.name;
					   data.roleTag_id = careerincrew_result.role.roleTag;
					   console.log(data.roleTag);
					   callback(null);
	       	       }
				  
			});
		},function(callback){
			var str = '';
		   async.eachSeries(careerincrew_result.role.featureTag,function(item,next){
	          FeatureTag.model.findById(item).exec(function(err, featureTag) {
	          	   str +=featureTag.name+' ';
				   data.featureTag = str;
				   //callback(null);
				   next();
			  });
		   },function(err){
			   if(err){
			   	 throw new Error(err);
			   }else{
			   	 callback(null);
			   }	          
		   });
	       
		},function(callback){
			var str = '';
		   async.eachSeries(careerincrew_result.role.skillTag,function(item,next){
	          SkillTag.model.findById(item).exec(function(err, skillTag) {
	          	   str +=skillTag.name+' ';
				   data.skillTag = str;
				   //callback(null);
				   next();
			  });
		   },function(err){
	          callback(null);
		   });
	       
		},function(callback){
            CaregoryInTarget.model.findOne()
            .where('production_id',data.production_id)
            .exec(function(err,ret){
               data.category=ret.category;
               data.repertoireTpye = ret.repertoireType;
               callback(null);
            })
		},function(callback){//查询邀请人个数
          Invitation.model.find()
          .where('career_in_crews',careerincrew_result._id)
          .exec(function(err,invitation){
             if(err){
               throw new Error(err);
             }else{
             	if(invitation==null){
                  data.invitation_num = 0;
                  callback(null);
             	}else{
             	  data.invitation_num = invitation.length;
             	  callback(null);
             	}
             }
          })
		},function(callback){
          AlternativeActor.model.find()
          .where('careerincrew_id',careerincrew_result._id)
          .exec(function(err,alternativeActor){
             if(err){
               throw new Error(err);
             }else{
             	if(alternativeActor==null){
                  data.alternativeActor_num = 0;
                  callback(null);
             	}else{
             	  data.alternativeActor_num = alternativeActor.length;
             	  callback(null);
             	}
             }
          })
		},function(callback){
           ProgrammeMatchActor.model.find()
           .where('careerincrew_id',careerincrew_result._id)
           .exec(function(err,programmematchactor){
              if(err){
                throw new Error(err);
             }else{
             	if(programmematchactor==null){
                  data.programmematchactor_num = 0;
                  callback(null);
             	}else{
             	  data.programmematchactor_num = programmematchactor.length;
             	  callback(null);
             	}
             }   
           })
		}
	],function(err){
       if(err){
          throw new Error(err);
       }else{
       	  callback(null,data);
       }
	})

}
//é¡¹ç›®ä¿¡æ¯---æŸ¥è¯¢å‰§ç›®ç±»åˆ«å’Œå‰§ç›®ç±»åž‹åç§?
var getAllCareerName=function(item,callback){//ç»çºªäº?--æ·»åŠ æ¼”å‘˜èµ„æ–™---æŸ¥è¯¢å‰§ç›®ç±»åˆ«å’Œå‰§ç›®ç±»åž‹åç§?
  console.log('----------------------');
  console.log(item);
  console.log('----------------------');
  var data={};
  var repertoireTpyeArray = [];
  if(item.category==undefined){
    callback(null,data);
  }else{
	Category.model.findOne()
	.where('_id',item.category)
	.exec(function(err,ret){
	   data.categoryName=ret.name;
	   data.categoryid=item.category;
	   data.category_id=item.category;
	   async.eachSeries(item.repertoireType,function(item1,next){
	     var data2={};
	     RepertoireType.model.findOne()
	     .where('_id',item1)
	     .exec(function(err,ret1){
	        data2.repertoireTpyeName=ret1.name;
	        data2.repertoireTpyeid=ret1._id;
	        repertoireTpyeArray.push(data2);
	        console.log('---------repertoireTpyeArray-----------');
	      	console.log(repertoireTpyeArray);
	      	console.log('---------repertoireTpyeArray-----------');
	       next();
	     })
	   },function(err){
	      if(err){
	         throw new Error(err);
	      }else{
	      	data.repertoireTpyeArray=repertoireTpyeArray;
	      	console.log('---------data-----------');
	      	console.log(data);
	      	console.log('---------data-----------');
	      	callback(null,data);
	      }
	   });
	})
  }
}
//é¡¹ç›®ä¿¡æ¯---æŸ¥è¯¢å‰§ç›®ç±»åˆ«å’Œå‰§ç›®ç±»åž?
var formatcategorytags=function(id,callback){
	console.log('---------------========');
	console.log(id);
	 CaregoryInTarget.model.findOne()
	  .where('production_id',id)
	  .exec(function(err,ret){
		 if(err){
		      throw new Error(err);
		 }else{
		 	if(ret==null){
                callback(null,null);
		 	}else{
		       getAllCareerName(ret,function(err,ret1){
			       if(err){
			          throw new Error(err);
			       }else{
			       	  console.log('222222222222222222222222222222');
	                  console.log(ret1);
			       	  console.log('222222222222222222222222222222');
			          callback(null,ret1);
			       }
		       });
			}
		 }
	  })
}
//ç»çºªäº?-----æŠ½è±¡å‡ºèŒä½è¯¦æƒ?
//
var formatsingleproduction = function(info,callback){
   var details={};
   details.name = info.name;
   details.production_id = info._id;
   details.location = info.location;
   details.investmentAmount = info.investmentAmount;
   details.duration = info.duration;
   details.image = info.duration;
   details.productioncrews_id = info.production_crews;
   (info.images.length>0) ? (details.production_image = config.homeEntry.url+'/WX/poster/production/' + info.images[info.images.length-1].filename) : (details.production_image="") ;
   (info.compress_images.length>0) ? (details.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + info.compress_images[info.compress_images.length-1].filename) : (details.compress_production_image="") ;
   formatcategorytags(info._id,function(err,tag){
       if(err){
          throw new Error(err);
       }else{
       	  if(tag==null){
             callback(null,details);
       	  }else{
           	 details.categorytag=tag;
             details.categorytag=tag;
       	  	 details.categoryName=tag.categoryName;
       	  	 details.category_id=tag.category_id;
       	  	 details.repertoireTpyeArray=tag.repertoireTpyeArray;
       	  	 PublicAccount.model.findOne()
       	  	 .where('appid',info.appid)
       	  	 .exec(function(err,public){
                if(err){
                   throw new Error(err);
                }else{
                   details.nick_name=public.nick_name;
                   console.log('^^^^^^^^^^^^^^^^^^^^^^');
                   console.log(details);
       	  	       console.log('^^^^^^^^^^^^^^^^^^^^^^');
                   callback(null,details);
                }
       	  	 })
             
       	  }          	  
       }
    })
}
//经济人--通告列表--查询列表信息
var formatsingleproductionforagent = function(info,appid,callback){
   var details={};
   details.name = info.name;
   details.location = info.location;
   details.investmentAmount = info.investmentAmount;
   details.duration = info.duration;
   details.productioncrews_id = info.production_crews;
   (info.images.length>0) ? (details.production_image = config.homeEntry.url+'/WX/poster/production/' + info.images[info.images.length-1].filename) : (details.production_image="") ;
   (info.compress_images.length>0) ? (details.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + info.compress_images[info.compress_images.length-1].filename) : (details.compress_production_image="") ;
   formatcategorytags(info._id,function(err,tag){
       if(err){
          throw new Error(err);
       }else{
       	  if(tag==null){
             callback(null,details);
       	  }else{
       	  	PublicAccount.model.findOne()
       	  	.where('appid',appid)
       	  	.exec(function(err,public){
               if(err){
                 throw new Error(err);
               }else{
               	 details.nick_name=public.nick_name;
               	 details.categorytag=tag;
                 details.categorytag=tag;
	       	  	 details.categoryName=tag.categoryName;
	       	  	 details.category_id=tag.category_id;
	       	  	 details.repertoireTpyeArray=tag.repertoireTpyeArray;
	       	  	 console.log('^^^^^^^^^^^^^^^^^^^^^^');
	             console.log(details);
	       	  	 console.log('^^^^^^^^^^^^^^^^^^^^^^');
	             callback(null,details);
               }
       	  	})
       	  }          	  
       }
    })
}

var formatproductionDetails = function(array,callback){
   var data = {};
   var result=[];
   data.total = array.total;
   data.currentPage = array.currentPage;
   data.totalPages = array.totalPages;
   async.eachSeries(array.results,function(item,next){
   	   console.log('--------item---------');
       console.log(item);
   	   console.log('---------item--------');
   	   formatsingleproduction(item,function(err,info){
          if(err){
             throw new Error(err);
          }else{
          	 if(info==null){
                next();
          	 }else{
          	 	result.push(info);
          	 	next();
          	 }
          }
   	   })
   },function(err){
       if(err){
          throw new Error(err);
       }else{
       	  data.results = result;
       	  callback(null,data);
       }
   });
}
var formatPositionDetail=function(productioncrew_id,callback){
    var data = {};
    var locationName = [];
	async.waterfall([	
		function(callback){
			Production.model.findOne()
			.where('production_crews',productioncrew_id)
			.populate('location createdBy')
			.exec(function(err, production_info){
				
				if(err) throw new Error('find production_info error');

				data.production_name = production_info.name;//é¡¹ç›®åç§°
				data.productionCrew_id = production_info.production_crews;//é¡¹ç›®åç§°
				data.production_id = production_info._id;
				data.production_category_id = (production_info.category)[0];
				data.duration = production_info.duration;//æ‹æ‘„å‘¨æœŸ
				data.production_companys_name = production_info.production_companys;//æ‰¿åˆ¶å…¬å¸
				data.issuer_companies_name = production_info.issuer_companies;//å‘è¡Œå…¬å¸
				data.investmentAmount = production_info.investmentAmount;//æŠ•èµ„è§„æ¨¡
				data.isKeepOnRecord = production_info.isKeepOnRecord;
				data.actorBudget = production_info.actorBudget;//æ¼”å‘˜é¢„ç®—
				data.location_id = production_info.location._id;//æ‹æ‘„åœ?
				data.location = production_info.location;
				data.address = production_info.address;//è§ç»„åœ°å€
				data.telephone = production_info.createdBy.telephone;
				data.author_id = production_info.createdBy._id;
				data.appid = production_info.appid;
				data.expired_date = production_info._.expired_date.format('YYYY-MM-DD');//æˆªæ­¢æ—¶é—´
			    (production_info.images.length>0) ? (data.production_image = config.homeEntry.url+'/WX/poster/production/' + production_info.images[production_info.images.length-1].filename) : (data.production_image="") ;
                (production_info.compress_images.length>0) ? (data.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + production_info.compress_images[production_info.compress_images.length-1].filename) : (data.compress_production_image="") ;
                formatcategorytags(production_info._id,function(err,tag){
                   if(err){
                      throw new Error(err);
                   }else{
                   	  data.categorytag=tag;
                   	  callback(null);
                   }
                })
			});
		},
		function(callback){
			async.eachSeries(data.location_id, function (location_id, next){
				Areainfo.model.findOne()
				.where('_id', location_id)
				.exec(function(err, area_info){
					if(err) throw new Error('find area_info error');
					if(area_info.length == 0){
						next();
					}else{
						var nameset = {name: area_info.name}
						locationName.push(nameset);
						next();
					}
				});
			}, function (err){
				if(err){
					throw new Error(err);
				}else{
					data.location_name = locationName;
					callback(null);
				}
			});
		}
	], function(err){
		if(err) throw new Error('find moreposition infomation error');
		else{
			callback(null,data);
		}
	});
}
///
var formatSignupStatus=function(userid,careerincrew_id,callback){
  var data = {};
   Resume.model.findOne()
	 .where('user_id',userid) 
	 .where('career_in_crews_id', careerincrew_id)
	 .exec(function(err,rett){
        if(err){
          throw new Error(err);
        }else{
          if(rett!=null){
    		CareerInCrew.model.findOne()
    		 .where('_id',careerincrew_id)
    		 .exec(function(err,careerinfo){
               if(err){
                  throw new Error(err);
               }else{
               	console.log('--------------careerinfo---------------');
                console.log(careerinfo);
    		    console.log('--------------careerinfo---------------');
                  for(var i=0;i<careerinfo.candidates.length;i++){
	                   if((careerinfo.candidates[i]).equals(rett._id)){
							var Status=false;
							callback(null,Status);
							break;
	                   }else{
	                   	 if(i==careerinfo.candidates.length-1){ 
							var Status=true;
							callback(null,Status);
	                   	 }
	                   }
				   }
               }
    		 })
		   }else{
				var Status=true;
				callback(null,Status);
		   }
        }
	 })	
}

//按照角色类别封装职位信息
 var packProductionInfo=function(proArray,callback){
    var result={};
 	var obj1=[];
 	var obj2=[];
 	var obj3=[];
 	var obj4=[];
 	var obj5=[];
 	console.log(proArray);
 	async.each(proArray,function(item,next){
 		if(item.roleTag_id=='59acc5c825d3453c2a50bbf8'){//不限
 		   obj1.push(item);
           result.obj1=obj1;
           next();
	 	}if(item.roleTag_id=='59acc5e625d3453c2a50bbfa'){//领衔
	       obj2.push(item);
           result.obj2=obj2;
	       next();
	 	}if(item.roleTag_id=='59acc5f825d3453c2a50bbfb'){//主要
	       obj3.push(item);
           result.obj3=obj3;
	       next();
	 	}if(item.roleTag_id=='59acc60e25d3453c2a50bbfc'){//客串
	       obj4.push(item);
           result.obj4=obj4;
	       next();
	 	}if(item.roleTag_id=='59acc62225d3453c2a50bbfd'){//其它
	       obj5.push(item);
           result.obj5=obj5;
	       next();
	 	}

 	},function(err){
       if(err){
         throw new Error(err);
       }else{
       	 callback(null,result);
       }
 	});
 	
 	
 }

module.exports = {
	formatPaginateObjNames: formatPaginateObjNames,
	formatPositionObjects: formatPositionObjects,
	formatLocationFullNames:formatLocationFullNames,
	formatUserCareerInCrews: formatUserCareerInCrews,
	convertIdToName: convertIdToName,
	formatPositionDetail:formatPositionDetail,
	formatSignupStatus : formatSignupStatus,
	formatRoleDetail : formatRoleDetail,
	formatcategorytags : formatcategorytags,
    getAllCareerName : getAllCareerName,
    formatmatchPosition : formatmatchPosition,
    formatproductionDetails : formatproductionDetails,
    formatsingleproduction : formatsingleproduction,
    formatUserCrews : formatUserCrews,
    searchCareerIncrewsInfo : searchCareerIncrewsInfo,
    formatsingleproductionforagent : formatsingleproductionforagent
}
