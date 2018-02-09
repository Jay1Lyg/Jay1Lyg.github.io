var search = require('../../query/save_and_get_data_in_MongoDB/resume/search.js');
var urllib = require('url')

exports = module.exports = function(req, res) {
	var careerincrew_id = req.params.careerincrew_id || '';
	var currentPage = req.params.currentPage || '1';
	var index=req.params.index || '';
	console.log('职位id:'+careerincrew_id+'    当前页：'+currentPage);
	search.findCandidatesInfo(careerincrew_id, currentPage, index,function (err, candidates_info) {
		if(err) {	
			res.send(err);
		}else{
			console.log('==================444444444444444==========================');
			console.log(candidates_info);
			console.log('==================444444444444444==========================');
			var params = urllib.parse(req.url,true);
			if (params.query && params.query.callback) {
		          	//console.log('请求2:'+params.query);
		          	var str =  params.query.callback + '(' + JSON.stringify(candidates_info) + ')';//jsonp
		        	res.send(str);
		      	} else {
		       		res.send(JSON.stringify(candidates_info));//普通的json
		    }
			// res.render('page_candidateinfo',{
			// 	array:candidates_info,
			// 	careerincrew_id : careerincrew_id,
			// });

		}
	});
}