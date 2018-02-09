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
    Resume = keystone.list('Resume'); 
    SkillTag = keystone.list('SkillTag');
    RoleTag = keystone.list('RoleTag');
    FeatureTag = keystone.list('FeatureTag');
    BoundProductionAndInvited = keystone.list('BoundProductionAndInvited');
    SkillTag = keystone.list('SkillTag');
    FeatureTag = keystone.list('FeatureTag');
    RepertoireType = keystone.list('RepertoireType');
    MatchProduction = keystone.list('MatchProduction');
    MatchActor = keystone.list('MatchActor');
    
    
var async = require('async');
var _ = require('underscore');
var format = require('./format.js');
var search = require('../production/search.js');
var format_user = require('../user/format.js');
var config = require('../../../public/conf/common.js');

// ******************************** Query Functions *********************************************************
var findRepertoireType = function(category_id,callback){
  var data = [];
  var info = {};
  var infos = {};
  var all_infos = {};
  RepertoireType.model.find()
   .where('category_id',category_id)
   .select('name')
   .exec(function(err,ret){
      if(err){
         throw new Error(err);
      }else{
      	 console.log(ret);
      	 async.eachSeries(ret,function(item,next){
            infos.name = item.name;
			infos.id = item.id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));
			next();
      	 },function(err,ret1){
            if(err){
               throw new Error(err);
            }else{
               all_infos.nameset = data;
			   callback(null, all_infos);
            }
      	 });
      }
   })
}
var findProductionTypes = function(name, page, callback){
	var data = [];
	var info = {};
	var infos = {};
	var all_infos = {};
	if (name=="null") name='';
	var pattern = new RegExp(name, 'i');
	Category.paginate({
		page: page,
		perPage: 20,
		maxPages: 10
	 })
	.where('name', pattern)
	.select('name')	
	.sort('_id',1)
	.exec( function(err, ret){
		if(err){
			callback(err, null);
		}else{
            console.log(ret);
			//author@zheng°´Ò»¶¨µÄË³ÐòÅÅÐò
            infos.name = ((ret.results)[0]).name;
			infos.id = ((ret.results)[0]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[3]).name;
			infos.id = ((ret.results)[3]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));
			//data.push((ret.results)[3]);
			// infos.name = ((ret.results)[2]).name;
			// infos.id = ((ret.results)[2]).id;
			// info = JSON.stringify(infos);	
			// data.push(JSON.parse(info));

			infos.name = ((ret.results)[12]).name;
			infos.id = ((ret.results)[12]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[5]).name;
			infos.id = ((ret.results)[5]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[4]).name;
			infos.id = ((ret.results)[4]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));


			infos.name = ((ret.results)[6]).name;
			infos.id = ((ret.results)[6]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[1]).name;
			infos.id = ((ret.results)[1]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[9]).name;
			infos.id = ((ret.results)[9]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[8]).name;
			infos.id = ((ret.results)[8]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[7]).name;
			infos.id = ((ret.results)[7]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[10]).name;
			infos.id = ((ret.results)[10]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[13]).name;
			infos.id = ((ret.results)[13]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			infos.name = ((ret.results)[11]).name;
			infos.id = ((ret.results)[11]).id;
			info = JSON.stringify(infos);	
			data.push(JSON.parse(info));

			// infos.name = ((ret.results)[2]).name;
			// infos.id = ((ret.results)[2]).id;
			// info = JSON.stringify(infos);	
			// data.push(JSON.parse(info));

			all_infos.nameset = data;
			callback(null, all_infos);
		}
		/*format.formatPaginateObjNames(ret, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		});   */ 	
	});
}

var findRoleCategories = function(name, page, callback){
	var data = [];
	var info = {};
	var infos = {};
	var all_infos = {};
	if (name=="null" ) name='';
	var pattern = new RegExp(name, 'i');
	RoleCategory.paginate({
		page: page,
		perPage: 21,
		maxPages: 10
	 })
	.where('name', pattern)
	.select('name')	
	.sort('_id',1)
	.exec( function(err, ret){
		if(err){
			callback(err, null);
		}else{
			if (ret.results.length==0){
				callback(null, null);
			}else{
				//author@zheng 将人员需求按一定的顺序进行排序
				infos.name = ((ret.results)[14]).name;
				infos.id = ((ret.results)[14]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));
				//data.push((ret.results)[3]);
				infos.name = ((ret.results)[0]).name;
				infos.id = ((ret.results)[0]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[9]).name;
				infos.id = ((ret.results)[9]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[1]).name;
				infos.id = ((ret.results)[1]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[20]).name;
				infos.id = ((ret.results)[20]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[4]).name;
				infos.id = ((ret.results)[4]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[3]).name;
				infos.id = ((ret.results)[3]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[7]).name;
				infos.id = ((ret.results)[7]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[15]).name;
				infos.id = ((ret.results)[15]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[5]).name;
				infos.id = ((ret.results)[5]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[6]).name;
				infos.id = ((ret.results)[6]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[18]).name;
				infos.id = ((ret.results)[18]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[2]).name;
				infos.id = ((ret.results)[2]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[10]).name;
				infos.id = ((ret.results)[10]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[8]).name;
				infos.id = ((ret.results)[8]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[11]).name;
				infos.id = ((ret.results)[11]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[12]).name;
				infos.id = ((ret.results)[12]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[13]).name;
				infos.id = ((ret.results)[13]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[16]).name;
				infos.id = ((ret.results)[16]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[19]).name;
				infos.id = ((ret.results)[19]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[17]).name;
				infos.id = ((ret.results)[17]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				all_infos.nameset = data;
				callback(null, all_infos);
			}
			

		}
		  	
	});
}

var findRoleTypes = function(name, page, callback){
	var data = [];
	var info = {};
	var infos = {};
	var all_infos = {};
	if (name=="null" ) name='';
	var pattern = new RegExp(name, 'i');
	RoleTag.paginate({
		page: page,
		perPage: 5,
		maxPages: 10
	 })
	.where('name', pattern)
	.select('name')	
	.sort('_id',1)
	.exec( function(err, ret){
		if(err){
			callback(err, null);
		}else{
			if (ret.results.length==0){
				callback(null, null);
			}else{
				//author@zheng 将人员需求按一定的顺序进行排序
				infos.name = ((ret.results)[0]).name;
				infos.id = ((ret.results)[0]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[1]).name;
				infos.id = ((ret.results)[1]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));
                
                infos.name = ((ret.results)[2]).name;
				infos.id = ((ret.results)[2]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[3]).name;
				infos.id = ((ret.results)[3]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[4]).name;
				infos.id = ((ret.results)[4]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

			
				all_infos.nameset = data;
				callback(null, all_infos);
			}
			

		}
		  	
	});
}

var findSkillTypes = function(name, page, callback){
	var data = [];
	var info = {};
	var infos = {};
	var all_infos = {};
	if (name=="null" ) name='';
	var pattern = new RegExp(name, 'i');
	SkillTag.paginate({
		page: page,
		perPage: 21,
		maxPages: 10
	 })
	.where('name', pattern)
	.select('name')	
	.sort('_id',1)
	.exec( function(err, ret){
		if(err){
			callback(err, null);
		}else{
			if (ret.results.length==0){
				callback(null, null);
			}else{
				//author@zheng 将人员需求按一定的顺序进行排序
				infos.name = ((ret.results)[0]).name;
				infos.id = ((ret.results)[0]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[1]).name;
				infos.id = ((ret.results)[1]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));
                
                infos.name = ((ret.results)[2]).name;
				infos.id = ((ret.results)[2]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[3]).name;
				infos.id = ((ret.results)[3]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[4]).name;
				infos.id = ((ret.results)[4]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[5]).name;
				infos.id = ((ret.results)[5]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[6]).name;
				infos.id = ((ret.results)[6]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[7]).name;
				infos.id = ((ret.results)[7]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));
				

				infos.name = ((ret.results)[8]).name;
				infos.id = ((ret.results)[8]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[9]).name;
				infos.id = ((ret.results)[9]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[10]).name;
				infos.id = ((ret.results)[10]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[11]).name;
				infos.id = ((ret.results)[11]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[12]).name;
				infos.id = ((ret.results)[12]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[13]).name;
				infos.id = ((ret.results)[13]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				all_infos.nameset = data;
				callback(null, all_infos);
			}
			

		}
		  	
	});
}


