var keystone = require('keystone');
var Casting1 = keystone.list('Casting1');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');
var async = require('async');
var search_resume = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var	User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var	User_Openid=keystone.list('User_Openid');

/**
*
*  通过openid获取到appid
*
*/
function getAppidInfoByOpenid (openid, callback){
	BoundUserAndPublic.model.findOne()
	.where('openID', openid)
	.exec( function (err1, ret1){
		if(err1){
			callback(err1, null);
		}else{
			if(ret1 == null || ret1 == {}){
				callback(null, null);
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
exports = module.exports = function(req, res) {
	var page = req.params.page || '';
	var age = req.params.age || '';
	var sex = req.params.sex || '';
	var appid = req.params.appid || '';
	var openid = req.params.openid || '';
	var info = [];
	var userArray=[];
	var useridArray=[];
	console.log('-----------params--------------');
	console.log(req.params);
	console.log('-----------params--------------');
    async.waterfall([
	    function(callback){

	    	getAppidInfoByOpenid(openid, function (error, result){
	    		if(error){
	    			throw new Error(error);
	    		}else{

	    			if(result == null){
	    				var params = urllib.parse(req.url,true);
	    				if (params.query && params.query.callback) {
				          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
				        	res.send(str);
				      	}
	    			}else{

			      		// if(result.appid == 'wx1beb5bae19621613'){
			      		// 	BoundUserAndPublic.model.find()//查询出所有appid下面的所有openid
				       //     	.exec(function(err,ret1){
				       //          if(err){
				       //            throw new Error(err);
				       //          }else{
				       //            callback(null,ret1);                
				       //          }
				       //     	});
				       //     }else{
				       	
				           		PublicAccount.model.findOne()
					         	.where('appid',result.appid)
					         	.exec(function(err,ret){
						           	if(err){
						             	throw new Error(err);
						           	}else{
						           		BoundUserAndPublic.model.find()//查询出appid下面的所有openid
						           	 	.where('appid',ret._id)
						           	 	.exec(function(err,ret1){
						                	if(err){
						                  		throw new Error(err);
						               		}else{
						                  		callback(null,ret1);                
						                	}
						           	 	});
						           	}
					         	});
				            // }
			      	}
	    		}
	    	});
	    	// if(appid = 'wx6312e96ce8194f1c'){//副导演助手能够查询出所有的演员
	    	// 	BoundUserAndPublic.model.find()//查询出所有appid下面的所有openid
	     //       	.exec(function(err,ret1){
	     //            if(err){
	     //              throw new Error(err);
	     //            }else{
	     //              callback(null,ret1);                
	     //            }
	     //       	});
	    	// }else{
	    	// 	PublicAccount.model.findOne()
	     //     	.where('appid',appid)
	     //     	.exec(function(err,ret){
		    //        	if(err){
		    //          	throw new Error(err);
		    //        	}else{
		    //        		BoundUserAndPublic.model.find()//查询出appid下面的所有openid
		    //        	 	.where('appid',ret._id)
		    //        	 	exec(function(err,ret1){
		    //             	if(err){
		    //               		throw new Error(err);
		    //            		}else{
		    //               		callback(null,ret1);                
		    //             	}
		    //        	 	});
		    //        	}
	     //     	})
	    	// }
	        

    },function(arg,callback){
          async.each(arg,function(item,next){//遍历openid
          	if(item.openID!=undefined){

	           User_Openid.model.find()//一个openid可能对应多个userid
	             .where('openID',item.openID)
	             .exec(function(err,ret2){
	                if(err){
	                  throw new Error(err);
	                }else{

	                	if(ret2.length==0){
                           next();
	                	}else{
	                        async.each(ret2,function(item1,next){

                              useridArray.push(item1.userid);
                              next();
	                        },function(err){
                                 next();
	                        })
	                	}
                      
	                }
	           })
	        }else{
	          	next();
	        }
	      },function(err){
             if(err){
                throw new Error(err);
             }else{
             	console.log('---------------------useridArray-------------------------');
             	console.log(useridArray);
             	useridArray = new Set(useridArray);  
				var arr = [];
				for(var X of useridArray){
					arr.push(X);
				}
				useridArray = arr;

             	console.log('---------------------useridArray-------------------------');
             	callback(null)
             }
	      });
    },function(callback){
    	    search.findactors( page, age, sex,function (err, actorinfo) {
				if(err) {	
					throw new Error();
				}else{
					console.log('-----------actorinfo-----------');
					console.log(actorinfo);
					console.log('-----------actorinfo-----------');
					if(actorinfo.results.length!=0){
						console.log('step1');
						for(var i=0;i<actorinfo.results.length;i++){
                          async.each(useridArray,function(item1,next){
                              if((actorinfo.results[i].id).equals(item1)&& actorinfo.results[i].iconUrl!=""){
                              	 console.log('step2');

		                            userArray.push(actorinfo.results[i]);
		                            console.log(userArray);
		                            next();  
	                          }else{
	                          	 next();
	                          }
						 	},function(err){
                                if(i==(actorinfo.results.length-1)){
                                   callback(null);
                                }
						 	})
						}
                      
				    }else{
				       callback(null);
				    }
					
				}
		    })
    }],function(err){
       if(err){
         throw new Error();  
       }else{
       	 var params = urllib.parse(req.url,true);
       	 if(userArray== null){
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
		          	 var str =  params.query.callback + '(' + JSON.stringify(userArray) + ')';//jsonp
		        	 res.send(str);	          
		      	} 
		    }

       }
    })	
  }

