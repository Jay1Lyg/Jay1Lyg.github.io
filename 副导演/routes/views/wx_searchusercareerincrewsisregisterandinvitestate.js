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

	search.findUserCareerInCrews(inviter_id, function(err, careerInCerws) {
		var formatcurrentCareerInCrews_isRegister = {};//接收将id转换为name的结果
		var formatcurrentCareerInCrews_notRegister = {};
		if(err) {	
			res.send(err);
		}else{
			console.log(careerInCerws);
			console.log(careerInCerws=="{}");
			if(JSON.stringify(careerInCerws)=="{}"){
				if (params.query && params.query.callback) {
		          	//console.log('请求2:'+params.query);
		          	var str =  params.query.callback + '(' + JSON.stringify({}) + ')';//jsonp
		        	res.send(str);
		      	} else {
		       		res.send(JSON.stringify({}));//普通的json
		      	}

			}else{
				currentCareerInCrews_isRegister = careerInCerws.careerInCrew_isRegister;
				console.log('--------currentCareerInCrews_isRegister--------');
	            console.log(currentCareerInCrews_isRegister);
				console.log('-------currentCareerInCrews_isRegister---------');

				//将认证认证的职位格式化
				format.convertIdToName(currentCareerInCrews_isRegister, function(err,careerInCerws_isRegister){
					var results = {};
					results.careerInCerws_isRegister = careerInCerws_isRegister;
							search.searchInviteState( results, inviter_id , invited_id ,function(err, set) {
								if(err) {	
									res.send(err);
								}else{
									console.log('----------------');
	                                console.log(set);
									console.log('----------------');
									//res.send(set);
									
							       	 if(set== null){
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
								          	 var str =  params.query.callback + '(' + JSON.stringify(set) + ')';//jsonp
								        	 res.send(str);	          
								      	} 
								    }
								}
							});
					//res.send(results);
				});
			}
			
		}
	});
}