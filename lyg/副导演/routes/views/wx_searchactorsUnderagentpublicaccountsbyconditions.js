var keystone = require('keystone');
var	User = keystone.list('User');
var	BoundAgentAndActor = keystone.list('BoundAgentAndActor');
var	PublicAccount = keystone.list('PublicAccount');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');
var async = require('async');
var format = require('../../query/save_and_get_data_in_MongoDB/user/format.js');
exports = module.exports = function(req, res) {
	var age = req.params.age || '';
	var sex = req.params.sex || '';
	var appid = req.params.agent_appid || '';
	var info = [];
	var userArray=[];
	var data ={};
	console.log('-----------params--------------');
	console.log(req.params);
	console.log('-----------params--------------');
    BoundAgentAndActor.model.find()
     .where('appid',appid)
     .where('allok',true)
     .exec(function(err,ret){
       if(err){
         throw new Error(err);
       }else{
	      async.eachSeries(ret,function(item,next){
	         User.model.findOne()
	          .where('_id',item.user_id)  
	          .exec(function(err,userinfo){
	             userArray.push(userinfo);
	             next();
	          })
	      },function(err){
             format.formatPaginateObjUsers(userArray,function(err,usersets){ 
                if(err){
                   throw new Error(err);
                }else{
                	console.log('----------userArray----------');
	              console.log(userArray);
	              console.log('----------userArray----------');
                	async.eachSeries(usersets,function(item,next){
					  	var users={};
					    search.getScreenActors(item,age,sex,function(err,result){
			              if(err){
			                 throw new Error(err);
			              }else{
			              	if(result==null){
                               next();
			              	}else{
			                 info.push(result);
			                 next();
			                }
			              }
		                })

				    },function(err){
			             if(err){
			               callback(err,[]);
			             }else{
                            PublicAccount.model.findOne()
                             .where('appid',appid)
                             .exec(function(err,public){
                                if(err){
                                   throw new Error(err);
                                }else{
                                   data.nick_name = public.nick_name;
                                   data.head_img = public.head_img;
                                   data.results=info;
                                   console.log('----------data----------');
		                            console.log(data);
		                            console.log('----------data----------');
                                   var params = urllib.parse(req.url,true);
			                       if(data== null){
			                         if (params.query && params.query.callback) {
			                            //console.log('请求2:'+params.query);
			                            var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
			                            res.send(str);
			                         }else {
			                            res.send(JSON.stringify({}));//普通的json
			                         }
			                       }else{
			                         if (params.query && params.query.callback) {
			                              //console.log('请求2:'+params.query); 
			                             var str =  params.query.callback + '(' + JSON.stringify(data) + ')';//jsonp
			                             res.send(str);           
			                         } 
			                       }
                                }
                             })
				            //callback(null, userArray);		            
			             }
					});
                }
             })
	      })
	   }
	})
       	
}






 // var params = urllib.parse(req.url,true);
 //       	  if(actor_result== null){
	//         	//console.log('请求1:'+params);
	// 	        if (params.query && params.query.callback) {
	// 	          	//console.log('请求2:'+params.query);
	// 	          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
	// 	        	res.send(str);
	// 	      	} else {
	// 	       		res.send(JSON.stringify({}));//普通的json
	// 	      	}
	//       }else{
	//         	if (params.query && params.query.callback) {
	// 	          	//console.log('请求2:'+params.query);	
	// 	          	 var str =  params.query.callback + '(' + JSON.stringify(actor_result) + ')';//jsonp
	// 	        	 res.send(str);	          
	// 	      	} 
	// 	  }	