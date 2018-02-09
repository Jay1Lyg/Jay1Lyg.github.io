
var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');
var urllib = require('url')

exports = module.exports = function(req, res) {
	var name = req.params.name || '';
	var pageNumber = req.params.page || '';
	console.log(req.params);

	search.findFeatureTypes( name, pageNumber, function(err, allnames) {
		if(err) {	
			// if err, the profile contains err message. pointing which userid not found
			res.send(err);
		}else{
			console.log('---------------------------');
			console.log(allnames);
		    console.log('---------------------------');
			var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
		          	//console.log('请求2:'+params.query);
		          	var str =  params.query.callback + '(' + JSON.stringify(allnames.nameset) + ')';//jsonp
		        	res.send(str);
		      	} else {
		       		res.send(JSON.stringify(allnames.nameset));//普通的json
		      	}// console.log(allnames);
		}
	});
}
