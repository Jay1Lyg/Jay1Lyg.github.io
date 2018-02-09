var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url');
exports = module.exports = function(req, res){
	var careerincrewid = req.params.careerincrewid || '';
	search.findOneRoleInfo(careerincrewid, function(err,infomation){
		if(err){
			res.send(err);
		}else{
			var params = urllib.parse(req.url,true);
		   if (params.query && params.query.callback) {
	          	var str =  params.query.callback + '(' + JSON.stringify(infomation) + ')';//jsonp
	        	res.send(str);
	      	} else {
	       		res.send(JSON.stringify(infomation));//普通的json
	      	}
		}
	});
}