var findFeatureTypes = function(name, page, callback){
	var data = [];
	var info = {};
	var infos = {};
	var all_infos = {};
	if (name=="null" ) name='';
	var pattern = new RegExp(name, 'i');
	FeatureTag.paginate({
		page: page,
		perPage: 26,
		maxPages: 10
	 })
	.where('name', pattern)
	.select('name')	
	.sort('_id',1)
	.exec( function(err, ret){
		if(err){
			callback(err, null);
		}else{
			if (ret.results.length==0){
				callback(null, null);
			}else{

				infos.name = ((ret.results)[0]).name;
				infos.id = ((ret.results)[0]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[2]).name;
				infos.id = ((ret.results)[2]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[3]).name;
				infos.id = ((ret.results)[3]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[4]).name;
				infos.id = ((ret.results)[4]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

                infos.name = ((ret.results)[5]).name;
				infos.id = ((ret.results)[5]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[6]).name;
				infos.id = ((ret.results)[6]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[7]).name;
				infos.id = ((ret.results)[7]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[8]).name;
				infos.id = ((ret.results)[8]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[9]).name;
				infos.id = ((ret.results)[9]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[10]).name;
				infos.id = ((ret.results)[10]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[11]).name;
				infos.id = ((ret.results)[11]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[12]).name;
				infos.id = ((ret.results)[12]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[13]).name;
				infos.id = ((ret.results)[13]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[14]).name;
				infos.id = ((ret.results)[14]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[15]).name;
				infos.id = ((ret.results)[15]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[16]).name;
				infos.id = ((ret.results)[16]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[17]).name;
				infos.id = ((ret.results)[17]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[18]).name;
				infos.id = ((ret.results)[18]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[19]).name;
				infos.id = ((ret.results)[19]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				infos.name = ((ret.results)[20]).name;
				infos.id = ((ret.results)[20]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));
                

                infos.name = ((ret.results)[21]).name;
				infos.id = ((ret.results)[21]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

                infos.name = ((ret.results)[22]).name;
				infos.id = ((ret.results)[22]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

                infos.name = ((ret.results)[23]).name;
				infos.id = ((ret.results)[23]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[24]).name;
				infos.id = ((ret.results)[24]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

                infos.name = ((ret.results)[25]).name;
				infos.id = ((ret.results)[25]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));

				infos.name = ((ret.results)[1]).name;
				infos.id = ((ret.results)[1]).id;
				info = JSON.stringify(infos);	
				data.push(JSON.parse(info));


				all_infos.nameset = data;
				callback(null, all_infos);
			}
			

		}
		  	
	});
}


var findProductionCategories = function(name, page, callback){
	if (name=="null" ) name='';

	var pattern = new RegExp(name, 'i');
	Category.paginate({
		page: page,
		perPage: 20,
		maxPages: 10
	 })
	.where('name', pattern)
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

var findProductionCrewsNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	ProductionCrews.paginate({
		page: 1,
		perPage: 20,
		maxPages: 10
	 })
	.where('name', pattern)
	.where('isRegistered','true')
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


var findLocationNames = function(name, level, countperpage, pagenum, callback){
	var pattern = new RegExp(name, 'i');
	Areainfo.paginate({
		page: pagenum,
		perPage: countperpage,
		maxPages: 10
	 })
	.where('name', pattern)
	.where('level').equals(level)
	.sort('+name')
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

//auther@cincan     search for LocationFullnames 
var findLocationFullnames = function(callback){
	Areainfo.model.find()
	.where('level', '100')
	.sort('areacode')
	.exec( function(err, ret){
				if(err){
					return callback(err, ret);	
				}else{
					return callback(null, ret);	
				}
	});
}
//auther@cincan 搜寻该省份下所有的市
var searchCityUnderProvince = function( parencode , callback){
	Areainfo.model.find()
	.where('level', '010')
	.sort('areacode')
	.where('parencode',parencode)
	//.select('name')	
	.exec( function(err, ret){		
				if(err){
					return callback(err, ret);	
				}else{
					return callback(null, ret);	
				}
		
	});
}

//auther@cincan 搜寻该市下面所有的县和区
var searchDistrictUnderCity = function( parencode , callback){
	Areainfo.model.find()
	.where('level', '001')
	.sort('areacode')
	.where('parencode',parencode)
	.exec( function(err, ret){
		
				if(err){
					return callback(err, ret);	
				}else{
					return callback(null, ret);	
				}
		
	});
}






var findProductionIssuers = function(name, callback){
	var pattern = new RegExp(name, 'i');
	Issuer.paginate({
		page: 1,
		perPage: 10,
		maxPages: 10
	 })
	.where('name', pattern)
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


var findProductionCompanies = function(name, callback){
	var pattern = new RegExp(name, 'i');
	ProductionCompany.paginate({
		page: 1,
		perPage: 10,
		maxPages: 10
	 })
	.where('name', pattern)
	.sort("-createdAt") //author@zheng
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



var findPositions = function(productiontype_id, rolecategory_id, area_id, isregistered, currentPage, name, time, callback){
	

	console.log('rolecategory_id:'+rolecategory_id);

	// var pattern = new RegExp(name, 'i');
	var positions ={};
	if(isregistered == '' || isregistered ==null || isregistered == 'null'){
		CareerInCrew.paginate({
			page: currentPage,
			perPage: 1000,
			maxPages: 50
		 })
		.select('_id crews_object role men_count requirement_tags candidates address expired_date createdBy is_effective publish_create isRegistered openid')
		.populate('crews_object role requirement_tags address createdBy')
		//.where('isRegistered', isregistered)
		.where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
		.where({'createdAt':{$lt:time}})
		.where('publish_create',true)
		.where('is_effective',true)
		//.sort("expired_date",1)	//@zheng ½«Ê±¼ä°´ÕÕÉýÐòÅÅÐò£¨ÔÝ¶¨£©
		.sort("-createdAt")	//@zheng °´ÕÕ·¢²¼Ê±¼ä½µÐòÅÅÐò
		.exec( function(err, pagenateObject){//formatProductionNames
			console.log('starting................................................................');
			console.log(pagenateObject);
			positions.total= pagenateObject.total;
			positions.currentPage = pagenateObject.currentPage;
			positions.totalPages = pagenateObject.totalPages;
			format.formatPositionObjects(pagenateObject.results, productiontype_id, rolecategory_id, area_id, currentPage, name, function(err, positionset){
				if(err){
					return callback(err, null);	
				}else{
					positions.results = positionset;
				
					return callback(null, positions);	
				}
			});    	
		});
	}else{
		CareerInCrew.paginate({
			page: currentPage,
			perPage: 5,
			maxPages: 50
		 })
		.select('_id crews_object role men_count requirement_tags candidates address expired_date createdBy is_effective publish_create isRegistered openid')
		.populate('crews_object role requirement_tags address createdBy')
		.where('isRegistered', isregistered)
		.where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
		.where({'createdAt':{$lt:time}})
		.where('publish_create',true)
		.where('is_effective',true)
		//.sort("expired_date",1)	//@zheng ½«Ê±¼ä°´ÕÕÉýÐòÅÅÐò£¨ÔÝ¶¨£©
		.sort("-createdAt")	//@zheng °´ÕÕ·¢²¼Ê±¼ä½µÐòÅÅÐò
		.exec( function(err, pagenateObject){//formatProductionNames
			console.log('starting................................................................'+pagenateObject);
			positions.total= pagenateObject.total;
			positions.currentPage = pagenateObject.currentPage;
			positions.totalPages = pagenateObject.totalPages;
			format.formatPositionObjects(pagenateObject.results, productiontype_id, rolecategory_id, area_id, currentPage, name, function(err, positionset){
				if(err){
					return callback(err, null);	
				}else{
					positions.results = positionset;
				
					return callback(null, positions);	
				}
			});    	
		});

	}

}
//副导演新版---通告列表---剧组列表
var findProductionCrews=function(appid,openid,currentPage,time,callback){
	var crews=[];
	var data={}; 
	console.log(appid);
	console.log(openid);
	console.log(currentPage);
	console.log(time);
	async.waterfall([
	 //  function (callback){
		// search.getAppidInfoByOpenid(openid, function (err, ret){//通过openid获取appid的方法
		// 	if(err){
		// 		throw new Error (err);
		// 	}else{
		// 		if(ret == null){
		// 			throw new Error ('production model 的数据有误！');
		// 		}else{
		// 			appid_info = ret; 
		// 			callback(null);
		// 		}
		// 	}
		// });
	 //  },
      function (callback){
    	/*第一步是判断用户是来自总的公众号还是分的号，然后做不同的分页处理并返回不同的结果集*/
		// if(appid == 'wx1beb5bae19621613'){
		// 	Production.paginate({
		// 		page: currentPage,
		// 		perPage: 5,
		// 		maxPages: 100
		// 	})
		// 	.where('isCreated',true)
		// 	.where('isPost',true)
		// 	.where('isDelete',false)
		// 	.populate('production_crews category location')
		// 	.sort("-createdAt")
		// 	.exec(function(err,ret){
		// 		if(err){
		// 			throw new Error(err);
		// 		}else{
		// 			callback(null, ret);
		// 		}
		// 	});
		// }else{
			Production.paginate({
				page: currentPage,
				perPage: 5,
				maxPages: 100
			})
			.where('isCreated',true)
			.where('isPost',true)
			.where('isDelete',false)
			.where('appid',appid)
			.populate('production_crews category location')
			.sort("-createdAt")
			.exec(function(err,ret){
				if(err){
					throw new Error(err);
				}else{
					format.formatproductionDetails(ret,function(err,array){
                       if(err){
                          throw new Error(err);
                       }else{
                       	  PublicAccount.model.findOne()
			       	      .where('appid',appid)
			       	      .exec(function(err,ret1){
			                if(err){
			                   throw new Error(err);
			                }else{
			                	console.log('====================ret1======================');
			                	console.log(ret1);
			                	console.log(ret1.ticket);
			                	console.log(encodeURI(ret1.ticket));
			                	console.log('====================ret1======================');
			                	array.nick_name = ret1.nick_name;
			                	array.head_img = ret1.head_img;
			                	//array.QRcodeUrl = ret1.qrcode_url;
			                	var url = 'http://mp.weixin.qq.com/cgi-bin/showqrcode?ticket='+encodeURI(ret1.ticket);//二维码链接
			                	array.QRcodeUrl = url;
			                	callback(null,array);
			                }
			       	      })
                       	  
                       }
					});
				}
			});
		//}
    	}
    ],function(err,arg){
        if(err){
           throw new Error(err);
        }else{
        	callback(null,arg);
        }
    });
}

//副导演--通告列表--过滤--查询所有剧组信息
var findmatchCrews=function(categoryid, repertoiretypeid, isregistered, currentPage, time, appid, callback){
	var appid_info = {};//用来封装获取到的appid信息
	var crews=[];
	console.log('-------------ceshi11111------------');
    console.log(appid);
    console.log(categoryid);
    console.log(repertoiretypeid);
	console.log('-------------ceshi111111------------');
    async.waterfall([
   //  	function (callback){
   //  		search.getAppidInfoByOpenid(openid, function (err, ret){//通过openid获取appid的方法
			// 	if(err){
			// 		throw new Error (err);
			// 	}else{
			// 		if(ret == null){
			// 			throw new Error ('production model 的数据有误！');
			// 		}else{
			// 			appid_info = ret; 
			// 			callback(null);
			// 		}
			// 	}
			// });
   //  	},
    	function (callback){
    		/*第一步是判断用户是来自总的公众号还是分的号，然后做不同的分页处理并返回不同的结果集*/
    // 		if(appid_info.appid == 'wx1beb5bae19621613'){
    // 		  if(isregistered == '' || isregistered ==null || isregistered == 'null'){
	   //  		  	Production.model.find()
				// 	.where('isCreated',true)
				// 	.where('isPost',true)
				// 	.where('isDelete',false)
				// 	.populate('production_crews category location')
				// 	.sort("-createdAt")
				// 	.exec(function(err,ret){
				// 		if(err){
				// 			throw new Error(err);
				// 		}else{
				// 			callback(null, ret);
				// 		}
				// 	});
				// }else{
				// 	Production.model.find()
				// 	.where('isCreated',true)
				// 	.where('isPost',true)
				// 	.where('isDelete',false)
				// 	.where('isRegistered',isregistered)
				// 	.populate('production_crews category location')
				// 	.sort("-createdAt")
				// 	.exec(function(err,ret){
				// 		if(err){
				// 			throw new Error(err);
				// 		}else{
				// 			callback(null, ret);
				// 		}
				// 	});
				// }
    			
    // 		}else{
    		  if(isregistered == '' || isregistered ==null || isregistered == 'null'){
	    		   Production.model.find()
					.where('isCreated',true)
					.where('isPost',true)
					.where('isDelete',false)
					.where('appid', appid)
					.populate('production_crews category location')
					.sort("-createdAt")
					.exec(function(err,ret){
						if(err){
							throw new Error(err);
						}else{
							console.log('-------------ceshi------------');
                            console.log(ret);
							console.log('-------------ceshi------------');
                            callback(null, ret);
							
						}
					});
			  }else{
			  	  Production.model.find()
					.where('isCreated',true)
					.where('isPost',true)
					.where('isDelete',false)
					.where('isRegistered',isregistered)
					.where('appid', appid)
					.populate('production_crews category location')
					.sort("-createdAt")
					.exec(function(err,ret){
						if(err){
							throw new Error(err);
						}else{
							console.log('-------------ceshi1------------');
                            console.log(ret);
							console.log('-------------ceshi1------------');
							callback(null, ret);
						}
					});
			  }
    		//}
    	},function(arg,callback){
    		console.log('----------arg----------');
    		console.log(arg);
    		console.log('----------arg----------');
    		if(arg.length==0){
               callback(null);
    		}else{
	    	  async.eachSeries(arg,function(item,next){
	    	  	var data={};
	    	  	console.log('----------item----------');
    		    console.log(item);
    		    console.log('----------item----------');
	            format.formatcategorytags(item._id,function(err,ret){
	              if(err){
	                 throw new Error(err);
	              }else{
	              	if(ret==null){
                       next();
	              	}else{
	                    data._id = item._id;
	                    data.name = item.name;
	                    data.production_companys = item.production_companys;
	                    data.issuer_companies = item.issuer_companies;
	                    data.investmentAmount = item.investmentAmount;
	                    data.duration = item.duration;
	                    data.appid = item.appid;
	                    data.createdBy = item.createdBy;
	                    data.actorBudget = item.actorBudget;
	                    data.expired_date = item.expired_date;
	                    data.images = item.images;
	                    data.isRegistered = item.isRegistered;
	                    data.production_crews = item.production_crews;
	                    data.location = item.location;
		              	data.categoryName = ret.categoryName;
		              	data.categoryid = ret.categoryid;
		              	data.repertoireTpyeArray = ret.repertoireTpyeArray;
		              	//data.repertoireTpyeArray=ret;
		              	console.log('---------------2-----------------');
	                    console.log(data);
		              	console.log('---------------2-----------------');
		              	crews.push(data);
		                next();
		            }
	              }
	           });

	    	  },function(err){
	              if(err){
	                throw new Error(err);
	              }else{
	              	callback(null);
	              }
	           });
	    	}
           
    	},function(callback){
    		if(crews.length==0){
               callback(null,[]);
    		}else{
	           format.formatmatchPosition(crews,categoryid, repertoiretypeid,function(err,ret){
	              if(err){
	                throw new Error(err);
	              }else{
	              	callback(null,ret);
	              }
	           });
           }
    	}
    ], function (err, arg){
       if(err){
          throw new Error(err);
       }else{
       	  return callback(null,arg);
       }
    });


}
///副导演--之前旧的：通告列表--查询通告列表以及过滤通告
var findCrews=function(productiontype_id, rolecategory_id, area_id, isregistered, currentPage, name, time, openid, callback){
	var appid_info = {};//用来封装获取到的appid信息
	var crews=[];
	var data={};
    async.waterfall([
    	function (callback){
    		search.getAppidInfoByOpenid(openid, function (err, ret){//通过openid获取appid的方法
				if(err){
					throw new Error (err);
				}else{
					if(ret == null){
						throw new Error ('production model 的数据有误！');
					}else{
						appid_info = ret; 
						callback(null);
					}
				}
			});
    	},
    	function (callback){
    		/*第一步是判断用户是来自总的公众号还是分的号，然后做不同的分页处理并返回不同的结果集*/
    		if(appid_info.appid == 'wx1beb5bae19621613'){
    			Production.paginate({
					page: currentPage,
					perPage: 5,
					maxPages: 100
				})
				.where('isCreated',true)
				.populate('production_crews category location')
				.sort("-createdAt")
				.exec(function(err,ret){
					if(err){
						throw new Error(err);
					}else{
						callback(null, ret);
					}
				});
    		}else{
    			Production.paginate({
					page: currentPage,
					perPage: 5,
					maxPages: 100
				})
				.where('isCreated',true)
				.where('appid', appid_info.appid)
				.populate('production_crews category location')
				.sort("-createdAt")
				.exec(function(err,ret){
					if(err){
						throw new Error(err);
					}else{
						callback(null, ret);
					}
				});
    		}
    	}
    ], function (err, ret){
    	console.log('-------------------step1-----------------');
        console.log(ret);
        console.log('-------------------step1-----------------');
        data.total = ret.total;
    	data.currentPage = ret.currentPage;
    	data.totalPages = ret.totalPages;
    	data.pages = ret.pages;
    	data.first = ret.first;
    	data.last = ret.last;
        if(isregistered == '' || isregistered ==null || isregistered == 'null'){
        	async.eachSeries(ret.results,function(item,next){
        		var crewsInfo={};
          	  	console.log('-------------------step2-----------------');
			  	console.log(item);
			  	console.log('-------------------step2-----------------');
			  	if(item.production_crews.length!=0){
			  	   CareerInCrew.model.find()
	               .where('crews_object',item.production_crews[0]._id)
	               .where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
				   .where({'createdAt':{$lt:time}})
				   .where('publish_create',true)
				   .where('is_effective',true)
				   .populate('crews_object role requirement_tags address createdBy')
				   .exec(function(err,ret1){
				   		if(err){
		                   throw new Error(err);
		                }else{   
		                 	console.log('-------------------step3-----------------');
							console.log(ret1);
							console.log('-------------------step3-----------------');
	                        format.formatPositionObjects(ret1, productiontype_id, rolecategory_id, area_id, currentPage, name, function(err, positionset){
								if(err){
									return callback(err, null);	
								}else{
									console.log('-------------------step4-----------------');
									console.log(positionset);
									console.log('-------------------step4-----------------');
									if(positionset.length>0){
										console.log('zoule');
										crewsInfo.name=item.name;
										crewsInfo.investmentAmount=item.investmentAmount;
										crewsInfo.duration=item.duration;
										crewsInfo.production_companys=item.production_companys;
										crewsInfo.issuer_companies=item.issuer_companies;
										crewsInfo.publishDate=item.publishDate;
										crewsInfo.isCreated=item.isCreated;
										crewsInfo.isOfficial=item.isOfficial;
										crewsInfo.introduction=item.introduction;
										crewsInfo.category_id=item.category[0]._id;
										crewsInfo.category=item.category[0].name;
										crewsInfo.production_crewId=item.production_crews[0]._id;
										crewsInfo.location=item.location[0].fullname;
										crewsInfo.openid = positionset[0].openid; //author@zheng
										(item.images.length>0) ? (crewsInfo.production_image = config.homeEntry.url+'/WX/poster/production/' + item._id+'/'+(item.images)[item.images.length-1].originalname) : (crewsInfo.production_image="") ;
				                        (item.compress_images.length>0) ? (crewsInfo.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + item._id+'/'+(item.compress_images)[item.compress_images.length-1].originalname) : (crewsInfo.compress_production_image="") ;
				                        crews.push(crewsInfo);
									    next();
										
									}else{
										next();
									}
								}
							});    	
		                }
				   });
			  	}else{
	              	next();
	            }
        	},  function (err){
                    if(err){
                      	throw new Error(err);
                  	}else{
	                   	data.results = crews;
	                   	console.log('-------------------step5-----------------');
						console.log(data);
						console.log('-------------------step5-----------------');
	                   	return callback(null, data);	
                   	}
	        	}
	        );
        }else{
        	async.eachSeries(ret.results,function(item,next){
        		var crewsInfo={};
          	  	console.log('-------------------step2-1-----------------');
			  	console.log(item);
				console.log('-------------------step2-1-----------------');
				if(item.production_crews.length!=0){
	              	CareerInCrew.model.find()
	               .where('crews_object',item.production_crews[0]._id)
	               .where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
				   //.where({'createdAt':{$lt:time}})
				   .where('publish_create',true)
				   .where('is_effective',true)
				   .where('isRegistered', isregistered)
				   .populate('crews_object role requirement_tags address createdBy')
	               .exec(function(err,ret1){
	                    if(err){
	                   		throw new Error(err);
	                 	}else{   
		                 	console.log('-------------------step3-1-----------------');
							console.log(ret1);
							console.log('-------------------step3-1-----------------');
	                        format.formatPositionObjects(ret1, productiontype_id, rolecategory_id, area_id, currentPage, name, function(err, positionset){
								if(err){
									return callback(err, null);	
								}else{
									console.log('-------------------step4-1-----------------');
									console.log(positionset);
									console.log('-------------------step4-1-----------------');
									if(positionset.length>0){
										console.log('zoule');
										crewsInfo.name=item.name;
										crewsInfo.investmentAmount=item.investmentAmount;
										crewsInfo.duration=item.duration;
										crewsInfo.production_companys=item.production_companys;
										crewsInfo.issuer_companies=item.issuer_companies;
										crewsInfo.publishDate=item.publishDate;
										crewsInfo.isCreated=item.isCreated;
										crewsInfo.isOfficial=item.isOfficial;
										crewsInfo.introduction=item.introduction;
										crewsInfo.category_id=item.category[0]._id;
										crewsInfo.category=item.category[0].name;
										crewsInfo.production_crewId=item.production_crews[0]._id;
										crewsInfo.location=item.location[0].fullname;
										(item.images.length>0) ? (crewsInfo.production_image = config.homeEntry.url+'/WX/poster/production/' + item._id+'/'+(item.images)[item.images.length-1].originalname) : (crewsInfo.production_image="") ;
				                        (item.compress_images.length>0) ? (crewsInfo.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + item._id+'/'+(item.compress_images)[item.compress_images.length-1].originalname) : (crewsInfo.compress_production_image="") ;
				                        crews.push(crewsInfo);
									    next();
										
									}else{
										next();
									}
								}
							});    	
	                    }
	                });
              	}else{
              	 	next();
              	}
        	},  function(err){
                   if(err){
                     	throw new Error(err);
                   	}else{
	                   	data.results = crews;
	                   	console.log('-------------------step5-1-----------------');
						console.log(data);
						console.log('-------------------step5-1-----------------');
	                   	return callback(null, data);	
                   }
	          	}
	        );
        }




    });


}

//经纪人—————查询匹配出来的职位信息
 var findMatchProduction = function(proArray,callback){
 	var crews=[];
	var data={};
   async.eachSeries(proArray,function(item,next){
		var crewsInfo={};
		console.log('-------------------step2-----------------');
	  	console.log(item);
	  	console.log('-------------------step2-----------------');
	  	if(item.production_crews.length!=0){
	  	  CareerInCrew.model.find()
	       .where('crews_object',item.production_crews[0]._id)
	       .where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
		   .where({'createdAt':{$lt:time}})
		   .where('publish_create',true)
		   .where('is_effective',true)
		   .populate('crews_object role requirement_tags address createdBy')
		   .exec(function(err,ret1){
		   		if(err){
	               throw new Error(err);
	            }else{   
	             	console.log('-------------------step3-----------------');
					console.log(ret1);
					console.log('-------------------step3-----------------');
	     //            format.MatchPositionObjects(ret1, function(err, positionset){
						// if(err){
						// 	return callback(err, null);	
						// }else{
							if(positionset.length>0){
								console.log('zoule');
								crewsInfo.name=item.name;
								crewsInfo.production_id=item._id;
								crewsInfo.investmentAmount=item.investmentAmount;
								crewsInfo.duration=item.duration;
								crewsInfo.production_companys=item.production_companys;
								crewsInfo.issuer_companies=item.issuer_companies;
								crewsInfo.publishDate=item.publishDate;
								crewsInfo.isCreated=item.isCreated;
								crewsInfo.isOfficial=item.isOfficial;
								crewsInfo.introduction=item.introduction;
								crewsInfo.category_id=item.category[0]._id;
								crewsInfo.category=item.category[0].name;
								crewsInfo.production_crewId=item.production_crews[0]._id;
								crewsInfo.location=item.location[0].fullname;
								crewsInfo.openid = positionset[0].openid; 

                                crewsInfo.actorBudget=item.actorBudget;
								crewsInfo.starring_ratio=item.starring_ratio;
								crewsInfo.starring_team_ratio=item.starring_team_ratio;
								crewsInfo.guestplayer_ratio=item.guestplayer_ratio;
								crewsInfo.otherRole_ratio=item.otherRole_ratio;
								(item.images.length>0) ? (crewsInfo.production_image = config.homeEntry.url+'/WX/poster/production/' + item._id+'/'+(item.images)[item.images.length-1].originalname) : (crewsInfo.production_image="") ;
                                (item.compress_images.length>0) ? (crewsInfo.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' + item._id+'/'+(item.compress_images)[item.compress_images.length-1].originalname) : (crewsInfo.compress_production_image="") ;
								crewsInfo.role_id = ret1.role.id;
								crewsInfo.role_name = ret1.role.name;
								crewsInfo.role_category_id = ret1.role.roleCategory;
								crewsInfo.roleTag_id = ret1.role.roleTag;
								crewsInfo.featureTag_id = ret1.role.featureTag;
								crewsInfo.skillTag_id = ret1.role.skillTag;
								crewsInfo.shape = ret1.role.shape;
																								
								crewsInfo.crews_id = ret1.crews_object._id;
								crewsInfo.crews_name = ret1.crews_object.name;
								crewsInfo.crews_production_id = ret1.crews_object.production;
								crewsInfo.men_count = ret1.men_count;
								crewsInfo.expired_date = ret1._.expired_date.format('YYYY-MM-DD');
								crewsInfo.remaining_days = Math.floor( (item.expired_date.getTime() - now_date.getTime())/3600000/24 );
								crewsInfo.address_id = (ret1.address[0]!=null) ? ret1.address[0]._id : null;
								crewsInfo.address_name = (ret1.address[0]!=null) ? ret1.address[0].name : null;
								crewsInfo.address_area_id = (ret1.address[0]!=null) ? ret1.address[0].area : null;  //address_area²»ÔÊÐíÎªmultiple£¬µ«Òò¸Ã¶ÔÏóÊÇÒÔÊý×éÐÎÊ½´æµÄ£¬Òò´ËÒÔÊý×éÀ´¶Ô´ý
								crewsInfo.candidates = ret1.candidates;
								crewsInfo.author_id = ret1.createdBy._id;
								crewsInfo.author_name = ret1.createdBy.name;
								crewsInfo.is_effective = ret1.is_effective;
								crewsInfo.isRegistered = ret1.isRegistered;
								crewsInfo.openid = ret1.openid;
								crewsInfo.age = ret1.age;
								crewsInfo.gender = ret1.gender;

		                        crews.push(crewsInfo);
							    next();
								
							}else{
								next();
							}
					//	}
					//});    	
	            }
		   });
	  	}else{
	      	next();
	    }
	},  function (err){
	        if(err){
	          	throw new Error(err);
	      	}else{
	   //         	data.results = crews;
	   //         	console.log('-------------------step5-----------------');
				// console.log(data);
				// console.log('-------------------step5-----------------');
	           	return callback(null, crews);	
	       	}
		}
	);
 }


var findAddressNames = function(name, callback){
	var pattern = new RegExp(name, 'i');
	Address.paginate({
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
//副导演--根据职位/剧名查询通告
var fuzzyquerry = function(index, name, page, callback){
	if (name=="null" ) name='';
	var pattern = new RegExp(name, 'i');
	//ÅÐ¶ÏindexµÄÖµ 0È«ÎÄ²éÕÒ 1ÏîÄ¿ËÑË÷ 2Ö°Î»ËÑË÷
	if(index == '0'){
		console.log('未选中搜索条件...');

	}else if(index == '1'){
		console.log('按项目进行搜索...');
		var data = {};
		var infos = {};
		var results= [];
		ProductionCrews.paginate({
			page: page,
			perPage: 100,
			maxPages: 10000
		 })
		.where('name',pattern)
		.populate('production')
		.exec(function(err, ret){
			if(err){
				callback(err,null);
			}else{            
				async.eachSeries(ret.results, function(production_crews, next){
					Category.model.find()
					 .where('_id',production_crews.production.category[0])
					 .exec(function(err,category_info){
					 	Production.model.findOne()
					 	.where('_id',production_crews.production._id)
					 	.populate('location')
					 	.exec(function(err,pro){
					 	   CareerInCrew.model.findOne()
					 	    .where('crews_object',production_crews._id)
					 	    .exec(function(err,career){
								data.production_id = production_crews.production._id;															
								data.crews_id = production_crews._id;
								data.category = category_info[0].name;
								data.investmentAmount = production_crews.production.investmentAmount;
								data.duration = production_crews.production.duration;
								data.production_companys = production_crews.production.production_companys;
								data.issuer_companies = production_crews.production.issuer_companies;
								data.publishDate = production_crews.production.publishDate;
								data.appid = production_crews.production.appid;
								data.location = pro.location[0].name;
								data.openid=career.openid;
								(production_crews.production.images.length>0) ? (data.production_imagesURL = config.homeEntry.url+'/WX/poster/production/' +  production_crews.production.images[production_crews.production.images.length-1].filename) : (data.production_imagesURL="") ;
								(production_crews.production.compress_images.length>0) ? (data.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' +  production_crews.production.compress_images[production_crews.production.compress_images.length-1].filename) : (data.compress_production_image="") ;
								data.projectname = production_crews.name;
								infos = JSON.stringify(data);	
								results.push(JSON.parse(infos));
								next();
							 })
						})	
					})														
				},function(err){
					if(err) throw new Error('find production_crews error!');
					 callback(null, results);
				});

					
			}
		});
	}else if(index == '2'){
		console.log('按角色进行搜索...');
		
		var results =[];
		var crewResults =[];
		var infos = {};
		Role.paginate({
			page: page,
			perPage: 100,
			maxPages: 10000
		})
		.where('name', pattern)
		.populate('roleCategory category')
		.exec(function(err, role_info){
			if(err){
				throw new Error('find role information failed');
			}

			console.log('kkkkkkkkkkkkkkk');
			console.log(role_info.results);
			async.eachSeries(role_info.results, function(role_reuslt, next){
				var data ={};
				async.waterfall([
					function(callback){
						//ÌáÈ¡½ÇÉ«Ãû ½ÇÉ«id ½ÇÉ«ÀàÐÍ ½ÇÉ«ÀàÐÍµÄid
						var careerincrewResult=[];
						console.log('1-1');
						CareerInCrew.model.find()
						.where('role', role_reuslt._id)
						.where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
						.populate('crews_object')
						.sort("-createdAt")		//@zheng °´ÕÕ·¢²¼Ê±¼ä½µÐòÅÅÐò
						.exec(function(err, careerincrew_info){
							if(err) throw new Error('find careerincrew_info error');
							console.log('fffffffffffffffffffffff');
							console.log(careerincrew_info);
							console.log(careerincrew_info.length >0);
							if(careerincrew_info.length >0){
									console.log('1-2');
									callback(null, careerincrew_info, role_reuslt._id, role_reuslt.name, role_reuslt.roleCategory._id, role_reuslt.roleCategory.name);								
							}else{
								console.log('走了吗');
								callback(null, careerincrew_info, role_reuslt._id, role_reuslt.name, role_reuslt.roleCategory._id, role_reuslt.roleCategory.name);
							}	
						});
					},
					function(arg, arg1, arg2, arg3, arg4, callback){
						console.log(arg);

						if(arg.length >0){
							console.log('2-1');
							async.eachSeries(arg, function(careerincrew_result, next){
								//ÌáÈ¡¾ç×éid ¼û×éµØÖ·id ÓÃ»§id ·¢²¼Ê±¼ä ÕÐÄ¼ÊýÁ¿
								console.log('2-2');
								User.model.find()
								.where('_id', careerincrew_result.createdBy)
								.exec(function(err, user_info){
									if(err) throw new Error('find user_info error');
									if(user_info.length > 0){
										console.log('2-3');
										async.eachSeries(user_info, function(user_reult, next){	
											Address.model.find()
											.where('_id', careerincrew_result.address)
											.populate('area')
											.exec(function(err, address_info){
												if(err) throw new Error('find address_info error');
												if(address_info.length > 0){
													async.eachSeries(address_info, function(address_result, next){
														console.log('2-4');
														console.log(address_result);
														ProductionCrews.model.find()
														.where('_id', careerincrew_result.crews_object)
														.populate('production')
														.exec(function(err, production_crews_info){
															if(err) throw new Error('find production_crews_info error');
															if(production_crews_info.length > 0){
																async.eachSeries(production_crews_info, function(production_crews_result, next){
																	console.log('----------------production_crews_result----------------');
																	console.log(production_crews_result.production.images);
																	console.log('------------------production_crews_result--------------');

																	Category.model.findOne()
																	.where('_id',production_crews_result.production.category[0])
																	.exec(function(err,category){
																		Production.model.findOne()
																		 .where('_id',production_crews_result.production._id)
																		 .populate('location')
																		 .exec(function(err,pro){
																			// console.log('2-5');
																			// console.log('role_id:'+arg1);
																			// console.log('rolename:'+arg2);
																			// console.log('rolesCategory_id:'+arg3);
																			// console.log('roleCategory:'+arg4);
																			// data.role_id = arg1;
																			// data.rolename = arg2;
																			// data.rolesCategory_id = arg3;
																			// data.roleCategory = arg4;
																			// console.log('crews_id:'+careerincrew_result.crews_object);
																			// console.log('address_id:'+careerincrew_result.address);
																			// console.log('user_id:'+careerincrew_result.createdBy);
																			// console.log('date:'+careerincrew_result._.createdAt.format('YYYY-MM-DD'));
																			// console.log('men_count:'+careerincrew_result.men_count);
																			data.crews_id = careerincrew_result.crews_object._id;
																			//data.careerincrew_id = careerincrew_result._id;
																			//data.candidates = careerincrew_result.candidates;
																			data.is_effective = careerincrew_result.is_effective;
																			//data.address_id = careerincrew_result.address;
																			//data.user_id = careerincrew_result.createdBy;
																			//data.date = careerincrew_result._.createdAt.format('YYYY-MM-DD');
																			//data.expired_date = careerincrew_result.expired_date.toLocaleDateString();
																			data.category = category.name;
																			//data.men_count = careerincrew_result.men_count;
																			data.openid = careerincrew_result.openid;
																			console.log('username:'+user_reult.name);
																			//data.username = user_reult.name;
																			data.production_companys =production_crews_result.production.production_companys;
																			data.issuer_companies = production_crews_result.production.issuer_companies;
																			data.investmentAmount = production_crews_result.production.investmentAmount;
																			data.duration = production_crews_result.production.duration;
																			data.publishDate = production_crews_result.production.publishDate;
																			data.appid = production_crews_result.production.appid;
																			data.location = pro.location[0].name;
																			data.openid=careerincrew_result.openid;
																			//iconURL
																			//(user_reult.images.length>0) ? (data.user_iconURL = config.homeEntry.url+ 'users/' + user_reult.images[user_reult.images.length-1].filename) : (data.user_iconURL="") ;
																			//productionimagesURL
																			//(production_crews_result.production.images.length>0) ? (data.production_imagesURL = config.homeEntry.url+ 'production/' + production_crews_result.production.images[production_crews_result.production.images.length-1].filename) : (data.production_imagesURL="") ;
																			(production_crews_result.production.images.length>0) ? (data.production_imagesURL = config.homeEntry.url+'/WX/poster/production/' +  production_crews_result.production.images[production_crews_result.production.images.length-1].filename) : (data.production_imagesURL="") ;
																			(production_crews_result.production.compress_images.length>0) ? (data.compress_production_image = config.homeEntry.url+'/WX/poster/compress_production/' +  production_crews_result.production.compress_images[production_crews_result.production.compress_images.length-1].filename) : (data.compress_production_image="") ;
																			//console.log('addressname:'+address_result.name);
																			//console.log('addressname:'+address_result.name);
																			//console.log('area_id:'+address_result.area._id);
																			//console.log('areaname:'+address_result.area.name);
																			//data.address_name = address_result.name;
																			//data.area_id = address_result.area._id;
																			//data.address_area_name =address_result.area.name;
																			// console.log('crews_name:'+production_crews_result.name);
																			// console.log('production_id:'+production_crews_result.production._id);
																			// console.log('projectnanme:'+production_crews_result.production.name);
																			data.projectname = production_crews_result.production.name;
																			data.production_id = production_crews_result.production._id;
																			// data.isRegistered = careerincrew_result.isRegistered;
																			// data.remaining_days = Math.floor( (careerincrew_result.expired_date.getTime() - (new Date()).getTime())/3600000/24 );
																			
																			next();

																		});
																	});
																			

																	
																},function(err){
																	next();
																});
															}else{
																console.log('2-6');
																//callback(null);
																next();
															}
														});
													},function(err){
														next();
													});
												}else{
													console.log('address_info is null');
													//callback(null);
													next();
												}
											});
										},function(err){
                                            next();
										});
									}else{
										console.log('user_info is null');
										//callback(null);
										next();
									}
								});
								//next();
							},function(err){
                               callback(null);
							});
						}else{
							console.log('2-7');
							//next();
							callback(null);
						}
					},
					function(callback){
						console.log('3-1');
						if(data!=null){
							if(data.is_effective == true){
								infos = JSON.stringify(data);	
								results.push(JSON.parse(infos));	
								callback(null);
						    }else{
							  callback(null);
						    }	
						}else{
							callback(null);
						}
						
					}
				], function(err){
					console.log('4-1')
					if(err) throw new Error("find the infomation failed");
					next();
				});
			},function(err){
				console.log('5-1');
                
			      for (var i = 0;i<results.length; i++) {
			          var isRepeated = false;
			          for (var j = 0; j < crewResults.length; j++) {
			          	console.log('ddddddddddddddddddddddd');
		                console.log(results[i]);
		                console.log(crewResults[j]);
				     	console.log('ddddddddddddddddddddddd');
			              if (results[i].crews_id == crewResults[j].crews_id && results[i].projectname == crewResults[j].projectname && results[i].production_id == crewResults[j].production_id) {   
			                  isRepeated = true;
			                  break;
			              }
			          }
			         if (!isRepeated) {
			         	crewResults.push(results[i]);
			         	console.log('eeeeeeeeeeeeeeeeeeeeeeeeee');
		                console.log(crewResults);
		                
				     	console.log('eeeeeeeeeeeeeeeeeeeeeeeeee');
			             
			         }
			     }	

		     	if(err) callback(err, null);
		     	console.log('ooooooooooooooooooo');
                console.log(crewResults);
		     	console.log('ooooooooooooooooooo');
			    callback(null, crewResults);

				
			});		
		});
	}
}
//author@²éÕÒÖ°Î»µÄÏêÏ¸ÐÅÏ¢£¨±¨Ãû£©
//通告列表角色列表
var findMorePosition = function(productionCrew_id, userid,callback){
	console.log(productionCrew_id);
	
	var results = [];
	var productionCategaryName = [];//ÓÃÀ´·â×°³öÆ·¹«Ë¾µÄÐÕÃû
	var issuerCompaniesName = [];//ÓÃÀ´·â×°³ÐÖÆ¹«Ë¾
	var locationName = [];//ÓÃÀ´·â×°ÅÄÉãµØ
	var data = {};
	CareerInCrew.model.find()
	.where('crews_object', productionCrew_id)
	.where('isDelete', false)
	//.where('role', role_id)
	.populate('crews_object role address createdBy role.roleCategory')
	.exec(function(err, careerincrew_info){
		if(err) throw new Error('find careerincrew_info error');
		console.log('----------------------');
		console.log(careerincrew_info);
		console.log('----------------------');
		if(careerincrew_info.length == 0){
			format.formatPositionDetail(productionCrew_id,function(err,ret){
               if(err){
                  throw  new Error(err);
               }else{
               	 data.production = ret;
               	 callback(null, data);
               }
         	})
       
			//console.log('careerincrew_result is null');
		}else{
			console.log(careerincrew_info);
			async.eachSeries(careerincrew_info, function(careerincrew_result, next){
			   format.formatRoleDetail(careerincrew_result,function(err,pd){
                  if(err){
                     throw new Error(err);
                  }else{
                  	if(userid==''||userid==null||userid=='null'){
                  	   results.push(pd);
                       next();
                  	}else{
	                  	format.formatSignupStatus(userid, careerincrew_result._id,function(err,status){//查询当前用户是否已经报名
	                      pd.Status=status;  
	                      results.push(pd);
	                      next();                   	 
	                  	}); 
	                }             
                  }
                });
			}, function(err){
				if(err) callback(err, null);
                packProductionInfo(results,function(err,pack){
                     if(err){
                        throw new Error(err);
                     }else{
                     	format.formatPositionDetail(productionCrew_id,function(err,ret){
                           if(err){
                              throw  new Error(err);
                           }else{
                           	 pack.production = ret;
                           	 callback(null, pack);
                           }
                     	})
                        
                     }
                 })               
			});
		}
	});
}
//通告详情--挂起不挂起都查出来
var findAllPosition = function(productionCrew_id, userid,callback){
	console.log(productionCrew_id);
	console.log('zhelima?????');
	var results = [];
	var productionCategaryName = [];//ÓÃÀ´·â×°³öÆ·¹«Ë¾µÄÐÕÃû
	var issuerCompaniesName = [];//ÓÃÀ´·â×°³ÐÖÆ¹«Ë¾
	var locationName = [];//ÓÃÀ´·â×°ÅÄÉãµØ
	var data = {};
	CareerInCrew.model.find()
	.where('crews_object', productionCrew_id)
	//.where('isDelete', false)
	//.where('role', role_id)
	.populate('crews_object role address createdBy role.roleCategory')
	.exec(function(err, careerincrew_info){
		if(err) throw new Error('find careerincrew_info error');
		console.log('*********************');
        console.log(careerincrew_info);
		console.log('*********************');
		if(careerincrew_info.length == 0){
			console.log();
			console.log('careerincrew_result is null');
		}else{
			console.log(careerincrew_info);
			async.eachSeries(careerincrew_info, function(careerincrew_result, next){
			   format.formatRoleDetail(careerincrew_result,function(err,pd){
                  if(err){
                     throw new Error(err);
                  }else{
                  	if(userid==''||userid==null||userid=='null'){
                  	   results.push(pd);
                       next();
                  	}else{
	                  	format.formatSignupStatus(userid, careerincrew_result._id,function(err,status){//查询当前用户是否已经报名
	                      pd.Status=status;  
	                      results.push(pd);
	                      next();                   	 
	                  	}); 
	                }             
                  }
                });
			}, function(err){
				if(err) callback(err, null);
                packProductionInfo(results,function(err,pack){
                     if(err){
                        throw new Error(err);
                     }else{
                     	format.formatPositionDetail(productionCrew_id,function(err,ret){
                           if(err){
                              throw  new Error(err);
                           }else{
                           	 pack.production = ret;
                           	 callback(null, pack);
                           }
                     	})
                        
                     }
                 })               
			});
		}
	});
}
//发布通告-----查询已填的所有角色信息
var findMoreRoleInfo = function(productionCrew_id,callback){
	console.log(productionCrew_id);	
	var results = [];
	var productionCategaryName = [];//ÓÃÀ´·â×°³öÆ·¹«Ë¾µÄÐÕÃû
	var issuerCompaniesName = [];//ÓÃÀ´·â×°³ÐÖÆ¹«Ë¾
	var locationName = [];//ÓÃÀ´·â×°ÅÄÉãµØ
	CareerInCrew.model.find()
	.where('crews_object', productionCrew_id)
	.populate('crews_object role createdBy role.roleTag')
	.exec(function(err, careerincrew_info){
		if(err) throw new Error('find careerincrew_info error');
		if(careerincrew_info.length == 0){
			console.log('careerincrew_result is null');
			callback(null,[]);
		}else{
			console.log(careerincrew_info);
			async.eachSeries(careerincrew_info, function(careerincrew_result, next){
			   format.formatRoleDetail(careerincrew_result,function(err,pd){
                  if(err){
                     throw new Error(err);
                  }else{
                  	results.push(pd);
                  	next();               
                  }
               });
			}, function(err){
				//if(err) callback(err, null);
				console.log('--------------results-----------');
				console.log(results);
				console.log('--------------results-----------');
				packProductionInfo(results,function(err,roleArray){
                   if(err){
                      throw new Error(err);
                   }else{
                      callback(null, roleArray);
                   }
				});
			});
		}
	});
}
//发布通告-----查询某条角色信息
var findOneRoleInfo = function(careerincrewid,callback){
	var results = [];
	var productionCategaryName = [];//ÓÃÀ´·â×°³öÆ·¹«Ë¾µÄÐÕÃû
	var issuerCompaniesName = [];//ÓÃÀ´·â×°³ÐÖÆ¹«Ë¾
	var locationName = [];//ÓÃÀ´·â×°ÅÄÉãµØ
	CareerInCrew.model.findOne()
	.where('_id', careerincrewid)
	.populate('crews_object role createdBy role.roleTag')
	.exec(function(err, careerincrew_info){
		if(err) throw new Error('find careerincrew_info error');
	    format.formatRoleDetail(careerincrew_info,function(err,pd){
          if(err){
             throw new Error(err);
          }else{
          	callback(null,pd);           
          }
        });
			
	});
}


var findUserCareerInCrews = function(user_id,callback){
	var plays = {};
	CareerInCrew.model.find()
	.where('createdBy', user_id)
	.where('is_effective', 'true')
	.where('is_expire', 'false')
	.where('publish_create', 'true')
	.populate('crews_object')
    .exec(function(err, careerincrews) {
    	console.log('%%%%%%%%%%%%%%%%%%%%');
        console.log(careerincrews);
    	console.log('%%%%%%%%%%%%%%%%%%%%');
    	format.formatUserCareerInCrews(careerincrews, function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		}); 
    });
}
//副导演--邀请演员--查询副导演userid,查询他发布的所有通告
var findUserCrews = function(inviter_id,invited_id,callback){
    Production.model.find()
	 .where('isCreated',true)
	 .where('isPost',true)
	 .where('createdBy',inviter_id)
	 .where('isDelete',false)
	 .populate('production_crews category location')
	 .sort("-createdAt")
	 .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
       	 format.formatUserCrews(ret,inviter_id,invited_id,function(err,nameset){
			if(err){
				return callback(err, nameset);	
			}else{
				return callback(null, nameset);	
			}
		}); 
       }
	 })

}

var searchInviteState = function(results,inviter_id,invited_id,callback){
		var careerincrews = results.careerInCerws_isRegister;
		var careerincrewset = [];
		var careerincrewset_caninvite = [];
		var careerincrewset_cannotinvite= [];
	//	console.log(careerincrews);
		async.eachSeries(careerincrews, function(item,next){
			var careerincrew_id = item.careerincrew_id;
			var careerincrew = item;
			Invitation.model.find()
			.where('inviter', inviter_id)
			.where('invited', invited_id)
			.where('career_in_crews', careerincrew_id)
		    .exec(function(err, careerincrews) {
					if(err){
						return callback(err, careerincrews);	
					}else{
						if(careerincrews.length == 0){
							careerincrew.invitestate = true;
							careerincrewset_caninvite.push(careerincrew);
							next();
						}else{
							careerincrew.invitestate = false;
							careerincrewset_cannotinvite.push(careerincrew);
							next();
						}
						
						
					}
					
		    });
			    
		},function(err){
			if(err){
				return callback(err,[]);	
			}else{
				careerincrewset.push(careerincrewset_caninvite);
				careerincrewset.push(careerincrewset_cannotinvite);
				return callback(null,careerincrewset);	
			}
		});
	
}
//-----------------------------------------------------------------------经纪人项目的function---------------------------------------------------------------------------------------------

//经纪人—————查询匹配出来的职位信息
 var findMatchProduction = function(proArray,callback){
 	var crews=[];
	var data={};
   async.eachSeries(proArray,function(item,next){
		var crewsInfo={};
		console.log('-------------------step2-----------------');
	  	console.log(item);
	  	console.log('-------------------step2-----------------');
	  	if(item.production_crews.length!=0){
	  	  CareerInCrew.model.find()
	       .where('crews_object',item.production_crews[0]._id)
	       .where({'expired_date':{$gte:((new Date()).getTime()-3600000*24)}})  //@zheng ¹ýÂË¹ýÆÚµÄÊ±¼ä
		   .where({'createdAt':{$lt:time}})
		   .where('publish_create',true)
		   .where('is_effective',true)
		   .populate('crews_object role requirement_tags address createdBy')
		   .exec(function(err,ret1){
		   		if(err){
	               throw new Error(err);
	            }else{   
	             	console.log('-------------------step3-----------------');
					console.log(ret1);
					console.log('-------------------step3-----------------');
	     //            format.MatchPositionObjects(ret1, function(err, positionset){
						// if(err){
						// 	return callback(err, null);	
						// }else{
							if(positionset.length>0){
								console.log('zoule');
								crewsInfo.name=item.name;
								crewsInfo.production_id=item._id;
								crewsInfo.investmentAmount=item.investmentAmount;
								crewsInfo.duration=item.duration;
								crewsInfo.production_companys=item.production_companys;
								crewsInfo.issuer_companies=item.issuer_companies;
								crewsInfo.publishDate=item.publishDate;
								crewsInfo.isCreated=item.isCreated;
								crewsInfo.isOfficial=item.isOfficial;
								crewsInfo.introduction=item.introduction;
								crewsInfo.category_id=item.category[0]._id;
								crewsInfo.category=item.category[0].name;
								crewsInfo.production_crewId=item.production_crews[0]._id;
								crewsInfo.location=item.location[0].fullname;
								crewsInfo.openid = positionset[0].openid; 

                                crewsInfo.actorBudget=item.actorBudget;
								crewsInfo.starring_ratio=item.starring_ratio;
								crewsInfo.starring_team_ratio=item.starring_team_ratio;
								crewsInfo.guestplayer_ratio=item.guestplayer_ratio;
								crewsInfo.otherRole_ratio=item.otherRole_ratio;
								(item.images.length>0) ? (crewsInfo.production_image = config.homeEntry.url+'WX/poster/production/' + item._id+'/'+(item.images)[item.images.length-1].originalname) : (crewsInfo.production_image="") ;
                                (item.compress_images.length>0) ? (crewsInfo.compress_production_image = config.homeEntry.url+'WX/poster/compress_production/' + item._id+'/'+(item.compress_images)[item.compress_images.length-1].originalname) : (crewsInfo.compress_production_image="") ;

								crewsInfo.role_id = ret1.role.id;
								crewsInfo.role_name = ret1.role.name;
								crewsInfo.role_category_id = ret1.role.roleCategory;
								crewsInfo.roleTag_id = ret1.role.roleTag;
								crewsInfo.featureTag_id = ret1.role.featureTag;
								crewsInfo.skillTag_id = ret1.role.skillTag;
								crewsInfo.shape = ret1.role.shape;
																								
								crewsInfo.crews_id = ret1.crews_object._id;
								crewsInfo.crews_name = ret1.crews_object.name;
								crewsInfo.crews_production_id = ret1.crews_object.production;
								crewsInfo.men_count = ret1.men_count;
								crewsInfo.expired_date = ret1._.expired_date.format('YYYY-MM-DD');
								crewsInfo.remaining_days = Math.floor( (item.expired_date.getTime() - now_date.getTime())/3600000/24 );
								crewsInfo.address_id = (ret1.address[0]!=null) ? ret1.address[0]._id : null;
								crewsInfo.address_name = (ret1.address[0]!=null) ? ret1.address[0].name : null;
								crewsInfo.address_area_id = (ret1.address[0]!=null) ? ret1.address[0].area : null;  //address_area²»ÔÊÐíÎªmultiple£¬µ«Òò¸Ã¶ÔÏóÊÇÒÔÊý×éÐÎÊ½´æµÄ£¬Òò´ËÒÔÊý×éÀ´¶Ô´ý
								crewsInfo.candidates = ret1.candidates;
								crewsInfo.author_id = ret1.createdBy._id;
								crewsInfo.author_name = ret1.createdBy.name;
								crewsInfo.is_effective = ret1.is_effective;
								crewsInfo.isRegistered = ret1.isRegistered;
								crewsInfo.openid = ret1.openid;
								crewsInfo.age = ret1.age;
								crewsInfo.gender = ret1.gender;

		                        crews.push(crewsInfo);
							    next();
								
							}else{
								next();
							}
					//	}
					//});    	
	            }
		   });
	  	}else{
	      	next();
	    }
	},  function (err){
	        if(err){
	          	throw new Error(err);
	      	}else{
	   //         	data.results = crews;
	   //         	console.log('-------------------step5-----------------');
				// console.log(data);
				// console.log('-------------------step5-----------------');
	           	return callback(null, crews);	
	       	}
		}
	);
 }
//经纪人--通告广场--查询通告详情--查询匹配度较高的演员
var findmatchingActors = function(prodction_id,careerincrew_id,agentid,page,callback){
   var users={};
   var result = [];
   MatchProduction.model.findOne()
    .where('prodction_id',prodction_id)
    .where('agent_id',agentid)
    .exec(function(err,ret){
       if(err){
          throw new Error(err);
       }else{
          MatchActor.paginate({
			page: page,
			perPage:2,
			maxPages: 10
		 })
          .where('matchProduction',ret._id)
          .where('careerincrew_id',careerincrew_id)
          .exec(function(err,ret1){
             if(err){
               throw new Error(err);
             }else{
             	users.currentPage = ret1.currentPage;
		        users.totalPages = ret1.totalPages;
                async.eachSeries(ret1.results,function(item,next){
                   var actor = {};
                   actor.basicInfo_degree=item.basicInfo_degree;
                   actor.feature_degree=item.feature_degree;
                   actor.paycheck_degree=item.paycheck_degree;
                   actor.schedule_degree=item.schedule_degree;
                   actor.total_degree=item.total_degree;
                   User.model.findOne()
                    .where('_id',item.user_id)
                    .exec(function(err,user){
                       if(err){
                          throw new Error(err);
                       }else{
                       	  actor.realname = user.realname;
                       	  actor._id = user._id;
                       	  format.formatSignupStatus(user._id,careerincrew_id,function(err,status){//查询当前用户是否已经报名
		                      actor.Status=status; 
		                      format_user.formatCasting(user._id,function(err,url){
                                 if(err){
                                    throw new Error(err);
                                 }else{
                                 	actor.iconUrl = url.iconUrl;
                                 	actor.compress_iconUrl = url.compress_iconUrl;
                                 	result.push(actor);
                           	        next();
                                 }
		                      }); 

		              //         Casting.model.findOne()
					           // .where('user_id',item.user_id)
					           // .exec(function(err,casting){
					           //    if(err){
					           //      throw new Error(err);
					           //    }else{
					           //      if(casting!=null){
					           //        (casting.artimage.length!=0) ? (actor.iconUrl =  config.homeEntry.url+'/WX/casting/artimage/' + casting.artimage[casting.artimage.length-1].filename) : (actor.iconUrl="") ;
                //                       Compress_Casting.model.findOne()
                //                       .where('user_id',item.user_id)
					           //        .exec(function(err,casting1){
					           //        	 if(err){
                //                             throw new Error(err);
					           //        	 }else{
					           //        	 	if(casting1 == null){
                //                               actor.compress_iconUrl="";
                //                               result.push(actor);
                //            	                  next();
					           //        	 	}else{
					           //        	 	  (casting1.compress_artimage.length!=0) ? (actor.compress_iconUrl =  config.homeEntry.url+'/WX/casting/compress_artimage/' + casting1.compress_artimage[casting1.compress_artimage.length-1].filename) : (actor.compress_iconUrl="") ;
					           //                result.push(actor);
                //            	                  next();
					           //        	 	}
					                  	 	
					           //        	 }
					           //        })
					                 
					           //      }else{
					           //        actor.iconUrl="";
					           //         Compress_Casting.model.findOne()
	               //                       .where('user_id',item.user_id)
						          //        .exec(function(err,casting1){
						          //         	 if(err){
	               //                              throw new Error(err);
						          //         	 }else{
						          //         	 	if(casting1 == null){
	               //                                actor.compress_iconUrl="";
	               //                                result.push(actor);
	               //             	                  next();
						          //         	 	}else{
						          //         	 	  (casting1.compress_artimage.length!=0) ? (actor.compress_iconUrl =  config.homeEntry.url+'/WX/casting/compress_artimage/' + casting1.compress_artimage[casting1.compress_artimage.length-1].filename) : (actor.compress_iconUrl="") ;
						          //                 result.push(actor);
	               //             	                  next();
						          //         	 	}
						                  	 	
						          //         	 }
						          //        })
					           //      }
					           //    }
					           // }) 

		                  });                            	  
                       }
                    })
                },function(err){
                   if(err){
                      throw new Error(err);
                   }else{
                   	  users.results=result;
                   	  console.log('---------------------------------------------');
                      console.log(users);
                   	  console.log('---------------------------------------------');
                   	  callback(null,users);
                   }
                });
             }
          })
       }
    })
}
//经纪人--通告广场--查询通告详情以及匹配度较高的演员
var findmatchingPositionandActors = function(productionCrew_id,agentid,page,callback){
	console.log(productionCrew_id);
	var results = [];
	CareerInCrew.model.find()
	.where('crews_object', productionCrew_id)
	.populate('crews_object role address createdBy role.roleCategory')
	.exec(function(err, careerincrew_info){
		if(err) throw new Error('find careerincrew_info error');
		if(careerincrew_info.length == 0){
			console.log('careerincrew_result is null');
		}else{
			console.log(careerincrew_info);
			async.eachSeries(careerincrew_info, function(careerincrew_result, next){
			   format.formatRoleDetail(careerincrew_result,function(err,pd){
	              if(err){
	                 throw new Error(err);
	              }else{//
	              	console.log('----pd----');
                    findmatchingActors(pd.production_id,pd.careerincrew_id,agentid,page,function(err,user){
                         pd.user=user;
                         console.log('000000');
                         console.log(user);
                         console.log('000000');
                         results.push(pd);  
                         next();
                    });              	       
	              }
	            });
			}, function(err){
				if(err) callback(err, null);
				console.log('+++++++++++++++++++++++++++');
                console.log(results);
				console.log('+++++++++++++++++++++++++++');
	            packProductionInfo(results,function(err,pack){
	                 if(err){
	                    throw new Error(err);
	                 }else{
	                 	format.formatPositionDetail(productionCrew_id,function(err,ret){
	                       if(err){
	                          throw new Error(err);
	                       }else{
	                       	 pack.production = ret;
	                       	 callback(null, pack);
	                       }
	                 	})
	                    
	                 }
	             })               
			});
		}
	});
}

//经纪人--------按照类别封装剧组信息
 var packProductionCrewInfo=function(crewArray,callback){
    var result={};
 	var obj1=[];
 	var obj2=[];
 	var obj3=[];
 	var obj4=[];
 	var obj5=[];
 	var obj6=[];
 	var obj7=[];
 	var obj8=[];
 	var obj9=[];
 	var obj10=[];
 	var obj11=[];
 	var obj12=[];
 	var obj13=[];
 	var obj14=[];
 	async.each(crewArray,function(item,next){
 		if(item.category_id=='59aa2930d1caefb01b1f6e44'){//不限
 		   obj1.push(item);
           result.obj1=obj1;
           next();
	 	}if(item.category_id=='59aa4392d1caefb01b1f6e66'){//vr
	       obj2.push(item);
           result.obj2=obj2;
	       next();
	 	}if(item.category_id=='59aa456bd1caefb01b1f6e67'){//其它
	       obj3.push(item);
           result.obj3=obj3;
	       next();
	 	}if(item.category_id=='59aa459cd1caefb01b1f6e68'){//广告
	       obj4.push(item);
           result.obj4=obj4;
	       next();
	 	}if(item.category_id=='59aa45afd1caefb01b1f6e69'){//形象片
	       obj5.push(item);
           result.obj5=obj5;
	       next();
	 	}if(item.category_id=='59aa45c0d1caefb01b1f6e6a'){//微电影
	       obj6.push(item);
           result.obj6=obj6;
	       next();
	 	}if(item.category_id=='59aa45d5d1caefb01b1f6e6b'){//电视剧
	       obj7.push(item);
           result.obj7=obj7;
	       next();
	 	}if(item.category_id=='59aa45e5d1caefb01b1f6e6c'){//电视电影
	       obj8.push(item);
           result.obj8=obj8;
	       next();
	 	}if(item.category_id=='59aa45f4d1caefb01b1f6e6d'){//短视频
	       obj9.push(item);
           result.obj9=obj9;
	       next();
	 	}if(item.category_id=='59aa4602d1caefb01b1f6e6e'){//记录片
	       obj10.push(item);
           result.obj10=obj10;
	       next();
	 	}if(item.category_id=='59aa4612d1caefb01b1f6e6f'){//网络大电影
	       obj11.push(item);
           result.obj11=obj11;
	       next();
	 	}if(item.category_id=='59aa4631d1caefb01b1f6e70'){//网络电视剧
	       obj12.push(item);
           result.obj12=obj12;
	       next();
	 	}if(item.category_id=='59aa4642d1caefb01b1f6e71'){//视频栏目
	       obj13.push(item);
           result.obj13=obj13;
	       next();
	 	}if(item.category_id=='59aa4724eb80d394237d27e4'){//院线电影
	       obj14.push(item);
           result.obj14=obj14;
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
 //经纪人--------按照角色类别封装职位信息
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

//经纪人>>我申请的>>通告详情(职位列表只显示申请的职位)
var findApplyPositionDetail = function(productioncrew_id,agentid,callback){
   	var results = [];
	var productionCategaryName = [];//ÓÃÀ´·â×°³öÆ·¹«Ë¾µÄÐÕÃû
	var issuerCompaniesName = [];//ÓÃÀ´·â×°³ÐÖÆ¹«Ë¾
	var locationName = [];//ÓÃÀ´·â×°ÅÄÉãµØ
	Resume.model.find()
	 .where('productioncrew_id',productioncrew_id)
	 .where('agentid',agentid)
	 .exec(function(err,ret){
	    if(err){
	       throw new Error(err);
	    }else{
	       async.eachSeries(ret,function(item,next){
	          CareerInCrew.model.findOne()
				.where('_id', item.career_in_crews_id)
				.where('isDelete',false)
				.populate('crews_object role address createdBy role.roleCategory')
				.exec(function(err, careerincrew_info){
					if(err) throw new Error('find careerincrew_info error');
					if(careerincrew_info.length == 0){
						console.log('careerincrew_result is null');
					}else{
					   console.log(careerincrew_info);
                       format.formatRoleDetail(careerincrew_info,function(err,pd){
                          if(err){
                            throw new Error(err);
                          }else{
                          	results.push(pd);
                          	next();
                          }
                       });
							
					}
				});
	       },function(err){
	       	   console.log('-------------results------------');
	       	   console.log(results);
	       	   console.log('-------------results------------');
	           packProductionInfo(results,function(err,careerlist){
                 if(err){
                    throw new Error(err);
                 }else{
                 	 callback(null, careerlist);
                 	// format.formatPositionDetail(results[0].crews_id,function(err,ret){
                  //      if(err){
                  //         throw  new Error(err);
                  //      }else{
                  //      	 careerlist.production = ret;
                  //      	 callback(null, careerlist);
                  //      }
                  //   })
                 }
	           })
	       });	
	    }
	 })
	
}

//经纪人>>邀请我的>>通告详情(职位列表只显示受邀的职位)
var findInvitedPositionDetail = function(production_id,agentid,callback){
   	var results = [];
	var productionCategaryName = [];//ÓÃÀ´·â×°³öÆ·¹«Ë¾µÄÐÕÃû
	var issuerCompaniesName = [];//ÓÃÀ´·â×°³ÐÖÆ¹«Ë¾
	var locationName = [];//ÓÃÀ´·â×°ÅÄÉãµØ
	console.log('---------------------------');
	console.log(production_id);
	console.log(agentid);
	console.log('---------------------------')
	BoundProductionAndInvited.model.findOne()
	 .where('production_id',production_id)
	 .where('agentid',agentid)
	 .exec(function(err,ret){
	    if(err){
	       throw new Error(err);
	    }else{
	       console.log('---------------------------');
	       console.log(ret);
	       console.log('---------------------------')
	       ProductionCrews.model.findOne()
	       .where('production',production_id)
	       .exec(function(err,crew){
              if(err){
                 throw new Error(err);
              }else{
              	 CareerInCrew.model.find()
              	 .where('crews_object',crew._id)
              	 .exec(function(err,career){
                    if(err){
                       throw new Error(err);
                    }else{
                    	async.eachSeries(career,function(item,next){
                           Invitation.model.find()
                           .where('career_in_crews',item._id)
                           .exec(function(err,invitation){
                              if(invitation.length==0){
                                 next();
                              }else{
                                CareerInCrew.model.findOne()
								  .where('_id', item._id)
								  .populate('crews_object role address createdBy role.roleCategory')
								  .exec(function(err, careerincrew_info){
									if(err) throw new Error('find careerincrew_info error');
									   console.log(careerincrew_info);
				                       format.formatRoleDetail(careerincrew_info,function(err,pd){
				                          if(err){
				                            throw new Error(err);
				                          }else{
				                          	results.push(pd);
				                          	next();
				                          }
				                       });
								 });
                              }
                           })
                    	},function(err){
                            if(err){
                               throw new Error(err);
                            }else{
                            	packProductionInfo(results,function(err,careerlist){
					                 if(err){
					                    throw new Error(err);
					                 }else{
					                 	format.formatPositionDetail(results[0].crews_id,function(err,ret){
					                       if(err){
					                          throw  new Error(err);
					                       }else{
					                       	 careerlist.production = ret;
					                       	 callback(null, careerlist);
					                       }
					                    })
					                 }
					           })
                            }
                    	});
                    }
              	 })
              }
	       })
	    //    async.eachSeries(ret.careerobj,function(item,next){
	    //    	Invitation.model.findOne()
	    //    	 .where('_id',item)
	    //    	 .exec(function(err,invitation){
     //            if(err){
     //              throw new Error(err);
     //            }else{
     //               CareerInCrew.model.findOne()
					// .where('_id', invitation.career_in_crews)
					// .populate('crews_object role address createdBy role.roleCategory')
					// .exec(function(err, careerincrew_info){
					// 	if(err) throw new Error('find careerincrew_info error');
					// 	   console.log(careerincrew_info);
	    //                    format.formatRoleDetail(careerincrew_info,function(err,pd){
	    //                       if(err){
	    //                         throw new Error(err);
	    //                       }else{
	    //                       	results.push(pd);
	    //                       	next();
	    //                       }
	    //                    });
					// });
     //            }
	    //    	 })
	    //    },function(err){
	    //        packProductionInfo(results,function(err,careerlist){
     //             if(err){
     //                throw new Error(err);
     //             }else{
     //             	format.formatPositionDetail(results[0].crews_id,function(err,ret){
     //                   if(err){
     //                      throw  new Error(err);
     //                   }else{
     //                   	 careerlist.production = ret;
     //                   	 callback(null, careerlist);
     //                   }
     //                })
     //             }
	    //        })
	    //    });	
	    }
	 })
	
}

//经纪人--我申请的---剧目列表---剧目去重方法
var removeSameCrews = function(crew_array,callback){
  var array = new Set();
  var crews_ID=[];
  async.eachSeries(crew_array,function(item,next){//剧组去重
    array.add(item.productioncrew_id);
    next(); 
  },function(err){
    if(err){
       throw new Error(err);
    }else{
      	array.forEach(function(value) {
		   crews_ID.push(value);
		})	
		callback(null,crews_ID);		
    }
  });

}
module.exports = {
	findProductionTypes: findProductionTypes, 
	findRoleCategories: findRoleCategories,
	findProductionCategories: findProductionCategories,
	findRepertoireType : findRepertoireType,

	findAddressNames: findAddressNames,
	findProductionCrewsNames: findProductionCrewsNames,
	findLocationNames: findLocationNames,
	findProductionIssuers: findProductionIssuers,
	findProductionCompanies: findProductionCompanies,
	findPositions: findPositions,
	findCrews:findCrews,

	fuzzyquerry: fuzzyquerry,
	findMorePosition: findMorePosition,
	findLocationFullnames:findLocationFullnames,
	findUserCareerInCrews: findUserCareerInCrews,
	searchInviteState: searchInviteState,
	searchCityUnderProvince: searchCityUnderProvince,
	searchDistrictUnderCity: searchDistrictUnderCity,
	findRoleTypes : findRoleTypes,
	findSkillTypes : findSkillTypes,
	findFeatureTypes : findFeatureTypes,

	packProductionInfo : packProductionInfo,
	packProductionCrewInfo : packProductionCrewInfo,
	findInvitedPositionDetail : findInvitedPositionDetail,
	findMatchProduction : findMatchProduction,
	findProductionCrews : findProductionCrews,
	findMoreRoleInfo : findMoreRoleInfo,
    findOneRoleInfo : findOneRoleInfo,
    findmatchCrews : findmatchCrews,
    findmatchingPositionandActors : findmatchingPositionandActors,
    findApplyPositionDetail : findApplyPositionDetail,
    findUserCrews : findUserCrews,
    findAllPosition : findAllPosition,
    findmatchingActors : findmatchingActors,
    removeSameCrews : removeSameCrews

}

