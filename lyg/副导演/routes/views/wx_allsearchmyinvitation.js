var search = require('../../query/save_and_get_data_in_MongoDB/careerincrew/search.js');
var urllib = require('url');

exports = module.exports = function(req, res) {

	var user_id = req.params.user_id || null;
	var page = req.params.page || '0';
	
	search.findUserInvitation( user_id, page, function(err, invitations) {
		if(err) {	
			res.send(err);
		}else{
			//res.send(invitations);
			console.log(invitations);
			var params = urllib.parse(req.url,true);
	       	 if(invitations== null){
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
		          	 var str =  params.query.callback + '(' + JSON.stringify(invitations.invitations) + ')';//jsonp
		        	 res.send(str);	          
		      	} 
		    }
		}
	});
}