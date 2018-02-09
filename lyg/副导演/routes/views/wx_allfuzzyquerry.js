/*
  模糊搜索  0全文搜索 1项目搜索 2 职位搜索
*/
var keystone = require('keystone');
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var async = require('async');

exports = module.exports = function(req, res){
	var index = req.params.index || '';
	var name =req.params.name || '';
	var page =req.params.page || '';
	var appid =req.params.appid || '';
	var openid =req.params.openid || '';
	var array=[];
	console.log('标志：'+index+'  项目或职位名：'+name+'   当前页：'+page);
	search.fuzzyquerry(index, name, page, function(err,infomation){
		if(err){
			res.send(err);
		}else{
			// console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			// console.log(infomation);
			// console.log(infomation.length==0);
			// console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
			var params = urllib.parse(req.url,true);
			if(infomation == null || infomation == {} ){
	        	//console.log('请求1:'+params);
		        if (params.query && params.query.callback) {
		          	//console.log('请求2:'+params.query);
		          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
		        	res.send(str);
		      	} else {
		       		res.send(JSON.stringify({}));//普通的json
		      	}
	        }else{
				if (params.query && params.query.callback) {
			          	//console.log('请求2:'+params.query);
			       if(appid == 'wx1beb5bae19621613'){
                      var str =  params.query.callback + '(' + JSON.stringify(infomation) + ')';//jsonp
		        	  res.send(str);
			       }else{
			       	   console.log('step1');
	                    async.eachSeries(infomation, function(item, next){
							BoundUserAndPublic.model.findOne()
					        .where('openID', item.openid)
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

									   	 		if(ret1.appid == appid){
	                                              array.push(item);
	                                              next();
									   	 		}else{
									   	 			next();
									   	 		}
									   	    }
									   	})
									}
							    }
							 })
					    },function(err){
	                      if(err) throw new Error(err);
							console.log('data:');
							var str =  params.query.callback + '(' + JSON.stringify(array) + ')';//jsonp
							console.log(str);
			        		res.send(str);
					    })
                   }

			         //  	var str =  params.query.callback + '(' + JSON.stringify(infomation) + ')';//jsonp
			        	// return res.send(str);
			    } else{
                   if(appid == 'wx1beb5bae19621613'){
                      //var str =  params.query.callback + '(' + JSON.stringify(array) + ')';//jsonp
                       console.log('infomationinfomationinfomation');
                      console.log(infomation);
                      console.log('infomationinfomationinfomation');
		        	  res.send(infomation);
			       }else{
			    	 async.eachSeries(infomation, function(item, next){
						BoundUserAndPublic.model.findOne()
				        .where('openID', item.openid)
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

								   	 		if(ret1.appid == appid){
                                              array.push(item);
                                              next();
								   	 		}
								   	    }
								   	})
								}
						    }
						 })
				    },function(err){
                      if(err) throw new Error(err);
						console.log('data:');
						//var str =  params.query.callback + '(' + JSON.stringify(array) + ')';//jsonp
		        		res.send(array);
				    })
			      }

			    }
		   }
		}
	});
}