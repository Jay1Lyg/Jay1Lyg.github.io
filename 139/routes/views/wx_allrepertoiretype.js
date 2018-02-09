var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url')

exports = module.exports = function(req, res) {
	var category_id = req.params.category_id || '';
	console.log(req.params);

	search.findRepertoireType(category_id, function(err, allnames) {
		if(err) {	
			// if err, the profile contains err message. pointing which userid not found
			res.send(err);
		}else{
			console.log(allnames);
			var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
		          	var str =  params.query.callback + '(' + JSON.stringify(allnames.nameset) + ')';//jsonp
		        	res.send(str);
	      	} else {
	       		res.send(JSON.stringify(allnames.nameset));//普通的json
	      	}
	        // res.send(allnames.nameset);
		}
	});
}