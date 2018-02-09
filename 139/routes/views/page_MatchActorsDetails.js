var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	var userid = req.params.userid ;
	var careerincrew_id = req.params.careerincrew_id ;
	var director_id = req.params.director_id ;
	
	res.render('page_MatchActorsDetails',{
	   userid : userid,
	   careerincrew_id : careerincrew_id,
	   director_id : director_id
	});
};