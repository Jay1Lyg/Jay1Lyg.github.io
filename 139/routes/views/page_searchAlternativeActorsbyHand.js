var keystone = require('keystone');


exports = module.exports = function (req, res) {     
	var careerincrew_id = req.params.careerincrew_id ;
	var programme_id = req.params.programme_id ;
	res.render('page_searchAlternativeActorsbyHand',{
	   careerincrew_id : careerincrew_id,
	   programme_id : programme_id
	});
};