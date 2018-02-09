var keystone = require('keystone');
var Casting1 = keystone.list('Casting1');
var search = require('../../query/save_and_get_data_in_MongoDB/actor/search.js');
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
	var appid = req.params.appid || '';
	var openid = req.params.openid || '';
    var obj = {};
	obj.gender = req.body.gender;
	obj.age = req.body.age;
	obj.min_height = req.body.min_height;
	obj.max_height = req.body.max_height;
	obj.shap = req.body.shap;
	obj.rolepaycheck = req.body.rolepaycheck;
	obj.skillArray = req.body.skillArray;
	obj.featureArray = req.body.featureArray;
	obj.categoryid = req.body.categoryid;
	obj.repertoireArray = req.body.repertoireArray;
	obj.roletypeArray = req.body.roletypeArray;
	console.log('-----------obj--------------');
    console.log(obj);
	console.log('-----------obj--------------');
	// obj.gender = 1;
	// obj.age = 1;
	// obj.min_height = '';
	// obj.max_height = '';
	// obj.shap = 3;
	// obj.rolepaycheck = 1;
	// obj.skillArray = [];
	// obj.featureArray = [];
	// obj.categoryid = '';
	// obj.repertoireArray = [];
	// obj.roletypeArray = [];
	var info = [];
	var userArray=[];
	var useridArray=[];
	//console.log(req.params);
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
			      	}
	    		}
	    	});
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
        	async.each(useridArray,function(item,next){
               User.model.findOne()
                .where('_id',item)
                .where('allok',true)
                .exec(function(err,ret){
                	if(ret==null){
                       next();
                	}else{
	                	search.searchactordetails(ret,obj,function(err,ret1){//查询演员详情
	                        if(err){
	                           throw new Error(err);
	                        }else{
	                        	search.matchactordetails(obj,ret1,function(err,result){//匹配
	                               if(err){
	                                  throw new Error(err);
	                               }else{
	                               	   if(result){
	                               	   	  userArray.push(ret1);//匹配结果放入数组
	                               	   	  next();
	                               	   }else{
	                               	   	  next();
	                               	   }
	                               }
	    	                    })
	                        }
	                	})
	                }
                  
                })
        	},function(err){
               if(err){
                  throw new Error(err);
               }else{
               	  console.log('---------userArray---------');
       	          console.log(userArray);
       	          console.log('---------userArray---------');
               	  callback(null);
               }
        	});
    	    
       },function(callback){//将匹配结果按偏移值从大到小排序
          search.Sortbyoffset(userArray,function(err,userarray){
              if(err){
                 throw new Error(err);
              }else{
              	 callback(null,userarray);
              }
          });
       }],function(err,arg){
       	   console.log('---------arg---------');
       	   console.log(arg);
       	   console.log('---------arg---------');
	       if(err){
	         throw new Error();  
	       }else{
	       	 var params = urllib.parse(req.url,true);
	       	 if(arg== null){
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
			          	 var str =  params.query.callback + '(' + JSON.stringify(arg) + ')';//jsonp
			        	 res.send(str);	          
			      	} 
			    }
			   // res.send(arg);

	       }
      })	
  }

