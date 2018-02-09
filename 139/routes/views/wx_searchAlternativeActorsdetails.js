var searchUser = require('../../query/util/getJssdkConfig.js');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var async = require('async');
var keystone = require('keystone');
var	User = keystone.list('User');
var Invitation = keystone.list('Invitation');
var AlternativeActor = keystone.list('AlternativeActor');
var urllib = require('url');

exports = module.exports = function(req, res) {
	var uid = req.params.userid || '';
    var careerincrew_id = req.params.careerincrew_id || '';
    console.log('------------params-------------');
    console.log(req.params);
    console.log('------------params-------------');
	search.findProfile( uid, function(err, profile) {
		if(err) {	
			res.send(err);
		}else{
			console.log(profile);
			AlternativeActor.model.findOne()
			.where('user_id',uid)
			.where('careerincrew_id',careerincrew_id)
			.where('isDelete',false)
			.exec(function(err,ret){
               if(err){
                  throw new Error(err);
               }else{
               	  console.log('------------ret--------------');
                  console.log(ret);
               	  console.log('------------ret--------------');
               	  var params = urllib.parse(req.url,true);  
               	  if(ret==null){
               	  	 profile.addstate = true;   //表示可以添加到备选  
                     if(profile== null){
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
				          	 var str =  params.query.callback + '(' + JSON.stringify(profile) + ')';//jsonp
				        	 res.send(str);	          
				      	} 
				     }  	
               	  }else{
               	  	  profile.addstate = false;   //表示不可以添加到备选                   
		              if(profile== null){
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
					          	 var str =  params.query.callback + '(' + JSON.stringify(profile) + ')';//jsonp
					        	 res.send(str);	          
					      	} 
				       }  	

               	  }	 
               }
			})
            
			
        }
	});
}