var searchUser = require('../../query/util/getJssdkConfig.js');
var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var async = require('async');
var keystone = require('keystone');
var	User = keystone.list('User');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');
var	User_Openid=keystone.list('User_Openid');
var urllib = require('url');

exports = module.exports = function(req, res) {
	var uid = req.params.userid || '';

	search.findProfile( uid, function(err, profile) {
		if(err) {	
			res.send(err);
		}else{
			console.log(profile);
			
			console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
			//var url   ='http://kaishi.viphk.ngrok.org'+req.url;  
			var params = urllib.parse(req.url,true);                       
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
	});
}