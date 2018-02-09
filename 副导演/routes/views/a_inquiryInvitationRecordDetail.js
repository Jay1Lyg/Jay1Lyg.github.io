
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url')

exports = module.exports = function(req, res) {
	var agentid = req.params.agentid || '';
	var productionid = req.params.production_id || '';
	console.log(req.params);

	search.findInvitedPositionDetail( productionid, agentid, function(err, careerlist) {
		if(err) {	
			// if err, the profile contains err message. pointing which userid not found
			res.send(err);
		}else{
			var params = urllib.parse(req.url,true);
	       	if(careerlist== null){
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
		          	 var str =  params.query.callback + '(' + JSON.stringify(careerlist) + ')';//jsonp
		        	 res.send(str);	          
		      	} 
		      }
		}
	});
}