var keystone = require('keystone');
var	User = keystone.list('User');
var	PublicAccount = keystone.list('PublicAccount');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');
var async = require('async');

exports = module.exports = function(req, res) {
	var page = req.params.page || '';
	var appid = req.params.appid || '';
	var openid = req.params.openid || '';
    var actors = {};
	console.log('-----------params--------------');
	console.log(req.params);
	console.log('-----------params--------------');
	PublicAccount.model.findOne()
	 .where('appid',appid)
	 .exec(function(err,public){
        if(err){
          throw new Error(err);
        }else{
     //      if(appid == 'wx1beb5bae19621613'){//八都
		   //     User.paginate({
			  //   page: page,
			  //   perPage:10,
			  //   maxPages: 10
			  //  }) 
			  //  .where('allok',true)
			  //  .where('appid',public._id)
			  //  .sort('-createdAt')
			  //  .exec( function(err, ret){
			  //  	  if(err){
     //                throw new Error(err);
			  //  	  }else{
			  //  	  	   actors.currentPage = ret.currentPage;
     //                   actors.totalPages = ret.totalPages;
     //                   search.findactors(ret.results,function(err,actor_result){
					//        if(err){
					//          throw new Error(err);
					//        }else{
					//        	  actors.results = actor_result;
					//        	  var params = urllib.parse(req.url,true);
					//        	  if(actors== null){
					// 	        	//console.log('请求1:'+params);
					// 		        if (params.query && params.query.callback) {
					// 		          	//console.log('请求2:'+params.query);
					// 		          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
					// 		        	res.send(str);
					// 		      	} else {
					// 		       		res.send(JSON.stringify({}));//普通的json
					// 		      	}
					// 	      }else{
					// 	        	if (params.query && params.query.callback) {
					// 		          	//console.log('请求2:'+params.query);	
					// 		          	 var str =  params.query.callback + '(' + JSON.stringify(actors) + ')';//jsonp
					// 		        	 res.send(str);	          
					// 		      	} 
					// 		  }	
					//        }
					//     });
			  //  	  }
			  //  })
		   // }else{
               User.paginate({
			    page: page,
			    perPage:10,
			    maxPages: 10
			   }) 
			   .where('allok',true)
			   .where('appid',public._id)
			   .sort('-createdAt')
			   .exec( function(err, ret){
			   	  if(err){
                    throw new Error(err);
			   	  }else{
		   	  	    actors.currentPage = ret.currentPage;
                    actors.totalPages = ret.totalPages;
                    search.findactors(ret.results,function(err,actor_result){
				       if(err){
				         throw new Error(err);
				       }else{
				       	  actors.results = actor_result;
				       	  var params = urllib.parse(req.url,true);
				       	  if(actors== null){
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
						          	 var str =  params.query.callback + '(' + JSON.stringify(actors) + ')';//jsonp
						        	 res.send(str);	          
						      	} 
						  }	
				       }
				    });
			   	  }
			   })
		   //}
        }
	 })
       	
}


