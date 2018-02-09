var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var async = require('async');
var keystone = require('keystone');
var query = require('../../query/util/downImageToNative.js');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');


exports = module.exports = function(req, res) {
	var currentPage = req.params.page || '0';
	var area_id = req.params.area == 'null' ? null : req.params.area; //req.params.area;
	var rolecategory_id = req.params.rolecategory == 'null' ? null : req.params.rolecategory ; //req.params.rolecategory;
	var productiontype_id = req.params.productiontype == 'null' ? null : req.params.productiontype;
	var nameKeyword = req.params.name;
	var isregistered = req.params.isregistered;
	var time = req.params.time;
	var appid = req.params.appid;//author@zheng 这里的appid传值有误
	var openid = req.params.openid;
	var infos = {};
	var data = [];
	//console.log(req.params);
	/*author@zheng 针对没有根据发布时的先后顺序做过滤操作，考虑一下分页额问题*/
	search.findCrews( productiontype_id, rolecategory_id, area_id, isregistered, currentPage, nameKeyword, time, openid, function(err, positions) {
		if(err) {	
			res.send(err);
		}else{
		 	var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
				var str =  params.query.callback + '(' + JSON.stringify(positions) + ')';//jsonp
				res.send(str);
				// getAppidInfoByOpenid(openid, function (err1, ret1){
				// 	if(err1){
				// 		throw new Error(err1);
				// 	}else{
				// 		if(ret1 == null){
				// 			var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
				// 			res.send(str);
				// 		}else{
				// 			if(ret1.appid == 'wx6312e96ce8194f1c'){//副导演助手 可以看到所有的通告 其他公众号只能看到自己发的通告
				// 				var str =  params.query.callback + '(' + JSON.stringify(positions) + ')';//jsonp
				// 				res.send(str);
				// 			}else{
				// 				async.eachSeries(positions.results, function (positions_result, next){
				// 					getAppidInfoByOpenid(positions_result.openid, function (err2, ret2){
				// 						if(err2){
				// 							throw new Error(err2);
				// 						}else{
				// 							if(ret2 == null){
				// 								var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
				// 								res.send(str);
				// 							}else{
				// 								if(ret1.appid == ret2.appid){
				// 									var positions_infos = {};
				// 										positions_infos.name = positions_result.name;
				// 										positions_infos.investmentAmount = positions_result.investmentAmount;
				// 										positions_infos.duration = positions_result.duration;
				// 										positions_infos.production_companys = positions_result.production_companys;
				// 										positions_infos.issuer_companies = positions_result.issuer_companies;
				// 										positions_infos.isCreated = positions_result.isCreated;
				// 										positions_infos.isOfficial = positions_result.isOfficial;
				// 										positions_infos.category_id = positions_result.category_id;
				// 										positions_infos.category = positions_result.category;
				// 										positions_infos.production_crewId = positions_result.production_crewId;
				// 										positions_infos.location = positions_result.location;
				// 										positions_infos.production_image = positions_result.production_image;
				// 									data.push(positions_infos);
				// 								}
				// 								next();
				// 							}
				// 						}
				// 					});
				// 				}, function (err){
				// 					if(err){
				// 						throw new Error(err)
				// 					}else{
				// 						infos.total = positions.total;
				// 						infos.currentPage = positions.currentPage;
				// 						infos.totalPages = positions.totalPages;
				// 						infos.results = data;
				// 						var str =  params.query.callback + '(' + JSON.stringify(infos) + ')';//jsonp
				// 						res.send(str);
				// 					}
				// 				});
				// 			}
				// 		}
				// 	}
				// });
			}else{
				res.send(positions);//author@zheng 该情况不做考虑，如果出现ajax不跨域的情况需要对该结果集进行处理
			}
			// console.log('----------------------------');
			// console.log(positions.results);
			// var params = urllib.parse(req.url,true);
	  //       if(positions.results == null){
	  //       	//console.log('请求1:'+params);
		 //        if (params.query && params.query.callback) {
		 //          	//console.log('请求2:'+params.query);
		 //          	var str =  params.query.callback + '(' + JSON.stringify([]) + ')';//jsonp
		 //        	res.send(str);
		 //      	} else {
		 //       		res.send(JSON.stringify([]));//普通的json
		 //      	}
	  //       }else{
	  //       	if (params.query && params.query.callback) {
			// 		async.eachSeries(positions.results, function(positions_result, next){

			// 			BoundUserAndPublic.model.findOne()
			// 	        .where('openID', positions_result.openid)
			// 	        .exec( function (err, ret){
			// 	        	if(err){
			// 	        		throw new Error(err);
			// 	        	}else{
			// 	        		if(ret == null){
			// 	        			res.send('请关注公众号，并在微信客户端使用！');
			// 	        		}else{
			// 	        			PublicAccount.model.findOne()
			// 		        		.where('_id', ret.appid)
			// 		        		.select('appid')
			// 		        		.exec( function (err1, ret1){
			// 		        			if(err1){
			// 		        				throw new Error(err1);
			// 		        			}else{
			// 		        				console.log("appid1:"+ret1.appid);
					        				
			// 		        				console.log("appid2:"+appid);

			// 					   	 		if(ret1.appid == appid){
			// 						   	 		var positions_infos = {};
			// 						   	 		positions_infos.id = positions_result.id;
			// 						   	 		positions_infos.role_id = positions_result.role_id;
			// 						   	 		positions_infos.role_name = positions_result.role_name;
			// 						   	 		positions_infos.role_category_id = positions_result.role_category_id;
			// 						   	 		positions_infos.crews_id = positions_result.crews_id;
			// 						   	 		positions_infos.crews_name = positions_result.crews_name;
			// 						   	 		positions_infos.crews_production_id = positions_result.crews_production_id;
			// 						   	 		positions_infos.men_count = positions_result.men_count;
			// 						   	 		positions_infos.expired_date = positions_result.expired_date;
			// 						   	 		positions_infos.remaining_days = positions_result.remaining_days;
			// 						   	 		positions_infos.address_id = positions_result.address_id;
			// 						   	 		positions_infos.address_name = positions_result.address_name;
			// 						   	 		positions_infos.candidates = positions_result.candidates;
			// 						   	 		positions_infos.production_image = positions_result.production_image;
			// 						   	 		positions_infos.crews_production_categories = positions_result.crews_production_categories;
			// 						   	 		positions_infos.address_area_name = positions_result.address_area_name;
			// 						   	 		positions_infos.production_category = positions_result.production_category;
			// 						   	 		positions_infos.author_id = positions_result.author_id;
			// 						   	 		data.push(positions_infos);
			// 					   	 		}
			// 						      	next();






			// 		        			}
			// 		        		});
			// 		        	}
			// 		        }

			// 		    });





			
		 //          	},function (err){
			// 			if(err) throw new Error(err);
			// 			console.log('data:');
			// 			var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
		 //        		res.send(str);
			// 		});
     
		          	
		 //      	} else {
		 //      		async.eachSeries(positions.results, function(positions_result, next){
		          	
			// 			BoundUserAndPublic.model.findOne()
			// 	        .where('openID', positions_result.openid)
			// 	        .exec( function (err, ret){
			// 	        	if(err){
			// 	        		throw new Error(err);
			// 	        	}else{
			// 	        		if(ret == null){
			// 	        			res.send('请关注公众号，并在微信客户端使用！');
			// 	        		}else{
			// 	        			PublicAccount.model.findOne()
			// 		        		.where('_id', ret.appid)
			// 		        		.select('appid')
			// 		        		.exec( function (err1, ret1){
			// 		        			if(err1){
			// 		        				throw new Error(err1);
			// 		        			}else{
			// 		        				console.log("appid:"+ret1.appid);
					        				


			// 					   	 		if(ret1.appid == appid){
			// 						   	 		var positions_infos = {};
			// 						   	 		positions_infos.id = positions_result.id;
			// 						   	 		positions_infos.role_id = positions_result.role_id;
			// 						   	 		positions_infos.role_name = positions_result.role_name;
			// 						   	 		positions_infos.role_category_id = positions_result.role_category_id;
			// 						   	 		positions_infos.crews_id = positions_result.crews_id;
			// 						   	 		positions_infos.crews_name = positions_result.crews_name;
			// 						   	 		positions_infos.crews_production_id = positions_result.crews_production_id;
			// 						   	 		positions_infos.men_count = positions_result.men_count;
			// 						   	 		positions_infos.expired_date = positions_result.expired_date;
			// 						   	 		positions_infos.remaining_days = positions_result.remaining_days;
			// 						   	 		positions_infos.address_id = positions_result.address_id;
			// 						   	 		positions_infos.address_name = positions_result.address_name;
			// 						   	 		positions_infos.candidates = positions_result.candidates;
			// 						   	 		positions_infos.production_image = positions_result.production_image;
			// 						   	 		positions_infos.crews_production_categories = positions_result.crews_production_categories;
			// 						   	 		positions_infos.address_area_name = positions_result.address_area_name;
			// 						   	 		positions_infos.production_category = positions_result.production_category;
			// 						   	 		positions_infos.author_id = positions_result.author_id;
			// 						   	 		data.push(positions_infos);
			// 					   	 		}
			// 						      	next();






			// 		        			}
			// 		        		});
			// 		        	}
			// 		        }

			// 		    });





			
		 //          	},function (err){
			// 			if(err) throw new Error(err);
			// 			console.log('data:');
		 //        		res.send(data);
			// 		});

		 //      	}
   //          }
		}
	});
}

