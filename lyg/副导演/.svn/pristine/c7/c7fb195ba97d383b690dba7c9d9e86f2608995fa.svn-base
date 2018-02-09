var search = require('../../query/save_and_get_data_in_MongoDB/careerincrew/search.js');
var urllib = require('url');

exports = module.exports = function(req, res) {
	
	var user_id = req.params.user_id || null;
	var page = req.params.page || '0';
	var appid = req.params.appid || null;
	
//auther@cincan  查询用户被邀请的信息
	search.findUserBeInvitedInfo( user_id, page,appid, function(err, invitations) {
		if(err) {	
			res.send(err);
		}else{
			
			console.log('----------invitations--------------');
			console.log(invitations);
			console.log(invitations.invitations.length==0);
			console.log('----------invitations--------------');
			//res.send(invitations);
			var params = urllib.parse(req.url,true);
	       	if(invitations.invitations.length== 0){
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
		          	 var str =  params.query.callback + '(' + JSON.stringify(invitations) + ')';//jsonp
		        	 res.send(str);	          
		      	} 
		    }
		}
	});
}