var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
var async = require('async');
var keystone = require('keystone');
var query = require('../../query/util/downImageToNative.js');
var BoundUserAndPublic = keystone.list('BoundUserAndPublic');
var PublicAccount = keystone.list('PublicAccount');


exports = module.exports = function(req, res) {
	var currentPage = req.params.page || '0';
	var categoryid = req.params.categoryid; //req.params.rolecategory;
	var repertoiretypeid = req.params.repertoiretypeid;
	var isregistered = req.params.isregistered;
	var time = req.params.time;
	var appid = req.params.appid;
	var openid = req.params.openid;
	var infos = {};
	var data = [];
	console.log('-------------req.params-------------');
	console.log(req.params);
	console.log('-------------req.params-------------');
	/*author@zheng 针对没有根据发布时的先后顺序做过滤操作，考虑一下分页额问题*/
	search.findmatchCrews( categoryid, repertoiretypeid, isregistered, currentPage,time,appid, function(err, positions) {
		if(err) {	
			res.send(err);
		}else{
			console.log('00000000000000000000');
			console.log(positions);
		 	var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
				var str =  params.query.callback + '(' + JSON.stringify(positions) + ')';//jsonp
				res.send(str);
			 }else{
			 	res.send(JSON.stringify(
			 		));
			 	console.log('------positions-----');
			 }
			//else{
			// 	if (params.query && params.query.callback) {
		 //          	 console.log('请求2:'+params.query);	
		 //          	 var str =  params.query.callback + '(' + JSON.stringify(positions) + ')';//jsonp
		 //        	 res.send(str);	          
		 //      	} else{

		 //      	}
			// }
		}
	});
}

 // if(userArray== null){
	//         	//console.log('请求1:'+params);
	// 	        if (params.query && params.query.callback) {
	// 	          	//console.log('请求2:'+params.query);
	// 	          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
	// 	        	res.send(str);
	// 	      	} else {
	// 	       		res.send(JSON.stringify({}));//普通的json
	// 	      	}
	//         }else{
	//         	if (params.query && params.query.callback) {
	// 	          	//console.log('请求2:'+params.query);	
	// 	          	 var str =  params.query.callback + '(' + JSON.stringify(userArray) + ')';//jsonp
	// 	        	 res.send(str);	          
	// 	      	} 
	// 	    }
