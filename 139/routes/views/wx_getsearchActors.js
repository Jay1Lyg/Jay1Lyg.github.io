var keystone = require('keystone');
var	User = keystone.list('User');
var search = require('../../query/save_and_get_data_in_MongoDB/user/search.js');
var urllib = require('url');
var async = require('async');

exports = module.exports = function(req, res) {
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
    search.findsearchactors(appid,age,sex,function(err,actor_result){
    	console.log('------------actor_result-------------');
    	console.log(actor_result);
    	console.log('------------actor_result-------------');
       if(err){
         throw new Error(err);
       }else{
       	  var params = urllib.parse(req.url,true);
       	  if(actor_result== null){
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
		          	 var str =  params.query.callback + '(' + JSON.stringify(actor_result) + ')';//jsonp
		        	 res.send(str);	          
		      	} 
		  }	
       }
    });
       	
}