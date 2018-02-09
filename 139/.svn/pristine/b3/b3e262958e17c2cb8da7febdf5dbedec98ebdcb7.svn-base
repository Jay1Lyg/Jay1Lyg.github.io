var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var format = require('../../query/save_and_get_data_in_MongoDB/position/format.js');
var urllib = require('url');
//返回有效的职位和邀请的状态
exports = module.exports = function(req, res) {
	var currentPage = req.params.page || '0';
	var inviter_id = req.params.inviter_id || null;
	var invited_id = req.params.invited_id || null;
	var currentCareerInCrews_isRegister = {};//接受查询出符合的职位的结果
	var currentCareerInCrews_notRegister = {};
	var params = urllib.parse(req.url,true);
	
    console.log(req.params);

	search.findUserCrews(inviter_id,invited_id, function(err, careerInCerws) {

		if(err) {	
			res.send(err);
		}else{								
	       	if(careerInCerws== null){
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
		          	 var str =  params.query.callback + '(' + JSON.stringify(careerInCerws) + ')';//jsonp
		        	 res.send(str);	          
		      	} 
		    }
			
		}
	});
}